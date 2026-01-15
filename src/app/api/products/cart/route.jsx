import { Products } from "@/data/product";
import ApiHandler from "@/lib/ApiHandler";
export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const {ids} = await api.request();
    const products = Products.filter((p) =>
      ids.includes(p.id)
    );
    let total_price = 0;
    for(const product of products){
        total_price+=product.price;
    }
    return api.response({ success: true, data: products, total_price });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
