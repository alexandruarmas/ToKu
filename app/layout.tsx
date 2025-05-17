import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Inter, Rubik_Dirt, Space_Mono, Black_Ops_One, Space_Grotesk } from "next/font/google";
import type { PropsWithChildren } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { AnimatedBackground } from "@/components/animated-background";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { LayoutProvider } from "@/providers/layout-provider";
import { BackgroundProvider } from "@/providers/background-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

// Font for titles and buttons
const rubikDirt = Rubik_Dirt({ 
  subsets: ["latin"],
  variable: "--font-rubik-dirt",
  weight: "400",
  display: "swap",
});

// Font for subtitles and regular text
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });
const blackOps = Black_Ops_One({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-ops',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E78F9",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "ToKu - Video Conferencing",
  description: "Next generation video conferencing platform",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(spaceMono.variable, rubikDirt.variable, blackOps.variable, spaceGrotesk.variable)}>
        <body className={cn("relative overflow-hidden h-screen font-space-grotesk", inter.className)}>
          <ThemeProvider>
            <LayoutProvider>
              <BackgroundProvider>
                <AnimatedBackground />
                <div className="flex h-screen justify-center items-center overflow-auto relative">
                  {children}
                </div>
                <Toaster />
              </BackgroundProvider>
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
