"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { links } from "@/config";
import { MobileNav } from "./mobile-nav";
import { SettingsButton } from "./settings-button";
import { useBackground } from "@/providers/background-provider";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { backgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";
  const isStarfield = backgroundType === "starfield";

  // Determine navbar styles based on theme
  const getNavbarStyles = () => {
    if (isLightMode) {
      return {
        nav: "bg-white/80 backdrop-blur-sm border-b border-black/20",
        logo: "bg-gray-100 hover:bg-gray-200 shadow-light",
        text: "text-black",
        textSecondary: "text-black/75",
        userButton: "border-black/20 hover:border-black/40 shadow-light",
        settingsIcon: "text-amber-500 hover:bg-amber-500/10"
      };
    }
    
    if (isDarkInverted) {
      return {
        nav: "bg-[#1A1A1A]/80 backdrop-blur-sm border-b border-white/20",
        logo: "bg-white/10 hover:bg-white/15 shadow-dark-inverted",
        text: "text-white",
        textSecondary: "text-white/75",
        userButton: "border-white/20 hover:border-white/40 shadow-dark-inverted",
        settingsIcon: "text-teal-500 hover:bg-teal-500/10"
      };
    }
    
    if (isMatrixHeart) {
      return {
        nav: "bg-[#1E2130]/80 backdrop-blur-sm border-b border-[#00FF4C]/20",
        logo: "bg-[#0D1A15] hover:bg-[#152920] shadow-matrix",
        text: "text-[#00FF4C]",
        textSecondary: "text-[#94ffbe]",
        userButton: "border-[#00FF4C]/40 hover:border-[#00FF4C]/60 shadow-matrix",
        settingsIcon: "text-[#00FF4C] hover:bg-[#00FF4C]/10"
      };
    }
    
    if (isCrystalAurora) {
      return {
        nav: "bg-[#121220]/80 backdrop-blur-sm border-b border-[#A571D0]/20",
        logo: "bg-[#4A3E65] hover:bg-[#5A4E75] shadow-crystal",
        text: "text-[#A571D0]",
        textSecondary: "text-[#E17BAF]",
        userButton: "border-[#A571D0]/40 hover:border-[#A571D0]/60 shadow-crystal",
        settingsIcon: "text-[#A571D0] hover:bg-[#A571D0]/10"
      };
    }
    
    if (isStarfield) {
      return {
        nav: "bg-[#0A1829]/80 backdrop-blur-sm border-b border-[#63A0FF]/20",
        logo: "bg-[#0A243D] hover:bg-[#0E304F] shadow-starfield",
        text: "text-[#63A0FF]",
        textSecondary: "text-[#98C2FF]",
        userButton: "border-[#63A0FF]/40 hover:border-[#63A0FF]/60 shadow-starfield",
        settingsIcon: "text-[#63A0FF] hover:bg-[#63A0FF]/10"
      };
    }
    
    // Default dark theme
    return {
      nav: "bg-black/80 backdrop-blur-sm border-b border-white/10",
      logo: "bg-white/10 hover:bg-white/15 shadow-dark-inverted",
      text: "text-white",
      textSecondary: "text-white/70",
      userButton: "border-white/20 hover:border-white/40 shadow-dark-inverted",
      settingsIcon: "text-teal-500 hover:bg-teal-500/10"
    };
  };

  const styles = getNavbarStyles();
  
  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50", styles.nav)}>
      <div className="flex items-center min-h-[64px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center">
              <Image
                src="/apple-icon.png"
                alt="Logo aplicație"
                width={55}
                height={55}
                className="w-10 h-10 sm:w-[55px] sm:h-[55px]"
              />
            </div>
            <p className={cn(
              "text-lg sm:text-xl font-bold font-title transition-colors duration-300",
              styles.text
            )}>
              ToKu
            </p>
          </Link>
        </div>

        {/* Spacer to push content to right */}
        <div className="flex-grow"></div>

        {/* Right side section */}
        <div className="flex items-center gap-3">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <SettingsButton />
          </div>

          {/* Mobile view */}
          <div className="sm:hidden">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: cn(
                      "size-10 rounded-xl border transition-colors duration-300",
                      styles.userButton
                    )
                  }
                }}
              />
            </SignedIn>
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};
