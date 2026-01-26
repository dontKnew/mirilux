import DB from "@/lib/Database";
import { OrderService } from "./OrderService";

import { PAYMENT_METHOD, PAYMENT_STATUS, PAYMENT_COLLECTED_BY, ORDER_STATUS, ORDER_STATUS_MESSAGE, PAYMENT_ATTEMPT_STATUS, COLLECTION_STATUS } from "@/data/constant";


export class OrderPaymentService{
  #table;
  order;
  constructor(){
    this.#table = "order_payments";
  }
  
  async processPayment(data){
    if(data.payment_method==PAYMENT_METHOD.COD){
        return this.#createPaymentCOD(data);
    }else {
        throw new Error("payment method not found")
    }
  }

  
  async #createPaymentCOD(){
      const insertData = {
        payment_method:PAYMENT_METHOD.COD,
        payment_attempt_status:PAYMENT_ATTEMPT_STATUS.SUCCESS,
        collection_status:COLLECTION_STATUS.PENDING,
      };
      const uniqueWhereas = {order_id:this.order.id, payment_method:insertData.payment_method, payment_attempt_status:insertData.payment_attempt_status};
      const isExists = await DB.table(this.#table).whereEqual(uniqueWhereas).exists();
      if(isExists){
        throw new Error("Payment COD already created");
      }
      const result =  this.#createPayment(insertData);
      (new OrderService).updateOrderTracking(this.order.id, ORDER_STATUS.CONFIRMED, ORDER_STATUS_MESSAGE.CONFIRMED);
      return result;
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
    const result = await DB.table(this.#table).insert(insertData);
    if(!result){
      throw new Error("Payment could not created")
    }
    return result;
  }
  
}