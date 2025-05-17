"use client";

import Image from "next/image";
import { useBackground } from "@/providers/background-provider";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
  className?: string;
}

export const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  const { backgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";

  // Use consistent transition effect for all themes
  const baseTransition = "transition-all duration-300";
  
  // Base card styles across all themes
  const baseCardStyles = cn(
    "flex h-[160px] sm:h-[180px] cursor-pointer flex-col justify-between",
    "rounded-[16px] sm:rounded-[20px] p-4 sm:p-5",
    baseTransition,
    "hover:scale-[1.02]",
    "elevation-small hover:elevation-medium"
  );
  
  // Theme-agnostic image styles
  const imageStyles = cn(
    "rounded-full p-1.5",
    baseTransition
  );
  
  // Theme-agnostic text styles with guaranteed contrast
  const titleStyles = cn(
    "text-lg sm:text-xl font-bold",
  );
  
  const descriptionStyles = cn(
    "text-xs sm:text-sm",
  );

  // Determine the styles based on the background type
  const getThemeStyles = () => {
    if (isLightMode) {
      return {
        card: "bg-white border-amber-500/20 hover:border-amber-500/30",
        image: "bg-amber-500/10",
        title: "text-black",
        description: "text-black/70"
      };
    }
    
    if (isDarkInverted) {
      return {
        card: "bg-[#0F111A] border-teal-500/20 hover:border-teal-500/30",
        image: "bg-teal-500/10",
        title: "text-teal-500",
        description: "text-white/70"
      };
    }
    
    if (isMatrixHeart) {
      return {
        card: "bg-[#0F111A] border-[#00FF4C]/20 hover:border-[#00FF4C]/30",
        image: "bg-[#00FF4C]/10",
        title: "text-[#00FF4C]",
        description: "text-white/70"
      };
    }
    
    if (isCrystalAurora) {
      return {
        card: "bg-[#0F111A] border-[#A571D0]/20 hover:border-[#A571D0]/30",
        image: "bg-[#A571D0]/10",
        title: "text-[#A571D0]",
        description: "text-white/70"
      };
    }
    
    // Check for starfield theme
    if (backgroundType === "starfield") {
      return {
        card: "bg-[#0F111A] border-[#63A0FF]/20 hover:border-[#63A0FF]/30",
        image: "bg-[#63A0FF]/10",
        title: "text-[#63A0FF]",
        description: "text-white/70"
      };
    }
    
    // Default theme (applies to other themes)
    return {
      card: "bg-[#0F111A] border-teal-500/20 hover:border-teal-500/30",
      image: "bg-teal-500/10",
      title: "text-teal-500",
      description: "text-white/70"
    };
  };
  
  const themeStyles = getThemeStyles();

  return (
    <div
      className={cn(
        baseCardStyles,
        themeStyles.card,
        className
      )}
      onClick={handleClick}
    >
      <Image
        src={img}
        alt="pictogramă card"
        height={32}
        width={32}
        className={cn(
          imageStyles,
          themeStyles.image
        )}
      />

      <div className="flex flex-col gap-2">
        <h3 className={cn(
          titleStyles,
          themeStyles.title
        )}>
          {title}
        </h3>
        <p className={cn(
          descriptionStyles,
          themeStyles.description
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};
