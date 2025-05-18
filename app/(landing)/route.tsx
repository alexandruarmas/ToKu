import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET() {
  // Redirect to home (this handles the root path)
  return NextResponse.redirect(new URL('/landing', 'http://localhost:3000'));
} 