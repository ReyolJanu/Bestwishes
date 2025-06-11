"use client"

import * as React from "react"
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
  Home,
  Eye,
  Edit,
  Activity,
  Search,
  Plus,
  Calculator,
  Clock,
  CreditCard,
  RefreshCw,
  Archive,
  UserCheck,
  Palette,
  Star,
  Calendar,
  TrendingUp,
  DollarSign,
  UserPlus,
  ShoppingBag,
  Shield,
  Monitor,
  User,
  Key,
  Bell,
  Menu,
  X,
  ChevronRight,
  Heart,
  ShoppingBasket,
  Truck,
  HelpCircle,
  MessageSquare,
  CreditCardIcon,
  Bookmark,
} from "lucide-react"

// Navigation data configuration for each role
const getNavigationData = (role) => {
  switch (role) {
    case "admin":
      return [
        {
          title: "Dashboard",
          icon: BarChart3,
          items: [
            { title: "Overview ", icon: Home, href: "/admin/dashboard/overview" },
            { title: "Product Profit Analysis", icon: TrendingUp, href: "/admin/dashboard/profit-analysis" },
            { title: " Profit/Loss Calculation", icon: FileText, href: "/admin/dashboard/funnel" },
          ],
        },
        {
          title: "Users Management",
          icon: Users,
          items: [
            { title: "View Users List", icon: Users, href: "/admin/users/list" },
            { title: "Edit/Delete Users", icon: Edit, href: "/admin/users/manage" },
            { title: "User Activity", icon: Activity, href: "/admin/users/activity" },
            { title: "Manage User Status", icon: UserCheck, href: "/admin/users/status" },
            { title: "Search Users", icon: Search, href: "/admin/users/search" },
          ],
        },
        {
          title: "Products Management",
          icon: Package,
          items: [
            { title: "Product List", icon: FileText, href: "/admin/products/list" },
            { title: "Add New Product", icon: Plus, href: "/admin/products/add" },
            { title: "Edit Existing Products", icon: Edit, href: "/admin/products/edit" },
            { title: "Manage Categories", icon: FileText, href: "/admin/products/categories" },
            { title: "Inventory Management", icon: FileText, href: "/admin/products/inventory" },
            { title: "Out of Stock", icon: Archive, href: "/admin/products/stock" },
            { title: "Profit/Loss Calculation", icon: Calculator, href: "/admin/products/profit" },
          ],
        },
        {
          title: "Orders Management",
          icon: ShoppingCart,
          items: [
            { title: "View All Orders", icon: Eye, href: "/admin/orders/all" },
            { title: "Edit Order Status", icon: Edit, href: "/admin/orders/status" },
            { title: "Order Details", icon: CreditCard, href: "/admin/orders/details" },
            { title: "Refunds & Cancellations", icon: RefreshCw, href: "/admin/orders/refunds" },
            { title: "Order History", icon: Clock, href: "/admin/orders/history" },
            { title: "Bulk Processing", icon: Archive, href: "/admin/orders/bulk" },
          ],
        },
        {
          title: "Surprise Gift Orders",
          icon: Gift,
          items: [
            { title: "Track Gift Orders", icon: Eye, href: "/admin/gifts/track" },
            { title: "Assign to Delivery Staff", icon: UserCheck, href: "/admin/gifts/assign" },
            { title: "Manage Customizations", icon: Palette, href: "/admin/gifts/customize" },
            { title: "Special Notes", icon: FileText, href: "/admin/gifts/notes" },
          ],
        },
        {
          title: "Banner & Homepage",
          icon: ImageIcon,
          items: [
            { title: "Homepage Banners", icon: ImageIcon, href: "/admin/homepage/banners" },
            { title: "Featured Products", icon: Star, href: "/admin/homepage/featured" },
            { title: "Hero Section", icon: Home, href: "/admin/homepage/hero" },
            { title: "Event Section", icon: Calendar, href: "/admin/homepage/events" },
          ],
        },
        {
          title: "Reports & Analytics",
          icon: FileText,
          items: [
            { title: "Sales Reports - Daily", icon: TrendingUp, href: "/admin/reports/sales/daily" },
            { title: "Sales Reports - Weekly", icon: TrendingUp, href: "/admin/reports/sales/weekly" },
            { title: "Sales Reports - Monthly", icon: TrendingUp, href: "/admin/reports/sales/monthly" },
            { title: "Sales Reports - Yearly", icon: TrendingUp, href: "/admin/reports/sales/yearly" },
            { title: "Custom Date Filter", icon: Calendar, href: "/admin/reports/sales/custom" },
            { title: "Profit/Loss Breakdown", icon: Calculator, href: "/admin/reports/sales/breakdown" },
            { title: "Category-Wise Revenue", icon: DollarSign, href: "/admin/reports/revenue/category" },
            // { title: "Product-Wise Revenue", icon: DollarSign, href: "/admin/reports/revenue/product" },
            // { title: "Regional Revenue", icon: DollarSign, href: "/admin/reports/revenue/regional" },
            // { title: "Active Users", icon: UserPlus, href: "/admin/reports/engagement/active" },
            // { title: "Purchase Behavior", icon: UserPlus, href: "/admin/reports/engagement/behavior" },
            // { title: "Sales Trends", icon: ShoppingBag, href: "/admin/reports/orders/trends" },
            // { title: "Delivery Performance", icon: ShoppingBag, href: "/admin/reports/orders/delivery" },
            // { title: "Suspicious Activity", icon: Shield, href: "/admin/reports/security/activity" },
            // { title: "System Performance", icon: Monitor, href: "/admin/reports/security/performance" },
          ],
        },
        {
          title: "Settings",
          icon: Settings,
          items: [
            { title: "Admin Profile", icon: User, href: "/admin/settings/profile" },
            { title: "Change Password", icon: Key, href: "/admin/settings/password" },
            { title: "Notifications", icon: Bell, href: "/admin/settings/notifications" },
            { title: "System Settings", icon: Settings, href: "/admin/settings/system" },
            { title: "Backup & Restore", icon: Archive, href: "/admin/settings/backup" },
          ],
        },
      ]

    case "user":
      return [
        {
          title: "Dashboard",
          icon: Home,
          items: [
            { title: "Account Overview", icon: Home, href: "/user/dashboard/overview" },
            { title: "Recent Activity", icon: Activity, href: "/user/dashboard/activity" },
            { title: "Quick Actions", icon: Plus, href: "/user/dashboard/actions" },
          ],
        },
        {
          title: "My Orders",
          icon: ShoppingBag,
          items: [
            { title: "Current Orders", icon: ShoppingBag, href: "/user/orders/current" },
            { title: "Order History", icon: Clock, href: "/user/orders/history" },
            { title: "Track Orders", icon: Truck, href: "/user/orders/track" },
            { title: "Return & Exchange", icon: RefreshCw, href: "/user/orders/returns" },
            { title: "Order Details", icon: Eye, href: "/user/orders/details" },
          ],
        },
        {
          title: "Wishlist & Favorites",
          icon: Heart,
          items: [
            { title: "My Wishlist", icon: Heart, href: "/user/wishlist" },
            { title: "Favorite Products", icon: Star, href: "/user/favorites" },
            { title: "Saved Collections", icon: Bookmark, href: "/user/collections" },
            { title: "Recently Viewed", icon: Eye, href: "/user/recent" },
          ],
        },
        {
          title: "Account Management",
          icon: User,
          items: [
            { title: "Profile Settings", icon: User, href: "/user/account/profile" },
            { title: "Shipping Addresses", icon: Home, href: "/user/account/addresses" },
            { title: "Payment Methods", icon: CreditCardIcon, href: "/user/account/payment" },
            { title: "Change Password", icon: Key, href: "/user/account/password" },
            { title: "Privacy Settings", icon: Shield, href: "/user/account/privacy" },
          ],
        },
        {
          title: "Notifications",
          icon: Bell,
          items: [
            { title: "Order Updates", icon: Bell, href: "/user/notifications/orders" },
            { title: "Promotional Offers", icon: Gift, href: "/user/notifications/offers" },
            { title: "Account Alerts", icon: Shield, href: "/user/notifications/alerts" },
            { title: "Notification Settings", icon: Settings, href: "/user/notifications/settings" },
          ],
        },
        {
          title: "Support & Help",
          icon: HelpCircle,
          items: [
            { title: "Help Center", icon: HelpCircle, href: "/user/support/help" },
            { title: "Contact Support", icon: MessageSquare, href: "/user/support/contact" },
            { title: "Live Chat", icon: MessageSquare, href: "/user/support/chat" },
            { title: "FAQ", icon: FileText, href: "/user/support/faq" },
          ],
        },
      ]

    case "customer":
      return [
        {
          title: "Shop",
          icon: ShoppingBag,
          items: [
            { title: "Browse All Products", icon: Search, href: "/shop/browse" },
            { title: "Featured Items", icon: Star, href: "/shop/featured" },
            { title: "New Arrivals", icon: Package, href: "/shop/new" },
            { title: "Special Offers", icon: Gift, href: "/shop/offers" },
            { title: "Categories", icon: FileText, href: "/shop/categories" },
          ],
        },
        {
          title: "My Shopping",
          icon: ShoppingCart,
          items: [
            { title: "Shopping Cart", icon: ShoppingCart, href: "/customer/cart" },
            { title: "My Orders", icon: ShoppingBasket, href: "/customer/orders" },
            { title: "Order Tracking", icon: Truck, href: "/customer/tracking" },
            { title: "Wishlist", icon: Heart, href: "/customer/wishlist" },
            { title: "Recently Viewed", icon: Eye, href: "/customer/recent" },
          ],
        },
        {
          title: "Gift Services",
          icon: Gift,
          items: [
            { title: "Surprise Gifts", icon: Gift, href: "/customer/gifts/surprise" },
            { title: "Gift Cards", icon: CreditCardIcon, href: "/customer/gifts/cards" },
            { title: "Custom Gifts", icon: Palette, href: "/customer/gifts/custom" },
            { title: "Gift Tracking", icon: Eye, href: "/customer/gifts/track" },
          ],
        },
        {
          title: "My Account",
          icon: User,
          items: [
            { title: "Profile", icon: User, href: "/customer/account/profile" },
            { title: "Addresses", icon: Home, href: "/customer/account/addresses" },
            { title: "Payment Methods", icon: CreditCardIcon, href: "/customer/account/payment" },
            { title: "Order History", icon: Clock, href: "/customer/account/history" },
          ],
        },
        {
          title: "Customer Support",
          icon: HelpCircle,
          items: [
            { title: "Help Center", icon: HelpCircle, href: "/customer/support/help" },
            { title: "Contact Us", icon: MessageSquare, href: "/customer/support/contact" },
            { title: "Order Issues", icon: ShoppingCart, href: "/customer/support/orders" },
            { title: "Return Policy", icon: RefreshCw, href: "/customer/support/returns" },
            { title: "Live Chat", icon: MessageSquare, href: "/customer/support/chat" },
          ],
        },
      ]

    default:
      return []
  }
}

