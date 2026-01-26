import ApiHandler from "@/lib/ApiHandler";
import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
export async function POST(req) {
  const api = new ApiHandler(req);
  const auth = new AuthService();
  try {
    // RegisterAndLogin
    const {user} = await api.request();
    const data = await auth.registerAndLogin(user);
    return api.response({ success: true, data});
  } catch (err) {
    // console.error(err)
    return api.responseFailPlain(err.message);
  }
}
