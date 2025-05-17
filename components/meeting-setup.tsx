"use client";

import {
  BackgroundFiltersProvider,
  DeviceSettings as StreamDeviceSettings,
  VideoPreview,
  useBackgroundFilters,
  useCall,
} from "@stream-io/video-react-sdk";
import { Cog, Image, Plus, Settings, Upload, VideoOff, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraTips } from "./camera-tips";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type MeetingSetupProps = {
  setIsSetupComplete: (isSetupComplete: boolean) => void;
};

// Default background blur options if images aren't available
const BLUR_INTENSITIES = [
  { name: "Estompare Ușoară", value: "low" },
  { name: "Estompare Medie", value: "medium" },
  { name: "Estompare Puternică", value: "high" },
];

// Default background images
const DEFAULT_BACKGROUNDS = [
  { name: "Birou", url: "/backgrounds/office.jpg" },
  { name: "Plajă", url: "/backgrounds/beach.jpg" },
  { name: "Munte", url: "/backgrounds/mountain.jpg" },
];

type BackgroundEffectType = 
  | { type: "none" }
  | { type: "blur"; intensity: string }
  | { type: "image"; url: string; name: string };

// Custom device settings menu
const CustomDeviceSettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full p-2 bg-gray-700 hover:bg-gray-600 border-none">
          <Cog size={20} className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Setări Dispozitive</DialogTitle>
          <DialogDescription className="text-gray-400">
            Selectează audio și video device-uri
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-medium mb-2">Selectează o Cameră</h3>
            <RadioGroup defaultValue="default" className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="default" id="camera-default" className="text-blue-500" />
                <Label htmlFor="camera-default" className="font-medium">Implicit</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Selectează un Microfon</h3>
            <RadioGroup defaultValue="default" className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="default" id="mic-default" className="text-blue-500" />
                <Label htmlFor="mic-default" className="font-medium">Implicit</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="headset" id="mic-headset" className="text-blue-500" />
                <Label htmlFor="mic-headset" className="font-medium">Microfon Căști</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Selectează Difuzoare</h3>
            <RadioGroup defaultValue="default" className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="default" id="speaker-default" className="text-blue-500" />
                <Label htmlFor="speaker-default" className="font-medium">Implicit</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="headset" id="speaker-headset" className="text-blue-500" />
                <Label htmlFor="speaker-headset" className="font-medium">Căști Audio</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-3">
                <RadioGroupItem value="speakers" id="speaker-speakers" className="text-blue-500" />
                <Label htmlFor="speaker-speakers" className="font-medium">Difuzoare (Realtek Audio)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Background filters component
const BackgroundFiltersControl = () => {
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
    return (
      <div className="text-center text-sm text-gray-400 mt-2">
        Dispozitivul dvs. nu suportă filtre de fundal
      </div>
    );
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
    <div className="w-full max-w-md">
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div
          className={`aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 border transition-colors flex items-center justify-center ${
            activeEffect.type === "none"
              ? "border-blue-500 bg-blue-900/30 shadow-md"
              : "border-gray-700 bg-transparent"
          }`}
          onClick={handleDisableFilter}
        >
          <span className={`text-xs text-center ${activeEffect.type === "none" ? "text-white font-medium" : ""}`}>Niciunul</span>
        </div>
        
        {BLUR_INTENSITIES.map((blur, index) => (
          <div
            key={`blur-${index}`}
            className={`aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 border transition-colors flex items-center justify-center ${
              activeEffect.type === "blur" && activeEffect.intensity === blur.value
                ? "border-blue-500 bg-blue-900/30 shadow-md"
                : "border-gray-700 bg-gray-800"
            }`}
            onClick={() => handleApplyBlur(blur.value, blur.name)}
          >
            <span className={`text-xs text-center ${
              activeEffect.type === "blur" && activeEffect.intensity === blur.value 
                ? "text-white font-medium" 
                : ""
            }`}>{blur.name}</span>
          </div>
        ))}
        
        {allBackgrounds.map((bg, index) => (
          <div
            key={`bg-${index}`}
            className={`aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 border transition-colors flex items-center justify-center ${
              activeEffect.type === "image" && activeEffect.url === bg.url
                ? "border-blue-500 bg-blue-900/30 shadow-md"
                : "border-gray-700 bg-gray-800"
            }`}
            onClick={() => handleApplyImage(bg.url, bg.name)}
          >
            <span className={`text-xs text-center ${
              activeEffect.type === "image" && activeEffect.url === bg.url 
                ? "text-white font-medium" 
                : ""
            }`}>{bg.name}</span>
          </div>
        ))}
        
        <div
          className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 border border-gray-700 flex items-center justify-center bg-gray-800"
          onClick={uploadNewBackground}
        >
          <div className="flex flex-col items-center">
            <Plus size={16} className="text-gray-400" />
            <span className="text-xs text-center text-gray-400">Adaugă</span>
          </div>
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-400 flex items-center">
          <Upload size={12} className="mr-1" />
          <span>Încarcă de pe calculator</span>
        </div>
        <CameraTips />
      </div>
    </div>
  );
};

