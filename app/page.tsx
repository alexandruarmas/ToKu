import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-black text-white p-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6">Virtual Meetings, Simplified</h1>
        <p className="text-xl mb-10">Connect with anyone, anywhere with our secure video conferencing platform</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/sign-in" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="px-8 py-3 bg-transparent border border-white hover:bg-white/10 rounded-lg font-medium transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
} 