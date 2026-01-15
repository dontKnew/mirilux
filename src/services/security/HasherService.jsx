import crypto from "crypto";

export default class HasherService {
  static hash(value) {
    return crypto
      .createHmac("sha256", process.env.APP_SECRET)
      .update(String(value))
      .digest("hex");
  }

  static compare(rawValue, hashedValue) {
    const hash = this.hash(rawValue);
    console.warn("rawValue hash", hash)

    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(hashedValue)
    );
  }
}
