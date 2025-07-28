"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  IndianRupee,
  Users,
  ShoppingCart,
  Bell,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  Briefcase,
  Star,
  ArrowRight,
  Calendar, // For a new quick action
  FileText,
  Wallet,
  Package,
  LineChart, // For Recharts
  BarChart, // For Recharts
  DollarSign, // For financial health
  ShieldCheck, // For credit score
  Lightbulb, // For market opportunities
  Activity, // For recent activity
  Building2 // For market opportunities
} from "lucide-react";
// Recharts imports
import {
  LineChart as RechartsLineChart, // Renamed to avoid conflict with Lucide icon
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart, // Renamed for clarity
  Bar
} from 'recharts';

import dashboardHero from "@/assets/dashboard-hero.jpg";

// Reusable FadeInWhenVisible component (modified to trigger only once)
const FadeInWhenVisible = ({ children, delay = 0, duration = 'duration-1500', translateY = 'translate-y-24' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Changed: Only set to true and unobserve on first intersection
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current); // Stop observing after it becomes visible once
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const currentRef = domRef.current; // Capture current ref for cleanup
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div
      ref={domRef}
      className={`
        transition-all ${duration} ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateY}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export function Dashboard() {
  const quickActions = [
    { label: "View Profile", icon: Eye, link: "/profile" },
    { label: "New Order", icon: ShoppingCart, link: "/marketplace/products" },
    { label: "Apply for Loan", icon: Wallet, link: "/finance" },
    { label: "GST Filing", icon: FileText, link: "/tools/gst" },
    { label: "View Tenders", icon: Target, link: "/marketplace/tenders" },
    { label: "Update Inventory", icon: Package, link: "/tools/inventory" },
    { label: "Schedule Meeting", icon: Calendar, link: "/support" },
    { label: "Manage Customers", icon: Users, link: "/tools/crm" }
  ];

  const activities = [
    { icon: CheckCircle2, text: "Loan Approved - ₹5,00,000", time: "2 hours ago", color: "text-green-500" },
    { icon: Target, text: "New Tender Match - LED Bulb Supply", time: "4 hours ago", color: "text-blue-500" },
    { icon: ShoppingCart, text: "New Order Received - 1000 Units", time: "6 hours ago", color: "text-purple-500" },
    { icon: AlertCircle, text: "GST Filing Due - 20th July", time: "1 day ago", color: "text-orange-500" },
    { icon: Eye, text: "Your profile viewed 25 times", time: "2 days ago", color: "text-gray-500" },
    { icon: IndianRupee, text: "Payment Received - ₹75,000", time: "3 days ago", color: "text-green-500" },
    { icon: Briefcase, text: "New Customer Added - ABC Corp", time: "4 days ago", color: "text-cyan-500" },
    { icon: Clock, text: "Meeting Scheduled with Mentor", time: "5 days ago", color: "text-indigo-500" }
  ];

  const notifications = [
    { type: "destructive", title: "GST Filing Overdue!", message: "Please file your GST returns by 20th July to avoid penalties.", icon: AlertCircle },
    { type: "warning", title: "New Tender Opportunity", message: "A high-value tender for Office Furniture Supply is available.", icon: Target },
    { type: "success", title: "Loan Application Approved", message: "Your business loan of ₹5 Lakh has been approved.", icon: CheckCircle2 },
    { type: "info", title: "New Feature Alert", message: "Voice commands are now available for Inventory Management.", icon: Lightbulb }
  ];

  const marketOpportunities = [
    { title: "Auto Parts Export", description: "New market in Germany with high demand.", priority: "High Priority", icon: TrendingUp, color: "text-red-500" },
    { title: "Government Tender", description: "School Furniture Supply tender worth ₹1.5 Cr.", priority: "Medium Priority", icon: FileText, color: "text-blue-500" },
    { title: "E-commerce Partnership", description: "Expand sales via Amazon B2B platform.", priority: "Low Priority", icon: ShoppingCart, color: "text-green-500" },
    { title: "Local Business Collaboration", description: "Partnership opportunity with a local construction firm.", priority: "Medium Priority", icon: Building2, color: "text-purple-500" }
  ];

  const growthData = [
    { month: "Jan", revenue: 250000 },
    { month: "Feb", revenue: 320000 },
    { month: "Mar", revenue: 410000 },
    { month: "Apr", revenue: 380000 },
    { month: "May", revenue: 450000 },
    { month: "Jun", revenue: 520000 },
    { month: "Jul", revenue: 480000 },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter"> {/* Enhanced background */}
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden rounded-b-2xl shadow-xl"> {/* Added shadow to hero */}
        <img
          src={dashboardHero}
          alt="Business Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="animate-fade-in-up"> {/* Custom animation for hero */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"> {/* Added drop shadow */}
              Business Dashboard
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Complete overview of your business in one place
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        {/* Stats Overview */}
        <FadeInWhenVisible delay={0} duration="duration-1500" translateY="translate-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl cursor-pointer"> {/* Enhanced card style */}
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">₹45,230</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <IndianRupee className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Orders</p>
                    <p className="text-2xl font-bold">28</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+15.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold">23.5%</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+3.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <FadeInWhenVisible delay={100} duration="duration-1500" translateY="translate-y-24">
              <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Briefcase className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-lg group"
                      >
                        <action.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Business Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInWhenVisible delay={200} duration="duration-1500" translateY="translate-y-24">
                <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <DollarSign className="h-5 w-5" />
                      Financial Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Cash Flow</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <Progress value={78} className="h-2 bg-blue-200" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Profitability</span>
                          <span className="font-semibold">65%</span>
                        </div>
                        <Progress value={65} className="h-2 bg-green-200" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Liquidity</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2 bg-purple-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={300} duration="duration-1500" translateY="translate-y-24">
                <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                      Credit Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-600 mb-2 animate-pulse-slow">742</div> {/* Animated score */}
                      <div className="text-sm text-muted-foreground mb-4">Excellent Credit Score</div>
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400 animate-bounce-in" style={{ animationDelay: `${star * 50}ms` }} />
                        ))}
                        <Star className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </div>

            {/* Recent Activity */}
            <FadeInWhenVisible delay={400} duration="duration-1500" translateY="translate-y-24">
              <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.text}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        {/* Removed the ArrowRight that appears on hover, as the animation is now one-time */}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <FadeInWhenVisible delay={500} duration="duration-1500" translateY="translate-y-24">
              <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Bell className="h-5 w-5" />
                    Notifications
                    <Badge variant="destructive" className="ml-2"> {/* Removed animate-bounce-in */}
                      {notifications.filter(n => n.type === 'destructive' || n.type === 'warning').length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${notification.type === 'destructive' ? 'bg-red-50 border-red-200' : notification.type === 'warning' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'} hover:shadow-md transition-shadow duration-200 cursor-pointer`}>
                      <div className="flex items-start gap-2">
                        <notification.icon className={`h-5 w-5 ${notification.type === 'destructive' ? 'text-red-600' : notification.type === 'warning' ? 'text-orange-600' : 'text-green-600'} flex-shrink-0`} />
                        <div>
                          <p className={`text-sm font-medium ${notification.type === 'destructive' ? 'text-red-800' : notification.type === 'warning' ? 'text-orange-800' : 'text-green-800'}`}>{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Market Opportunities */}
            <FadeInWhenVisible delay={600} duration="duration-1500" translateY="translate-y-24">
              <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    Market Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketOpportunities.map((opportunity, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer flex items-start gap-3">
                      <opportunity.icon className={`h-5 w-5 ${opportunity.color} flex-shrink-0`} />
                      <div>
                        <h4 className="font-medium text-sm">{opportunity.title}</h4>
                        <p className="text-xs text-muted-foreground">{opportunity.description}</p>
                        <Badge variant={opportunity.priority === "High Priority" ? "destructive" : opportunity.priority === "Medium Priority" ? "secondary" : "outline"} className="mt-2">
                          {opportunity.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Business Growth Chart */}
            <FadeInWhenVisible delay={700} duration="duration-1500" translateY="translate-y-24">
              <Card className="rounded-2xl border-0 shadow-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <TrendingUp className="h-5 w-5" />
                    Business Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64"> {/* Fixed height for chart */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={growthData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}K`} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </div>
  );
}
