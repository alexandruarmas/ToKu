"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          className="bg-slate-800 p-4 rounded-lg cursor-pointer"
          onClick={() => router.push('/dashboard/meeting/new')}
        >
          <h2 className="text-lg font-semibold">Start Instant Meeting</h2>
          <p className="text-sm text-slate-300">Start a meeting and invite participants instantly</p>
        </div>
        
        <div 
          className="bg-slate-800 p-4 rounded-lg cursor-pointer"
          onClick={() => router.push('/dashboard/personal-room')}
        >
          <h2 className="text-lg font-semibold">Personal Room</h2>
          <p className="text-sm text-slate-300">Join or manage your personal meeting room</p>
        </div>
        
        <div 
          className="bg-slate-800 p-4 rounded-lg cursor-pointer"
          onClick={() => router.push('/dashboard/upcoming')}
        >
          <h2 className="text-lg font-semibold">Schedule</h2>
          <p className="text-sm text-slate-300">Create or edit upcoming meetings</p>
        </div>
      </div>
    </div>
  );
} 