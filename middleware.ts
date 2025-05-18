import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Use the standard clerkMiddleware for authentication
export default clerkMiddleware();

// Update the matcher to ensure it doesn't interfere with the landing page or static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|landing|api|sign-in|sign-up).*)"],
};
