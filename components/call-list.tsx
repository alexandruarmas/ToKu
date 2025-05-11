"use client";

import { type Call, type CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useGetCalls } from "@/hooks/use-get-calls";

import { Loader } from "./loader";
import { MeetingCard } from "./meeting-card";

type CallListType = {
  type: "ended" | "upcoming" | "recordings";
  searchQuery?: string;
  sortOrder?: "asc" | "desc";
};

export const CallList = ({ type, searchQuery = "", sortOrder = "asc" }: CallListType) => {
  const router = useRouter();
  const { toast } = useToast();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls || [];

      case "recordings": {
        let recordingsList = recordings || [];
        // Apply search filter for recordings
        if (searchQuery) {
          recordingsList = recordingsList.filter(recording => 
            recording.filename.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        // Apply sort for recordings
        return [...recordingsList].sort((a, b) => {
          const dateA = new Date(a.start_time).getTime();
          const dateB = new Date(b.start_time).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      case "upcoming":
        return upcomingCalls || [];

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previoud calls.";

      case "recordings":
        return "No recordings.";

      case "upcoming":
        return "No upcoming calls.";

      default:
        return "No calls.";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!callRecordings) return;

      try {
        const callData = await Promise.all(
          callRecordings.map((call) => call.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later." });
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings, toast]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording, i) => (
          <MeetingCard
            key={(call as Call).id || i}
            title={
              (call as Call).state?.custom?.description?.substring(0, 26) ||
              (call as CallRecording)?.filename?.substring(0, 20) ||
              "Personal meeting"
            }
            date={
              (call as Call).state?.startsAt?.toLocaleString() ||
              (call as CallRecording).start_time.toString()
            }
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(call as CallRecording).url}`)
                : () => router.push(`/meeting/${(call as Call).id}`)
            }
            link={
              type === "recordings"
                ? (call as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (call as Call).id
                  }`
            }
          />
        ))
      ) : (
        <h1 className="text-xl">{noCallsMessage}</h1>
      )}
    </div>
  );
};
