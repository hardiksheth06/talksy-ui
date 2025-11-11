"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Upload, 
  Phone, 
  Pause, 
  Play, 
  Eye, 
  Plus,
  FileSpreadsheet
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const activeCampaigns = [
  {
    id: 1,
    name: "Spring Promo 2024",
    contacts: 450,
    completed: 328,
    booked: 240,
    status: "active",
    startDate: "2024-03-01",
    twilioNumber: "+1 (555) 100-0001"
  },
  {
    id: 2,
    name: "Follow-up Q1",
    contacts: 280,
    completed: 156,
    booked: 112,
    status: "active",
    startDate: "2024-03-10",
    twilioNumber: "+1 (555) 100-0002"
  },
  {
    id: 3,
    name: "New Leads March",
    contacts: 520,
    completed: 89,
    booked: 65,
    status: "paused",
    startDate: "2024-03-15",
    twilioNumber: "+1 (555) 100-0003"
  },
]

export default function CampaignsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Campaign Management</h1>
            <p className="text-muted-foreground">Create and manage your call campaigns</p>
          </div>
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* New Campaign Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Upload contacts and configure your campaign settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Summer Sale 2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Brief description of this campaign..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twilio-number">Twilio Number</Label>
                  <Select>
                    <SelectTrigger id="twilio-number">
                      <SelectValue placeholder="Select a number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number1">+1 (555) 100-0001</SelectItem>
                      <SelectItem value="number2">+1 (555) 100-0002</SelectItem>
                      <SelectItem value="number3">+1 (555) 100-0003</SelectItem>
                      <SelectItem value="number4">+1 (555) 100-0004</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="campaign-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contacts-csv">Upload Contacts (CSV)</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="contacts-csv"
                      className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          CSV file with columns: name, phone, email
                        </p>
                      </div>
                    </label>
                    <input
                      id="contacts-csv"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>{selectedFile.name} - {(selectedFile.size / 1024).toFixed(2)} KB</span>
                  </div>
                )}
              </div>

              <Button className="w-full" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Manual Call Shortcut */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Quick Call</CardTitle>
              <CardDescription>Make a manual call instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quick-phone">Phone Number</Label>
                <Input
                  id="quick-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-name">Contact Name</Label>
                <Input
                  id="quick-name"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-twilio">Twilio Number</Label>
                <Select>
                  <SelectTrigger id="quick-twilio">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number1">+1 (555) 100-0001</SelectItem>
                    <SelectItem value="number2">+1 (555) 100-0002</SelectItem>
                    <SelectItem value="number3">+1 (555) 100-0003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="default">
                <Phone className="h-4 w-4 mr-2" />
                Initiate Call
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Manage and monitor your running campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Booked</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Twilio Number</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.contacts}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{campaign.completed}/{campaign.contacts}</span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(campaign.completed / campaign.contacts) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{campaign.booked}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {campaign.twilioNumber}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          {campaign.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
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
    </DashboardLayout>
  )
}
