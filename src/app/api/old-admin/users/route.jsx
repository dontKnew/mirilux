import ApiHandler from "@/lib/ApiHandler";
import { UserService } from "@/services/UserService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const userService = new UserService();
  try {
     let { page, limit, search } = await api.request();
     const pageData = await userService.getTable({page, limit, search});

    return api.response({
      success: true,
      data: pageData,
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
