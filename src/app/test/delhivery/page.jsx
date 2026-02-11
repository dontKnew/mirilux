import { DelhiveryB2C } from "@/lib/DelhiveryB2C";
import { printJson } from "@/utils/array";

export default async function(){
    const delhi = new DelhiveryB2C(process.env.DELHIVERY_API_TOKEN, "dev")
    try {
        // "error": "Unable to process request, Please contact: lastmile-integration@delhivery.com"
        //consigneeAddressType : home|office
        const payload = {
            order_id: "1279812",
            name: "Sajid Ali",
            phone: "917065221377",
            add:"House No. 702, Gali No. 11, Kapashera, New Delhi",
            pin: "110037",
            payment_mode: "COD",
            cod_amount: 2000,
            pickup_location: "SALMAN"
        };

        const result = await delhi.shipmentCreate(payload);

        return printJson(result);
    }catch(e){
        return printJson(e);
    }
}
