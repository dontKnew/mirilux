import ApiHandler from "@/lib/ApiHandler";
import { EnquiryService } from "@/services/EnquiryService";
import { OrderService } from "@/services/OrderService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const tableService = new EnquiryService();
  try {
     let { id } = await api.request();
     const pageData = await tableService.get(id, "id")

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
