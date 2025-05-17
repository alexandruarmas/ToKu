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
    if (!isLoaded) return;
    
    if (!user) {
      console.error("Stream provider: User not authenticated");
      setError("User not authenticated. Please log in.");
      return;
    }
    
    if (!apiKey) {
      console.error("Stream provider: API key missing");
      setError("Configuration error: Stream API key missing.");
      return;
    }

    const initClient = async () => {
      try {
        console.log("Initializing Stream client for user:", user.id);
        
        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });

        // No need to call connectUser again as it's handled by the SDK when providing tokenProvider
        // Just test that we have a valid client
        console.log("Stream client initialized successfully");
        
        setVideoClient(client);
      } catch (err) {
        console.error("Error initializing Stream client:", err);
        setError(`Failed to connect: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    };

    initClient();

    return () => {
      // Clean up on unmount
      if (videoClient) {
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
