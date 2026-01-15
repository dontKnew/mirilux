import AuthClientService from "@/services/AuthClientService";
import EncryptedClient from "./EncryptedClient";

class ApiRequest {
  /* ================= PRIVATE FIELDS ================= */
  #apiUrl;
  #encryptionMode;
  #client;
  #path;
  #payload;
  #options

  /* ================= CONSTRUCTOR ================= */
  constructor() {
    this.#apiUrl = process.env.NEXT_PUBLIC_API_URL;
    this.#encryptionMode = process.env.NEXT_PUBLIC_HAS_API_ENCRYPTED === "true";
    this.#client = new EncryptedClient();

    this.#path = null;
    this.#payload = {};
    this.#options = {};
  }

  /* ================= PUBLIC API ================= */
  async send(path, payload, options = {}) {
    this.#path = path;
    this.#payload = payload;
    this.#options = options;

    if(this.#path.includes("auth")) {
        const accessToken = AuthClientService.getAccessToken();
        if (accessToken) {
           options.access_token = accessToken;
        }
      }

    if (this.#encryptionMode) {
      return this.#encryptedSend();
    }

    return this.#plainSend();
  }

  /* ================= PRIVATE METHODS ================= */

  async #encryptedSend() {
    try {
      return await this.#client.send(
        this.#path,
        this.#payload,
        this.#options
      );
    } catch (e) {
      throw e;
    }
  }

  async #plainSend() {
    try {
      const options  = this.#options;
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.#payload),
      };
      if (options?.credentials === true) {
        request.credentials = "include";
      }
      if (options?.access_token) {
        request.headers.Authorization =
          `Bearer ${options.access_token}`;
      }
      const response = await fetch(this.#apiUrl + this.#path, request);
      if (!response.ok) {
        throw new Error(`HTTP_ERROR_${response.status}`);
      }
      const responseJson = await response.json();
      if (!responseJson.data) {
        throw new Error(responseJson.message || "Data not found");
      }
      return responseJson.data;
    } catch (err) {
      throw err;
    }
  }
}

export default ApiRequest;
