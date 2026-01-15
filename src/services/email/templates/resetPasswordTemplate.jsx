import { baseTemplate } from "./baseTemplate";

export function resetPasswordTemplate({ link }) {
  return baseTemplate({
    title: "Reset Your Password",
    content: `
      <p>You requested to reset your password.</p>

      <a href="${link}" style="
        display:inline-block;
        margin:20px 0;
        padding:12px 20px;
        background:#0a356a;
        color:#ffffff;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
      ">
        Reset Password
      </a>

      <p>If you didn’t request this, you can safely ignore this email.</p>
    `,
  });
}
