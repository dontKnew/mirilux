import ApiHandler from "@/lib/ApiHandler";
export async function POST(req) {
  const api = new ApiHandler(req);
  return api.responsePublicKey();
}
