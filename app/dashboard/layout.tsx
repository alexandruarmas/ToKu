import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get auth state using Clerk's currentUser function (server-side only)
  const user = await currentUser();

  // If user is not authenticated, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
  }

  // If user is authenticated, render the dashboard layout with children
  return (
    <div className="dashboard-layout">
      {/* You can add dashboard-specific layout elements here, like a sidebar */}
      <main>{children}</main>
    </div>
  );
} 