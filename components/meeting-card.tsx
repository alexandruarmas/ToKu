"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";

type MeetingCardProps = {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  appTheme?: string;
};

export const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  appTheme = "apple-dark-inverted",
}: MeetingCardProps) => {
  const { toast } = useToast();

  const getThemeColors = () => {
    // Matrix theme (green)
    if (appTheme === 'matrix-heart') {
      return {
        buttonBg: "bg-[#00FF4C]",
        buttonHover: "hover:bg-[#00E040]",
      };
    }
    // Crystal theme (purple)
    else if (appTheme === 'crystal-aurora') {
      return {
        buttonBg: "bg-[#A571D0]",
        buttonHover: "hover:bg-[#9560C0]",
      };
    }
    // Starfield theme (keep blue for this one)
    else if (appTheme === 'starfield') {
      return {
        buttonBg: "bg-[#63A0FF]",
        buttonHover: "hover:bg-[#5490F0]",
      };
    }
    // Apple light theme (switch to orange/amber)
    else if (appTheme === 'apple-light') {
      return {
        buttonBg: "bg-amber-500",
        buttonHover: "hover:bg-amber-600",
      };
    }
    
    // Apple dark theme (switch to teal)
    return {
      buttonBg: "bg-teal-500",
      buttonHover: "hover:bg-teal-600",
    };
  };

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-4 sm:px-5 py-6 sm:py-8 mx-auto">
      <article className="flex flex-col gap-4 sm:gap-5">
        <Image src={icon} alt="viitoare" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-2xl font-bold line-clamp-2">{title}</h1>
            <p className="text-sm sm:text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("relative flex justify-center sm:justify-between", {})}>
        <div className="relative hidden sm:flex w-full max-w-[200px]">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="participanți"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button onClick={handleClick} className={`rounded ${getThemeColors().buttonBg} ${getThemeColors().buttonHover} px-4 sm:px-6 w-full sm:w-auto`}>
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="funcție" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link copiat.",
                });
              }}
              className="bg-dark-4 px-4 sm:px-6 w-full sm:w-auto"
            >
              <Image
                src="/icons/copy.svg"
                alt="funcție"
                width={20}
                height={20}
              />
              &nbsp; Copiază Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};
