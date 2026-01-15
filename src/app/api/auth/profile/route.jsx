import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const authService = new AuthService();
    const data = await authService.getAuthUser(req);
    return api.response({ success: true, data});
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
