"use client";

import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState, type PropsWithChildren } from "react";

import { tokenProvider } from "@/actions/stream.actions";
import { Loader } from "@/components/loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamClientProvider = ({ children }: PropsWithChildren) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

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

    const initClient = async () => {
      try {
        console.log("[STREAM PROVIDER] Creating client for user:", user.id);
        
        const client = new StreamVideoClient({
          apiKey: String(apiKey),
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });
        
        console.log("[STREAM PROVIDER] Client created, SDK will handle connection with token provider");
        
        // No need to call connectUser - the SDK handles this automatically when using tokenProvider
        setVideoClient(client);
      } catch (err) {
        console.error("[STREAM PROVIDER] Initialization error:", err);
        setError(`Connection failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    };

    initClient();

    return () => {
      if (videoClient) {
        console.log("[STREAM PROVIDER] Cleaning up connection");
        videoClient.disconnectUser().catch(console.error);
      }
    };
  }, [user, isLoaded]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <button 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
