"use client";

import {
  BackgroundFiltersProvider,
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useBackgroundFilters,
  useCallStateHooks,
  useCall,
  type CallLayoutType,
  type OwnCapability,
} from "@stream-io/video-react-sdk";
import { Image, LayoutList, Plus, Settings, Upload, Users, MessageSquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { EndCallButton } from "./end-call-button";
import { Loader } from "./loader";

// Default background blur options if images aren't available
const BLUR_INTENSITIES = [
  { name: "Light", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "Strong", value: "high" },
];

// Default background images
const DEFAULT_BACKGROUNDS = [
  { name: "Office", url: "/backgrounds/office.jpg" },
  { name: "Beach", url: "/backgrounds/beach.jpg" },
  { name: "Mountain", url: "/backgrounds/mountain.jpg" },
];

type BackgroundEffectType = 
  | { type: "none" }
  | { type: "blur"; intensity: string }
  | { type: "image"; url: string; name: string };

// Component for video background filters
const BackgroundFiltersButton = () => {
  const {
    isSupported,
    disableBackgroundFilter,
    applyBackgroundBlurFilter,
    applyBackgroundImageFilter,
  } = useBackgroundFilters();
  const [customBackgrounds, setCustomBackgrounds] = useState<{name: string, url: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeEffect, setActiveEffect] = useState<BackgroundEffectType>({ type: "none" });

  if (!isSupported) {
    return null;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const fileUrl = URL.createObjectURL(file);
    const fileName = file.name.split('.')[0] || 'Custom';
    
    setCustomBackgrounds(prev => [...prev, { name: fileName, url: fileUrl }]);
    
    // Auto-apply the newly uploaded background
    applyBackgroundImageFilter(fileUrl);
    setActiveEffect({ type: "image", url: fileUrl, name: fileName });
  };

  const uploadNewBackground = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDisableFilter = () => {
    disableBackgroundFilter();
    setActiveEffect({ type: "none" });
  };

  const handleApplyBlur = (intensity: string, name: string) => {
    applyBackgroundBlurFilter(intensity as any);
    setActiveEffect({ type: "blur", intensity });
  };

  const handleApplyImage = (url: string, name: string) => {
    applyBackgroundImageFilter(url);
    setActiveEffect({ type: "image", url, name });
  };

  // Combine default and custom backgrounds
  const allBackgrounds = [...DEFAULT_BACKGROUNDS, ...customBackgrounds];

  return (
    <div className="relative">
      <DropdownMenu>
        <div className="flex items-center">
          <DropdownMenuTrigger
            className={cn(
              "cursor-pointer rounded-2xl px-4 py-2 transition-colors flex items-center gap-2",
              activeEffect.type === "none" 
                ? "bg-[#19232D] hover:bg-[#4C535B]" 
                : "bg-blue-600 hover:bg-blue-700"
            )}
            title="Background filters"
          >
            <Image size={20} className="text-white" />
            {activeEffect.type !== "none" && (
              <span className="text-white text-xs hidden sm:inline">
                {activeEffect.type === "blur" 
                  ? `${activeEffect.intensity} Blur` 
                  : activeEffect.name}
              </span>
            )}
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
          <DropdownMenuItem
            className={cn(
              "cursor-pointer",
              activeEffect.type === "none" && "bg-blue-600"
            )}
            onClick={handleDisableFilter}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-dark-1" />
          
          {BLUR_INTENSITIES.map((blur, index) => (
            <div key={`blur-${index}`}>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer",
                  activeEffect.type === "blur" && 
                  activeEffect.intensity === blur.value && 
                  "bg-blue-600"
                )}
                onClick={() => handleApplyBlur(blur.value, blur.name)}
              >
                {blur.name} Blur
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
            </div>
          ))}
          
          {allBackgrounds.map((bg, index) => (
            <div key={`bg-${index}`}>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer",
                  activeEffect.type === "image" && 
                  activeEffect.url === bg.url && 
                  "bg-blue-600"
                )}
                onClick={() => handleApplyImage(bg.url, bg.name)}
              >
                {bg.name}
              </DropdownMenuItem>
              {index < allBackgrounds.length - 1 && (
                <DropdownMenuSeparator className="border-dark-1" />
              )}
            </div>
          ))}

          <DropdownMenuSeparator className="border-dark-1" />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={uploadNewBackground}
          >
            <div className="flex items-center">
              <Plus size={16} className="mr-2" />
              <span>Add background image</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />
    </div>
  );
};

export const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showParticipants, setShowParticipants] = useState(false);
  const call = useCall();
  
  // Get settings from call data
  const settings = call?.state.custom?.settings || {};
  const {
    defaultLayout = "speaker-left",
    allowChat = true,
    allowRaiseHand = true,
    allowScreenShare = true,
    requireApproval = false,
    waitingRoom = false
  } = settings;

  const [layout, setLayout] = useState<CallLayoutType>(defaultLayout as CallLayoutType);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const isPersonalRoom = !!searchParams.get("personal");

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <BackgroundFiltersProvider>
      <div className="flex h-screen flex-col bg-dark-1">
        <div className="flex flex-1">
          <CallLayout />
        </div>

        <div className="flex items-center justify-center gap-3 bg-dark-2 p-3">
          <div className="flex items-center gap-3">
            <CallControls 
              allowScreenShare={allowScreenShare}
              allowRaiseHand={allowRaiseHand}
            />

            <div className="flex items-center gap-3 border-l border-dark-3 pl-3">
              <LayoutSwitcher layout={layout} setLayout={setLayout} />
              <BackgroundEffectsSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-dark-3 pl-3">
            {allowChat && (
              <button
                onClick={() => setShowChat((prev) => !prev)}
                title="Toggle chat"
              >
                <div className="cursor-pointer rounded-2xl bg-[#19232D] px-4 py-2 hover:bg-[#4C535B]">
                  <MessageSquare size={20} className="text-white" />
                </div>
              </button>
            )}

            <button
              onClick={() => setShowParticipants((prev) => !prev)}
              title="Show participants"
            >
              <div className="cursor-pointer rounded-2xl bg-[#19232D] px-4 py-2 hover:bg-[#4C535B]">
                <Users size={20} className="text-white" />
              </div>
            </button>

            {!isPersonalRoom && <EndCallButton />}
          </div>
        </div>
      </div>
    </BackgroundFiltersProvider>
  );
};
