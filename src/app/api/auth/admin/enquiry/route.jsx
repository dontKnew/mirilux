import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
import { EnquiryService } from "@/services/EnquiryService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const tableService = new EnquiryService();
  try {
     let { page, limit, search } = await api.request();
     const pageData = await tableService.getTable({page, limit, search});

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
