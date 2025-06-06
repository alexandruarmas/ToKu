import type { PropsWithChildren } from "react";
import { StreamClientProvider } from "@/providers/stream-client-provider";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div className="flex">
        <div className="flex-shrink-0 w-[72px] lg:w-[250px] max-sm:w-0"></div>
        <div className="flex-1 min-h-screen px-6 pt-28 pb-6 sm:px-14">
          <StreamClientProvider>
            <div className="w-full">{children}</div>
          </StreamClientProvider>
        </div>
      </div>
      <Sidebar />
    </main>
  );
};

export default HomeLayout;
