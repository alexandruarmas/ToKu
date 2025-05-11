"use client";

import { MeetingTypeList } from "@/components/meeting-type-list";
import { useGetCalls } from "@/hooks/use-get-calls";
import { useEffect, useState } from "react";
import { Frijole } from "next/font/google";

const frijole = Frijole({ subsets: ["latin"], weight: "400", variable: "--font-frijole" });

const HomePage = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.toLocaleTimeString("en-US", { hour: "2-digit", hour12: false });
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const isColonVisible = now.getSeconds() % 2 === 0;
  const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const dayOfWeek = now.toLocaleDateString("en-GB", { weekday: "long" });

  const { upcomingCalls } = useGetCalls();
  const hasUpcomingCalls = upcomingCalls && upcomingCalls.length > 0;
  const nextCall = hasUpcomingCalls ? upcomingCalls[upcomingCalls.length - 1] : null;

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-thin text-white px-4 pt-[150px] pb-6 sm:pt-6">
      <div className="h-[260px] w-full rounded-[20px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl shine-effect flex items-center justify-center relative mb-8">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-3 text-base lg:text-lg opacity-80 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            {hasUpcomingCalls ? (
              <>Upcoming at: {nextCall?.state?.startsAt?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</>
            ) : (
              "No upcoming meetings"
            )}
          </div>
          <div className={`flex items-center text-4xl font-bold tracking-tight lg:text-6xl ${frijole.className}`}>
            {hours}
            <span className="blinking-colon" style={{ opacity: isColonVisible ? 1 : 0 }}>: </span>
            {minutes}
          </div>
          <div className={`flex flex-col items-center text-blue-100 mt-2 ${frijole.className}`}>
            <p className="text-lg lg:text-xl">{date}</p>
            <p className="text-base lg:text-lg mt-0.5 opacity-90">{dayOfWeek}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
      <MeetingTypeList />
    </div>
  );
};

export default HomePage;
