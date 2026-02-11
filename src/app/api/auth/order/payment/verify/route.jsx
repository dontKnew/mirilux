import ApiHandler from "@/lib/ApiHandler";
import { OrderPaymentService } from "@/services/OrderPaymentService";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const orderService = new OrderService();
  const orderPaymentService = new OrderPaymentService();
  try {
    const {order_token, collected_by, gateway_response} = await api.request();
    orderPaymentService.order = await orderService.getOrder(order_token, 'order_token');
    if(!orderPaymentService.order){
      throw new Error("order not found");
    }
    const data = await orderPaymentService.verifyPayment({collected_by, gateway_response});
    return api.response({ success: true, data:data});
  } catch (err) {
    console.warn("orderPayment:", err);  
    return api.responseFailPlain(err.message);
  }
}