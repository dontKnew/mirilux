/* 
GET Order
*/
import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
import { OrderPaymentService } from "@/services/OrderPaymentService";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const orderService = new OrderService();
  const orderPaymentStatus = new OrderPaymentService();
  const authService = new AuthService();
  try {
    const {order_token} = await api.request();
    orderService.user = await authService.getAuthUser();
    const data = await orderService.getOrder(order_token, "order_token"); // it will return order_token
    const priceData = {
      price:Number(data.product_amount),
      old_price : Number(data.product_amount)+Number(data.discount_amount),
      discount : Number(data.discount_amount),
      subtotal : Number(data.product_amount),
      coupon : Number(data.coupon_amount),
      shipping: Number(data.shipping_amount),
      total_amount : Number(data.total_amount)
    };
    data.priceData = priceData;
    data.has_paid = await orderPaymentStatus.hasOrderPaid(data.id);
    return api.response({ success: true, data});
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
