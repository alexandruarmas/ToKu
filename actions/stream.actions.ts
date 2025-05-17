"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || '';
const apiSecret = process.env.STREAM_SECRET_KEY || '';

export const tokenProvider = async () => {
  try {
    if (!apiKey || !apiSecret) {
      console.error("Stream API credentials missing:", {
        apiKeyExists: !!apiKey,
        secretKeyExists: !!apiSecret
      });
      throw new Error("Stream API credentials missing.");
    }

    const user = await currentUser();
    
    if (!user || !user.id) {
      console.error("User not authenticated in tokenProvider");
      throw new Error("Authentication required.");
    }
    
    console.log(`Generating token for user: ${user.id}`);
    
    const streamClient = new StreamClient(String(apiKey), String(apiSecret));

    // token is valid for an hour
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(String(user.id), exp, issued);
    
    console.log(`Token generated successfully for user: ${user.id}`);
    return token;
  } catch (error) {
    console.error("Token provider error:", error);
    throw error; // Re-throw to propagate to the client
  }
};
