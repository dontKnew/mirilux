import DB from "@/lib/Database";
export class EnquiryService {
  #table;
  constructor(){
    this.#table = "enquiries";
  }

  async get(value, key="id"){
    let userData =  await DB.table(this.#table).where(key, "=", value).first();
    return userData;
  }

  async getTable({page, limit, search}){
    return await DB.table(this.#table).whereAnyLike(['id', 'phone_no', 'full_name', 'email', 'message'], search).orderBy("id", "DESC").paginate(page, limit)
  }
  
  async count(){
    return await DB.table(this.#table).count();
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

  async create(data) {
    const inserData = {
      full_name: data.full_name,
      phone_no: data.phone_no,
      email: data.email,
      message: data.message,
    }
    return await DB.table(this.#table).insert(inserData);
  }

} 