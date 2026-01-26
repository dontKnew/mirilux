/* 
*/
import DB from "@/lib/Database";
import { ProductService } from "./ProductService";
import addValueToObject from "@/utils/array";
import crypto from "crypto";
import { ORDER_STATUS, ORDER_STATUS_MESSAGE } from "@/data/constant";
export class OrderService {
  #table;
  user;
  #productService
  constructor(){
    this.#table = "orders";
    this.#productService = new ProductService();
  }

  /*
  cartItems : [{id:12, qty:3}] ;
  1. createOrder 2. crateOrderItems 3. PriceData 4. createOrderAddresess 
  5. createOrderStatus:Pending
  */
  async createCartOrder(orderAddress, cartItems){
    const {order_id, order_number, order_token, orderItems, priceData} = await this.createOrder(cartItems);
    await this.createOrderItems(addValueToObject(orderItems, {order_id}));
    await this.createOrderAddress({...orderAddress, order_id});    
    await this.updateOrderTracking(order_id, ORDER_STATUS.PENDING, ORDER_STATUS_MESSAGE.PENDING);
    return order_token;
  }

  async updateOrderTracking(order_id, status, message){
    if(!order_id){
      throw new Error("Order id is required");
    }
    if(!status){
      throw new Error("Order status is required");
    }
    if(!message){
      throw new Error("Order status message is required");
    }
    const hasUpdatedStatus =  await DB.table("order_tracking").where("status", "=", status).where("order_id", "=", order_id).exists();
    if(!hasUpdatedStatus){
      const result =  await DB.table("order_tracking").insert({order_id, status, message, datetime:new Date()});
      if(!result){
        throw new Error("Order status could not updated ");
      }
    }
    return true;
  }

  getProductsPriceData(cartProducts, option={}){
      const priceData = {
            discount_amount: 0, // total_discount, no need discount percentage because every product has different percentaged
            product_amount: 0, // sub_total
            coupon_amount: 0, // Coupon_Table
            coupon_percentage: 0, // Coupon_Table
            shipping_amount: 0, // delivery charges inclusive gst
            total_amount: 0,  // after the discount & coupon
        };
        for(const cartProduct of cartProducts){
            priceData.product_amount+=cartProduct.product_amount; 
            priceData.discount_amount+=cartProduct.discount_amount; 
        }
        priceData.shipping_amount = option?.shipping_amount || 0;
        priceData.coupon_amount = option?.coupon_amount || 0;
        priceData.coupon_percentage = option?.coupon_percentage || 0;
        priceData.total_amount = ((priceData.product_amount+priceData.shipping_amount) - priceData.coupon_amount);
        return priceData;
  }

  async updateOrder(data, key="id"){
      return await DB.table(this.#table).where(key, "=", data[key]).update(data);    
  }

  async getOrder(value, key="id"){
    return await DB.table(this.#table).where(key, "=", value).first();
  }

  async getLastOrder(){
    if(!this.user){
      throw new Error("user not found");
    }
    return await DB.table(this.#table).where("user_id", "=", this.user.id).orderBy("id", "desc").first();
  }

  async getLastOrderAddress(){
    const lastOrder = await this.getLastOrder();
    if(!lastOrder){
      console.warn("last order id not found");
      return null;
    }
    console.warn(lastOrder, "last orderid");
    let address = await DB.table("order_addresses").select("full_name, email, phone_no, address_line, city, state, pincode, country").where("order_id", "=", lastOrder.id).orderBy("id", "DESC").first();
    return address ;
  }
  
  async deleteUser(value, key){
    return await DB.table(this.#table).where(key, "=", value).delete();
  }

  async createOrder(cartItems) {
    const orderItems = await this.#productService.getProductByCartItems(cartItems);
    const priceData = this.getProductsPriceData(orderItems);
    const order_token = await this.getOrderToken();
    
    const inserData = {
      order_number:"temp_"+Date.now(),
      user_id:this.user.id,
      order_token:order_token,
      product_amount: priceData.product_amount,
      shipping_amount:priceData.shipping_amount, // Mean Delivery Charges Amount
      coupon_amount:priceData.coupon_amount,
      coupon_percentage:priceData.coupon_percentage,
      discount_amount:priceData.discount_amount,
      total_amount:priceData.total_amount,
      order_date:new Date(),
    };

    // insert order
    const order_id =  await DB.table(this.#table).insert(inserData);
    if(!order_id){
        throw new Error("Order could not created");
    }
    
    // update order number
    const order_number = this.getOrderNumber(order_id);
    const affected = await this.updateOrder({id:order_id, order_number});
    if(!affected){
        throw new Error("Order number could not update");
    }

    return {order_id, order_number, order_token, orderItems, priceData};
  }
  
  async createOrderAddress(data) {
    const res =  await DB.table("order_addresses").insert(data);
    if(!res){
      throw new Error("Order Address could not created");
    }
    return res;
  }

  async createOrderItems(orderItems) {
    const res =  await DB.table("order_items").insertBulk(orderItems);
    if(!res){
      throw new Error("Order items could not created")
    }
    return res;
  }

  
/* 
 */
getOrderNumber(order_id) {
  const prefix = "OD";

  const first4Letters = this.user.full_name
    .trim()
    .split(" ")[0]
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 4)
    .toUpperCase()
    .padEnd(4, "X");

  // Ensure at least 2 digits (01, 02, 10, 123...)
  const paddedOrderId = String(order_id).padStart(2, "0");

  return `${prefix}-${first4Letters}-${paddedOrderId}`;
}


  
  async getOrderToken(retry = 0) {
    if (retry > 5) {
      throw new Error("Failed to generate order token");
    }
    const order_token = crypto.randomBytes(16).toString("hex");

    const hasRow = await DB
      .table(this.#table)
      .where("order_token","=", order_token)
      .exists();

    if (hasRow) {
      return await this.getOrderToken(retry + 1);
    }
    return order_token;
  }

  async getLastOrderStatus(order_id){
    if(!order_id){
      throw new Error("Order id is required");
    }
      const orderStatus = await DB.table("order_tracking").where("order_id","=", order_id).orderBy("datetime", "DESC").first();
      if(!orderStatus){
        return {status:null, message:null};
      }
      return {status:orderStatus.status, message:orderStatus.message}
  }

} 