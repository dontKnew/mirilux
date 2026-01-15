import { baseTemplate } from "./baseTemplate";

export function otpTemplate({ otp }) {
  return baseTemplate({
    title: "Email Verification",
    content: `
      <p>We’ve sent you a one-time verification code:</p>

      <div style="
        margin:30px 0;
        text-align:center;
        font-size:32px;
        letter-spacing:6px;
        font-weight:bold;
        color:#0a356a;
      ">
        ${otp}
      </div>

      <p>This code is valid for <strong>5 minutes</strong>.</p>
      <p>If you didn’t request this, please ignore this email.</p>
    `,
  });
}
