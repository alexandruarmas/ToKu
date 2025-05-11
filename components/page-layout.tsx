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
    <section className="flex size-full flex-col gap-8 text-white">
      <div className={`h-[320px] w-full rounded-[24px] ${bgGradient} shadow-xl shine-effect`}>
        <div className="flex h-full flex-col justify-between p-8 lg:p-10">
          <div className="glassmorphism2 flex max-w-[300px] items-center gap-2 rounded-full py-2 pl-4 pr-6">
            <div className={`h-3 w-3 rounded-full ${iconColor}`}></div>
            <h2 className="text-base font-medium">{statusText}</h2>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <h1 className="text-5xl font-bold tracking-tight lg:text-7xl text-center">{title}</h1>
            <p className="text-xl font-medium lg:text-2xl text-center">{subtitle}</p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}; 