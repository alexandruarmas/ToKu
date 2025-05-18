"use client";

import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState, type PropsWithChildren } from "react";

import { tokenProvider } from "@/actions/stream.actions";
import { Loader } from "@/components/loader";

// Directly use string to avoid potential type issues
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

export const StreamClientProvider = ({ children }: PropsWithChildren) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    console.log("[STREAM PROVIDER] Initialization started");
    console.log("[STREAM PROVIDER] API Key exists:", !!apiKey);
    console.log("[STREAM PROVIDER] Auth state:", { isLoaded, userExists: !!user });
    
    if (!isLoaded) {
      console.log("[STREAM PROVIDER] Auth not loaded yet, waiting...");
      return;
    }
    
    if (!user) {
      console.error("[STREAM PROVIDER] User not authenticated");
      setError("User not authenticated. Please log in.");
      return;
    }
    
    console.log("[STREAM PROVIDER] User authenticated:", { 
      userId: user.id,
      username: user.username || user.id
    });
    
    if (!apiKey) {
      console.error("[STREAM PROVIDER] API key missing");
      setError("Configuration error: Stream API key missing.");
      return;
    }

    // Clear any previous errors
    setError(null);

    const initClient = async () => {
      try {
        console.log("[STREAM PROVIDER] Creating client for user:", user.id);
        
        // Create the StreamVideoClient with proper options
        const client = new StreamVideoClient({
          apiKey: String(apiKey),
          user: {
            id: String(user?.id),
            name: String(user?.username || user?.id),
            image: user?.imageUrl,
          },
          tokenProvider,
        });

        try {
          // We won't call connectUser since the tokenProvider handles that
          console.log("[STREAM PROVIDER] Waiting for connection");
          
          // Wait a bit to ensure connection starts properly
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Reset retry count on successful initialization
          setRetryCount(0);
          setVideoClient(client);
        } catch (connError) {
          console.error("[STREAM PROVIDER] Connection error:", connError);
          
          // Check if we should retry
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
            throw connError; // Re-throw to trigger retry
          } else {
            setError(`Connection failed: Could not establish WebSocket connection. Please check your network and try again.`);
          }
        }
      } catch (err) {
        console.error("[STREAM PROVIDER] Initialization error:", err);
        
        if (retryCount < maxRetries) {
          console.log(`[STREAM PROVIDER] Retrying (${retryCount + 1}/${maxRetries})...`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1500); // Wait 1.5 seconds before retrying
        } else {
          setError(`Connection failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
      }
    };
    
    // Only try initialization if we're within retry limits
    if (retryCount <= maxRetries) {
      initClient();
    }

    return () => {
      if (videoClient) {
        console.log("[STREAM PROVIDER] Cleaning up connection");
        try {
          videoClient.disconnectUser().catch(console.error);
        } catch (err) {
          console.error("[STREAM PROVIDER] Error during cleanup:", err);
        }
      }
    };
  }, [user, isLoaded, retryCount]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <button 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={() => {
            setError(null);
            setRetryCount(0);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!videoClient) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader />
        {retryCount > 0 && (
          <p className="text-sm text-gray-400 mt-4">
            Attempting to connect... ({retryCount}/{maxRetries})
          </p>
        )}
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
