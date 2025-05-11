"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100%-4rem)] w-fit lg:w-[250px] bg-transparent backdrop-blur-sm border-r border-white/10 max-sm:hidden z-20">
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
                    "flex items-center justify-start gap-3 rounded-xl p-3 my-3 transition-all hover:bg-white/10",
                    {
                      "bg-white/20 text-white shadow-md": isActive,
                      "text-gray-300": !isActive,
                    }
                  )}
                >
                  <div className={cn("flex items-center justify-center size-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20", {
                    "bg-white/20": isActive,
                    "bg-gray-800/50": !isActive,
                  })}>
                    <Image
                      src={item.imgUrl}
                      alt={item.label}
                      width={16}
                      height={16}
                      className="opacity-90"
                    />
                  </div>

                  <p className="text-sm font-medium lg:block hidden">
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 mt-auto text-xs text-gray-400 lg:block hidden border-t border-white/10">
          <p>YOOM Video Conferencing</p>
          <p>v1.0.1</p>
        </div>
      </div>
    </aside>
  );
};
