import ApiHandler from "@/lib/ApiHandler";
import { OrderService } from "@/services/OrderService";
import { UserService } from "@/services/UserService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const payload = api.request();
    const orderService = new OrderService();
    const userService = new UserService();
    const total_orders = await orderService.count();
    const total_users = await userService.count();
    const pageData = {total_orders, total_users};
    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
