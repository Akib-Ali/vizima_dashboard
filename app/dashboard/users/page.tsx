"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import {
  Filter,
  Download,
  Eye,
  Edit,
  Shield,
  ShieldCheck,
  ShieldX,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    city: "Mumbai",
    area: "Andheri West",
    status: "verified",
    tag: "Lead",
    bookings: 3,
    totalSpent: 25500,
    joinDate: "2024-01-10",
    lastActive: "2024-01-15",
    documents: {
      aadhar: true,
      pan: false,
      photo: true,
    },
    preferences: {
      budget: "10000-15000",
      roomType: "Single",
      amenities: ["WiFi", "AC", "Food"],
    },
  },
  {
    id: "U002",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+91 9876543211",
    city: "Pune",
    area: "Koregaon Park",
    status: "active",
    tag: "Verified",
    bookings: 1,
    totalSpent: 8500,
    joinDate: "2024-01-12",
    lastActive: "2024-01-16",
    documents: {
      aadhar: true,
      pan: true,
      photo: true,
    },
    preferences: {
      budget: "8000-12000",
      roomType: "Shared",
      amenities: ["WiFi", "Gym"],
    },
  },
  {
    id: "U003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+91 9876543212",
    city: "Delhi",
    area: "CP",
    status: "blocked",
    tag: "Spam",
    bookings: 0,
    totalSpent: 0,
    joinDate: "2024-01-08",
    lastActive: "2024-01-09",
    documents: {
      aadhar: false,
      pan: false,
      photo: false,
    },
    preferences: {
      budget: "5000-8000",
      roomType: "Any",
      amenities: [],
    },
  },
  {
    id: "U004",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+91 9876543213",
    city: "Bangalore",
    area: "Whitefield",
    status: "verified",
    tag: "Premium",
    bookings: 5,
    totalSpent: 47500,
    joinDate: "2023-12-15",
    lastActive: "2024-01-16",
    documents: {
      aadhar: true,
      pan: true,
      photo: true,
    },
    preferences: {
      budget: "15000-20000",
      roomType: "Single",
      amenities: ["WiFi", "AC", "Parking", "Gym"],
    },
  },
]

function UserDetailsDialog({ user }: { user: (typeof users)[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile - {user.name}</DialogTitle>
          <DialogDescription>Complete user information and management options</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{user.name}</p>
                      <Badge
                        variant={
                          user.status === "verified"
                            ? "default"
                            : user.status === "blocked"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {user.city}, {user.area}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joined {user.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User Tag:</span>
                    <Badge variant="outline">{user.tag}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Bookings:</span>
                    <span className="font-medium">{user.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Spent:</span>
                    <span className="font-medium">₹{user.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Active:</span>
                    <span className="font-medium">{user.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User ID:</span>
                    <span className="font-mono text-sm">{user.id}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>All bookings made by this user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Booking history will be displayed here</p>
                  <p className="text-sm">Total bookings: {user.bookings}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>User uploaded documents and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Aadhar Card</span>
                    </div>
                    {user.documents.aadhar ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">PAN Card</span>
                    </div>
                    {user.documents.pan ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Photo</span>
                    </div>
                    {user.documents.photo ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>Accommodation preferences and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Budget Range</Label>
                    <p className="text-sm text-muted-foreground">₹{user.preferences.budget}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Room Type</Label>
                    <p className="text-sm text-muted-foreground">{user.preferences.roomType}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Preferred Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.preferences.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
          <div className="space-x-2">
            {user.status !== "blocked" ? (
              <Button variant="destructive" size="sm">
                <ShieldX className="h-4 w-4 mr-2" />
                Block User
              </Button>
            ) : (
              <Button variant="default" size="sm">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Unblock User
              </Button>
            )}
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function UsersPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    if (statusFilter !== "all" && user.status !== statusFilter) return false
    if (tagFilter !== "all" && user.tag !== tagFilter) return false
    return true
  })

  const stats = {
    total: users.length,
    verified: users.filter((u) => u.status === "verified").length,
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
    totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage registered users and their data</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <p className="text-xs text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
            <p className="text-xs text-muted-foreground">Blocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {user.city}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.area}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "verified" ? "default" : user.status === "blocked" ? "destructive" : "secondary"
                      }
                    >
                      {user.status === "verified" && <ShieldCheck className="h-3 w-3 mr-1" />}
                      {user.status === "blocked" && <ShieldX className="h-3 w-3 mr-1" />}
                      {user.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.tag}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.bookings} bookings</div>
                      <div className="text-muted-foreground">₹{user.totalSpent.toLocaleString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {user.documents.aadhar && <CheckCircle className="h-3 w-3 text-green-600" />}
                      {user.documents.pan && <CheckCircle className="h-3 w-3 text-green-600" />}
                      {user.documents.photo && <CheckCircle className="h-3 w-3 text-green-600" />}
                      {!user.documents.aadhar && !user.documents.pan && !user.documents.photo && (
                        <AlertTriangle className="h-3 w-3 text-yellow-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <UserDetailsDialog user={user} />
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
