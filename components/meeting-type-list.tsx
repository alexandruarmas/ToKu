"use client";

import { useRouter } from "next/navigation";
import { HomeCard } from "./home-card";
import { useGridLayout } from "@/hooks/use-grid-layout";
import { useBackground } from "@/providers/background-provider";
import { cn } from "@/lib/utils";

export const MeetingTypeList = () => {
  const router = useRouter();
  const { getGridLayoutClasses } = useGridLayout();
  const { backgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";

  // Define card styles for different themes using consistent darker colors
  // that adapt appropriately to each theme context
  const getCardStyle = (index: number) => {
    if (isLightMode) {
      // Light mode uses amber colors to match sidebar
      return "bg-white hover:bg-amber-500/8 text-black border border-amber-500/20 hover:border-amber-500/30";
    }
    
    if (isDarkInverted) {
      // Dark inverted mode uses teal colors to match sidebar
      return "bg-[#0F111A] hover:bg-teal-500/8 text-white border border-teal-500/20 hover:border-teal-500/30";
    }
    
    if (isMatrixHeart) {
      // Matrix theme uses green colors to match sidebar
      return "bg-[#0F111A] hover:bg-[#00FF4C]/8 text-white border border-[#00FF4C]/20 hover:border-[#00FF4C]/30";
    }
    
    if (isCrystalAurora) {
      // Crystal Aurora theme uses purple colors to match sidebar
      return "bg-[#0F111A] hover:bg-[#A571D0]/8 text-white border border-[#A571D0]/20 hover:border-[#A571D0]/30";
    }
    
    // Check for starfield theme
    if (backgroundType === "starfield") {
      // Starfield theme uses blue colors to match sidebar
      return "bg-[#0F111A] hover:bg-[#63A0FF]/8 text-white border border-[#63A0FF]/20 hover:border-[#63A0FF]/30";
    }
    
    // Default dark theme uses teal colors to match sidebar
    return "bg-[#0F111A] hover:bg-teal-500/8 text-white border border-teal-500/20 hover:border-teal-500/30";
  };
  
  // Unified card data to improve maintenance and consistency
  const actionCards = [
    {
      title: "Întâlnire Nouă",
      description: "Creează o întâlnire instant",
      img: "/icons/video.svg",
      handleClick: () => router.push("/personal-room")
    },
    {
      title: "Programează",
      description: "Planifică o întâlnire viitoare",
      img: "/icons/schedule.svg",
      handleClick: () => router.push("/upcoming")
    },
    {
      title: "Viitoare",
      description: "Vezi întâlnirile programate",
      img: "/icons/upcoming.svg",
      handleClick: () => router.push("/upcoming")
    },
    {
      title: "Anterioare",
      description: "Istoricul întâlnirilor",
      img: "/icons/previous.svg",
      handleClick: () => router.push("/previous")
    },
    {
      title: "Înregistrări",
      description: "Vizualizează înregistrările",
      img: "/icons/recordings.svg",
      handleClick: () => router.push("/recordings")
    },
    {
      title: "Participă",
      description: "Intră cu un cod de acces",
      img: "/icons/join-meeting.svg",
      handleClick: () => router.push("/personal-room?join=true")
    }
  ];

  return (
    <div className={cn(
      "grid gap-4",
      getGridLayoutClasses()
    )}>
      {actionCards.map((card, index) => (
        <HomeCard
          key={card.title}
          title={card.title}
          description={card.description}
          img={card.img}
          className={getCardStyle(index)}
          handleClick={card.handleClick}
        />
      ))}
    </div>
  );
};
