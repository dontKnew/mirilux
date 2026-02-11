import ApiHandler from "@/lib/ApiHandler";
import { UserService } from "@/services/UserService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const userService = new UserService();
  try {
     let { id } = await api.request();
     const pageData = await userService.getUser(id, "id")

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
