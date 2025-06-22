"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/pages/Dashboard";
import Members from "@/components/pages/Members";
import Roles from "@/components/pages/Roles";
import Messages from "@/components/pages/Messages";

const pageComponents = {
  dashboard: Dashboard,
  members: Members,
  roles: Roles,
  messages: Messages,
};

export default function DashboardLayout() {
  const { state } = useDashboard();

  const CurrentPageComponent =
    pageComponents[state.currentPage as keyof typeof pageComponents] ||
    Dashboard;
  return (
    <div className="min-h-screen theme-bg-primary transition-colors duration-300">
      <div className="flex h-screen theme-bg-primary transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden theme-bg-primary transition-colors duration-300">
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <main className="flex-1 overflow-auto theme-bg-primary transition-colors duration-300">
            <CurrentPageComponent />
          </main>
        </div>
      </div>
    </div>
  );
}
