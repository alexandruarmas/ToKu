import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { links } from "@/config";

import { MobileNav } from "@/components/mobile-nav";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center rounded-xl p-2 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all">
            <Image
              src="/icons/yoom-logo.svg"
              alt="App logo"
              width={28}
              height={28}
              className="max-sm:size-8"
            />
          </div>
          <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 max-sm:hidden">
            Yoom
          </p>
        </Link>

        <div className="flex items-center gap-5">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "size-8 rounded-xl border-2 border-white/20 hover:border-white/40 transition-colors"
                }
              }}
            />
          </SignedIn>

          <Link
            href={links.sourceCode}
            target="_blank"
            rel="noreferrer noopener"
            title="Source Code"
            className="opacity-70 hover:opacity-100 transition-all hover:scale-105"
          >
            <Image 
              src="/icons/github.svg" 
              alt="GitHub" 
              height={22} 
              width={22} 
              className="invert"
            />
          </Link>

          <MobileNav />
        </div>
      </div>
    </nav>
  );
}; 