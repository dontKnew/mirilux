/* 
- use for client ui update or access_token store in js memory...
- get user profile data,,, 
*/
"use client"
import ApiRequest from "@/lib/ApiRequest";
import { useGlobalState } from "@/lib/useGlobalState";

let accessToken = null;

class AuthClientService {

  static setAccessToken(token, user) {
    accessToken = token;
    useGlobalState.getState().setAuthUser(user); // set logged user...
    if(useGlobalState.getState().isCartAddress()){
        const deliveryAddress = user.deliveryAddress;
        useGlobalState.getState().setCartAddress(deliveryAddress);
    }
  }

  static getAccessToken() {
    return accessToken;
  }

  static async init() {
    if (accessToken) return;

    try {
      const api = new ApiRequest();
      const dataAccessToken = await api.send("/auth/refresh-token",{},{ credentials: true });
      if (!dataAccessToken?.data) return; 
        accessToken = dataAccessToken.data;

      // 2️⃣ fetch profile
      const user = await api.send( "/auth/profile");
      this.setAccessToken(accessToken, user.data);
      
    } catch (e) {
      // ❗ silent fail for guest users
      console.warn("Auth init failed:", e);
    }
  }

  static async logout() {
    try {
      const api = new ApiRequest();
      const data = await api.send("/auth/logout"); 
      accessToken = null;
      useGlobalState.getState().clearAuth();
      return data?.data;
    }catch(e){
      throw(e)
    }
  }
}

export default AuthClientService;
