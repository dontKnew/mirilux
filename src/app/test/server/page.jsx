import DB from "@/lib/Database";
import { AuthService } from "@/services/AuthService";
import EmailService from "@/services/email/EmailService";
import { OtpService } from "@/services/OtpService";
import { PincodeService } from "@/services/PincodeService";
import EncryptorService from "@/services/security/EncryptorService";
import HasherService from "@/services/security/HasherService";
import { UserService } from "@/services/UserService";

export default async function Page() {


    const input = 4544;
    const input_hash = HasherService.hash(input);
    const input_hash2 = HasherService.hash("4544");
    const input_compare = HasherService.compare("4544", input_hash)

    return JSON.stringify({input, input_hash, input_compare, input_hash2});


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



    
    // try {
    //     const result = await EmailService.sendOTP("sajid.rapidexworldwide@gmail.com", 333123);
    //     return JSON.stringify(result, null, 2);
    // }catch(e){
    //     const result = e;
    //     return JSON.stringify(result);
    // }


    // const pincodeService = await PincodeService.getLocationFromPincode(110037);
    // return JSON.stringify(pincodeService);
    // const authService  = new UserService();
    // return authService.isEmailExists("sajid.phpmaster@gmail.com");
    // return JSON.stringify(DB.table("users").whereEqual("email", "sajid.phmaster").exists());
}
