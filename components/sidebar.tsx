"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Black_Ops_One } from "next/font/google";

import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { useBackground } from "@/providers/background-provider";

const blackOpsOne = Black_Ops_One({ subsets: ["latin"], weight: "400", variable: "--font-black-ops-one" });

export const Sidebar = () => {
  const pathname = usePathname();
  const { backgroundType } = useBackground();
  const isLightMode = backgroundType === "apple-light";
  const isDarkInverted = backgroundType === "apple-dark-inverted";
  const isMatrixHeart = backgroundType === "matrix-heart";
  const isCrystalAurora = backgroundType === "crystal-aurora";
  const isStarfield = backgroundType === "starfield";

  // Get theme-specific styles
  const getThemeStyles = () => {
    if (isLightMode) {
      return {
        sidebar: "bg-white/80 backdrop-blur-sm border-r border-black/20",
        link: {
          base: "text-black/75 hover:bg-amber-500/8 hover:text-amber-500/90 transition-all duration-300",
          active: "bg-amber-500/15 text-black shadow-light text-glow-light transition-all duration-300",
          icon: {
            wrapper: "bg-amber-500/8 transition-all duration-300",
            wrapperActive: "bg-amber-500/15 transition-all duration-300",
            image: "filter-light opacity-95"
          }
        },
        footer: {
          border: "border-amber-500/15",
          text: "text-amber-500/75"
        }
      };
    }
    
    if (isDarkInverted) {
      return {
        sidebar: "bg-[#1A1A1A]/80 backdrop-blur-sm border-r border-white/20",
        link: {
          base: "text-white/75 hover:bg-teal-500/8 hover:text-teal-500/90 transition-all duration-300",
          active: "bg-teal-500/15 text-teal-500 shadow-dark-inverted text-glow-dark-inverted transition-all duration-300",
          icon: {
            wrapper: "bg-teal-500/8 transition-all duration-300",
            wrapperActive: "bg-teal-500/15 transition-all duration-300",
            image: "filter-dark-inverted opacity-95"
          }
        },
        footer: {
          border: "border-teal-500/15",
          text: "text-teal-500/75"
        }
      };
    }
    
    if (isMatrixHeart) {
      return {
        sidebar: "bg-[#1E2130]/80 backdrop-blur-sm border-r border-[#00FF4C]/20",
        link: {
          base: "text-[#00FF4C]/75 hover:bg-[#00FF4C]/8 hover:text-[#00FF4C] transition-all duration-300",
          active: "bg-[#00FF4C]/15 text-[#00FF4C] text-glow-green shadow-matrix transition-all duration-300",
          icon: {
            wrapper: "bg-[#00FF4C]/10 transition-all duration-300",
            wrapperActive: "bg-[#00FF4C]/20 transition-all duration-300",
            image: "filter-matrix-green"
          }
        },
        footer: {
          border: "border-[#00FF4C]/20",
          text: "text-[#00FF4C]/80"
        }
      };
    }
    
    if (isCrystalAurora) {
      return {
        sidebar: "bg-[#121220]/80 backdrop-blur-sm border-r border-[#A571D0]/20",
        link: {
          base: "text-[#A571D0]/75 hover:bg-[#A571D0]/8 hover:text-[#A571D0] transition-all duration-300",
          active: "bg-[#A571D0]/15 text-[#A571D0] text-glow-crystal shadow-crystal transition-all duration-300",
          icon: {
            wrapper: "bg-[#A571D0]/10 transition-all duration-300",
            wrapperActive: "bg-[#A571D0]/20 transition-all duration-300",
            image: "filter-crystal-pink"
          }
        },
        footer: {
          border: "border-[#A571D0]/20",
          text: "text-[#A571D0]/80"
        }
      };
    }
    
    if (isStarfield) {
      return {
        sidebar: "bg-[#0A1829]/80 backdrop-blur-sm border-r border-[#63A0FF]/20",
        link: {
          base: "text-[#63A0FF]/75 hover:bg-[#63A0FF]/8 hover:text-[#63A0FF] transition-all duration-300",
          active: "bg-[#63A0FF]/15 text-[#63A0FF] text-glow-starfield shadow-starfield transition-all duration-300",
          icon: {
            wrapper: "bg-[#63A0FF]/10 transition-all duration-300",
            wrapperActive: "bg-[#63A0FF]/20 transition-all duration-300",
            image: "filter-starfield"
          }
        },
        footer: {
          border: "border-[#63A0FF]/20",
          text: "text-[#63A0FF]/80"
        }
      };
    }
    
    // Default dark theme
    return {
      sidebar: "bg-black/80 backdrop-blur-sm border-r border-white/10",
      link: {
        base: "text-white/70 hover:bg-teal-500/12 hover:text-teal-500/90 transition-all duration-300",
        active: "bg-teal-500/25 text-teal-500 shadow-dark-inverted text-glow-dark-inverted transition-all duration-300",
        icon: {
          wrapper: "bg-teal-500/12 transition-all duration-300",
          wrapperActive: "bg-teal-500/25 transition-all duration-300",
          image: "filter-dark-inverted opacity-95"
        }
      },
      footer: {
        border: "border-teal-500/10",
        text: "text-teal-500/60"
      }
    };
  };

  const styles = getThemeStyles();

  return (
    <aside className={cn(
      "fixed left-0 top-[64px] h-[calc(100%-64px)] w-fit lg:w-[250px] z-20 max-sm:hidden transition-colors duration-300",
      styles.sidebar
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center flex-1">
          <div className="w-full px-4">
            {SIDEBAR_LINKS.map((item) => {
              const isActive =
                pathname === item.route || pathname.startsWith(`${item.route}/`);

              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={cn(
                    "flex items-center justify-start gap-3 rounded-xl p-3 my-3",
                    isActive ? styles.link.active : styles.link.base
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center size-8 rounded-lg",
                    item.imgUrl.includes('apple-icon') ? "" : (isActive ? styles.link.icon.wrapperActive : styles.link.icon.wrapper)
                  )}>
                    <Image
                      src={item.imgUrl}
                      alt={item.label}
                      width={item.imgUrl.includes('apple-icon') ? 20 : 16}
                      height={item.imgUrl.includes('apple-icon') ? 20 : 16}
                      className={cn(
                        item.imgUrl.includes('apple-icon') ? "" : styles.link.icon.image
                      )}
                    />
                  </div>

                  <p className={cn(
                    `text-sm font-medium lg:block hidden ${blackOpsOne.className}`,
                    isActive && (
                      isLightMode ? "text-glow-light" :
                      isDarkInverted ? "text-glow-dark-inverted" :
                      isMatrixHeart ? "text-glow-green" :
                      isCrystalAurora ? "text-glow-crystal" :
                      isStarfield ? "text-glow-starfield" : 
                      "text-glow-dark-inverted"
                    )
                  )}>
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className={cn(
          `p-4 mt-auto text-xs lg:block hidden border-t ${blackOpsOne.className} transition-colors duration-300`,
          styles.footer.border,
          styles.footer.text
        )}>
          <p>ToKu Video Conferințe</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};
