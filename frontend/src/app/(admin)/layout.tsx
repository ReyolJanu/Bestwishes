import React from 'react';
import { SimpleSidebar } from './sidebar/simple-sidebar';

export default function Home() {
  return (
     <div className="flex">
      <SimpleSidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
        <p className="text-gray-600 mt-2">Select an option from the sidebar to get started.</p>
      </div>
    </div>
  )
}
