import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Inter, Rubik_Dirt, Space_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

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

export const viewport: Viewport = {
  themeColor: "#0E78F9",
  colorScheme: "dark",
};

export const metadata: Metadata = siteConfig;

const AppLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: undefined,
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            logoPlacement: "inside",
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom",
          },
          elements: {
            rootBox: "w-full md:w-[312px] flex justify-center mx-auto",
            card: "bg-transparent backdrop-blur-md border border-white/30 p-8 mx-auto rounded-[15px] w-full shadow-glow animate-card-appear",
            header: "text-center mb-8",
            headerTitle: "text-xl font-bold text-white text-shadow-lg font-title animate-title-appear",
            headerSubtitle: "text-white text-base mt-1.5 text-shadow-md font-subtitle animate-subtitle-appear",
            formButtonPrimary: "bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium py-2.5 px-4.5 rounded-md w-full text-shadow-sm transition-all font-title text-base hover:shadow-glow",
            formFieldInput: "w-full h-9 rounded-md border border-white/30 bg-transparent text-white px-3 text-base focus:outline-none focus:border-white/50 text-shadow-sm font-subtitle",
            formFieldLabel: "text-white text-base font-medium mb-2 block text-shadow-sm font-subtitle",
            dividerLine: "bg-white/30 h-px",
            dividerText: "text-white text-base font-medium mx-3 text-shadow-sm font-subtitle",
            footerActionText: "text-white text-shadow-sm font-subtitle text-base",
            footerActionLink: "text-white font-medium underline text-shadow-sm font-subtitle text-base",
            identityPreviewEditButton: "text-white font-medium underline text-shadow-sm font-subtitle text-base",
            formResendCodeLink: "text-white font-medium underline text-shadow-sm font-subtitle text-base",
            socialButtonsIconButton: "border border-white/30 bg-white/5 backdrop-blur-sm p-2 rounded-full transform hover:bg-white/15 transition-all duration-300 mx-2 w-8 h-8 flex items-center justify-center text-white hover:scale-110 hover:shadow-glow-sm animate-social-appear",
            socialButtonsBlockButton: "w-full py-2.5 border border-white/30 bg-transparent rounded-md text-white text-shadow-sm font-title text-base hover:shadow-glow-sm",
            formFieldAction: "text-white font-medium underline text-shadow-sm font-subtitle text-base",
            formFieldSuccessText: "text-green-300 mt-1.5 text-base text-shadow-sm font-subtitle",
            otpCodeFieldInput: "w-7.5 h-9 mx-1.5 rounded-md bg-transparent text-center text-base text-white border border-white/30 text-shadow-sm",
            alertText: "text-red-300 font-medium text-base text-shadow-sm font-subtitle",
            footer: "text-center text-white text-base mt-4.5 text-shadow-sm font-subtitle",
            main: "relative",
          },
          variables: {
            colorPrimary: "#ffffff",
            colorText: "#ffffff",
            colorTextOnPrimaryBackground: "#ffffff",
            colorBackground: "transparent",
            colorInputBackground: "transparent",
            colorInputText: "#ffffff",
            fontFamily: "var(--font-space-mono), monospace, system-ui, sans-serif",
            borderRadius: "0.3125rem",
            spacingUnit: "0.78125rem",
          },
        }}
      >
        <body className={cn("relative overflow-hidden h-screen", spaceMono.variable, rubikDirt.variable)}>
          <div className="fixed inset-0 bg-[#1c1c1e] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e]">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="absolute inset-0 backdrop-blur-[100px]" style={{ 
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.2) 100%)'
            }} />
          </div>
          <div className="flex h-screen justify-center items-center overflow-auto relative">
            {children}
          </div>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
};

export default AppLayout;
