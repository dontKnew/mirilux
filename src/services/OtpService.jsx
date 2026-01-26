import DB from "@/lib/Database";
import { OTP_NAME, OTP_PURPOSE } from "@/data/constant";
import EncryptorService from "./security/EncryptorService";
import HasherService from "./security/HasherService";
import { cache } from "react";

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

  #getOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ===============================
  // GENERATE OTP
  // ===============================

  async generateOtp(email, emailOtpToken=null) {
    if(emailOtpToken){
      try {
        // console.warn("re used the token ")
          const hasOtpData = await this.#getOtpData(emailOtpToken);
          if(hasOtpData){
            if(!hasOtpData.is_used){
              if(!new Date(hasOtpData.expires_at) < new Date()) {
                const server_otp = EncryptorService.decrypt(hasOtpData.otp_hash);
                 if(hasOtpData.attempts >= hasOtpData.max_attempts) {
                      console.warn("re-used otp has many attempts");
                  }else {
                    return {token:emailOtpToken, email:hasOtpData.value, otp:server_otp}
                  }
              }else {
                // console.warn("otp is expired");
              }
            }else {
              // console.warn("otp already used");
            }
          }else {
            // console.warn("otp data not found", hasOtpData);
          }
      }catch(e){
        // Ignore Error
        
      }
    }
    const otp = this.#getOtp();

    const expiresAt = new Date(Date.now() + this.ttlMinutes * 60 * 1000).toISOString();

    const otpId = await this.db.insert({
      purpose: this.purpose,
      name: OTP_NAME.EMAIL,
      value: email,
      otp_hash: EncryptorService.encrypt(otp),
      attempts: 0,
      max_attempts: this.maxAttempts,
      expires_at: expiresAt
    });

    const token = EncryptorService.encrypt(String(otpId));

    return { token, otp, email }
  }

  async #getOtpData(token){
      const otpId = Number(EncryptorService.decrypt(token));
      if (!otpId) {
        throw new Error("Invalid Code token");
      }
      const record = await this.db.where("id", "=", otpId).first();
      return record;
  }


  // ===============================
  // VERIFY OTP
  // ===============================

  async verifyOtp(token, otp, email) {
    if(!otp){
      throw new Error("code is required" );
    }
    try {
      const record = await this.#getOtpData(token);
      if (!record) throw new Error("Invalid token id ");
      if (record.is_used) { throw new Error("Token already used") }
      const otpId = record.id;
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
      const server_otp = EncryptorService.decrypt(record.otp_hash);
      if (otp!=server_otp) {
        await this.db.where("id", "=", otpId).update({ attempts: record.attempts + 1 });
        throw new Error("Invalid Code Entered");
        // throw new Error(JSON.stringify(record) + " newOtphash "+ new_otp_hahed)
      }

      // Increment attempts
      await this.db.where("id", "=", otpId).update({
        attempts: record.attempts + 1,
        is_used: true
      });

      return true;
    } catch (e) {
      throw (e)
    }
  }
}
