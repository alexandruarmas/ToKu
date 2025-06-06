"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || '';
const apiSecret = process.env.STREAM_SECRET_KEY || '';

export const tokenProvider = async () => {
  try {
    console.log("[TOKEN PROVIDER] Starting token generation");
    
    if (!apiKey || !apiSecret) {
      console.error("[TOKEN PROVIDER] API credentials missing:", {
        apiKeyExists: !!apiKey,
        secretKeyExists: !!apiSecret
      });
      throw new Error("Stream API credentials missing.");
    }

    console.log("[TOKEN PROVIDER] Fetching current user from Clerk");
    const user = await currentUser();
    
    if (!user || !user.id) {
      console.error("[TOKEN PROVIDER] User not authenticated");
      throw new Error("Authentication required. Please sign in again.");
    }
    
    console.log(`[TOKEN PROVIDER] Got user: ${user.id}`);
    
    try {
      console.log("[TOKEN PROVIDER] Initializing Stream client");
      // Create a new StreamClient instance for each token request to ensure freshness
      const streamClient = new StreamClient(String(apiKey), String(apiSecret));
  
      // Token valid for 24 hours (safer default)
      const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      const issued = Math.floor(Date.now() / 1000) - 60;
  
      console.log("[TOKEN PROVIDER] Generating token");
      const token = streamClient.createToken(String(user.id), exp, issued);
      
      if (!token) {
        throw new Error("Failed to generate token");
      }
      
      console.log(`[TOKEN PROVIDER] Token generated successfully for ${user.id} (valid for 24h)`);
      return token;
    } catch (streamError) {
      console.error("[TOKEN PROVIDER] Stream client error:", streamError);
      throw new Error(`Failed to generate Stream token: ${streamError instanceof Error ? streamError.message : "Unknown error"}`);
    }
  } catch (error) {
    console.error("[TOKEN PROVIDER] Error:", error);
    // Make sure to throw a concise error message that can be displayed to users
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to authenticate with Stream. Please try again.");
    }
  }
};
