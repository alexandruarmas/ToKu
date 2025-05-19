import type { PropsWithChildren } from "react";
import Script from "next/script";

const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Script 
        src="/mobile-fix.js" 
        strategy="afterInteractive"
      />
      <main>
        {children}
      </main>
    </>
  );
};

export default LandingLayout; 