//Error: GET failed: Bind parameters must not contain undefined. To pass SQL NULL specify JS null
// where not used...
import DB from "@/lib/Database";
export class UserService {
  #table;
  constructor(){
    this.#table = "users";
  }

  async getUser(value, key="id"){
    return await DB.table(this.#table).where(key, "=", value).first();
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

  async deleteUser(value, key){
    return await DB.table(this.#table).where(key, "=", value).delete();
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