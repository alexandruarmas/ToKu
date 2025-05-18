import type { PropsWithChildren } from "react";

const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default LandingLayout; 