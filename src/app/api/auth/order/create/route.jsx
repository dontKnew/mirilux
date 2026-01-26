import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
import { OrderService } from "@/services/OrderService";
import { ProductService } from "@/services/ProductService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const orderService = new OrderService();
  const authService = new AuthService();
  try {
    const {cartAddress, cartItems} = await api.request();
    orderService.user = await authService.getAuthUser(req);
    const data = await orderService.createCartOrder(cartAddress, cartItems); // it will return order_token
    return api.response({ success: true, data});
  } catch (err) {
    return api.responseFailPlain(err.message);
    // throw(err)
  }
}
