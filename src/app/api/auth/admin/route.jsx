import { COLLECTION_STATUS } from "@/data/constant";
import ApiHandler from "@/lib/ApiHandler";
import { EnquiryService } from "@/services/EnquiryService";
import { OrderPaymentService } from "@/services/OrderPaymentService";
import { OrderService } from "@/services/OrderService";
import { UserService } from "@/services/UserService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const orderService = new OrderService();
  const userService = new UserService();
  const enquiryService = new EnquiryService();
  const orderPaymentService = new OrderPaymentService();
  try {
    const payload = api.request();
    const total_orders = await orderService.count();
    const total_users = await userService.count();
    const total_enquiries = await enquiryService.count();
    const total_income = await orderPaymentService.totalPaymentCollected();
    const orders_chart = await orderService.getChartLines();
    const users_chart = await userService.getChartLines();
    const income_chart = await orderPaymentService.getChartLines();
    const enquiries_chart = await enquiryService.getChartLines();
    const pageData = {total_orders, total_users, total_enquiries, total_income, orders_chart, users_chart, income_chart, enquiries_chart};
    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
