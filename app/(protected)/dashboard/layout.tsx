import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-slate-900 text-white">
          <div className="w-64 bg-slate-800 p-4 hidden md:block">
            <h1 className="text-xl font-bold mb-6">Video App</h1>
            <nav className="space-y-2">
              <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-slate-700">Dashboard</a>
              <a href="/dashboard/personal-room" className="block py-2 px-4 rounded hover:bg-slate-700">Personal Room</a>
              <a href="/dashboard/recordings" className="block py-2 px-4 rounded hover:bg-slate-700">Recordings</a>
              <a href="/dashboard/upcoming" className="block py-2 px-4 rounded hover:bg-slate-700">Upcoming</a>
              <a href="/dashboard/previous" className="block py-2 px-4 rounded hover:bg-slate-700">Previous</a>
            </nav>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-slate-800 p-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Welcome</h2>
              <form action="/sign-out" method="post">
                <button type="submit" className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Sign Out</button>
              </form>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function RedirectToSignIn() {
  redirect("/sign-in");
  return null;
} 