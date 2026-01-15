import ApiHandler from "@/lib/ApiHandler";
import { PincodeService } from "@/services/PincodeService";

export async function POST(req) {
  const api = new ApiHandler(req);
  try {
    const { pincode } = await api.request();
    if(!pincode) {
       throw new Error("Invalid pincode id: " + pincode);
    }
    const pincode_data = await PincodeService.getLocationFromPincode(pincode);

    return api.response({
      success: true,
      data: {state:pincode_data.state, city:pincode_data.city, country:pincode_data.country},
    });
  } catch (err) {
    return api.responseFailPlain(err.message);
  }
}
