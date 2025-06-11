import React from "react";
import Dashboard from "./dashboard/page";
import DashboardSidebar from "../components/dashboard-sidebar";
import { SidebarProvider } from "../../components/ui/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side: Sidebar */}
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar role="admin" title="Best Wishes" subtitle />
      </div>

      {/* Right side: Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* Breadcrumb Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              {/* Optional breadcrumb content */}
              <span className="text-gray-900 font-medium">Dashboard</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 bg-gray-50">
            <SidebarProvider><Dashboard /></SidebarProvider>
           
          </div>
        </div>
      </div>
    </div>
  );
}
