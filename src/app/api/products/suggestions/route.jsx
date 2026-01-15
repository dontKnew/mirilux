import { Products } from "@/data/product";
import ApiHandler from "@/lib/ApiHandler";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const { ids } = await api.request();
    if (!Array.isArray(ids)) {
      throw new Error("Invalid product ids");
    }
    const products = Products.filter((p) =>
      !ids.includes(p.id)
    );

    return api.response({
      success: true,
      data: products,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
