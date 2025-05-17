"use client";

import { type Call, type CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Video, Clock, X } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useGetCalls } from "@/hooks/use-get-calls";
import { Button } from "@/components/ui/button";

import { Loader } from "./loader";
import { MeetingCard } from "./meeting-card";

type CallListType = {
  type: "ended" | "upcoming" | "recordings";
  searchQuery?: string;
  sortOrder?: "asc" | "desc";
  appTheme?: string;
};

export const CallList = ({ type, searchQuery = "", sortOrder = "asc", appTheme = "apple-dark-inverted" }: CallListType) => {
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
        return "Nu există întâlniri anterioare.";

      case "recordings":
        return "Nu există înregistrări care să corespundă căutării.";

      case "upcoming":
        return "Nu există întâlniri viitoare.";

      default:
        return "Nu există întâlniri.";
    }
  };

  const getThemeColors = () => {
    // Matrix theme (green)
    if (appTheme === 'matrix-heart') {
      return {
        iconBgFrom: "from-[#00FF4C]/20",
        iconBgTo: "to-[#00B840]/20",
        iconBorder: "border-[#00FF4C]/30",
        iconColor: "text-[#00FF4C]",
        buttonBg: "bg-[#00FF4C]",
        buttonHover: "hover:bg-[#00E040]",
        shadowColor: "shadow-[#00FF4C]/10"
      };
    }
    // Crystal theme (purple)
    else if (appTheme === 'crystal-aurora') {
      return {
        iconBgFrom: "from-[#A571D0]/20",
        iconBgTo: "to-[#E17BAF]/20",
        iconBorder: "border-[#A571D0]/30",
        iconColor: "text-[#A571D0]",
        buttonBg: "bg-[#A571D0]",
        buttonHover: "hover:bg-[#9560C0]",
        shadowColor: "shadow-[#A571D0]/10"
      };
    }
    // Starfield theme (keep blue for this one)
    else if (appTheme === 'starfield') {
      return {
        iconBgFrom: "from-[#63A0FF]/20",
        iconBgTo: "to-[#3D6FFF]/20",
        iconBorder: "border-[#63A0FF]/30",
        iconColor: "text-[#63A0FF]",
        buttonBg: "bg-[#63A0FF]",
        buttonHover: "hover:bg-[#5490F0]",
        shadowColor: "shadow-[#63A0FF]/10"
      };
    }
    // Apple light theme (switch to orange/amber)
    else if (appTheme === 'apple-light') {
      return {
        iconBgFrom: "from-amber-500/20",
        iconBgTo: "to-amber-600/10",
        iconBorder: "border-amber-500/30",
        iconColor: "text-amber-500",
        buttonBg: "bg-amber-500",
        buttonHover: "hover:bg-amber-600",
        shadowColor: "shadow-amber-500/10"
      };
    }
    
    // Apple dark theme (switch to teal)
    return {
      iconBgFrom: "from-teal-500/20",
      iconBgTo: "to-teal-600/10", 
      iconBorder: "border-teal-500/30",
      iconColor: "text-teal-400",
      buttonBg: "bg-teal-500",
      buttonHover: "hover:bg-teal-600",
      shadowColor: "shadow-teal-500/10"
    };
  };

  const getNoCallsIcon = () => {
    switch (type) {
      case "ended":
        return <Clock className={`h-10 w-10 ${getThemeColors().iconColor}`} />;
      case "recordings":
        return <Video className={`h-10 w-10 ${getThemeColors().iconColor}`} />;
      case "upcoming":
        return <Clock className={`h-10 w-10 ${getThemeColors().iconColor}`} />;
      default:
        return <X className={`h-10 w-10 ${getThemeColors().iconColor}`} />;
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
    <div className="grid w-full gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            appTheme={appTheme}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
          <div className={`rounded-full bg-gradient-to-br ${getThemeColors().iconBgFrom} ${getThemeColors().iconBgTo} p-5 mb-4 border ${getThemeColors().iconBorder} shadow-lg ${getThemeColors().shadowColor}`}>
            {getNoCallsIcon()}
          </div>
          <h1 className="text-xl text-white mb-1">{noCallsMessage}</h1>
          {type === "recordings" && searchQuery && (
            <p className="text-gray-400">Încearcă să modifici termenii de căutare.</p>
          )}
          {!searchQuery && (
            <div className="mt-4">
              <Button 
                onClick={() => router.push('/')}
                className={`${getThemeColors().buttonBg} ${getThemeColors().buttonHover} text-white px-6`}
              >
                Creează Întâlnire Nouă
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
