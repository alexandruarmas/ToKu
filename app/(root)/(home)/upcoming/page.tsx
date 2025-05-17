"use client";

import { CallList } from "@/components/call-list";
import { PageLayout } from "@/components/page-layout";
import { useGetCalls } from "@/hooks/use-get-calls";
import { Prosto_One } from "next/font/google";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc, Calendar } from "lucide-react";
import Image from "next/image";

const prostoOne = Prosto_One({ subsets: ["latin"], weight: "400", variable: "--font-prosto-one" });

const UpcomingPage = () => {
  const { upcomingCalls } = useGetCalls();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const hasUpcomingCalls = upcomingCalls && upcomingCalls.length > 0;
  
  const statusText = hasUpcomingCalls 
    ? `${upcomingCalls.length} întâlnire${upcomingCalls.length !== 1 ? ' viitoare' : ' viitoare'}` 
    : "Nu există întâlniri viitoare";

  return (
    <PageLayout
      title={<span className={`flex justify-center w-full ${prostoOne.className}`}>Viitoare</span>}
      subtitle={<span className="flex justify-center w-full font-subtitle">Întâlniri programate</span>}
      statusText={statusText}
      iconColor="bg-emerald-400"
      bgGradient="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="space-y-6">
        {/* Search and Sort Controls */}
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
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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

        {/* Meeting List or Empty State */}
        {hasUpcomingCalls ? (
          <>
            <h2 className="text-2xl font-semibold">Listă Întâlniri</h2>
            <CallList type="upcoming" searchQuery={searchQuery} sortOrder={sortOrder} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-dark-2 p-4 mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nu există întâlniri viitoare</h3>
            <p className="text-gray-400">Programează o întâlnire din pagina principală pentru a începe</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UpcomingPage;
