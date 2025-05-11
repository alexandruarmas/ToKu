import Image from "next/image";
import type { MouseEventHandler } from "react";

type HomeCardProps = {
  img: string;
  title: string;
  description: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={`flex h-[160px] sm:h-[180px] cursor-pointer flex-col justify-between rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 transition-all hover:scale-[1.02] hover:shadow-lg ${className}`}
      onClick={handleClick}
    >
      <Image
        src={img}
        alt="card icon"
        height={32}
        width={32}
        className="rounded-full bg-white/10 p-1.5"
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <p className="text-xs sm:text-sm text-white/80">{description}</p>
      </div>
    </div>
  );
};
