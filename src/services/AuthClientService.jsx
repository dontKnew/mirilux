/* 
- use for client ui update or access_token store in js memory...
- get user profile data,,, 
*/
"use client"
import ApiRequest from "@/lib/ApiRequest";
import { useGlobalState } from "@/lib/useGlobalState";

let accessToken = null;

class AuthClientService {

  static async setAccessToken(token, user=null) {
    accessToken = token;
    if(!user){
      user = await this.fetchUser();
    }
    useGlobalState.getState().setAuthUser(user); 
    if(useGlobalState.getState().isCartAddress()){
      if(user?.deliveryAddress){
          const deliveryAddress = user.deliveryAddress;
          useGlobalState.getState().setCartAddress(deliveryAddress); 
      }
    }
  }

  static async fetchUser(){
    const api = new ApiRequest();
    const user = await api.send("/auth/profile"); 
    return user.data;
  }

  static getAccessToken() {
    return accessToken;
  }

  static async init() {
    if (accessToken) return;

    try {
      const api = new ApiRequest();
      const dataAccessToken = await api.send("/auth/refresh-token");
      if (!dataAccessToken?.data) return; 
        accessToken = dataAccessToken.data;

      const user = await this.fetchUser();
      await this.setAccessToken(accessToken, user.data);
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
