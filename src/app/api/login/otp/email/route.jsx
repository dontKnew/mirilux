import ApiHandler from "@/lib/ApiHandler";
import EmailService from "@/services/email/EmailService";
import { OtpService } from "@/services/OtpService";
import { UserService } from "@/services/UserService";

export async function POST(req) {
  const api = new ApiHandler(req);
  const userService = new UserService();
  const otpService = new OtpService();
  try {
    const { email, emailOtpToken } = await api.request();
    if (!userService.isEmailExists(email)) {
      throw new Error("Invalid email address");
    }
    const otpData = await otpService.generateOtp(email, emailOtpToken);
    const isEmailSend = await EmailService.sendOTP(otpData.email, otpData.otp);
    if (!isEmailSend) {
      throw new Error("Email not sent. Please try again")
    }
    return api.response({ success: true, data: otpData.token });
  } catch (err) {
    // console.error(err)
    return api.responseFailPlain(err.message);
  }
}
