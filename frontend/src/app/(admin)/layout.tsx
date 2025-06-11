import React from "react";

import DashboardSidebar  from '../components/dashboard-sidebar';
export default function Home() {
  return (
    <div className="h-screen flex">
      
     <DashboardSidebar role = "admin" title = "Best Wishes" subtitle />
    
    </div>
  );
}
