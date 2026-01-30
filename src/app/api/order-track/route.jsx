import ApiHandler from "@/lib/ApiHandler";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const { trackingNumber } = await api.request();
    if(!trackingNumber) {
       throw new Error("Invalid tracking number: " + trackingNumber);
    }
    const orderService = new OrderService();
    const orderData = await orderService.getOrderFull(trackingNumber);
    return api.response({
      success: true,
      data: orderData.order_tracking,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
