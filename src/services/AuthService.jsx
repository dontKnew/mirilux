import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { UserService } from "./UserService";
import { OtpService } from "./OtpService";
import { LOGIN_METHODS } from "@/data/constant";

export class AuthService {
    #userService;

    constructor() {
        this.#userService = new UserService();
    }

    async getAuthUser(req) {
        const tokenData = this.getAccessTokenUser(req);
        if(tokenData?.user_id){
            const result = await this.#userService.getUser(tokenData.user_id);
            return result;
        }
        return null;
    }
    async loginByEmail(email, password) {
        const user = await this.#userService.getUser(email, "email");
        if (!user) {
            throw new Error("Invalid email address");
        }
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            throw new Error("Invalid password");
        }
        return  await this.#getLoginAccessToken(user.id);
    }

    async loginByPhone(phone_no, password) {
        const user = await this.#userService.getUser(phone_no, "phone_no");
        if (!user) {
            throw new Error("Invalid Phone Number");
        }
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            throw new Error("Invalid password");
        }
        return await this.#getLoginAccessToken(user.id);
    }

    async directLogin(user_id) {
        return await this.#getLoginAccessToken(user_id);
    }

    async #getLoginAccessToken(user_id) {
        const accessToken = this.#generateAccessToken(user_id);
        const refreshToken = this.#generateRefreshToken(user_id);

        await this.#saveRefreshTokenInCookies(refreshToken);

        return accessToken;
    }

    #generateAccessToken(user_id) {
        const data = {user_id:user_id};
        return jwt.sign(
            data,
            process.env.APP_SECRET,
            { expiresIn: "10m" }
        );
    }

    getAccessTokenUser(req) {
        try {
            const token = this.getToken(req);
            const verifyToken =  jwt.verify(token, process.env.APP_SECRET);
            return verifyToken;
        } catch (err) {
            return null;
        }
    }

    hasAccessTokenExpired(token) {
        try {
            const result = jwt.verify(token, process.env.APP_SECRET);
            if (!result) {
                return true;
            }
            return false;
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return true;
            }
            return false;
        }
    }


    #generateRefreshToken(user_id) {
        const data = {user_id:user_id};
        return jwt.sign(
            data,
            process.env.APP_SECRET,
            { expiresIn: "30d" }
        );
    }

    async #saveRefreshTokenInCookies(token) {
        await this.setCookies("rt", token, {maxAge: 60 * 60 * 24 * 30});
    }

    async getCookies(key){
        const cookieStore = await cookies(); 
        return cookieStore.get(key)?.value || null
    }
    async deleteCookies(key){
        const cookieStore = await cookies(); 
        return cookieStore.delete(key) || null
    }
    async setCookies(key, data, options){
        const cookieStore = await cookies(); 
        cookieStore.set(key, data, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.COOKIES_SAMESITE, 
            path: "/",
            maxAge: options.maxAge,
        });
    }

    async getRefreshTokenFromCookies() {
        const cookieStore = await cookies(); // ✅ await here
        return cookieStore.get("rt")?.value || null
    }

    async getRefreshAccessToken() {
        const refreshToken = await this.getRefreshTokenFromCookies();
        if (!refreshToken) {
            throw new Error("Refresh token missing");
        }

        let payload;
        try {
            payload = jwt.verify(
                refreshToken,
                process.env.APP_SECRET
            );
        } catch(e) {
            throw new Error("RefreshTokenError:" + e.message);
        }
        // console.warn("Refresh Token Payload User Id", payload.user_id);

        const newAccessToken = this.#generateAccessToken(payload.user_id);

        const newRefreshToken = this.#generateRefreshToken(payload.user_id);
        await this.#saveRefreshTokenInCookies(newRefreshToken);

        return newAccessToken;
    }


    async logout() {
        await this.deleteCookies("rt")
        return true;
        
    }

    hasAuth(req) {
        const token = this.getToken(req);
        return this.hasAccessTokenExpired(token);
    }

    getToken(req) {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return null;
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) return null;
        return token;
    }

    async registerAndLogin(user) {
        const data = {is_new_user:false};
        let has_email_registered = await this.#userService.isEmailExists(user.email);
        let has_phone_registered = await  this.#userService.isPhoneExists(user.phone_no);
        if(!has_email_registered && !has_phone_registered){
            const user_id = await this.#userService.registeruser(user);
            user.user_id = user_id;
            data.is_new_user = true;
            data.access_token = await this.directLogin(user_id);
        }else {
            let can_login_by_email = false;
            let can_login_by_phone_no = false;
            if(has_email_registered){
                can_login_by_email = true;
            }
            if(has_phone_registered){
                can_login_by_phone_no = true;
            }
            data.can_login_by_phone_no = can_login_by_phone_no;
            data.can_login_by_email = can_login_by_email;
        }
        
        return data;
    }

    async loginByMethods(method, email, phone, password, otp, emailOtpToken){
        try {

            let result = null; // result will be accessToken
            switch(method){
                case LOGIN_METHODS.EMAIL_OTP:   
                    const otpService = new OtpService();
                    result = await otpService.verifyOtp(emailOtpToken, otp, email)
                    const user_data = this.#userService.getUser(email, "email");
                    if(!user_data){
                        throw new Error("Email address is invalid");
                    }
                    result = await this.directLogin(user_data.user_id);
                break;
                case LOGIN_METHODS.EMAIL_PASSWORD:
                    result = await this.loginByEmail(email, password);
                break;

                case LOGIN_METHODS.PHONE_PASSWORD:
                    result = await this.loginByPhone(phone, password);
                break;
                default:
                throw new Error("No Login Method Found");
            }
            return result;
        }catch(e){
            throw(e)
        }
    }
    
}
