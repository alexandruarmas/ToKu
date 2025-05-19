export default function PreviousMeetingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Previous Meetings</h1>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <select className="bg-slate-700 border-none rounded px-2 py-1">
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search meetings" 
              className="bg-slate-700 border-none rounded px-3 py-1 pl-8"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
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
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No previous meetings</h3>
          <p className="text-slate-400 text-sm">
            Your meeting history will appear here
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
            Start a Meeting
          </button>
        </div>
      </div>
    </div>
  );
} 