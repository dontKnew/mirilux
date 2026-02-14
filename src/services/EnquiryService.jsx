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