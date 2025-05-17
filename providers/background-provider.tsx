"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type BackgroundType = "apple-light" | "apple-dark-inverted" | "matrix-heart" | "starfield" | "crystal-aurora";

type BackgroundContextType = {
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("apple-light");
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved background preference from localStorage
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const savedBackground = localStorage.getItem("toku-background");
      if (savedBackground && ["apple-light", "apple-dark-inverted", "matrix-heart", "starfield", "crystal-aurora"].includes(savedBackground)) {
        setBackgroundType(savedBackground as BackgroundType);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [mounted]);

  // Save background preference to localStorage when changed
  useEffect(() => {
    if (!mounted) return;
    
    try {
      localStorage.setItem("toku-background", backgroundType);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [backgroundType, mounted]);

  return (
    <BackgroundContext.Provider value={{ backgroundType, setBackgroundType }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}; 