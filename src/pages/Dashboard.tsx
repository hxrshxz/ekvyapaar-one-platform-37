"use-client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, IndianRupee, Users, ShoppingCart, Bell, Eye, Target, Briefcase, Star, ArrowRight, Calendar, FileText, Wallet, Package, DollarSign, ShieldCheck, Lightbulb, Activity, Building2, AlertTriangle, CheckCircle2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export function Dashboard() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const quickActions = useMemo(() => [
    { label: "View Profile", icon: Eye, link: "/profile" },
    { label: "New Order", icon: ShoppingCart, link: "/marketplace/products" },
    { label: "Apply for Loan", icon: Wallet, link: "/finance" },
    { label: "GST Filing", icon: FileText, link: "/tools/gst" },
    { label: "View Tenders", icon: Target, link: "/marketplace/tenders" },
    { label: "Update Inventory", icon: Package, link: "/tools/inventory" },
    { label: "Schedule Meeting", icon: Calendar, link: "/support" },
    { label: "Manage Customers", icon: Users, link: "/tools/crm" }
  ], []);

  const activities = useMemo(() => [
    { icon: CheckCircle2, text: "Loan Approved - ₹5,00,000", time: "2 hours ago", color: "text-green-500" },
    { icon: Target, text: "New Tender Match - LED Bulb Supply", time: "4 hours ago", color: "text-blue-500" },
    { icon: ShoppingCart, text: "New Order Received - 1000 Units", time: "6 hours ago", color: "text-purple-500" },
    { icon: IndianRupee, text: "Payment Received - ₹75,000", time: "3 days ago", color: "text-green-500" },
  ], []);
  
  const notifications = useMemo(() => [
    { type: "destructive", title: "GST Filing Due!", message: "File returns by 20th Aug to avoid penalties.", icon: AlertTriangle },
    { type: "success", title: "Loan Application Approved", message: "Your business loan of ₹5 Lakh has been approved.", icon: CheckCircle2 },
    { type: "info", title: "New Feature: Voice Commands", message: "Voice commands are now live for Inventory Management.", icon: Lightbulb }
  ], []);

  const marketOpportunities = useMemo(() => [
    { title: "Auto Parts Export to Germany", priority: "High", icon: TrendingUp, color: "text-red-500" },
    { title: "Govt Tender: School Furniture", priority: "Medium", icon: FileText, color: "text-blue-500" },
    { title: "Local Construction Partnership", priority: "Medium", icon: Building2, color: "text-purple-500" }
  ], []);
  
  const growthData = useMemo(() => [
    { month: "Jan", revenue: 250 }, { month: "Feb", revenue: 320 }, { month: "Mar", revenue: 410 },
    { month: "Apr", revenue: 380 }, { month: "May", revenue: 450 }, { month: "Jun", revenue: 520 },
    { month: "Jul", revenue: 480 }, { month: "Aug", revenue: 550 },
  ], []);

  const notificationStyles = {
    destructive: { bg: 'bg-red-50 border-red-200', icon: 'text-red-500' },
    success: { bg: 'bg-green-50 border-green-200', icon: 'text-green-500' },
    info: { bg: 'bg-blue-50 border-blue-200', icon: 'text-blue-500' }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;

  const CustomProgressBar = ({ value, colorClass }) => (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <motion.div
        className={`h-2.5 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans isolate">
      {/* --- Aurora Background --- */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/50 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/50 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/50 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>
      
      {/* --- FIX: New Content Wrapper with Page-Long Blending Gradient --- */}
      <div className="relative z-10 mt-[-78px] bg-gradient-to-b from-slate-50/0 via-slate-50/80 via-20% to-slate-50 to-40%">
        {/* Hero Section */}
        <div className="relative h-80 flex items-center justify-center text-center">
            {/* The old gradient overlay is removed from here */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4">
                <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
                  {greeting}, EkVyapar User
                </motion.h1>
                <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-2xl mt-4">
                  Here's your complete business overview for today.
                </motion.p>
            </motion.div>
        </div>

        <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
          {/* Stats Overview */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Today's Revenue", value: "₹45,230", change: "+12.5%", icon: IndianRupee, iconColor: "text-green-500" },
              { title: "New Orders", value: "28", change: "+8.2%", icon: ShoppingCart, iconColor: "text-blue-500" },
              { title: "Customers", value: "1,247", change: "+15.3%", icon: Users, iconColor: "text-purple-500" },
              { title: "Growth Rate", value: "23.5%", change: "+3.1%", icon: Target, iconColor: "text-orange-500" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
                      <Badge variant="secondary">{stat.change}</Badge>
                    </div>
                    <p className="text-3xl font-bold mt-4 text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="text-sky-500"/>Quick Actions</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, i) => (
                      <Button key={i} variant="secondary" className="h-24 flex-col gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                        <action.icon className="h-6 w-6 text-sky-500" /><span className="text-xs font-medium text-center">{action.label}</span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Financial & Credit Health */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                    <Card className="h-full bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><DollarSign className="text-green-500"/>Financial Health</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div><div className="flex justify-between text-sm mb-1 text-slate-600"><span>Cash Flow</span><span>78%</span></div><CustomProgressBar value={78} colorClass="bg-blue-500" /></div>
                            <div><div className="flex justify-between text-sm mb-1 text-slate-600"><span>Profitability</span><span>65%</span></div><CustomProgressBar value={65} colorClass="bg-green-500" /></div>
                            <div><div className="flex justify-between text-sm mb-1 text-slate-600"><span>Liquidity</span><span>92%</span></div><CustomProgressBar value={92} colorClass="bg-purple-500" /></div>
                        </CardContent>
                    </Card>
                </motion.div>
                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                    <Card className="h-full bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="text-sky-500"/>Credit Score</CardTitle></CardHeader>
                        <CardContent className="text-center">
                            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="text-5xl font-bold text-green-500 mb-2">742</motion.div>
                            <div className="text-sm text-slate-500 mb-4">Excellent</div>
                            <Button variant="outline" size="sm" className="rounded-full">View Report</Button>
                        </CardContent>
                    </Card>
                </motion.div>
              </div>

               {/* Recent Activity */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                    <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="text-sky-500"/>Recent Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          {activities.map((act, i) => (
                              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                                  <act.icon className={`h-6 w-6 flex-shrink-0 ${act.color}`} />
                                  <p className="text-sm text-slate-700 flex-grow">{act.text}</p>
                                  <p className="text-xs text-slate-400 flex-shrink-0">{act.time}</p>
                              </div>
                          ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="space-y-8">
              {/* Notifications */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="text-sky-500"/>Notifications</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((n, i) => (
                      <div key={i} className={`p-3 rounded-lg border flex items-start gap-3 ${notificationStyles[n.type]?.bg || 'bg-slate-50 border-slate-200'}`}>
                        <n.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${notificationStyles[n.type]?.icon || 'text-slate-500'}`} />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                            <p className="text-xs text-slate-500">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Market Opportunities */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-500"/>Market Opportunities</CardTitle></CardHeader>
                   <CardContent className="space-y-4">
                        {marketOpportunities.map((op, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                            <op.icon className={`h-6 w-6 flex-shrink-0 ${op.color}`} />
                            <p className="text-sm text-slate-700 flex-grow">{op.title}</p>
                            <Badge variant={op.priority === "High" ? "destructive" : "secondary"} className="flex-shrink-0">{op.priority}</Badge>
                          </div>
                        ))}
                   </CardContent>
                </Card>
              </motion.div>

              {/* Business Growth Chart */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className="bg-white/70 border-slate-200/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="text-sky-500"/>Business Growth (Revenue in ₹1000s)</CardTitle></CardHeader>
                  <CardContent className="h-64 pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}K`} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} labelStyle={{ color: '#1e293b' }} formatter={(value) => [`₹${Number(value) * 1000}`, 'Revenue']} />
                        <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}