"use client";

import { createContext, useContext } from "react";

type GridLayout = "portrait" | "landscape";

interface LayoutContextType {
  gridLayout: GridLayout;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // Using a fixed "landscape" value since the grid is now static
  // Keeping the provider for backward compatibility with components that might still use it
  const gridLayout: GridLayout = "landscape";
  
  return (
    <LayoutContext.Provider value={{ gridLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  
  return context;
}; 