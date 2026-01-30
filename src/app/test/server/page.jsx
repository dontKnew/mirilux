import DB from "@/lib/Database";
import { AuthService } from "@/services/AuthService";
import EmailService from "@/services/email/EmailService";
import { orderDetailsTemplate } from "@/services/email/templates/orderDetailsTemplate";
import { OrderService } from "@/services/OrderService";
import { OtpService } from "@/services/OtpService";
import { PincodeService } from "@/services/PincodeService";
import EncryptorService from "@/services/security/EncryptorService";
import HasherService from "@/services/security/HasherService";
import { UserService } from "@/services/UserService";
import { printJson } from "@/utils/array";

export default async function Page() {


    // Render HTML
    // const orderSevice = new OrderService();
    // const order = await orderSevice.getOrderFull('OD-SAJI-103');
    // const orderHtml = orderDetailsTemplate({ order });
    // return <div className="max-w-3xl mx-auto bg-white shadow rounded" dangerouslySetInnerHTML={{ __html: orderHtml }} />



    // const userService = new UserService();
    // const orderService = new OrderService();
    // const cartAddress = {
    //     full_name:"Krishan",
    //     phone_no:"1271982712",
    //     email:"krishan@gmail.com",
    //     address_line:"House No. 702, Gali No. 11",
    //     state:"Delhi", city:"Dwarka", pincode:11002, country:"India"
    // }
    // orderService.user = await userService.getUser(49, "id");
    // const response = await orderService.createCartOrder(cartAddress, [{id:1, qty:2}, { id:2, qty:3}]);
    // return JSON.stringify({response});

    // const input = 4544;
    // const input_hash = HasherService.hash(input);
    // const input_hash2 = HasherService.hash("4544");
    // const input_compare = HasherService.compare("4544", input_hash)

    // return JSON.stringify({input, input_hash, input_compare, input_hash2});


    // const input = "Hello World";
    // const input_encrypt = EncryptorService.encrypt(input)
    // const input_decrypted = EncryptorService.decrypt(input_encrypt)

    // return JSON.stringify({input, input_encrypt, input_decrypted});


    // const otpService = new OtpService();
    // const generatedOtp = await otpService.generateOtp("sajid.phpmaster@gmail.com");
    // return JSON.stringify(generatedOtp);
    // const generatedOtp =  {"token":"568a54a7c5b154ca1165f240.129e44a1da4f6a343c444926f12b36eb.421200","otp":"683329","email":"sajid.phpmaster@gmail.com"};
    // const verifyOtp = await otpService.verifyOtp(generatedOtp.token, generatedOtp.otp, generatedOtp.email)
    // return JSON.stringify({verifyOtp});



    
    try {
        const orderSevice = new OrderService();
        const order = await orderSevice.getOrderFull('OD-SAJI-103');
        const result = await EmailService.sendOrderDetails(order);
        return printJson(result);
    }catch(e){
        console.warn(e);
        return printJson(e);
    }


    // const pincodeService = await PincodeService.getLocationFromPincode(110037);
    // return JSON.stringify(pincodeService);
    // const authService  = new UserService();
    // return authService.isEmailExists("sajid.phpmaster@gmail.com");
    // return JSON.stringify(DB.table("users").whereEqual("email", "sajid.phmaster").exists());
}
