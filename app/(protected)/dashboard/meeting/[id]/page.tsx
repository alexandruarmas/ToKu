"use client";

import { useParams } from "next/navigation";
import { MeetingRoom } from "@/components/meeting-room";

export default function MeetingPage() {
  const params = useParams();
  const meetingId = params.id as string;

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl font-semibold mb-4">Meeting: {meetingId}</h1>
      
      <div className="flex-1">
        <MeetingRoom />
      </div>
    </div>
  );
} 