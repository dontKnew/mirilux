//Error: GET failed: Bind parameters must not contain undefined. To pass SQL NULL specify JS null
// where not used...
import DB from "@/lib/Database";
import { OrderService } from "./OrderService";
export class UserService {
  #table;
  constructor(){
    this.#table = "users";
  }

  async getUser(value, key="id"){
    let userData =  await DB.table(this.#table).where(key, "=", value).first();
    if(userData){
      userData.deliveryAddress = await this.#getDeliveryAddress(userData);
    }
    return userData;
  }

  async getTable({page, limit, search}){
    return await DB.table(this.#table).whereAnyLike(['id', 'phone_no', 'full_name', 'email'], search).orderBy("id", "DESC").paginate(page, limit)
  }
  
  async count(){
    return await DB.table(this.#table).count();
  }

  async #getDeliveryAddress(userData){    
    const orderService = new OrderService();
    orderService.user = userData;
    let address = await orderService.getLastOrderAddress();
    if(!address){
      address = await this.getUserAddress(userData);
      if(address){
        address.full_name = userData.full_name;
        address.phone_no = userData.phone_no;
        address.email = userData.email;
      }
    }
    return address;
  }

  async getUserAddress(userData){
    return await DB.table("user_addresses")
      .select("address_line, city, state, pincode, country")
      .where("user_id", "=", userData.id).orderBy("id", "DESC").first();
  }
  
  async registeruser(user) {
    const inserData = {
      full_name: user.full_name,
      email: user.email,
      phone_no: user.phone_no,
      account_status: user.account_status ?? "enabled",
      is_email_verified: user.is_email_verified ?? 0,
      is_phone_verified: user.is_phone_verified ?? 0
    }
    const insert_id = await DB.table(this.#table).insert(inserData);
    if(!insert_id){
      throw new Error("User could not register");
    }
    user.user_id = insert_id;
    const insert_address_id = this.#createAddress(user);
    if(!insert_address_id){
      await this.deleteUser(user_id);
      throw new Error("User address could not register");
    }
    return user.user_id;
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

  async #createAddress(user) {
    const inserData = {
      user_id: user.user_id,
      address_line: user.address_line,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      country: user.country,
      address_type: user.address_type ?? "home",
      is_default: user.is_default ?? 0
    }
    return await DB.table("user_addresses").insert(inserData);
  }

  async isEmailExists(email) {
    return await DB.table(this.#table).where("email", "=", email).exists();
  }

  async isPhoneExists(phone_no) {
    return await DB.table(this.#table).where("phone_no", "=", phone_no).exists();
  }
  
  async hasUniqueEmailPhone(email, phone_no) { 
    const [emailExists, phoneExists] = await Promise.all([
      this.isEmailExists(email),
      this.isPhoneExists(phone_no),
    ]);

    return !emailExists && !phoneExists;
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