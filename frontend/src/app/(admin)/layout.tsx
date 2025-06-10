import React from "react";
import { SimpleSidebar } from './sidebar/simple-sidebar';

export default function Home() {
  return (
    <div className="h-screen flex">
      {/* Leftside (Sidebar) */}
      <div className="w-[14%] md:w-[16%] lg:w-[16%] xl:w-[14%] border-r-4 border-gray-300">
        {/* <AdminSidebar /> */}
        <SimpleSidebar />
      </div>

      {/* Rightside (Content area) */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] border-l-4 border-gray-200">
        {/* Content goes here */}
      </div>
    </div>
  );
}
