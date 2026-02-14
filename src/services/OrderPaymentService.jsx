import DB from "@/lib/Database";
import { OrderService } from "./OrderService";

import { PAYMENT_METHOD, PAYMENT_STATUS, PAYMENT_COLLECTED_BY, ORDER_STATUS, ORDER_STATUS_MESSAGE, PAYMENT_ATTEMPT_STATUS, COLLECTION_STATUS, WEBSITE } from "@/data/constant";
import EmailService from "./email/EmailService";
import Razorpay from "razorpay";
import crypto from 'crypto';
import { after } from "next/server";


export class OrderPaymentService{
  #table;
  order;
  constructor(){
    this.#table = "order_payments";
  }
  
  async processPayment(data){
    if(data.payment_method==PAYMENT_METHOD.COD){
        return await this.#createPaymentCOD(data);
    }else {
      return await this.#proceedPaymentGateway(data);
    }
  }

  async #proceedPaymentGateway(data){
    const orderGateway = await this.#getGatewayOrder(data);
    return orderGateway;
  }

  async verifyPayment(data){
    if(data.collected_by==PAYMENT_COLLECTED_BY.RAZOREPAY){
      const paymentDetails =  await this.#verifyRazorPayment(data.gateway_response);
      const createPayment = await this.#createPaymentGateway(data, paymentDetails);
      return true;
    }else {
      throw new Error("Invalid Payment Collected");
    }
  }

  async #verifyRazorPayment(gateway_response){
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = gateway_response;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
      throw new Error("Payment verification failed, try again");
    }
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    if(paymentDetails.status!=="captured"){
        throw new Error("Payment failed: " + paymentDetails.status);
    }
    return paymentDetails;
  }

  async #getGatewayOrder(data){
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = Number(this.order.total_amount);
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_"+this.order.id,
    };
    console.warn(options, "options");
    const orderGateway = await razorpay.orders.create(options);
    if(orderGateway.status!=="created"){
        throw new Error("Order could not created at Gateway");
    }
    return {order_id_gateway:orderGateway.id, ...orderGateway, payment_method:data.payment_method};
  }

  async #createPaymentCOD(){
    console.time("createPaymentCOD"); 
    try {
      console.warn("createPaymentCOD: Start...");
      const insertData = {
        payment_method: PAYMENT_METHOD.COD,
        payment_attempt_status: PAYMENT_ATTEMPT_STATUS.SUCCESS,
        collection_status: COLLECTION_STATUS.PENDING,
      };

      const uniqueWhereas = {
        order_id: this.order.id,
        payment_method: insertData.payment_method,
        payment_attempt_status: insertData.payment_attempt_status
      };

      const isExists = await DB
        .table(this.#table)
        .whereEqual(uniqueWhereas)
        .exists();

      if(isExists){
        throw new Error("Payment COD already created");
      }

      const paymentData = this.#createPayment(insertData);

      // bg run
      after(async ()=>{
        console.warn("bg run")
          const orderSevice = new OrderService();
          await orderSevice.updateOrderTracking(
            this.order.id,
            ORDER_STATUS.CONFIRMED,
            ORDER_STATUS_MESSAGE.CONFIRMED
          );
          const order = await orderSevice.getOrderFull(this.order.id, 'id');
          await EmailService.sendOrderDetails(order.user.email, order);

          const adminEmail = WEBSITE.ADMIN_EMAIL;
          await EmailService.sendOrderDetails(adminEmail, order);
          console.warn("end bg run")
      })
      // end bg run

      return paymentData;

    } finally {
      console.timeEnd("createPaymentCOD"); // ⏱ END (auto ms print)
    }
}


   async #createPaymentGateway(data, paymentDetails){
      const gatewayResponse = {...data?.gateway_response, ...paymentDetails};
      const insertData = {
        currency:paymentDetails.currency,
        transaction_id:paymentDetails.id,
        paid_amount:this.order.total_amount,
        payment_method:paymentDetails.method,
        payment_attempt_status:PAYMENT_ATTEMPT_STATUS.SUCCESS,
        collection_status:COLLECTION_STATUS.COLLECTED,
        collected_by:data.collected_by, 
        gateway_response:JSON.stringify(gatewayResponse)
      };
      const uniqueWhereas = {order_id:this.order.id, transaction_id:insertData.transaction_id, payment_attempt_status:insertData.payment_attempt_status};
      const isExists = await DB.table(this.#table).whereEqual(uniqueWhereas).exists();
      if(isExists){
        throw new Error("Payment Gateway already created");
      }

      const paymentData =  this.#createPayment(insertData);

      // function in background
      after(async ()=>{
        const orderSevice = new OrderService();
        await orderSevice.updateOrderTracking(this.order.id, ORDER_STATUS.CONFIRMED, ORDER_STATUS_MESSAGE.CONFIRMED);
        
        const order = await orderSevice.getOrderFull(this.order.id, 'id');
        const emailResult = await EmailService.sendOrderDetails(order.user.email, order);
        const adminEmail = WEBSITE.ADMIN_EMAIL;
        const adminEmailResult = await EmailService.sendOrderDetails(adminEmail, order);
      })
      // End function in background

      return paymentData;
  } 

  /* 
  Unique By order_id_payment_method_payment_attempt_status
  */
 async #createPayment(data){
    const insertData = {
      ...data,
      currency:"INR",
      order_id:this.order.id,
    }
    const payment_id = await DB.table(this.#table).insert(insertData);
    if(!payment_id){
      throw new Error("Payment could not created")
    }
    return {payment_method:data.payment_method, payment_id:payment_id};
  }

  
   async getLastPaymentStatus(order_id){
    if(!order_id){
      throw new Error("Order id is required");
    }
      const payment = await DB.table(this.#table).where("order_id","=", order_id).orderBy("id", "DESC").first();
      if(!payment){
        return null;
      }
      return {payment_status:payment.collection_status, payment_method:payment.payment_method};
  }

  async hasOrderPaid(order_id){
    if(!order_id){
      throw new Error("Order id is required");
    }
      return await DB.table(this.#table).where("order_id","=", order_id).where("collection_status", "=", COLLECTION_STATUS.COLLECTED).exists();
  }

  async count(value=null, key=null){
    if(value && key){
      return await DB.table(this.#table).where(value, key).count();
    }
    return await DB.table(this.#table).count();
  }

   async totalPaymentCollected() {
      const data = await DB
        .table(this.#table)
        .select("paid_amount")
        .where("collection_status", "=", COLLECTION_STATUS.COLLECTED)
        .get();
      const total_sum = data.reduce((sum, row) => {
        return sum + parseFloat(row.paid_amount || 0);
      }, 0);
      return Number(total_sum.toFixed(2));
    }

async getChartLines() {
  const queries = {
    weekly: `
      SELECT 
        DATE_FORMAT(created_at, '%a') as label, 
        SUM(CAST(paid_amount AS DECIMAL(10,2))) as income,
        DATE(created_at) as date_val
      FROM ${this.#table} 
      WHERE collection_status = 'collected' 
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY date_val, label 
      ORDER BY date_val ASC;
    `,

    monthly: `
      SELECT 
        CONCAT('Week ', FLOOR((DAYOFMONTH(created_at) - 1) / 7) + 1) as label, 
        SUM(CAST(paid_amount AS DECIMAL(10,2))) as income,
        FLOOR((DAYOFMONTH(created_at) - 1) / 7) + 1 as week_num
      FROM ${this.#table} 
      WHERE collection_status = 'collected'
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY label, week_num
      ORDER BY week_num ASC;
    `,

    yearly: `
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month_key,
        DATE_FORMAT(created_at, '%b') as label, 
        SUM(CAST(paid_amount AS DECIMAL(10,2))) as income 
      FROM ${this.#table} 
      WHERE collection_status = 'collected'
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
      GROUP BY month_key, label
      ORDER BY month_key ASC;
    `
  };

  try {
    const [weekly, monthly, yearly] = await Promise.all([
      DB.sql(queries.weekly),
      DB.sql(queries.monthly),
      DB.sql(queries.yearly)
    ]);

    // Format numbers properly before returning
    const format = (data) => data.map(item => ({
      ...item,
      income: Number(parseFloat(item.income || 0).toFixed(2))
    }));

    return { 
      weekly: format(weekly), 
      monthly: format(monthly), 
      yearly: format(yearly) 
    };
  } catch (error) {
    console.error("Error fetching chart lines:", error);
    return { weekly: [], monthly: [], yearly: [] };
  }
}



  
}