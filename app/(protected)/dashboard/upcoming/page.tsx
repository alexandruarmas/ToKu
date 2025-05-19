"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function UpcomingMeetingsPage() {
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <PlusCircle size={18} />
          <span>Schedule Meeting</span>
        </button>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex border-b border-slate-700 mb-6">
          <button 
            className={`px-4 py-2 ${activeTab === 'day' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400'}`}
            onClick={() => setActiveTab('day')}
          >
            Day
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'week' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400'}`}
            onClick={() => setActiveTab('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'month' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400'}`}
            onClick={() => setActiveTab('month')}
          >
            Month
          </button>
        </div>
        
        {/* Empty state */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700 mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No upcoming meetings</h3>
          <p className="text-slate-400 text-sm">
            Schedule a new meeting to get started
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
} 