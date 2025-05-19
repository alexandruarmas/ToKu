"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function PersonalRoomPage() {
  const { user } = useUser();
  const userId = user?.id;
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const handleCopy = (text: string, isLink = false) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Personal Meeting Room</h1>
      
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-slate-400">Your Personal Meeting ID</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-mono">{userId?.substring(0, 6) || '------'}-{userId?.substring(6, 12) || '------'}</span>
            <button 
              className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded"
              onClick={() => {
                const id = `${userId?.substring(0, 6)}-${userId?.substring(6, 12)}`;
                handleCopy(id);
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-slate-400">Personal Meeting Link</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono truncate">
              {typeof window !== 'undefined' ? `${window.location.origin}/join/${userId}` : ''}
            </span>
            <button 
              className="text-xs whitespace-nowrap bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded"
              onClick={() => {
                const link = `${window.location.origin}/join/${userId}`;
                handleCopy(link, true);
              }}
            >
              {copiedLink ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
        
        <div className="pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Start Meeting
          </button>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Room Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Require passcode</span>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <span>Waiting room for guests</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Allow recording</span>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </div>
    </div>
  );
} 