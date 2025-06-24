"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"
import {
  Building2,
  Users,
  Calendar,
  // CreditCard,
  // BarChart3,
  Settings,
  HelpCircle,
  Home,
  Bell,
  Search,
  Menu,
  MessageSquare,
  FileText,
  Clock,
  Bot,
  User,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
    description: "Overview & Analytics",
  },
  {
    icon: Building2,
    label: "Properties",
    href: "/dashboard/properties",
    count: 24,
    description: "Manage PG/Hostel Listings",
  },
  {
    icon: Calendar,
    label: "Bookings",
    href: "/dashboard/bookings",
    count: 12,
    description: "Booking Management",
  },
  {
    icon: Clock,
    label: "Appointments",
    href: "/dashboard/appointments",
    count: 8,
    description: "Visit Slot Manager",
  },
  {
    icon: Users,
    label: "Users",
    href: "/dashboard/users",
    count: 156,
    description: "User Management",
  },
  {
    icon: FileText,
    label: "CMS",
    href: "/dashboard/cms",
    description: "Content Management",
  },
  {
    icon: Bot,
    label: "Spam Detection",
    href: "/dashboard/spam",
    count: 5,
    description: "AI Lead Management",
  },
  {
    icon: MessageSquare,
    label: "Support Chat",
    href: "/dashboard/support",
    count: 3,
    description: "Live Chat Panel",
  },
  // {
  //   icon: CreditCard,
  //   label: "Payments",
  //   href: "/dashboard/payments",
  //   description: "Payment Gateway",
  // },
  // {
  //   icon: BarChart3,
  //   label: "Analytics",
  //   href: "/dashboard/analytics",
  //   description: "Reports & Insights",
  // },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
    description: "System Configuration",
  },
]

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className={`pb-12 min-h-screen bg-card border-r ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6 px-2">
            <div className="logo-container">
              <Image src="/images/logo.png" alt="Vizima Logo" width={120} height={40} className="dark:brightness-150" />
            </div>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3 btn-hover-effect",
                  pathname === item.href
                    ? "bg-primary/10 text-primary hover:bg-primary/20 border-l-2 border-primary nav-item-active"
                    : "hover:bg-accent",
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.count && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New booking request", time: "5 min ago" },
    { id: 2, title: "Payment received", time: "1 hour ago" },
    { id: 3, title: "New user registered", time: "3 hours ago" },
  ])

  const currentPage = sidebarItems.find((item) => item.href === pathname)
  const [parsedUser, setParsedUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  console.log("parsed user", parsedUser)

  useEffect(() => {
    const getUser = localStorage.getItem("admin-info");
    const user = getUser ? JSON.parse(getUser) : null;
    setParsedUser(user);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="hidden lg:block w-80">
            <Sidebar />
          </div>
        </Suspense>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card border-b px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-80">
                    <Sidebar />
                  </SheetContent>
                </Sheet>
                <div>
                  <h1 className="text-2xl font-bold">{currentPage?.label || "Dashboard"}</h1>
                  <p className="text-muted-foreground">{currentPage?.description || "Welcome back, Admin!"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search..." className="pl-10 w-64" />
                </div>

                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {notifications.length}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center font-medium text-sm cursor-pointer">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/images/admin.jpg" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{parsedUser?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{parsedUser?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard/profile")} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/support")} className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/login")} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
