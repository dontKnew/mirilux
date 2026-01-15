import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const authService = new AuthService();
    const access_token = await authService.getRefreshAccessToken();
    return api.response({ success: true, data:access_token});
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
