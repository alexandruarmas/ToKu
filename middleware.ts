// @ts-nocheck
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Create route matchers for our protected and public routes
const protectedRoutes = createRouteMatcher(['/dashboard(.*)']);
const authRoutes = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

// Use a type assertion to handle the TypeScript issues
export default clerkMiddleware((auth, req) => {
  // If the user is not signed in and trying to access a protected route
  if (!auth.userId && protectedRoutes(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // If the user is signed in and trying to access auth routes
  if (auth.userId && authRoutes(req)) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Allow the request to continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (static image directory)
     * - *.png (image files)
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|.*\\.png$).*)',
  ],
}; 