"use client";

import { useLayout } from "@/providers/layout-provider";

/**
 * Returns Tailwind CSS classes for grid layouts based on the current layout preference
 * Phone view (sm and below) is always preserved as single column
 */
export function useGridLayout() {
  const { gridLayout } = useLayout();

  const getGridLayoutClasses = () => {
    return "grid w-full gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !important";
  };

  return { getGridLayoutClasses };
} 