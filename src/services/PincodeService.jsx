import { states } from "@/data/states";

export class PincodeService {

  static async getLocationFromPincode(pincode) {
    if (!/^\d{6}$/.test(pincode)) {
      throw new Error("Invalid pincode");
    }
    try {
      return await this.#getFromApi(pincode);
    } catch (err) {
      console.warn("API failed, using local fallback:", err.message);
      return this.#getFromLocal(pincode);
    }
  }

  // 🔹 INDIA POST API
  static async #getFromApi(pincode) {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("India Post API error");
    }

    const data = await res.json();

    if (!Array.isArray(data) || data[0]?.Status !== "Success") {
      throw new Error("Pincode not found in API");
    }

    const po = data[0].PostOffice?.[0];
    if (!po) {
      throw new Error("Invalid API response");
    }

    return {
      city: po.District,
      state: po.State,
      country: po.Country || "India"
    };
  }

  // 🔹 LOCAL FALLBACK (READS FROM states DATA)
  static #getFromLocal(pincode) {
    const prefix = parseInt(pincode.slice(0, 2), 10);

    for (const s of states) {
      if (!s.pincode_range) continue;

      const parts = s.pincode_range.split("-").map(Number);

      const start = parts[0];
      const end = parts[1] ?? parts[0]; // single value case

      if (prefix >= start && prefix <= end) {
        return {
          city: "",          // city not reliable in fallback
          state: s.name,
          country: s.country || "India"
        };
      }
    }
    throw new Error("Pincode not supported");
  }
}
