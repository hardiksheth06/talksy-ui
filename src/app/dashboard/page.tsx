"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Clock, 
  CheckCircle2,
  Circle,
  Activity,
  Calendar,
  BarChart3
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { name: "Mon", calls: 45, bookings: 32 },
  { name: "Tue", calls: 52, bookings: 38 },
  { name: "Wed", calls: 48, bookings: 35 },
  { name: "Thu", calls: 61, bookings: 45 },
  { name: "Fri", calls: 55, bookings: 40 },
  { name: "Sat", calls: 38, bookings: 28 },
  { name: "Sun", calls: 42, bookings: 30 },
]

const recentCalls = [
  {
    id: 1,
    contact: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    duration: "4:32",
    status: "booked",
    time: "2 min ago",
    campaign: "Spring Promo"
  },
  {
    id: 2,
    contact: "Michael Chen",
    phone: "+1 (555) 234-5678",
    duration: "2:15",
    status: "no-answer",
    time: "8 min ago",
    campaign: "Follow-up Q1"
  },
  {
    id: 3,
    contact: "Emily Davis",
    phone: "+1 (555) 345-6789",
    duration: "6:48",
    status: "booked",
    time: "15 min ago",
    campaign: "Spring Promo"
  },
  {
    id: 4,
    contact: "James Wilson",
    phone: "+1 (555) 456-7890",
    duration: "1:23",
    status: "declined",
    time: "23 min ago",
    campaign: "New Leads"
  },
  {
    id: 5,
    contact: "Lisa Anderson",
    phone: "+1 (555) 567-8901",
    duration: "5:12",
    status: "booked",
    time: "31 min ago",
    campaign: "Spring Promo"
  },
]

export default function Dashboard() {
  const [chartView, setChartView] = useState<"calls" | "bookings">("calls")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your call performance overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Booking Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.2%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">+5.2%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">341</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600 font-medium">+12</span> from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4:28</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600 font-medium">+0:34</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Healthy</div>
              <p className="text-xs text-muted-foreground">
                All systems <span className="text-green-600 font-medium">operational</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Call Volume Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Call Analytics</CardTitle>
                  <CardDescription>7-day performance overview</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={chartView === "calls" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("calls")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Calls
                  </Button>
                  <Button
                    variant={chartView === "bookings" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("bookings")}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Bookings
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {chartView === "calls" ? (
                    <Line 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  ) : (
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-1))' }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Goal</CardTitle>
              <CardDescription>December 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bookings</span>
                  <span className="font-medium">248 / 300</span>
                </div>
                <Progress value={82.6} className="h-2" />
                <p className="text-xs text-muted-foreground">82.6% of monthly target</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Call Volume</span>
                  <span className="font-medium">1,234 / 1,500</span>
                </div>
                <Progress value={82.2} className="h-2" />
                <p className="text-xs text-muted-foreground">82.2% of monthly target</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Days remaining:</span>
                  <span className="font-medium">12 days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Daily target:</span>
                  <span className="font-medium">~5 bookings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Call Activity</CardTitle>
            <CardDescription>Latest calls from your active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {call.status === "booked" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : call.status === "declined" ? (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{call.contact}</p>
                      <Badge variant="secondary" className="text-xs">
                        {call.campaign}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{call.phone}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {call.duration}
                    </div>
                    <span>{call.time}</span>
                  </div>
                  <Badge
                    variant={
                      call.status === "booked"
                        ? "default"
                        : call.status === "declined"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {call.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
