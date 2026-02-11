import ApiHandler from "@/lib/ApiHandler";
import { EnquiryService } from "@/services/EnquiryService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const service = new EnquiryService();
  try {
     let { ids } = await api.request();
     const pageData = await service.delete(ids);
    return api.response({
      success: pageData,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
