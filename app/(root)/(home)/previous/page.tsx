"use client";

import { CallList } from "@/components/call-list";
import { PageLayout } from "@/components/page-layout";
import { useGetCalls } from "@/hooks/use-get-calls";
import { Limelight } from "next/font/google";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc, Calendar, Clock, Users, BarChart2 } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Call } from "@stream-io/video-react-sdk";
import { useGridLayout } from "@/hooks/use-grid-layout";

const limelight = Limelight({ subsets: ["latin"], weight: "400", variable: "--font-limelight" });

type ViewMode = "list" | "stats";

const PreviousPage = () => {
  const { endedCalls } = useGetCalls();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const { getGridLayoutClasses } = useGridLayout();
  
  const hasEndedCalls = endedCalls && endedCalls.length > 0;
  
  const statusText = hasEndedCalls 
    ? `${endedCalls.length} întâlniri încheiate` 
    : "Nu există întâlniri încheiate";

  // Calculate meeting statistics
  const stats = hasEndedCalls ? {
    totalMeetings: endedCalls.length,
    totalDuration: endedCalls.reduce((acc, call: Call) => {
      const start = new Date(call.state.startsAt || Date.now());
      const end = new Date(call.state.endedAt || Date.now());
      return acc + (end.getTime() - start.getTime());
    }, 0),
    averageDuration: endedCalls.reduce((acc, call: Call) => {
      const start = new Date(call.state.startsAt || Date.now());
      const end = new Date(call.state.endedAt || Date.now());
      return acc + (end.getTime() - start.getTime());
    }, 0) / (endedCalls.length || 1),
    mostRecentMeeting: format(
      new Date(endedCalls[0].state.startsAt || Date.now()),
      "MMMM d, yyyy"
    ),
  } : null;

  const handleViewModeChange = (value: string) => {
    setViewMode(value as ViewMode);
  };

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${limelight.className}`}>Anterioare</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Întâlniri încheiate</span>}
      statusText={statusText}
      iconColor="bg-amber-400"
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {hasEndedCalls ? (
        <div className="space-y-6">
          {/* View Mode Selector */}
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Listă Întâlniri
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
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
                    placeholder="Caută întâlniri..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-dark-2 border-none text-white"
                  />
                </div>
                <Button
                  onClick={() => setSortOrder((prev) => prev === "asc" ? "desc" : "asc")}
                  variant="outline"
                  className="bg-dark-2 border-none text-white hover:bg-dark-3"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4 mr-2" />
                  ) : (
                    <SortDesc className="h-4 w-4 mr-2" />
                  )}
                  Sortează după Dată
                </Button>
              </div>

              {/* Meeting List */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Listă Întâlniri</h2>
                <CallList type="ended" />
              </div>
            </>
          ) : (
            /* Statistics View */
            <div className={`grid gap-6 ${getGridLayoutClasses()}`}>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Calendar className="h-8 w-8 mb-4 text-amber-400" />
                <h3 className="text-lg font-medium mb-2">Total Întâlniri</h3>
                <p className="text-3xl font-bold">{stats?.totalMeetings || 0}</p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 mb-4 text-emerald-400" />
                <h3 className="text-lg font-medium mb-2">Durată Totală</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.totalDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Users className="h-8 w-8 mb-4 text-blue-400" />
                <h3 className="text-lg font-medium mb-2">Durată Medie</h3>
                <p className="text-3xl font-bold">
                  {Math.round((stats?.averageDuration || 0) / (1000 * 60))}m
                </p>
              </div>
              <div className="bg-dark-2 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <BarChart2 className="h-8 w-8 mb-4 text-purple-400" />
                <h3 className="text-lg font-medium mb-2">Ultima Întâlnire</h3>
                <p className="text-xl font-bold">{stats?.mostRecentMeeting || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-dark-2 p-4 mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nu există întâlniri anterioare</h3>
          <p className="text-gray-400 max-w-md">
            Întâlnirile finalizate vor apărea aici. Începe o întâlnire din pagina principală pentru a începe.
          </p>
        </div>
      )}
    </PageLayout>
  );
};

export default PreviousPage;
