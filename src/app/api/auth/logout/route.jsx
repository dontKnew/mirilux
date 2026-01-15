import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const authService = new AuthService();
    const response = await authService.logout();
    return api.response({ success: response, data:"User Logout Successfully"});
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
