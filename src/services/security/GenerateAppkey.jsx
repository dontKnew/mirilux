import crypto from "crypto";

class GenerateAppkey{
    static get(){
        return crypto.randomBytes(64).toString("hex");
    }
}
export {GenerateAppkey}