// Camera settings component
const CameraSettings = () => {
  const [settings, setSettings] = useState({
    hd: true,
    beautify: false,
    mirror: true,
    autoLight: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Video HD</span>
          <span className="text-xs text-gray-400">Folosește video de calitate superioară</span>
        </div>
        <Switch 
          checked={settings.hd} 
          onCheckedChange={(checked: boolean) => updateSetting('hd', checked)} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Îmbunătățire Aspect</span>
          <span className="text-xs text-gray-400">Netezește aspectul</span>
        </div>
        <Switch 
          checked={settings.beautify} 
          onCheckedChange={(checked: boolean) => updateSetting('beautify', checked)} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Oglindește Video</span>
          <span className="text-xs text-gray-400">Inversează orizontal</span>
        </div>
        <Switch 
          checked={settings.mirror} 
          onCheckedChange={(checked: boolean) => updateSetting('mirror', checked)} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Ajustare Lumină Scăzută</span>
          <span className="text-xs text-gray-400">Îmbunătățește video în lumină scăzută</span>
        </div>
        <Switch 
          checked={settings.autoLight} 
          onCheckedChange={(checked: boolean) => updateSetting('autoLight', checked)} 
        />
      </div>

      <div className="flex justify-end mt-2">
        <CameraTips />
      </div>
    </div>
  );
};

// Audio settings component
const AudioSettings = () => {
  const [settings, setSettings] = useState({
    noiseCancellation: true,
    autoAdjustVolume: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Anulare Zgomot</span>
          <span className="text-xs text-gray-400">Reduce zgomotul de fundal</span>
        </div>
        <Switch 
          checked={settings.noiseCancellation} 
          onCheckedChange={(checked: boolean) => updateSetting('noiseCancellation', checked)} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Echilibrează nivelurile de volum</span>
          <span className="text-xs text-gray-400">Echilibrează nivelurile de volum</span>
        </div>
        <Switch 
          checked={settings.autoAdjustVolume} 
          onCheckedChange={(checked: boolean) => updateSetting('autoAdjustVolume', checked)} 
        />
      </div>
    </div>
  );
};

// No Camera UI component
const NoCameraUI = () => {
  return (
    <div className="h-[450px] w-[600px] rounded-xl bg-gray-800 flex flex-col items-center justify-center gap-4 border border-gray-700">
      <VideoOff size={48} className="text-gray-400" />
      <div className="text-center">
        <h3 className="font-medium text-lg">Nu s-a detectat camera</h3>
        <p className="text-sm text-gray-400 mt-1 max-w-[250px]">
          Conectează o cameră sau intră cu camera oprită
        </p>
      </div>
    </div>
  );
};

export const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const call = useCall();
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [activeTab, setActiveTab] = useState("video");

  if (!call) throw new Error("useCall must be used within StreamCall component.");

  // Get settings from call data
  const settings = call.state.custom?.settings || {};
  const {
    defaultMuteAudio = false,
    defaultMuteVideo = false,
    allowChat = true,
    allowRaiseHand = true,
    defaultLayout = "speaker-left",
    autoRecording = false,
    requireApproval = false,
    allowScreenShare = true,
    maxParticipants = 10,
    waitingRoom = false
  } = settings;

  useEffect(() => {
    // Apply default audio/video settings
    setIsMicCamToggledOn(defaultMuteAudio || defaultMuteVideo);
  }, [defaultMuteAudio, defaultMuteVideo]);

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      // Check if camera is available before enabling
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          setHasCamera(videoDevices.length > 0);
          
          if (videoDevices.length > 0 && !defaultMuteVideo) {
            call?.camera.enable();
          }
          if (!defaultMuteAudio) {
            call?.microphone.enable();
          }
        })
        .catch(err => {
          console.error("Error checking media devices:", err);
          setHasCamera(false);
        });
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone, defaultMuteAudio, defaultMuteVideo]);

  return (
    <BackgroundFiltersProvider>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 text-white bg-transparent">
        <h1 className="text-2xl font-bold">Configurare</h1>

        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          {hasCamera && !isMicCamToggledOn ? (
            <VideoPreview className="h-[450px] w-[600px] bg-gray-800" />
          ) : (
            <NoCameraUI />
          )}
        </div>

        <div className="bg-gray-900/70 rounded-xl p-4 w-full max-w-md backdrop-blur-sm border border-white/10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="video" className="flex gap-2 items-center">
                <Image size={16} />
                <span>Fundal</span>
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex gap-2 items-center">
                <Settings size={16} />
                <span>Cameră</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex gap-2 items-center">
                <Volume2 size={16} />
                <span>Audio</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="video">
              <BackgroundFiltersControl />
            </TabsContent>
            
            <TabsContent value="camera">
              <CameraSettings />
            </TabsContent>
            
            <TabsContent value="audio">
              <AudioSettings />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <label className="flex items-center justify-center gap-2 font-medium bg-indigo-800/80 px-5 py-3 rounded-full border border-indigo-600 shadow-md">
              <input
                type="checkbox"
                checked={isMicCamToggledOn}
                onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <span>Intră cu microfonul și camera oprite</span>
            </label>
            <CustomDeviceSettings />
          </div>
        </div>

        <Button
          className="rounded-full bg-green-500 hover:bg-green-600 px-10 py-6 text-lg font-medium shadow-lg transition-all h-auto"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Intră în întâlnire
        </Button>
      </div>
    </BackgroundFiltersProvider>
  );
};
