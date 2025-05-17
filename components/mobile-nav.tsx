"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { useBackground } from "@/providers/background-provider";

export const MobileNav = () => {
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
        sheet: "border-none bg-white/95 backdrop-blur-md",
        hamburger: "filter-light",
        logo: {
          wrapper: "bg-gray-100 shadow-light",
          text: "text-black text-glow-light"
        },
        link: {
          base: "text-black/75 hover:bg-amber-500/8 transition-all duration-300",
          active: "bg-amber-500/15 text-amber-500 shadow-light text-glow-light transition-all duration-300",
          icon: "filter-light opacity-90"
        }
      };
    }
    
    if (isDarkInverted) {
      return {
        sheet: "border-none bg-[#1A1A1A]/95 backdrop-blur-md",
        hamburger: "filter-dark-inverted",
        logo: {
          wrapper: "bg-white/10 shadow-dark-inverted",
          text: "text-white text-glow-dark-inverted"
        },
        link: {
          base: "text-white/75 hover:bg-teal-500/8 transition-all duration-300",
          active: "bg-teal-500/15 text-teal-500 shadow-dark-inverted text-glow-dark-inverted transition-all duration-300",
          icon: "filter-dark-inverted opacity-90"
        }
      };
    }
    
    if (isMatrixHeart) {
      return {
        sheet: "border-none bg-[#1E2130]/95 backdrop-blur-md",
        hamburger: "filter-matrix-green",
        logo: {
          wrapper: "bg-[#0D1A15] shadow-matrix",
          text: "text-[#00FF4C] text-glow-green"
        },
        link: {
          base: "text-[#00FF4C]/75 hover:bg-[#00FF4C]/8 transition-all duration-300",
          active: "bg-[#00FF4C]/15 text-[#00FF4C] text-glow-green shadow-matrix transition-all duration-300",
          icon: "filter-matrix-green"
        }
      };
    }
    
    if (isCrystalAurora) {
      return {
        sheet: "border-none bg-[#121220]/95 backdrop-blur-md",
        hamburger: "filter-crystal-pink",
        logo: {
          wrapper: "bg-[#4A3E65] shadow-crystal",
          text: "text-[#A571D0] text-glow-crystal"
        },
        link: {
          base: "text-[#A571D0]/75 hover:bg-[#A571D0]/8 transition-all duration-300",
          active: "bg-[#A571D0]/15 text-[#A571D0] text-glow-crystal shadow-crystal transition-all duration-300",
          icon: "filter-crystal-pink"
        }
      };
    }
    
    if (isStarfield) {
      return {
        sheet: "border-none bg-[#0A1829]/95 backdrop-blur-md",
        hamburger: "filter-starfield",
        logo: {
          wrapper: "bg-[#0A243D] shadow-starfield",
          text: "text-[#63A0FF] text-glow-starfield"
        },
        link: {
          base: "text-[#63A0FF]/75 hover:bg-[#63A0FF]/8 transition-all duration-300",
          active: "bg-[#63A0FF]/15 text-[#63A0FF] text-glow-starfield shadow-starfield transition-all duration-300",
          icon: "filter-starfield"
        }
      };
    }
    
    // Default dark theme
    return {
      sheet: "border-none bg-black/95 backdrop-blur-md",
      hamburger: "filter-dark-inverted",
      logo: {
        wrapper: "bg-white/10 shadow-dark-inverted",
        text: "text-white text-glow-dark-inverted"
      },
      link: {
        base: "text-white/75 hover:bg-teal-500/8 transition-all duration-300",
        active: "bg-teal-500/15 text-teal-500 shadow-dark-inverted text-glow-dark-inverted transition-all duration-300",
        icon: "filter-dark-inverted opacity-90"
      }
    };
  };

  const styles = getThemeStyles();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Deschide bara laterală"
            width={36}
            height={36}
            className={cn("cursor-pointer sm:hidden transition-all duration-300", styles.hamburger)}
          />
        </SheetTrigger>

        <SheetContent side="left" className={styles.sheet}>
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-1">
              <div className="flex items-center justify-center">
                <Image
                  src="/apple-icon.png"
                  alt="Logo ToKu"
                  width={32}
                  height={32}
                  className="max-sm:size-10"
                />
              </div>

              <p className={cn(
                "text-[26px] font-extrabold transition-colors duration-300",
                styles.logo.text
              )}>
                ToKu
              </p>
            </Link>
          </SheetClose>

          <div className="flex h-[calc(100vh_-_72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16">
              {SIDEBAR_LINKS.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);

                return (
                  <SheetClose key={item.route} asChild>
                    <Link
                      href={item.route}
                      className={cn(
                        "flex w-full max-w-60 items-center gap-4 rounded-lg p-4",
                        isActive ? styles.link.active : styles.link.base
                      )}
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.label}
                        width={item.imgUrl.includes('apple-icon') ? 24 : 20}
                        height={item.imgUrl.includes('apple-icon') ? 24 : 20}
                        className={cn(
                          item.imgUrl.includes('apple-icon') ? "" : styles.link.icon,
                          item.imgUrl.includes('apple-icon') ? "" : "transition-transform duration-300",
                          !item.imgUrl.includes('apple-icon') && isActive && "scale-110"
                        )}
                      />

                      <p className={cn(
                        "font-semibold transition-colors duration-300",
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
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
