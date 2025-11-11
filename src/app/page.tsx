"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Sparkles, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">TALKSY</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
              AI-Powered Call Management That Converts
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Automate campaigns, analyze conversations, and boost your booking rate with intelligent call analytics.
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <Sparkles className="w-8 h-8 text-white mb-2" />
            <p className="text-sm text-white/90 font-medium">AI Automation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <TrendingUp className="w-8 h-8 text-white mb-2" />
            <p className="text-sm text-white/90 font-medium">Real-time Analytics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <Zap className="w-8 h-8 text-white mb-2" />
            <p className="text-sm text-white/90 font-medium">Campaign Tools</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">TALKSY</span>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
                <p className="text-muted-foreground">Enter your credentials to access your dashboard</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Label 
                    htmlFor="login-email" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      focusedField === "login-email" || email 
                        ? "top-2 text-xs text-primary" 
                        : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    }`}
                  >
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("login-email")}
                    onBlur={() => setFocusedField(null)}
                    className="pt-6 pb-2 h-14"
                  />
                </div>

                <div className="relative">
                  <Label 
                    htmlFor="login-password" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      focusedField === "login-password" || password 
                        ? "top-2 text-xs text-primary" 
                        : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    }`}
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("login-password")}
                    onBlur={() => setFocusedField(null)}
                    className="pt-6 pb-2 h-14"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </div>

                <Link href="/dashboard">
                  <Button className="w-full h-12 text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Create account</h2>
                <p className="text-muted-foreground">Start your 14-day free trial today</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Label 
                    htmlFor="signup-name" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      focusedField === "signup-name" || name 
                        ? "top-2 text-xs text-primary" 
                        : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    }`}
                  >
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("signup-name")}
                    onBlur={() => setFocusedField(null)}
                    className="pt-6 pb-2 h-14"
                  />
                </div>

                <div className="relative">
                  <Label 
                    htmlFor="signup-email" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      focusedField === "signup-email" || email 
                        ? "top-2 text-xs text-primary" 
                        : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    }`}
                  >
                    Work Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("signup-email")}
                    onBlur={() => setFocusedField(null)}
                    className="pt-6 pb-2 h-14"
                  />
                </div>

                <div className="relative">
                  <Label 
                    htmlFor="signup-password" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      focusedField === "signup-password" || password 
                        ? "top-2 text-xs text-primary" 
                        : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    }`}
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("signup-password")}
                    onBlur={() => setFocusedField(null)}
                    className="pt-6 pb-2 h-14"
                  />
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 rounded border-border" />
                  <span className="text-muted-foreground">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </div>

                <Link href="/dashboard">
                  <Button className="w-full h-12 text-base">
                    Create Account
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}