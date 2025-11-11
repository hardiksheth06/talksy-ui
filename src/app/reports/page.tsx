"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Download, 
  Filter,
  Calendar,
  Search,
  Eye,
  Phone,
  User
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const callLogs = [
  {
    id: 1,
    contact: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    campaign: "Spring Promo",
    duration: "4:32",
    outcome: "booked",
    date: "2024-03-20",
    time: "14:23",
    transcript: [
      { speaker: "agent", text: "Hello! This is Alex calling from TALKSY. Am I speaking with Sarah Johnson?" },
      { speaker: "customer", text: "Yes, that's me. How can I help you?" },
      { speaker: "agent", text: "Great! I'm reaching out about our Spring Promotion. Do you have a few minutes to chat?" },
      { speaker: "customer", text: "Sure, I have a couple of minutes." },
      { speaker: "agent", text: "Wonderful! We're offering a special discount on our premium services this month. Based on your previous interest, I think this could be a great fit for you." },
      { speaker: "customer", text: "That sounds interesting. What exactly does it include?" },
      { speaker: "agent", text: "The premium package includes full access to all our features, priority support, and advanced analytics. Plus, with the spring promotion, you get 20% off for the first three months." },
      { speaker: "customer", text: "Hmm, that does sound good. Can I book a demo to see it in action?" },
      { speaker: "agent", text: "Absolutely! I can schedule a demo for you. What day works best for you this week?" },
      { speaker: "customer", text: "How about Thursday afternoon?" },
      { speaker: "agent", text: "Thursday at 2 PM works perfectly! I've booked that for you. You'll receive a confirmation email shortly." },
      { speaker: "customer", text: "Great, thank you!" },
      { speaker: "agent", text: "My pleasure! Looking forward to showing you what we can do. Have a great day!" },
    ]
  },
  {
    id: 2,
    contact: "Michael Chen",
    phone: "+1 (555) 234-5678",
    campaign: "Follow-up Q1",
    duration: "2:15",
    outcome: "no-answer",
    date: "2024-03-20",
    time: "13:45",
    transcript: []
  },
  {
    id: 3,
    contact: "Emily Davis",
    phone: "+1 (555) 345-6789",
    campaign: "Spring Promo",
    duration: "6:48",
    outcome: "booked",
    date: "2024-03-20",
    time: "12:10",
    transcript: [
      { speaker: "agent", text: "Hi Emily, this is Alex from TALKSY. How are you today?" },
      { speaker: "customer", text: "I'm doing well, thanks. What's this about?" },
      { speaker: "agent", text: "I wanted to follow up on your inquiry about our services. Have you had a chance to review the information I sent?" },
      { speaker: "customer", text: "Yes, I did look at it. I'm interested but I have some questions." },
      { speaker: "agent", text: "Perfect! I'm here to answer any questions you have. What would you like to know?" },
    ]
  },
  {
    id: 4,
    contact: "James Wilson",
    phone: "+1 (555) 456-7890",
    campaign: "New Leads",
    duration: "1:23",
    outcome: "declined",
    date: "2024-03-20",
    time: "11:30",
    transcript: [
      { speaker: "agent", text: "Good morning! This is Alex from TALKSY. Is this James Wilson?" },
      { speaker: "customer", text: "Yes, but I'm not interested. Please remove me from your list." },
      { speaker: "agent", text: "I understand, and I apologize for the inconvenience. I'll make sure to remove your number right away. Have a great day!" },
    ]
  },
  {
    id: 5,
    contact: "Lisa Anderson",
    phone: "+1 (555) 567-8901",
    campaign: "Spring Promo",
    duration: "5:12",
    outcome: "booked",
    date: "2024-03-19",
    time: "16:45",
    transcript: []
  },
]

export default function ReportsPage() {
  const [selectedCall, setSelectedCall] = useState<typeof callLogs[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [outcomeFilter, setOutcomeFilter] = useState("all")
  const [campaignFilter, setCampaignFilter] = useState("all")

  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = 
      log.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phone.includes(searchQuery) ||
      log.campaign.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesOutcome = outcomeFilter === "all" || log.outcome === outcomeFilter
    const matchesCampaign = campaignFilter === "all" || log.campaign === campaignFilter
    
    return matchesSearch && matchesOutcome && matchesCampaign
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports & Logs</h1>
            <p className="text-muted-foreground">Review call transcripts and performance data</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Outcomes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="no-answer">No Answer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Campaigns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="Spring Promo">Spring Promo</SelectItem>
                  <SelectItem value="Follow-up Q1">Follow-up Q1</SelectItem>
                  <SelectItem value="New Leads">New Leads</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Call Logs</CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} of {callLogs.length} calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.contact}</TableCell>
                    <TableCell className="text-muted-foreground">{log.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.campaign}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(log.date).toLocaleDateString()} {log.time}
                    </TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.outcome === "booked"
                            ? "default"
                            : log.outcome === "declined"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {log.outcome}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCall(log)}
                        disabled={log.transcript.length === 0}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Transcript Modal */}
      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call Transcript
            </DialogTitle>
            <DialogDescription>
              {selectedCall?.contact} • {selectedCall?.phone} • {selectedCall?.date} at {selectedCall?.time}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Campaign</p>
                <p className="font-medium">{selectedCall?.campaign}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-medium">{selectedCall?.duration}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Outcome</p>
                <Badge
                  variant={
                    selectedCall?.outcome === "booked"
                      ? "default"
                      : selectedCall?.outcome === "declined"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {selectedCall?.outcome}
                </Badge>
              </div>
            </div>

            <ScrollArea className="h-[400px] rounded-lg border p-4">
              <div className="space-y-4">
                {selectedCall?.transcript.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.speaker === "agent" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.speaker === "agent" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.speaker === "agent"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.speaker === "customer" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
