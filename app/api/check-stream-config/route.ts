import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if Stream API keys are set
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const apiSecret = process.env.STREAM_SECRET_KEY;

    // Don't expose actual values, just check if they exist
    const status = {
      apiKeyExists: !!apiKey,
      apiSecretExists: !!apiSecret,
      configComplete: !!(apiKey && apiSecret)
    };

    if (!status.configComplete) {
      return NextResponse.json({
        status: "error",
        message: "Stream configuration incomplete",
        details: status
      }, { status: 500 });
    }

    return NextResponse.json({
      status: "success",
      message: "Stream configuration is complete",
      details: status
    });
  } catch (error) {
    console.error("Configuration check error:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to check configuration"
    }, { status: 500 });
  }
} 