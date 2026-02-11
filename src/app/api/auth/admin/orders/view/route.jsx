import ApiHandler from "@/lib/ApiHandler";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const userService = new OrderService();
  try {
     let { id } = await api.request();
     const pageData = await userService.getOrderFull(id, "id")

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
