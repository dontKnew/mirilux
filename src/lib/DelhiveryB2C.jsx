/**
 * Delhivery B2C API Client
 * Node.js 18+ (native fetch)
 */
export class DelhiveryB2C {
  #token;
  #environment;
  #baseURL;

  static ENV = {
    dev: "https://staging-express.delhivery.com",
    prod: "https://track.delhivery.com",
  };

  constructor(token, environment = "prod" ) {
    if (!token) throw new Error("Delhivery API token is required");
    if (!DelhiveryB2C.ENV[environment]) {
      throw new Error(`Invalid environment: ${environment}`);
    }

    this.#token = token;
    this.#environment = environment;
    this.#baseURL = DelhiveryB2C.ENV[environment];
  }

  // ==================================================
  // 🔒 PRIVATE METHOD : must be return the json
  // ==================================================
  async #request(path, { method = "GET", body, headers = {} } = {}) {
    const res = await fetch(`${this.#baseURL}${path}`, {
      method,
      headers: {
        Authorization: `Token ${this.#token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? body : undefined,
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return data;
  }


static TRANSPORT_SPEED = {
  NEXT_DAY:"F", 
  NORMAL:"D"
}
  // https://one.delhivery.com/developer-portal/document/b2c/detail/order-creation

/* 
const shipment = {
      order_id: "1279812",
      name: "Sajid Ali",
      phone: "917065221377",
      add:"House No. 702, Gali No. 11, Kapashera, New Delhi",
      pin: "110037",
      payment_mode: "COD",
      cod_amount: 2000,
      pickup_location: "Miriluxe"
  };
*/
async shipmentCreate(shipment) {
  if (!shipment?.order_id) {
    throw new Error("order_id is required");
  }
  const pickup_location = shipment.pickup_location;
  delete shipment.pickup_location;
  const data = {
    pickup_location: {
      name: pickup_location
    },
    shipments: [shipment],
  };
  console.warn(data);
  const body = new URLSearchParams({
    format: "json",
    data: JSON.stringify(data)
  }).toString();

  return this.#request("/api/cmu/create.json", {
    method: "POST",
    headers: {Accept: 'application/json'},
    body,
  });
}


  
async pincodeServiceability(pincode) {
  if (!pincode) {
    throw new Error("Pincode is required");
  }
  const response = await this.#request(
    `/c/api/pin-codes/json/?filter_codes=${pincode}`
  );
  const postal = response?.delivery_codes?.[0]?.postal_code;
  if (!postal) {
    return {
      pincode,
      serviceable: false,
      online: false,
      cash: false,
      pickup: false,
      replacement: false,
      response:response
    };
  }
  return {
    pincode: postal.pincode ?? pincode,
    serviceable: true,
    online: postal.pre_paid === "Y",
    cash: postal.cash === "Y",
    pickup: postal.pickup === "Y",
    replacement: postal.repl === "Y",
    response:response || null
  };
}


  static BILLING_MODE_OF_SHIPMENT = {
    EXPRESS:"E", // express
    SURFACE:"S" // surface
  }
  static STATUS_OF_SHIPMENT = {
    DELIVERED:"Delivered",
    RTO:"RTO",
    DTO:"DTO",
  }
  static PAYMENT_TYPE = {
    PREPAID:"Pre-paid",
    COD:"COD",
  }
  async shippingCost({
    weight, 
    destinationPincode, 
    originPincode="243638", 
    mod=DelhiveryB2C.BILLING_MODE_OF_SHIPMENT.SURFACE, 
    ss=DelhiveryB2C.STATUS_OF_SHIPMENT.DELIVERED,
    payment_type=DelhiveryB2C.PAYMENT_TYPE.PREPAID
  }) 
  {
    const params = new URLSearchParams({
      cgm: weight, 
      md: mod , 
      o_pin: originPincode,
      d_pin: destinationPincode,
      ss: ss,
      pt:payment_type 
    });
    const response =  await this.#request(
      `/api/kinko/v1/invoice/charges/.json?${params}`
    );
    if(response?.error){
      throw(response);
    }
    return response;
  }


  
  static SHIPPING_MODE = {
    NORMAL: "S",
    FAST:"E",
    NEXTDAY:"N"
  };
  static SHIPPING_MODE_FULL = {
    NORMAL: "Surface",
    FAST:"Express",
    NEXTDAY:"Next Day Delivery"
  };

  async estimatedDeliveryDays(
    destinationPincode,
    deliveryMode=DelhiveryB2C.SHIPPING_MODE.NORMAL,
    originPincode="243638",
  ) {
    const params = new URLSearchParams({
      origin_pin: originPincode,
      destination_pin: destinationPincode,
      mot:deliveryMode, // Mode of Transport: 'S' for Surface, 'E' for Express, 'N' for NDD (Next Day Delivery).
      pdt:"B2C" // B2C or B2B
    });

    const response = await this.#request(`/api/dc/expected_tat?${params}`);
    const result = {success:false};
    if(response?.success){
      result.success = true;
      result.delivery_days = response.data.tat,
      result.delivery_days_text = result.delivery_days + " Days",
      result.message = "Delivery Date fetched";
      result.response = response;
    }else {
      result.message = response?.msg ?? "Something is wrong";
      result.response = response ?? null;
    }
    return result;
  }

  shipmentTracking(waybill) {
    return this.#request(
      `/api/v1/packages/json/?waybill=${waybill}`
    );
  }
}
