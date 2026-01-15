const LOGIN_METHODS = {
  EMAIL_OTP: "EMAIL_OTP",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
  PHONE_PASSWORD: "PHONE_PASSWORD",
};

const OTP_PURPOSE = {
  LOGIN: "login",
  FORGET_PASSWORD: "forget_password",
  RESET_PASSWORD: "reset_password",
};

const OTP_NAME = {
  EMAIL: "email",
  PHONE: "phone",
};

export {LOGIN_METHODS, OTP_NAME, OTP_PURPOSE}