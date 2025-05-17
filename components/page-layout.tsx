"use client";

import { ReactNode } from "react";

type PageLayoutProps = {
  title: ReactNode;
  subtitle: ReactNode;
  statusText: string;
  iconColor: string;
  bgGradient: string;
  children: ReactNode;
};

export const PageLayout = ({
  title,
  subtitle,
  statusText,
  iconColor,
  bgGradient,
  children
}: PageLayoutProps) => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-8 text-white 
      pt-[300px] 
      sm:pt-[360px] 
      md:pt-[120px] 
      lg:pt-[120px] 
      xl:pt-12 
      2xl:pt-12
      pb-12">
      <div className={`h-[280px] sm:h-[320px] w-full rounded-[24px] ${bgGradient} shadow-xl shine-effect`}>
        <div className="flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="glassmorphism2 flex max-w-[300px] items-center gap-2 rounded-full py-2 pl-4 pr-6 mx-auto sm:mx-0">
            <div className={`h-3 w-3 rounded-full ${iconColor}`}></div>
            <h2 className="text-base font-medium">{statusText}</h2>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 mt-4 sm:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight lg:text-6xl text-center">{title}</h1>
            <p className="text-base sm:text-lg md:text-xl font-medium lg:text-2xl text-center">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto">
        {children}
      </div>
    </section>
  );
}; 