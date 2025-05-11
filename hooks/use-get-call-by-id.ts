import { useStreamVideoClient, type Call } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id?: string | string[]) => {
  const [call, setCall] = useState<Call | undefined>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const streamClient = useStreamVideoClient();

  useEffect(() => {
    // Reset state when dependencies change
    setCall(undefined);
    setError(null);
    setIsCallLoading(true);
    
    // Don't proceed if no client or no ID
    if (!streamClient || !id) {
      setIsCallLoading(false);
      return;
    }

    const loadCall = async () => {
      try {
      const { calls } = await streamClient.queryCalls({
        filter_conditions: {
          id,
        },
      });

      if (calls.length > 0) setCall(calls[0]);
      } catch (err) {
        console.error("Error fetching call:", err);
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      } finally {
      setIsCallLoading(false);
      }
    };

    loadCall();
  }, [streamClient, id]);

  return { call, isCallLoading, error };
};
