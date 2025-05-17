import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "ToKu",
  description: "Modern Next.js powered Video calling app",
  icons: {
    icon: '/favicon.ico?v=2',
    apple: '/apple-icon.png?v=2',
  },
  keywords: [
    "reactjs",
    "nextjs",
    "react",
    "getstream",
    "stream",
    "shadcn",
    "shadcn-ui",
    "radix-ui",
    "cn",
    "clsx",
    "zoom-clone",
    "realtime-video",
    "realtime-chat",
    "live-audio",
    "live-video",
    "live-chat",
    "radix-toast",
    "lucide-react",
    "next-themes",
    "postcss",
    "prettier",
    "react-dom",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "ts",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
  ] as Array<string>,
  authors: {
    name: "Alexandru Armas",
    url: "https://github.com/mrarmas02",
  },
} as const;

export const links = {
  sourceCode: "https://github.com/alexandruarmas/ToKu",
} as const;
