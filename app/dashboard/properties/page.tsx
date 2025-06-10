"use client"

import { useState } from "react"
import {
  Plus,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Settings,
  FolderSyncIcon as Sync,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  ImageIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const properties = [
  {
    id: "PG001",
    name: "Sunrise PG",
    city: "Mumbai",
    area: "Andheri West",
    type: "PG",
    rooms: 25,
    occupancy: 95,
    revenue: 245000,
    rating: 4.8,
    status: "verified",
    source: "Vizima",
    featured: true,
    lastSync: "2024-01-15",
    amenities: ["WiFi", "AC", "Parking", "Food"],
    images: 8,
    price: 12000,
  },
  {
    id: "PG002",
    name: "Green Valley Hostel",
    city: "Pune",
    area: "Koregaon Park",
    type: "Hostel",
    rooms: 18,
    occupancy: 87,
    revenue: 189000,
    rating: 4.6,
    status: "pending",
    source: "RentOk",
    featured: false,
    lastSync: "2024-01-14",
    amenities: ["WiFi", "Gym", "Food"],
    images: 5,
    price: 8500,
  },
  {
    id: "PG003",
    name: "City Center PG",
    city: "Delhi",
    area: "CP",
    type: "PG",
    rooms: 30,
    occupancy: 92,
    revenue: 312000,
    rating: 4.9,
    status: "verified",
    source: "Vizima",
    featured: true,
    lastSync: "2024-01-15",
    amenities: ["WiFi", "AC", "Parking", "Food", "Gym"],
    images: 12,
    price: 15000,
  },
]

const rentokProperties = [
  {
    id: "RO001",
    name: "Metro Heights PG",
    city: "Bangalore",
    area: "Whitefield",
    lastSync: "2024-01-14 10:30 AM",
    status: "synced",
    overrides: ["Pricing", "Images"],
    rooms: 22,
    price: 11000,
  },
  {
    id: "RO002",
    name: "Tech Park Hostel",
    city: "Hyderabad",
    area: "Gachibowli",
    lastSync: "2024-01-13 08:15 PM",
    status: "pending",
    overrides: ["Description"],
    rooms: 15,
    price: 9500,
  },
]

function AddPropertyDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>Create a new PG or Hostel listing</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input id="name" placeholder="Enter property name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Input id="area" placeholder="Enter area/locality" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rooms">Total Rooms</Label>
              <Input id="rooms" type="number" placeholder="25" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Starting Price</Label>
              <Input id="price" type="number" placeholder="12000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit</Label>
              <Input id="deposit" type="number" placeholder="24000" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter property description" rows={3} />
          </div>

          <div className="space-y-4">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="wifi" />
                <Label htmlFor="wifi">WiFi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ac" />
                <Label htmlFor="ac">AC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="parking" />
                <Label htmlFor="parking">Parking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="food" />
                <Label htmlFor="food">Food</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="gym" />
                <Label htmlFor="gym">Gym</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="security" />
                <Label htmlFor="security">Security</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Property Images</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop images or click to browse</p>
              <Button variant="outline" className="mt-2">
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="featured" />
            <Label htmlFor="featured">Mark as Featured Property</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create Property</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PropertiesPage() {
  const [selectedTab, setSelectedTab] = useState("vizima")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-muted-foreground">Manage your PG and Hostel listings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddPropertyDialog />
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="vizima">
            Vizima Listings ({properties.filter((p) => p.source === "Vizima").length})
          </TabsTrigger>
          <TabsTrigger value="rentok">RentOk Sync ({rentokProperties.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="vizima" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vizima Properties</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Input placeholder="Search properties..." className="w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties
                    .filter((p) => p.source === "Vizima")
                    .map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/placeholder.svg?height=48&width=48" />
                              <AvatarFallback>{property.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{property.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {property.rooms} rooms • ₹{property.price.toLocaleString()}/month
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {property.featured && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {property.images} images
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              {property.city}
                            </div>
                            <p className="text-sm text-muted-foreground">{property.area}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{property.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={property.occupancy} className="w-16 h-2" />
                            <span className="text-sm font-medium">{property.occupancy}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round((property.occupancy / 100) * property.rooms)}/{property.rooms} occupied
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">₹{property.revenue.toLocaleString()}</div>
                          <p className="text-xs text-muted-foreground">this month</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge variant={property.status === "verified" ? "default" : "secondary"}>
                              {property.status === "verified" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {property.status}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs">{property.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentok" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>RentOk Integration</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Sync className="h-4 w-4 mr-2" />
                    Sync All
                  </Button>
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
              <CardDescription>Manage properties synced from RentOk platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Sync Status</p>
                      <p className="text-sm text-muted-foreground">Last synced: 2 hours ago • Next sync: in 4 hours</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Override Fields</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentokProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{property.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{property.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {property.rooms} rooms • ₹{property.price.toLocaleString()}/month
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              {property.city}
                            </div>
                            <p className="text-sm text-muted-foreground">{property.area}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{property.lastSync}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {property.overrides.map((override) => (
                              <Badge key={override} variant="outline" className="text-xs">
                                {override}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={property.status === "synced" ? "default" : "secondary"}>
                            {property.status === "synced" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Sync className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
