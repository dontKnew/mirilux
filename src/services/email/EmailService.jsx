import nodemailer from "nodemailer";
import { otpTemplate } from "./templates/otpTemplate";
import { resetPasswordTemplate } from "./templates/resetPasswordTemplate";

class EmailService {
  static transporter = null;

  static getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
    return this.transporter;
  }

  static async send({ to, subject, html }) {
    try {
      const info = await this.getTransporter().sendMail({
        from: `"MiriLux" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      return info.accepted?.length > 0;
    } catch (error) {
      console.error("Email send failed:", error);
      throw(error)
    }
  }

  // OTP Email
  static async sendOTP(to, otp ) {
     if (!to) {
      throw new Error("Recipient email missing for OTP");
    }

    if (!otp) {
      throw new Error("OTP is required");
    }
    return await this.send({
      to,
      subject: "Your Verification Code",
      html: otpTemplate({ otp }),
    });
  }

  // Password Reset Email
  static async sendPasswordReset({ to, link }) {
    return await this.send({
      to,
      subject: "Reset Your Password",
      html: resetPasswordTemplate({ link }),
    });
  }
}

export default EmailService;
