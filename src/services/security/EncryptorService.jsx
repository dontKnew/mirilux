import crypto from "crypto";

export default class EncryptorService {
  static getKey() {
    return Buffer.from(process.env.APP_SECRET, "hex").subarray(0, 32);
  }

  static encrypt(text) {
    const key = this.getKey();
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const tag = cipher.getAuthTag().toString("hex");

    return `${iv.toString("hex")}.${tag}.${encrypted}`;
  }

  static decrypt(token) {
    const [ivHex, tagHex, encrypted] = token.split(".");
    const key = this.getKey();

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(ivHex, "hex")
    );

    decipher.setAuthTag(Buffer.from(tagHex, "hex"));

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}
