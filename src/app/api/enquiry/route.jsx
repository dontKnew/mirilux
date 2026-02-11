import ApiHandler from "@/lib/ApiHandler";
import { EnquiryService } from "@/services/EnquiryService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const enquiryService = new EnquiryService();
  try {
    const form_data = await api.request();
    const data = await enquiryService.create(form_data);
    return api.response({ success: true, data });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
