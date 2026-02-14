import EncryptedServer from "@/lib/EncryptedServer";
import { AuthService } from "@/services/AuthService";
import { NextResponse } from "next/server";

class ApiHandler {

  constructor(req=null) {
    this.req = req;
    this.server = new EncryptedServer();
    this.data = null;
    this.EncryptionMode = process.env.HAS_API_ENCRYPTED === "true";
    const { pathname } = new URL(req.url);
    this.is_auth_path = false;
    if(pathname.includes("auth")){
      if(!pathname.includes("refresh-token")){
        this.is_auth_path = true;
      }
    }
  }

  async #validateAuthPath(){
      if(this.is_auth_path){
        const authService = new AuthService(this.req);
        // const hasAuth = authService.hasAuth(this.req);
        const authUser = await authService.getAuthUser(this.req);
        console.warn("user", authUser);
        
        if(!hasAuth){
          // throw new Error("Login is required");
        }
        // const tokenPayload = authService.getToken(this.req);
        // if(tokenPayload?.user_role!="admin"){
        //     throw new Error("Authorization failed");
        // }
      }
  }

  async request(){

    // validation auth path
    if(this.is_auth_path){
        const authService = new AuthService(this.req);
        const hasAuth = authService.hasAuth(this.req);
        // console.warn(hasAuth, "has Auth");
        // const authUser = await authService.getAuthUser(this.req);
        // console.warn("user", authUser);

        if(!hasAuth){
          // throw new Error("Login is required");
        }
        // const tokenPayload = authService.getToken(this.req);
        // if(tokenPayload?.user_role!="admin"){
        //     throw new Error("Authorization failed");
        // }
      }

    // end validation end path
    // console.warn(this.is_auth_path, "is auth path");

    
    if(this.EncryptionMode){
        return await this.decryptRequest();
      }
    return await this.req.json();
  }

  async decryptRequest() {
    const payload = await this.req.json();
    if (!payload?.token) {
       throw new Error("Encrypted token missing");
    }
    this.data = this.server.decryptResponse(payload);
    return this.data;
  }

  /* ================= RESPONSE ================= */
  // Encrypted Success
  response(payload, message=null){
    if(this.EncryptionMode){
      this.data = this.server.responseSuccess(payload, message);
      return this._nextResponse();
    }else {
      return this.responsePlain(payload, message);
    }
  }

  // Encrypted Success Plain
  responsePlain(payload, message = null) {
    this.data = this.server.responseSuccessPlain(payload, message);
    return this._nextResponse();
  }
  
  // Encrypted Failed Plain
  responseFailPlain(message = null) {
    this.data = this.server.responseFailed(message);
    return this._nextResponse();
  }

  responsePublicKey(){
    this.data = this.server.responsePublicKey();
    return this._nextResponse()
  }

  _nextResponse(){ // private
    return new NextResponse(
      this.data,
      { headers: { "Content-Type": "application/json" } }
    );
  }
}

export default ApiHandler;
