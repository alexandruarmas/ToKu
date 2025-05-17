"use client";

import { Palette, Settings } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { useBackground, type BackgroundType } from "@/providers/background-provider";

type BackgroundOption = {
  id: BackgroundType;
  name: string;
  description: string;
};

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: "apple-light",
    name: "Temă Luminoasă",
    description: "Fundal deschis cu subtile accente de culoare"
  },
  {
    id: "apple-dark-inverted",
    name: "Temă Întunecată",
    description: "Fundal întunecat cu accente de culoare adaptate"
  },
  {
    id: "crystal-aurora",
    name: "Crystal Aurora",
    description: "Efecte de aurora boreală cu cristale strălucitoare în nuanțe de roz și violet"
  },
  {
    id: "matrix-heart",
    name: "Matrix Heart",
    description: "Animație digitală matrix cu inimi pulsante în mișcare"
  },
  {
    id: "starfield",
    name: "Câmp de Stele",
    description: "Fundal întunecat cu animații de stele și lumină albastră"
  }
];

export const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { backgroundType, setBackgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";
  const isStarfield = backgroundType === "starfield";

  // Get theme-specific styles
  const getThemeStyles = () => {
    if (isLightMode) {
      return {
        button: "hover:bg-black/8 active:bg-black/12 text-black",
        content: "bg-gradient-to-br from-white/95 via-white/97 to-white/95 border-black/15 shadow-light",
        label: "text-black",
        separator: "bg-black/15",
        sectionBg: "from-amber-500/5 to-amber-600/5",
        sectionText: "text-black/70",
        item: {
          base: "hover:bg-black/5 border border-transparent",
          active: "bg-amber-500/15 border border-amber-500/30",
          text: "text-black",
          description: "text-black/60",
          indicator: "bg-amber-500"
        }
      };
    }
    
    if (isDarkInverted) {
      return {
        button: "hover:bg-white/8 active:bg-white/12 text-white",
        content: "bg-gradient-to-br from-[#1A1A1A]/95 via-[#1A1A1A]/97 to-[#1A1A1A]/95 border-white/15 shadow-dark-inverted",
        label: "text-white",
        separator: "bg-white/15",
        sectionBg: "from-teal-500/5 to-teal-600/5",
        sectionText: "text-white/70",
        item: {
          base: "hover:bg-white/5 border border-transparent",
          active: "bg-teal-500/25 border border-teal-500/30",
          text: "text-white",
          description: "text-white/60",
          indicator: "bg-teal-500"
        }
      };
    }
    
    if (isMatrixHeart) {
      return {
        button: "hover:bg-[#00FF4C]/10 active:bg-[#00FF4C]/15 text-[#00FF4C] text-glow-green",
        content: "bg-gradient-to-br from-[#1E2130]/95 via-[#1E2130]/97 to-[#1E2130]/95 border-[#00FF4C]/20 shadow-matrix",
        label: "text-[#00FF4C] text-glow-green",
        separator: "bg-[#00FF4C]/20",
        sectionBg: "from-[#00FF4C]/5 to-[#00B840]/5",
        sectionText: "text-[#00FF4C]/70",
        item: {
          base: "hover:bg-[#00FF4C]/5 border border-transparent",
          active: "bg-[#00FF4C]/15 border border-[#00FF4C]/30",
          text: "text-[#00FF4C]",
          description: "text-[#94ffbe]",
          indicator: "bg-[#00FF4C]"
        }
      };
    }
    
    if (isCrystalAurora) {
      return {
        button: "hover:bg-[#A571D0]/10 active:bg-[#A571D0]/15 text-[#A571D0] text-glow-crystal",
        content: "bg-gradient-to-br from-[#121220]/95 via-[#121220]/97 to-[#121220]/95 border-[#A571D0]/20 shadow-crystal",
        label: "text-[#A571D0] text-glow-crystal",
        separator: "bg-[#A571D0]/20",
        sectionBg: "from-[#A571D0]/5 to-[#E17BAF]/5",
        sectionText: "text-[#A571D0]/70",
        item: {
          base: "hover:bg-[#A571D0]/5 border border-transparent",
          active: "bg-[#A571D0]/15 border border-[#A571D0]/30",
          text: "text-[#A571D0]",
          description: "text-[#E17BAF]",
          indicator: "bg-[#A571D0]"
        }
      };
    }
    
    if (isStarfield) {
      return {
        button: "hover:bg-[#63A0FF]/10 active:bg-[#63A0FF]/15 text-[#63A0FF] text-glow-starfield",
        content: "bg-gradient-to-br from-[#0A1829]/95 via-[#0A1829]/97 to-[#0A1829]/95 border-[#63A0FF]/20 shadow-starfield",
        label: "text-[#63A0FF] text-glow-starfield",
        separator: "bg-[#63A0FF]/20",
        sectionBg: "from-[#63A0FF]/5 to-[#3D6FFF]/5",
        sectionText: "text-[#63A0FF]/70",
        item: {
          base: "hover:bg-[#63A0FF]/5 border border-transparent",
          active: "bg-[#63A0FF]/15 border border-[#63A0FF]/30",
          text: "text-[#63A0FF]",
          description: "text-[#98C2FF]",
          indicator: "bg-[#63A0FF]"
        }
      };
    }
    
    // Default dark theme
    return {
      button: "hover:bg-white/8 active:bg-white/12 text-white",
      content: "bg-gradient-to-br from-[#121214]/95 via-[#121214]/97 to-[#121214]/95 border-white/15 shadow-dark-inverted",
      label: "text-white",
      separator: "bg-white/15",
      sectionBg: "from-teal-500/5 to-teal-600/5",
      sectionText: "text-white/70",
      item: {
        base: "hover:bg-white/5 border border-transparent",
        active: "bg-teal-500/25 border border-teal-500/30",
        text: "text-white",
        description: "text-white/60",
        indicator: "bg-teal-500"
      }
    };
  };

  const styles = getThemeStyles();

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className={cn(
            "rounded-xl transition-all duration-300",
            styles.button
          )}
        >
          <Settings 
            className={cn(
              "h-5 w-5 transition-transform duration-500",
              isOpen ? "rotate-90" : ""
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className={cn(
          "w-72 backdrop-blur-md border shadow-xl rounded-xl overflow-hidden transition-colors duration-300",
          styles.content
        )}
      >
        <div className="py-2 px-4">
          <DropdownMenuLabel className={cn(
            "text-lg font-bold pb-2",
            styles.label
          )}>
            <div className="flex items-center gap-2">
              <Settings className={cn(
                "h-5 w-5",
                isMatrixHeart ? "text-[#00FF4C]" :
                isCrystalAurora ? "text-[#A571D0]" :
                isStarfield ? "text-[#63A0FF]" :
                isLightMode ? "text-amber-500" : "text-teal-500"
              )} />
              <span>Setări</span>
            </div>
          </DropdownMenuLabel>
        </div>
        
        <DropdownMenuSeparator className={styles.separator} />
        
        {/* Background selection section */}
        <div className={cn(
          "p-4 bg-gradient-to-r",
          styles.sectionBg
        )}>
          <h3 className={cn(
            "text-xs font-medium uppercase flex items-center gap-1 mb-3",
            styles.sectionText
          )}>
            <Palette className="h-3.5 w-3.5" /> 
            <span>Tema Aplicației</span>
          </h3>
          
          <DropdownMenuGroup className="space-y-2 overflow-hidden">
            {BACKGROUND_OPTIONS.map((option) => (
              <DropdownMenuItem 
                key={option.id}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 rounded-lg cursor-pointer transition-all duration-200",
                  backgroundType === option.id
                    ? styles.item.active
                    : styles.item.base
                )}
                onClick={() => setBackgroundType(option.id)}
              >
                <div className="flex items-center w-full">
                  <span className={cn(
                    "font-medium text-sm",
                    styles.item.text
                  )}>
                    {option.name}
                  </span>
                  {backgroundType === option.id && (
                    <div className={cn(
                      "ml-auto w-2 h-2 rounded-full",
                      styles.item.indicator
                    )}></div>
                  )}
                </div>
                <p className={cn(
                  "text-xs line-clamp-1",
                  styles.item.description
                )}>
                  {option.description}
                </p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </div>
        
        <DropdownMenuSeparator className={styles.separator} />
        
        {/* Account section */}
        <div className={cn(
          "p-4 bg-gradient-to-r",
          styles.sectionBg
        )}>
          <h3 className={cn(
            "text-xs font-medium uppercase text-center mb-2",
            styles.sectionText
          )}>Cont</h3>
          <DropdownMenuItem className={cn(
            "flex items-center p-2 rounded-lg transition-all duration-200 border backdrop-blur-sm",
            styles.item.base
          )}>
            <div className="flex items-center w-full">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/sign-in"
                  appearance={{
                    elements: {
                      rootBox: "flex items-center",
                      avatarBox: `w-[32px] h-[32px] rounded-xl border-2 transition-all duration-300 ${
                        isLightMode
                          ? "border-black/20 hover:border-black/50 hover:scale-110"
                          : "border-white/20 hover:border-white/50 hover:scale-110"
                      }`,
                      userPreviewMainIdentifier: isLightMode ? "text-sm font-medium text-black" : "text-sm font-medium text-white",
                      userPreviewSecondaryIdentifier: isLightMode ? "text-xs text-black/60" : "text-xs text-white/60"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 