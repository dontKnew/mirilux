import { GenerateAppkey } from "@/services/security/GenerateAppkey";
import { NextResponse } from "next/server";

export async function GET() {
  const secret = GenerateAppkey.get();
  
  return NextResponse.json({
    success: true,
    app_secret: secret,
    length: secret.length
  });
}
