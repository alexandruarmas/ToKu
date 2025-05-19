import { StreamClient } from "@stream-io/node-sdk";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get API credentials
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || '';
    const apiSecret = process.env.STREAM_SECRET_KEY || '';
    
    console.log("[STREAM-TEST] Testing Stream credentials");
    console.log("[STREAM-TEST] API Key exists:", !!apiKey);
    console.log("[STREAM-TEST] API Secret exists:", !!apiSecret);
    
    if (!apiKey || !apiSecret) {
      return NextResponse.json({
        status: "error",
        message: "Stream API credentials missing",
        details: {
          apiKeyExists: !!apiKey,
          secretKeyExists: !!apiSecret
        }
      }, { status: 400 });
    }
    
    // Try to create a Stream client
    try {
      console.log("[STREAM-TEST] Creating Stream client");
      const streamClient = new StreamClient(String(apiKey), String(apiSecret));
      
      // Generate a test token
      console.log("[STREAM-TEST] Generating test token");
      const testToken = streamClient.createToken("test-user", Math.floor(Date.now() / 1000) + 3600);
      
      return NextResponse.json({
        status: "success",
        message: "Stream credentials are valid",
        tokenPreview: testToken.substring(0, 10) + "..." // Don't expose the full token
      });
    } catch (clientError) {
      console.error("[STREAM-TEST] Stream client error:", clientError);
      return NextResponse.json({
        status: "error",
        message: "Failed to initialize Stream client",
        error: clientError instanceof Error ? clientError.message : "Unknown error"
      }, { status: 500 });
    }
  } catch (error) {
    console.error("[STREAM-TEST] Unexpected error:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to test Stream credentials",
    }, { status: 500 });
  }
} 