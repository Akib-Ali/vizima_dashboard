"use client"

import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Star,
  MapPin,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const dashboardStats = {
  totalProperties: { value: 24, change: "+2", trend: "up" },
  totalUsers: { value: 1567, change: "+89", trend: "up" },
  todayBookings: { value: 12, change: "+3", trend: "up" },
  weeklyBookings: { value: 89, change: "+15", trend: "up" },
  lifetimeBookings: { value: 2456, change: "+234", trend: "up" },
  vizimaBookings: { value: 1890, percentage: 77 },
  rentokBookings: { value: 566, percentage: 23 },
  monthlyRevenue: { value: 892000, change: "+18%", trend: "up" },
  validLeads: { value: 234, change: "+12", trend: "up" },
  spamLeads: { value: 45, change: "-8", trend: "down" },
  occupancyRate: { value: 87.5, change: "-2.1%", trend: "down" },
}

const recentBookings = [
  {
    id: "BK001",
    user: "John Doe",
    property: "Sunrise PG",
    room: "A-101",
    type: "Room",
    status: "confirmed",
    amount: 8500,
    date: "2024-01-15",
    source: "Vizima",
  },
  {
    id: "BK002",
    user: "Sarah Wilson",
    property: "Green Valley Hostel",
    room: "Visit",
    type: "Visit",
    status: "pending",
    amount: 0,
    date: "2024-01-16",
    source: "RentOk",
  },
  {
    id: "BK003",
    user: "Mike Johnson",
    property: "City Center PG",
    room: "C-301",
    type: "Room",
    status: "confirmed",
    amount: 9800,
    date: "2024-01-14",
    source: "Vizima",
  },
]

const topProperties = [
  { name: "Sunrise PG", occupancy: 95, revenue: "₹2,45,000", rating: 4.8, city: "Mumbai" },
  { name: "Green Valley Hostel", occupancy: 87, revenue: "₹1,89,000", rating: 4.6, city: "Pune" },
  { name: "City Center PG", occupancy: 92, revenue: "₹3,12,000", rating: 4.9, city: "Delhi" },
  { name: "Metro Heights", occupancy: 78, revenue: "₹1,56,000", rating: 4.4, city: "Bangalore" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalProperties.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {dashboardStats.totalProperties.change} from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardStats.totalUsers.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {dashboardStats.totalUsers.change} this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ₹{dashboardStats.monthlyRevenue.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {dashboardStats.monthlyRevenue.change} from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dashboardStats.occupancyRate.value}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              {dashboardStats.occupancyRate.change} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Today</span>
              <span className="font-semibold">{dashboardStats.todayBookings.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">This Week</span>
              <span className="font-semibold">{dashboardStats.weeklyBookings.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Lifetime</span>
              <span className="font-semibold">{dashboardStats.lifetimeBookings.value.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Vizima</span>
                <span className="font-semibold">{dashboardStats.vizimaBookings.value}</span>
              </div>
              <Progress value={dashboardStats.vizimaBookings.percentage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">RentOk</span>
                <span className="font-semibold">{dashboardStats.rentokBookings.value}</span>
              </div>
              <Progress value={dashboardStats.rentokBookings.percentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">Valid Leads</span>
              <span className="font-semibold text-green-600">{dashboardStats.validLeads.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-600">Spam Leads</span>
              <span className="font-semibold text-red-600">{dashboardStats.spamLeads.value}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="font-semibold">
                  {Math.round(
                    (dashboardStats.validLeads.value /
                      (dashboardStats.validLeads.value + dashboardStats.spamLeads.value)) *
                      100,
                  )}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests and confirmations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {booking.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{booking.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.property} - {booking.room}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {booking.source}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {booking.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {booking.amount > 0 && <p className="text-sm font-medium">₹{booking.amount.toLocaleString()}</p>}
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Properties</CardTitle>
            <CardDescription>Properties with highest occupancy and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{property.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{property.occupancy}% occupied</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {property.rating}
                        </div>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.city}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{property.revenue}</p>
                    <p className="text-xs text-muted-foreground">this month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>API health and system warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Payment Gateway</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">RentOk Sync</p>
                  <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Database Backup</p>
                  <p className="text-xs text-muted-foreground">Scheduled in 2 hours</p>
                </div>
              </div>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
