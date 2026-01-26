import { LOGIN_METHODS } from "@/data/constant";
import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
export async function POST(req) {
  const api = new ApiHandler(req);
  const auth = new AuthService();
  try {
    const {method, email, phone, password, otp, emailOtpToken} = await api.request();
    const data = await auth.loginByMethods(method, email, phone, password, otp, emailOtpToken);
    return api.response({ success: true, data});
  } catch (err) {
    // console.error(err)
    return api.responseFailPlain(err.message);
  }
}
