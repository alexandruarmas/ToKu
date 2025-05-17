"use client";

import { useLayout } from "@/providers/layout-provider";
import { cn } from "@/lib/utils";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const GridLayout = ({ children, className }: GridLayoutProps) => {
  const { gridLayout } = useLayout();

  return (
    <div
      className={cn(
        "grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}; 