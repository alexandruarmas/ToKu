import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { links } from "@/config";
import { MobileNav } from "./mobile-nav";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center min-h-[64px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center rounded-xl p-1 bg-transparent hover:bg-white/5 transition-all">
              <Image
                src="/apple-icon.png"
                alt="App logo"
                width={55}
                height={55}
                className="w-10 h-10 sm:w-[55px] sm:h-[55px]"
              />
            </div>
            <p className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 max-sm:hidden font-title">
              Ioom
            </p>
          </Link>
        </div>

        {/* Spacer to push content to right */}
        <div className="flex-grow"></div>

        {/* Right side section */}
        <div className="flex items-center gap-3">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <SignedIn>
              <UserButton 
                data-testid="user-button"
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-[48px] h-[48px] rounded-xl border-2 border-white/20 hover:border-white/40 transition-colors"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile view */}
          <div className="sm:hidden">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-[32px] h-[32px] rounded-xl border-2 border-white/20 hover:border-white/40 transition-colors"
                  }
                }}
              />
            </SignedIn>
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};
