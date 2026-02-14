import { ORDER_STATUS, PAYMENT_METHOD } from "@/data/constant";
import ApiHandler from "@/lib/ApiHandler";
import { OrderPaymentService } from "@/services/OrderPaymentService";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const orderService = new OrderService();
  const orderPaymentService = new OrderPaymentService();
  try {
    const {order_token, payment_method} = await api.request();
    orderPaymentService.order = await orderService.getOrder(order_token, 'order_token');
    if(!orderPaymentService.order){
      throw new Error("order not found");
    }
    // const {status, message} = await orderService.getLastOrderStatus(orderPaymentService.order.id);
    const data = await orderPaymentService.processPayment({payment_method});
    return api.response({ success: true, data:data});
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}