export default function DashboardSidebar({ role = "admin", title = "Best Wishes", subtitle }) {
  // Get navigation data based on role
  const navigationData = getNavigationData(role)

  // Set default subtitle based on role if not provided
  const defaultSubtitle =
    subtitle || (role === "admin" ? "Admin Dashboard" : role === "user" ? "User Portal" : "Customer Dashboard")

  // Set initial open sections based on role
  const getInitialOpenSections = (role) => {
    switch (role) {
      case "admin":
        return ["Dashboard", "Users Management", "Products Management"]
      case "user":
        return ["Dashboard", "My Orders"]
      case "customer":
        return ["Shop", "My Shopping"]
      default:
        return ["Dashboard"]
    }
  }

  const [openSections, setOpenSections] = React.useState(getInitialOpenSections(role))
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState(navigationData[0]?.items[0]?.title || "")

  const toggleSection = (section) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handleItemClick = (itemTitle) => {
    setActiveItem(itemTitle)
    setIsMobileOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative z-40 h-full w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:block flex flex-col
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black">
              {role === "admin" ? (
                <BarChart3 className="h-5 w-5 text-white" />
              ) : role === "user" ? (
                <User className="h-5 w-5 text-white" />
              ) : (
                <ShoppingBag className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                {title}
              </h1>
              <p className="text-xs text-gray-500">{defaultSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="text-xs font-medium mb-3  style={{ color: 'var(--primary)' }} uppercase tracking-wide" >Main Navigation</div>
            <nav className="space-y-1">
              {navigationData.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center justify-between px-2 py-2 text-left text-sm  hover:bg-gray-50 rounded transition-colors"style={{ color: 'var(--primary)' }}
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        openSections.includes(section.title) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSections.includes(section.title) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleItemClick(item.title)}
                          className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm rounded transition-colors ${
                            activeItem === item.title
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                          }`}
                        >
                          <item.icon className="h-3 w-3" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Log Out - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button className="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-gray-50 rounded transition-colors" style={{ color: 'var(--primary)' }}>
            <LogOut className="h-4 w-4"  />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="md:hidden w-10"></div>
            <span className="" style={{ color: 'var(--primary)',fontFamily: 'var(--font-sans)' }} >{ role === "admin" ? "Admin" : role === "user" ? "User" : "Customer"}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {role === "admin" ? "Admin Dashboard" : role === "user" ? "User Dashboard" : "Customer Dashboard"}
            </h1>
            <p className="text-gray-600">
              {role === "admin"
                ? "Here's an overview of your store's performance."
                : role === "user"
                  ? "Welcome back! Here's your account overview."
                  : "Welcome to your customer dashboard."}
            </p>
          </div>

          {/* Welcome Card */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                {role === "admin" ? (
                  <BarChart3 className="h-8 w-8" style={{ color: "var(--primary)" }} />
                ) : role === "user" ? (
                  <User className="h-8 w-8" style={{ color: "var(--primary)" }} />
                ) : (
                  <ShoppingBag className="h-8 w-8" style={{ color: "var(--primary)" }} />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to {title} {role === "admin" ? "Admin" : role === "user" ? "User Portal" : "Customer Dashboard"}
              </h3>
              <p className="text-gray-600">
                {role === "admin"
                  ? "Select any menu item from the sidebar to manage your store. All features are organized in the navigation menu."
                  : role === "user"
                    ? "Manage your account, track orders, and update your preferences using the sidebar navigation."
                    : "Browse products, track your orders, and manage your account using the sidebar navigation."}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
