import DB from "@/lib/Database";
import { OTP_NAME, OTP_PURPOSE } from "@/data/constant";
import EncryptorService from "./security/EncryptorService";
import HasherService from "./security/HasherService";

export class OtpService {
  constructor({
    ttlMinutes = 15,
    maxAttempts = 5,
    purpose = OTP_PURPOSE.LOGIN
  } = {}) {
    this.db = DB.table("otp_services");
    this.ttlMinutes = Number(ttlMinutes) || 15;
    this.maxAttempts = Number(maxAttempts) || 5;
    this.purpose = purpose;
  }

  // ===============================
  // PRIVATE HELPERS
  // ===============================

  #generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ===============================
  // GENERATE OTP
  // ===============================

  async generateOtp(email) {
    const otp = this.#generateOtp();

    const expiresAt = new Date(Date.now() + this.ttlMinutes * 60 * 1000).toISOString();

    const otpId = await this.db.insert({
      purpose: this.purpose,
      name: OTP_NAME.EMAIL,
      value: email,
      otp_hash: HasherService.hash(otp),
      attempts: 0,
      max_attempts: this.maxAttempts,
      expires_at: expiresAt
    });

    const token = EncryptorService.encrypt(String(otpId));

    return { token, otp, email }
  }


  // ===============================
  // VERIFY OTP
  // ===============================

  async verifyOtp(token, otp, email) {
    if(!otp){
      throw new Error("code is required" );
    }
    try {
      let otpId;
      otpId = Number(EncryptorService.decrypt(token));
      if (!otpId) {
        throw new Error("Invalid Code token");
      }

      // otp
      const record = await this.db.where("id", "=", otpId).first();
      if (!record) throw new Error("Invalid token id ");
      if (record.is_used) { throw new Error("Token already used") }

      if (record.value != email) throw new Error("Invalid email provided")

      // Expiry check
      if (new Date(record.expires_at) < new Date()) {
        await this.db.where("id", "=", otpId).update({ attempts: record.attempts + 1 });
        throw new Error("Code is expired");
      }

      // Attempt limit check
      if (record.attempts >= record.max_attempts) {
        await this.db.where("id", "=", otpId).update({ attempts: record.attempts + 1 });
        throw new Error("Too many attempts, code is expired");
      }

      // OTP verification
      const new_otp_hahed = HasherService.hash(otp);
      const isValid = HasherService.compare(otp, record.otp_hash);
      if (!isValid) {
        await this.db.where("id", "=", otpId).update({ attempts: record.attempts + 1 });
        throw new Error("Invalid Code Entered");
        // throw new Error(JSON.stringify(record) + " newOtphash "+ new_otp_hahed)
      }

      // Increment attempts
      await this.db.where("id", "=", otpId).update({
        attempts: record.attempts + 1,
        is_used: isValid
      });

      return isValid;
    } catch (e) {
      throw (e)
    }
  }
}
