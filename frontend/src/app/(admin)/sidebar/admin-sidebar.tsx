"use client";
import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Package,
  ChevronDown,
  ChevronRight,
  Home,
  LineChart,
  PieChart,
  UserCog,
  UserPlus,
  Search,
  PackagePlus,
  Edit,
  Layers,
  PackageCheck,
  AlertTriangle,
  LogOut,
} from "lucide-react";

type MenuItem = {
  title: string;
  icon?: React.ElementType;
  href?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
};

const AdminSidebar = () => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      expanded: true,
      submenu: [
        {
          title: "Overview of Key Metrics",
          icon: Home,
          href: "/dashboard/overview",
        },
        {
          title: "Product Profit Analysis",
          icon: LineChart,
          href: "/dashboard/product-profit",
        },
        {
          title: "Funnel Profit/Loss",
          icon: PieChart,
          href: "/dashboard/funnel-profit",
        },
      ],
    },
    {
      title: "Users Management",
      icon: Users,
      href: "/users",
      expanded: true,
      submenu: [
        { title: "View Users List", icon: Users, href: "/users/list" },
        { title: "Edit/Delete Users", icon: UserCog, href: "/users/edit" },
        { title: "User Activity", icon: UserPlus, href: "/users/activity" },
        { title: "Manage User Status", icon: UserCog, href: "/users/status" },
        { title: "Search Users", icon: Search, href: "/users/search" },
      ],
    },
    {
      title: "Products Management",
      icon: Package,
      href: "/products",
      expanded: true,
      submenu: [
        { title: "Product List", icon: Package, href: "/products/list" },
        { title: "Add New Product", icon: PackagePlus, href: "/products/add" },
        { title: "Edit Existing Product", icon: Edit, href: "/products/edit" },
        {
          title: "Manage Categories",
          icon: Layers,
          href: "/products/categories",
        },
        {
          title: "Inventory Management",
          icon: PackageCheck,
          href: "/products/inventory",
        },
        {
          title: "Out of Stock",
          icon: AlertTriangle,
          href: "/products/out-of-stock",
        },
      ],
    },
  ]);
  // Toggle submenu expansion
  const toggleSubmenu = (index: number) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };
  return (
   <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col" >
      {/* Header */}
      <div className="p-4 border-b border-gray-200" >
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <p className="text-sm text-gray-500">E-commerce Dashboard</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2 px-3">
          <p className="text-xs font-medium text-gray-500 mb-2">Main Navigation</p>
        </div>

        <nav className="px-2">
          {menuItems.map((item, index) => (
            <div key={item.title} className="mb-1">
              {/* Main menu item */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleSubmenu(index)}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
                  <span className="text-sm">{item.title}</span>
                </div>
                {item.submenu &&
                  (item.expanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  ))}
              </div>

              {/* Submenu */}
              {item.submenu && item.expanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href || "#"}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100"
                    >
                      {subItem.icon && <subItem.icon className="h-4 w-4 text-gray-500" />}
                      <span className="text-sm text-gray-700">{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Link
          href="/logout"
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
