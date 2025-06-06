"use client";

import { MeetingTypeList } from "@/components/meeting-type-list";
import { useGetCalls } from "@/hooks/use-get-calls";
import { useEffect, useState } from "react";
import { Frijole, Rock_Salt, Black_Ops_One, Leckerli_One } from "next/font/google";
import { useBackground } from "@/providers/background-provider";
import { useRouter } from "next/navigation";

const frijole = Frijole({ subsets: ["latin"], weight: "400", variable: "--font-frijole" });
const rockSalt = Rock_Salt({ subsets: ["latin"], weight: "400", variable: "--font-rock-salt" });
const blackOpsOne = Black_Ops_One({ subsets: ["latin"], weight: "400", variable: "--font-black-ops-one" });
const leckerliOne = Leckerli_One({ subsets: ["latin"], weight: "400", variable: "--font-leckerli-one" });

const HomePage = () => {
  const router = useRouter();
  const { backgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";
  const isStarfield = backgroundType === "starfield";
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.toLocaleTimeString("en-US", { hour: "2-digit", hour12: false });
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const isColonVisible = now.getSeconds() % 2 === 0;
  const date = now.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  const dayOfWeek = now.toLocaleDateString("ro-RO", { weekday: "long" }).toUpperCase();

  const { upcomingCalls } = useGetCalls();
  const hasUpcomingCalls = upcomingCalls && upcomingCalls.length > 0;
  const nextCall = hasUpcomingCalls ? upcomingCalls[upcomingCalls.length - 1] : null;

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-thin text-white px-4 
      pt-[250px] 
      sm:pt-[370px] 
      md:pt-[120px] 
      lg:pt-[120px] 
      xl:pt-12 
      2xl:pt-12 
      pb-12">
      <div className="h-[260px] w-full rounded-[20px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl shine-effect flex items-center justify-center relative mb-8">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-3 text-base md:text-lg lg:text-lg opacity-80 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            {hasUpcomingCalls ? (
              <>Următoare la: {nextCall?.state?.startsAt?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</>
            ) : (
              <span className={leckerliOne.className}>Nu există întâlniri viitoare</span>
            )}
          </div>
          <div className={`flex items-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${frijole.className}`}>
            {hours}
            <span className="blinking-colon" style={{ opacity: isColonVisible ? 1 : 0 }}>: </span>
            {minutes}
          </div>
          <div className={`flex flex-col items-center text-blue-100 mt-2`}>
            <p className={`text-lg md:text-lg lg:text-xl ${frijole.className}`}>{date}</p>
            <p className={`text-base md:text-base lg:text-lg mt-[25px] opacity-90 ${rockSalt.className}`}>{dayOfWeek}</p>
          </div>
        </div>
      </div>
      <h2 className={`text-[39px] font-semibold mb-6 text-center ${blackOpsOne.className} ${
        isLightMode ? "text-black" : 
        isDarkInverted ? "text-teal-500" :
        isMatrixHeart ? "text-[#00FF4C]" :
        isCrystalAurora ? "text-[#A571D0]" :
        isStarfield ? "text-[#63A0FF]" : 
        "text-teal-500"
      }`}>
        Acțiuni Rapide
      </h2>
      <MeetingTypeList />
    </div>
  );
};

export default HomePage;
