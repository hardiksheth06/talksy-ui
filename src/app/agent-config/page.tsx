"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Save, 
  Upload, 
  FileText, 
  Trash2,
  Calendar,
  Calculator,
  Mail,
  Database
} from "lucide-react"

const knowledgeBaseDocuments = [
  {
    id: 1,
    name: "Product Catalog 2024.pdf",
    size: "2.4 MB",
    uploadDate: "2024-03-15",
    status: "active"
  },
  {
    id: 2,
    name: "Pricing Guidelines.docx",
    size: "156 KB",
    uploadDate: "2024-03-10",
    status: "active"
  },
  {
    id: 3,
    name: "FAQ Responses.txt",
    size: "48 KB",
    uploadDate: "2024-03-08",
    status: "active"
  },
]

const availableTools = [
  {
    id: "calendar",
    name: "Calendar Integration",
    description: "Book appointments and check availability",
    icon: Calendar,
    enabled: true
  },
  {
    id: "calculator",
    name: "Price Calculator",
    description: "Calculate pricing and discounts",
    icon: Calculator,
    enabled: true
  },
  {
    id: "email",
    name: "Email Sender",
    description: "Send follow-up emails automatically",
    icon: Mail,
    enabled: false
  },
  {
    id: "database",
    name: "CRM Lookup",
    description: "Access customer history and records",
    icon: Database,
    enabled: true
  },
]

export default function AgentConfigPage() {
  const [systemPrompt, setSystemPrompt] = useState(
    `You are a professional sales representative for our company. Your role is to:\n\n1. Greet the customer warmly and professionally\n2. Listen to their needs and ask clarifying questions\n3. Present relevant products or services from our catalog\n4. Answer questions using the knowledge base\n5. Handle objections with empathy and solutions\n6. Book appointments when appropriate\n7. Close the call with clear next steps\n\nAlways maintain a friendly, helpful tone and focus on providing value to the customer.`
  )
  const [tools, setTools] = useState(availableTools)

  const toggleTool = (toolId: string) => {
    setTools(tools.map(tool => 
      tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
    ))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold">Agent Configuration</h1>
          <p className="text-muted-foreground">Configure your AI agent's behavior, knowledge base, and tools</p>
        </div>

        <Tabs defaultValue="prompt" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="prompt">System Prompt</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* System Prompt Tab */}
          <TabsContent value="prompt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Prompt</CardTitle>
                <CardDescription>
                  Define your AI agent's personality, behavior, and instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">Prompt Instructions</Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={16}
                    className="font-mono text-sm"
                    placeholder="Enter your system prompt here..."
                  />
                  <p className="text-xs text-muted-foreground">
                    {systemPrompt.length} characters • Be specific about tone, process, and goals
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline">
                    Reset to Default
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="text-sm">💡 Prompt Tips</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Be clear about the agent's role and purpose</li>
                    <li>• Include specific instructions for common scenarios</li>
                    <li>• Define the desired tone and communication style</li>
                    <li>• Specify when to use available tools</li>
                    <li>• Include guidelines for handling objections</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Documents</CardTitle>
                <CardDescription>
                  Upload documents that your AI agent can reference during calls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <label
                    htmlFor="knowledge-upload"
                    className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOCX, TXT, or CSV (max 10MB)
                      </p>
                    </div>
                  </label>
                  <input
                    id="knowledge-upload"
                    type="file"
                    accept=".pdf,.docx,.txt,.csv"
                    className="hidden"
                  />
                </div>

                <div className="space-y-3">
                  {knowledgeBaseDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.status}</Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
                <CardDescription>
                  Documents are automatically indexed and made searchable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">Total Documents</p>
                      <p className="text-sm text-muted-foreground">Indexed and ready</p>
                    </div>
                    <p className="text-2xl font-bold">{knowledgeBaseDocuments.length}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">Total Size</p>
                      <p className="text-sm text-muted-foreground">Across all documents</p>
                    </div>
                    <p className="text-2xl font-bold">2.6 MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Tools</CardTitle>
                <CardDescription>
                  Enable or disable tools that your AI agent can use during calls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{tool.name}</p>
                          <Badge variant={tool.enabled ? "default" : "secondary"}>
                            {tool.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <Switch
                        checked={tool.enabled}
                        onCheckedChange={() => toggleTool(tool.id)}
                      />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Configuration</CardTitle>
                <CardDescription>
                  Configure API keys and settings for enabled tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calendar-api">Calendar API Key</Label>
                  <Input
                    id="calendar-api"
                    type="password"
                    placeholder="Enter your calendar API key"
                    disabled={!tools.find(t => t.id === "calendar")?.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-api">CRM API Key</Label>
                  <Input
                    id="crm-api"
                    type="password"
                    placeholder="Enter your CRM API key"
                    disabled={!tools.find(t => t.id === "database")?.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-api">Email Service API Key</Label>
                  <Input
                    id="email-api"
                    type="password"
                    placeholder="Enter your email API key"
                    disabled={!tools.find(t => t.id === "email")?.enabled}
                  />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
