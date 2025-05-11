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

const pirataOne = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--font-pirata-one" });

type ViewMode = "list" | "stats";

const RecordingsPage = () => {
  const { toast } = useToast();
  const { callRecordings } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  
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
        toast({ title: "Could not load recordings. Try again later." });
      }
    };

    fetchRecordings();
  }, [callRecordings, toast]);

  const hasRecordings = recordings.length > 0;
  
  const statusText = hasRecordings
    ? `${recordings.length} recording${recordings.length !== 1 ? 's' : ''}` 
    : "No recordings";

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

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${pirataOne.className}`}>Recordings</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Recorded meetings</span>}
      statusText={statusText}
      iconColor="bg-blue-400"
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {hasRecordings ? (
        <div className="space-y-6">
          {/* View Mode Selector */}
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Recording List
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Statistics
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
                    placeholder="Search recordings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-dark-2 border-none text-white"
                  />
                </div>
                <Button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  variant="outline"
                  className="bg-dark-2 border-none text-white hover:bg-dark-3"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4 mr-2" />
                  ) : (
                    <SortDesc className="h-4 w-4 mr-2" />
                  )}
                  Sort by Date
                </Button>
              </div>

              {/* Recording List */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Recording List</h2>
                <CallList 
                  type="recordings" 
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                />
              </div>
            </>
          ) : (
            /* Statistics View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Video className="h-8 w-8 mb-4 text-blue-400" />
                <h3 className="text-lg font-medium mb-2">Total Recordings</h3>
                <p className="text-3xl font-bold">{stats?.totalRecordings || 0}</p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 mb-4 text-emerald-400" />
                <h3 className="text-lg font-medium mb-2">Total Duration</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.totalDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 mb-4 text-amber-400" />
                <h3 className="text-lg font-medium mb-2">Average Duration</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.averageDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Calendar className="h-8 w-8 mb-4 text-purple-400" />
                <h3 className="text-lg font-medium mb-2">Last Recording</h3>
                <p className="text-xl font-bold">{stats?.mostRecentRecording || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-dark-2 p-4 mb-4">
            <Video className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No recordings found</h3>
          <p className="text-gray-400">Start a meeting and record it to see your recordings here</p>
        </div>
      )}
    </PageLayout>
  );
};

export default RecordingsPage;
