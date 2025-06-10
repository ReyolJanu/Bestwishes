"use client";
import { useState } from "react";
import * as React from "react";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Gift,
  ImageIcon,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  TrendingUp,
  Calculator,
  Eye,
  Edit,
  Activity,
  UserCheck,
  Search,
  Plus,
  Layers,
  Warehouse,
  AlertTriangle,
  List,
  Truck,
  RefreshCw,
  Calendar,
  DollarSign,
  PieChart,
  Users2,
  MapPin,
  Shield,
  Monitor,
  User,
  Lock,
  Bell,
} from "lucide-react";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  expanded?: boolean;
  submenu?: { title: string; icon: React.ElementType }[];
};

export function SimpleSidebar() {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
    {
      title: "Dashboard",
      icon: BarChart3,
      expanded: false,
      submenu: [
        { title: "Overview of Key Metrics", icon: Home },
        { title: "Product Profit Analysis", icon: TrendingUp },
        { title: "Funnel Profit/Loss Calculation", icon: Calculator },
      ],
    },
    {
      title: "Users Management",
      icon: Users,
      expanded: false,
      submenu: [
        { title: "View Users List", icon: Eye },
        { title: "Edit/Delete Users", icon: Edit },
        { title: "User Activity (Logins, Orders, Reviews)", icon: Activity },
        {
          title: "Manage User Status (Active/Inactive, Block/Unblock)",
          icon: UserCheck,
        },
        { title: "Search Users by Name, Email, Order History", icon: Search },
      ],
    },
    {
      title: "Products Management",
      icon: Package,
      expanded: false,
      submenu: [
        { title: "Product List", icon: List },
        { title: "Add New Product", icon: Plus },
        { title: "Edit Existing Products", icon: Edit },
        { title: "Manage Product Categories", icon: Layers },
        { title: "Inventory Management", icon: Warehouse },
        { title: "Mark Products as Out of Stock", icon: AlertTriangle },
        { title: "Profit/Loss Calculation for Products", icon: Calculator },
      ],
    },
    {
      title: "Orders Management",
      icon: ShoppingCart,
      expanded: false,
      submenu: [
        { title: "View All Orders", icon: Eye },
        { title: "Edit Order Status", icon: Edit },
        { title: "Order Details (Shipping Info, Payment Status)", icon: List },
        { title: "Process Refunds and Cancellations", icon: RefreshCw },
        { title: "Order History", icon: Calendar },
        { title: "Bulk Order Processing", icon: Package },
      ],
    },
    {
      title: "Surprise Gift Orders",
      icon: Gift,
      expanded: false,
      submenu: [
        { title: "Track Surprise Gift Orders", icon: Eye },
        { title: "Assign Orders to Delivery Staff", icon: Truck },
        { title: "Manage Gift Customizations", icon: Edit },
        { title: "Add Special Notes or Preferences", icon: Plus },
      ],
    },
    {
      title: "Banner & Homepage Setups",
      icon: ImageIcon,
      expanded: false,
      submenu: [
        { title: "Manage Homepage Banners", icon: ImageIcon },
        { title: "Customize Featured Products/Offers", icon: Package },
        { title: "Manage Hero Section", icon: Home },
        { title: "Manage Event Section", icon: Calendar },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: FileText,
      expanded: false,
      submenu: [
        { title: "Sales Reports", icon: DollarSign },
        { title: "Daily, Weekly, Monthly, Yearly", icon: Calendar },
        { title: "Custom Date Filtering", icon: Calendar },
        { title: "Profit/Loss Breakdown", icon: PieChart },
        { title: "Revenue Breakdown", icon: TrendingUp },
        { title: "Category-Wise Revenue", icon: Layers },
        { title: "Product-Wise Revenue", icon: Package },
        { title: "Regional Revenue Breakdown", icon: MapPin },
        { title: "User Engagement Metrics", icon: Users2 },
        { title: "Active Users and Sign-Ups", icon: Users },
        { title: "User Purchase Behavior", icon: Activity },
        { title: "Order Analytics", icon: BarChart3 },
        { title: "Sales Trends", icon: TrendingUp },
        { title: "Delivery Performance", icon: Truck },
        { title: "Security Monitoring", icon: Shield },
        { title: "Suspicious Activity Logs", icon: AlertTriangle },
        { title: "System Performance Monitoring", icon: Monitor },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      expanded: false,
      submenu: [
        { title: "Admin Profile", icon: User },
        { title: "Change Password", icon: Lock },
        { title: "Notification Preferences", icon: Bell },
      ],
    },
  ]);

  const toggleMenu = (index: number) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <div className=" h-screen bg-red-200 border-r border-gray-200 overflow-y-auto">
      {/* Header */}

      <div className="flex justify-center items-center sm:block hidden">
        <span className="text-base font-bold text-gray-800 md:block hidden text-center p-2">
          Admin Panel
        </span>
      </div>
      {/* Navigation */}
      <div className="p-2">

        {menuItems.map((item, index) => (
          <div key={item.title} className="mb-1 ">
            {/* Main Menu Item */}
            <div
              className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu(index)}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-gray-600" />
                <span className="text-sm text-gray-700 md:block hidden ">{item.title}</span>
              </div>
              {item.submenu &&
                (item.expanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                ))}
            </div>

            {/* Submenu */}
            {item.submenu && item.expanded && (
              <div className="ml-6 mt-1">
                {item.submenu.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <subItem.icon className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {subItem.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

         {/* Log Out */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-red-50 cursor-pointer text-red-600">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
