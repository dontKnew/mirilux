const WEBSITE = {
  EMAIL:"support@mirilux.com",
  PHONE:"+91 8069277273",
  PHONE_URL:"918069277273",
  ADDRESS:"C/O SMI Amina, Moh Gopalganj, Sahaswan, Budaun - 243638 Uttar Pradesh, India", 
  ADMIN_EMAIL:"sajid.phpmaster@gmail.com"
}
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

/*
1. Pending: 
2. confirmed:
  - order placed : confirmed
  - if payment_status!=paid then by_admin_verify==FALSE ? ==> CANCELLED
3. Shipped 
4. delivered: 
5. return requested : return will after delivered
6. return approved: 
7. returned : now payment will also refund
8. Cancelled : 
    - user can if status < 2 : cancelled
    - user can if status == 4 : return request
    - admin can not cancel if order delivered
    - admin can cancelled the order, if not delivered 
*/
export const ORDER_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  RETURN_REQUESTED: "Return Requested",
  RETURN_APPROVED: "Return Approved",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_MESSAGE = {
  PENDING: "Order placed and awaiting confirmation.",
  CONFIRMED: "Order confirmed and being prepared.",
  SHIPPED: "Shipped and on the way.",
  DELIVERED: "Delivered successfully.",
  RETURN_REQUESTED: "Return request received and under review.",
  RETURN_APPROVED: "Return request approved.",
  RETURNED: "Returned and refund initiated.",
  CANCELLED: "Order cancelled as requested.",
};

/* ============= ORDER PAYMENT CONSTANT for Status Update =============*/
/*
1. We use third party payment interigation & third party payment provider settled in our account later
2. tableColumn : order_id, transaction_id, payment_method, payment_status, paid_amount, currency, collected_by, gateway_response, created_at, updated_at
    - Collected By : Payment Gateway Provider [PhonePe, RazorePay, Cashify etc.] & if COD : collected by other courier partner name
3. COD Payment 
  i. Order Placed- New : {
        payment_method:COD
        payment_attempt_status : Success,  // cod intent accepted
        collection_status:Pending
        settlement_status:NULL,
        collected_by:NULL,
      }
  ii. if User pays ONLINE before delivery
    -- New:Paid {
        payment_method:UPI
        payment_attempt_status:Success, 
        collection_status:Collected
        settlement_status:Pending,
        collected_by:PhonePe
      } AND  UpdateCOD of (i) {
        collection_status:Cancelled
      }
    -- New:Failed {
        payment_method: UPI
        payment_attempt_status: Failed,
        collection_status: NULL
        collected_by: PhonePe
        settlement_status: NULL,
      }
  iii. at TimeOfDelivery on Physical Address
      => if user pay cash or Not Paying at our payment link :
        --UpdateCOD of (i) {
            collection_status:Collected,
            collected_by:Other // CourierDelivery, 
            settlement_status:Pending, 
          }       
      => if user pay online by our payment link
        - take step (ii)
4. Payment Gateway 
    -- New:Paid {
        payment_method:UPI
        payment_attempt_status:Success, 
        collection_status:Collected
        settlement_status:Pending,
        collected_by:PhonePe
      }
    -- New:Failed {
        payment_method: UPI
        payment_attempt_status: Failed,
        collection_status: NULL
        collected_by: PhonePe
        settlement_status: NULL,
      }

== FLOW == 
*/

export const PAYMENT_ATTEMPT_STATUS = { 
  SUCCESS:"Success", 
  FAILED:"Failed",
};

// does status PAYMENT_COLLECTED_BY 
export const COLLECTION_STATUS = {
  PENDING: "Pending", // for COD               
  COLLECTED: "Collected",
  CANCELLED: "Cancelled", // for COD
};

export const PAYMENT_COLLECTED_BY = {
  RAZOREPAY :"Razore Pay", 
  PHONEPE:'Phone Pe',
  OTHER:"Other"// ex. other company
}

// Payment Settled to Bank
export const SETTLEMENT_STATUS = {
  NOT_APPLICABLE: "Not Applicable",
  PENDING: "Pending",
  SETTLED: "Settled",
};

export const PAYMENT_METHOD = {
  COD:"COD",
  CARD:"Card", 
  NET_BANKING:'Net Banking' ,
  UPI:'UPI'
}

/* ============= END PAYMENT CONSTANT =============*/


export {WEBSITE, LOGIN_METHODS, OTP_NAME, OTP_PURPOSE, ORDER_STATUS, PAYMENT_ATTEMPT_STATUS, PAYMENT_COLLECTED_BY, SETTLEMENT_STATUS}