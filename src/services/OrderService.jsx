/* 
*/
import DB from "@/lib/Database";
import { ProductService } from "./ProductService";
import addValueToObject, { formatDateToIST } from "@/utils/array";
import crypto from "crypto";
import { ORDER_STATUS, ORDER_STATUS_MESSAGE } from "@/data/constant";
import { OrderPaymentService } from "./OrderPaymentService";
export class OrderService {
  #table;
  user;
  #productService
  constructor() {
    this.#table = "orders";
    this.#productService = new ProductService();
  }

  /*
  cartItems : [{id:12, qty:3}] ;
  1. createOrder 2. crateOrderItems 3. PriceData 4. createOrderAddresess 
  5. createOrderStatus:Pending
  */
  async createCartOrder(orderAddress, cartItems) {
    const { order_id, order_number, order_token, orderItems, priceData } = await this.createOrder(cartItems);
    await this.createOrderItems(addValueToObject(orderItems, { order_id }));
    await this.createOrderAddress({ ...orderAddress, order_id });
    await this.updateOrderTracking(order_id, ORDER_STATUS.PENDING, ORDER_STATUS_MESSAGE.PENDING);
    return order_token;
  }

  async getTable({ page, limit, search }) {
    const pagination = await DB.table(this.#table)
      .select(['orders.*', "users.full_name", "users.phone_no", "users.email"])
      .leftJoin("users", "users.id", "=", this.#table + ".user_id")
      // .leftJoin("order_tracking", "order_tracking.order_id", "=", this.#table + ".id")
      .whereAnyLike(['orders.order_number', 'users.phone_no', 'users.full_name'], search)
      .orderBy("orders.id", "DESC")
      .paginate(page, limit);

    // 2. Use Promise.all to fetch all statuses in parallel
    // This is MUCH faster than your current await inside map
    pagination.data = await Promise.all(
      pagination.data.map(async (item) => {
        const statusData = await this.getLastOrderStatus(item.id);
        return {
          ...item,
          order_status: statusData?.status || 'N/A',
          order_status_message: statusData?.message || ''
        };
      })
    );

    return pagination;
  }

  async count() {
    return await DB.table(this.#table).count();
  }

  async updateOrderTracking(order_id, status, message) {
    if (!order_id) {
      throw new Error("Order id is required");
    }
    if (!status) {
      throw new Error("Order status is required");
    }
    if (!message) {
      throw new Error("Order status message is required");
    }
    const hasUpdatedStatus = await DB.table("order_tracking").where("status", "=", status).where("order_id", "=", order_id).exists();
    if (!hasUpdatedStatus) {
      const result = await DB.table("order_tracking").insert({ order_id, status, message, datetime: new Date() });
      if (!result) {
        throw new Error("Order status could not updated ");
      }
    }
    return true;
  }


  /* 
// Main Data, thats should include
{
  total_amount@order_amount,
  order_date:,
  order_status:Confirmed, // Latest OrderStatus()
  payment_method:COD // Last Payment Method
  order_items:array, 
  order_address:array,
  order_tracking:array,
  user:array // who created the order & send email to this user
}
  */
  async getOrderFull(value, key = "order_number") {
    const order = await this.getOrder(value, key);
    if (!order) {
      throw new Error("Order not found");
    }
    order.order_date = formatDateToIST(order.order_date);
    const orderItems = await DB.table("order_items").where("order_id", "=", order.id).get();
    const orderAddress = await DB.table("order_addresses").where("order_id", "=", order.id).first();
    const orderTracking = await DB.table("order_tracking").where("order_id", "=", order.id).orderBy("datetime", "ASC").get();
    const user = await DB.table("users").where("id", "=", order.user_id).first();
    const { status, message } = await this.getLastOrderStatus(order.id);
    order.order_status = status;
    order.order_status_message = message;
    const orderPaymentService = new OrderPaymentService();
    const payment = await orderPaymentService.getLastPaymentStatus(order.id);
    order.payment_method = payment ? payment.payment_method : null;
    order.payment_status = payment ? payment.payment_status : null;
    return {
      ...order,
      order_items: orderItems,
      order_address: orderAddress,
      order_tracking: orderTracking,
      user: user,
    };
  }

  getProductsPriceData(cartProducts, option = {}) {
    const priceData = {
      discount_amount: 0, // total_discount, no need discount percentage because every product has different percentaged
      product_amount: 0, // sub_total
      coupon_amount: 0, // Coupon_Table
      coupon_percentage: 0, // Coupon_Table
      shipping_amount: 0, // delivery charges inclusive gst
      total_amount: 0,  // after the discount & coupon
    };
    for (const cartProduct of cartProducts) {
      priceData.product_amount += cartProduct.product_amount;
      priceData.discount_amount += cartProduct.discount_amount;
    }
    priceData.shipping_amount = option?.shipping_amount || 0;
    priceData.coupon_amount = option?.coupon_amount || 0;
    priceData.coupon_percentage = option?.coupon_percentage || 0;
    priceData.total_amount = ((priceData.product_amount + priceData.shipping_amount) - priceData.coupon_amount);
    return priceData;
  }

  async updateOrder(data, key = "id") {
    return await DB.table(this.#table).where(key, "=", data[key]).update(data);
  }

  async getOrder(value, key = "id") {
    return await DB.table(this.#table).where(key, "=", value).first();
  }

  async getLastOrder() {
    if (!this.user) {
      throw new Error("user not found");
    }
    return await DB.table(this.#table).where("user_id", "=", this.user.id).orderBy("id", "desc").first();
  }

  async getLastOrderAddress() {
    const lastOrder = await this.getLastOrder();
    if (!lastOrder) {
      console.warn("last order id not found");
      return null;
    }
    let address = await DB.table("order_addresses").select("full_name, email, phone_no, address_line, city, state, pincode, country").where("order_id", "=", lastOrder.id).orderBy("id", "DESC").first();
    return address;
  }

  async delete(value, key = 'id') {
    const ref = DB.table(this.#table);
    if (Array.isArray(value)) {
      if (value.length > 0) {
        ref.whereIn(key, value);
      } else {
        throw new Error("Value is required");
      }
    } else {
      ref.where(key, "=", value);
    }
    return await ref.delete();
  }

  async createOrder(cartItems) {
    const orderItems = await this.#productService.getProductByCartItems(cartItems);
    const priceData = this.getProductsPriceData(orderItems);
    const order_token = await this.getOrderToken();

    const inserData = {
      order_number: "temp_" + Date.now(),
      user_id: this.user.id,
      order_token: order_token,
      product_amount: priceData.product_amount,
      shipping_amount: priceData.shipping_amount, // Mean Delivery Charges Amount
      coupon_amount: priceData.coupon_amount,
      coupon_percentage: priceData.coupon_percentage,
      discount_amount: priceData.discount_amount,
      total_amount: priceData.total_amount,
      order_date: new Date(),
    };

    // insert order
    const order_id = await DB.table(this.#table).insert(inserData);
    if (!order_id) {
      throw new Error("Order could not created");
    }

    // update order number
    const order_number = this.getOrderNumber(order_id);
    const affected = await this.updateOrder({ id: order_id, order_number });
    if (!affected) {
      throw new Error("Order number could not update");
    }

    return { order_id, order_number, order_token, orderItems, priceData };
  }

  async createOrderAddress(data) {
    const res = await DB.table("order_addresses").insert(data);
    if (!res) {
      throw new Error("Order Address could not created");
    }
    return res;
  }

  async createOrderItems(orderItems) {
    const res = await DB.table("order_items").insertBulk(orderItems);
    if (!res) {
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

    return `${prefix}-${first4Letters}${paddedOrderId}`;
  }



  async getOrderToken(retry = 0) {
    if (retry > 5) {
      throw new Error("Failed to generate order token");
    }
    const order_token = crypto.randomBytes(16).toString("hex");

    const hasRow = await DB
      .table(this.#table)
      .where("order_token", "=", order_token)
      .exists();

    if (hasRow) {
      return await this.getOrderToken(retry + 1);
    }
    return order_token;
  }

  async getLastOrderStatus(order_id) {
    if (!order_id) {
      throw new Error("Order id is required");
    }
    const orderStatus = await DB.table("order_tracking").where("order_id", "=", order_id).orderBy("datetime", "DESC").first();
    if (!orderStatus) {
      return { status: null, message: null };
    }
    return { status: orderStatus.status, message: orderStatus.message }
  }

  async getChartLines() {
    const queries = {
      // 1. WEEKLY: Returns "Mon", "Tue", etc.
      weekly: `
      SELECT 
        DATE_FORMAT(created_at, '%a') as label, 
        COUNT(id) as ${this.#table},
        DATE(created_at) as date_val
      FROM ${this.#table} 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY date_val, label 
      ORDER BY date_val ASC;
    `,

      // 2. MONTHLY: Returns "Week 1", "Week 2", etc.
      // Logic: Floor of (Day of Month - 1) / 7 + 1
      monthly: `
      SELECT 
        CONCAT('Week ', FLOOR((DAYOFMONTH(created_at) - 1) / 7) + 1) as label, 
        COUNT(id) as ${this.#table},
        FLOOR((DAYOFMONTH(created_at) - 1) / 7) + 1 as week_num
      FROM ${this.#table} 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY label, week_num
      ORDER BY week_num ASC;
    `,

      // 3. YEARLY: Returns "Jan", "Feb", etc.
      yearly: `
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month_key,
        DATE_FORMAT(created_at, '%b') as label, 
        COUNT(id) as ${this.#table} 
      FROM ${this.#table} 
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
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

      return { weekly, monthly, yearly };
    } catch (error) {
      console.error("Error fetching chart lines:", error);
      return { weekly: [], monthly: [], yearly: [] };
    }
  }

} 