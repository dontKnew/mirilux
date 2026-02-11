import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const userService = new OrderService();
  try {
     let { page, limit, search } = await api.request();
     const pageData = await userService.getTable({page, limit, search});

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
