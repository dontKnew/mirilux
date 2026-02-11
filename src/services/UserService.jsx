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

} 