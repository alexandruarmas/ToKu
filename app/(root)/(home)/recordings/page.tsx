"use client";

import { useState, useEffect } from "react";
import { CallList } from "@/components/call-list";
import { PageLayout } from "@/components/page-layout";
import { useGetCalls } from "@/hooks/use-get-calls";
import { useToast } from "@/components/ui/use-toast";
import { type CallRecording } from "@stream-io/video-react-sdk";
import { Pirata_One } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc, Video, Clock, Calendar, BarChart2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useGridLayout } from "@/hooks/use-grid-layout";
import { useRouter } from "next/navigation";
import { useBackground } from "@/providers/background-provider";

const pirataOne = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--font-pirata-one" });

type ViewMode = "list" | "stats";

const RecordingsPage = () => {
  const { toast } = useToast();
  const { callRecordings } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { getGridLayoutClasses } = useGridLayout();
  const router = useRouter();
  const { backgroundType } = useBackground();
  
  useEffect(() => {
    const fetchRecordings = async () => {
      if (!callRecordings) return;

      try {
        const callData = await Promise.all(
          callRecordings.map((call) => call.queryRecordings())
        );

        const recordingsData = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordingsData);
      } catch (error) {
        toast({ title: "Nu s-au putut încărca înregistrările. Încercați din nou mai târziu." });
      }
    };

    fetchRecordings();
  }, [callRecordings, toast]);

  const hasRecordings = recordings.length > 0;
  
  const statusText = hasRecordings
    ? `${recordings.length} înregistrare${recordings.length !== 1 ? 'i' : ''}` 
    : "Fără înregistrări";

  // Calculate recording statistics
  const stats = hasRecordings ? {
    totalRecordings: recordings.length,
    totalDuration: recordings.reduce((acc, recording) => {
      const duration = new Date(recording.end_time).getTime() - new Date(recording.start_time).getTime();
      return acc + duration;
    }, 0),
    averageDuration: recordings.reduce((acc, recording) => {
      const duration = new Date(recording.end_time).getTime() - new Date(recording.start_time).getTime();
      return acc + duration;
    }, 0) / recordings.length,
    mostRecentRecording: format(
      new Date(recordings[0].start_time),
      "MMMM d, yyyy"
    ),
  } : null;

  const handleViewModeChange = (value: string) => {
    setViewMode(value as ViewMode);
  };

  // Theme color mapping based on backgroundType
  const getThemeColors = () => {
    // Matrix theme (green)
    if (backgroundType === 'matrix-heart') {
      return {
        iconBgFrom: "from-[#00FF4C]/20",
        iconBgTo: "to-[#00B840]/20",
        iconBorder: "border-[#00FF4C]/30",
        iconColor: "text-[#00FF4C]",
        buttonBg: "bg-[#00FF4C]",
        buttonHover: "hover:bg-[#00E040]",
        shadowColor: "shadow-[#00FF4C]/10"
      };
    }
    // Crystal theme (purple)
    else if (backgroundType === 'crystal-aurora') {
      return {
        iconBgFrom: "from-[#A571D0]/20",
        iconBgTo: "to-[#E17BAF]/20",
        iconBorder: "border-[#A571D0]/30",
        iconColor: "text-[#A571D0]",
        buttonBg: "bg-[#A571D0]",
        buttonHover: "hover:bg-[#9560C0]",
        shadowColor: "shadow-[#A571D0]/10"
      };
    }
    // Starfield theme (keep blue for this one)
    else if (backgroundType === 'starfield') {
      return {
        iconBgFrom: "from-[#63A0FF]/20",
        iconBgTo: "to-[#3D6FFF]/20",
        iconBorder: "border-[#63A0FF]/30",
        iconColor: "text-[#63A0FF]",
        buttonBg: "bg-[#63A0FF]",
        buttonHover: "hover:bg-[#5490F0]",
        shadowColor: "shadow-[#63A0FF]/10"
      };
    }
    // Apple light theme (switch to orange/amber)
    else if (backgroundType === 'apple-light') {
      return {
        iconBgFrom: "from-amber-500/20",
        iconBgTo: "to-amber-600/10",
        iconBorder: "border-amber-500/30",
        iconColor: "text-amber-500",
        buttonBg: "bg-amber-500",
        buttonHover: "hover:bg-amber-600",
        shadowColor: "shadow-amber-500/10"
      };
    }
    
    // Apple dark theme (switch to teal)
    return {
      iconBgFrom: "from-teal-500/20",
      iconBgTo: "to-teal-600/10", 
      iconBorder: "border-teal-500/30",
      iconColor: "text-teal-400",
      buttonBg: "bg-teal-500",
      buttonHover: "hover:bg-teal-600",
      shadowColor: "shadow-teal-500/10"
    };
  };

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${pirataOne.className}`}>Înregistrări</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Întâlniri înregistrate</span>}
      statusText={statusText}
      iconColor={backgroundType === 'matrix-heart' ? "bg-[#00FF4C]" : 
                backgroundType === 'crystal-aurora' ? "bg-[#A571D0]" : 
                backgroundType === 'starfield' ? "bg-[#63A0FF]" : 
                backgroundType === 'apple-light' ? "bg-amber-500" : "bg-teal-500"}
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {hasRecordings ? (
        <div className="space-y-6 mx-auto max-w-4xl w-full px-4 sm:px-6">
          {/* View Mode Selector */}
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full flex justify-center">
            <TabsList className="w-full max-w-[400px] grid grid-cols-2">
              <TabsTrigger value="list" className="flex items-center justify-center gap-2">
                <Video className="h-4 w-4" />
                Listă Înregistrări
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center justify-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Statistici
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "list" ? (
            <>
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Caută înregistrări..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-dark-2 border-none text-white"
                  />
                </div>
                <Button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  variant="outline"
                  className="bg-dark-2 border-none text-white hover:bg-dark-3 w-full sm:w-auto"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4 mr-2" />
                  ) : (
                    <SortDesc className="h-4 w-4 mr-2" />
                  )}
                  Sortează după Dată
                </Button>
              </div>

              {/* Recording List */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Listă Înregistrări</h2>
                <CallList 
                  type="recordings" 
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                  appTheme={backgroundType}
                />
              </div>
            </>
          ) : (
            /* Statistics View */
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Video className={`h-8 w-8 mb-4 ${getThemeColors().iconColor}`} />
                <h3 className="text-lg font-medium mb-2">Total Înregistrări</h3>
                <p className="text-3xl font-bold">{stats?.totalRecordings || 0}</p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 mb-4 text-emerald-400" />
                <h3 className="text-lg font-medium mb-2">Durată Totală</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.totalDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 mb-4 text-amber-400" />
                <h3 className="text-lg font-medium mb-2">Durată Medie</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.averageDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Calendar className="h-8 w-8 mb-4 text-purple-400" />
                <h3 className="text-lg font-medium mb-2">Ultima Înregistrare</h3>
                <p className="text-xl font-bold">{stats?.mostRecentRecording || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto px-4">
          <div className={`rounded-full bg-gradient-to-br ${getThemeColors().iconBgFrom} ${getThemeColors().iconBgTo} p-6 mb-6 border ${getThemeColors().iconBorder} shadow-lg ${getThemeColors().shadowColor}`}>
            <Video className={`w-14 h-14 ${getThemeColors().iconColor}`} />
          </div>
          <h3 className={`text-2xl font-semibold mb-3 ${pirataOne.className} ${backgroundType === 'apple-light' ? "text-black" : ""}`}>Colecție de Înregistrări</h3>
          <p className={`text-lg ${backgroundType === 'apple-light' ? "text-black/80" : "text-gray-300"}`}>Începe o întâlnire video și înregistreaz-o pentru a adăuga conținut în colecția ta</p>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => router.push('/')}
              className={`${getThemeColors().buttonBg} ${getThemeColors().buttonHover} text-white`}
            >
              Creează Întâlnire Nouă
            </Button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default RecordingsPage;
