"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, IndianRupee, Users, ShoppingCart, Bell, Eye, Target, Briefcase, ArrowRight, Calendar, FileText, Wallet, Package, DollarSign, ShieldCheck, Lightbulb, Activity, Building2, AlertTriangle, CheckCircle2, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.04,
    },
  },
};
const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const spring = useSpring(0, {
        mass: 0.8,
        stiffness: 75,
        damping: 15,
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [spring, value, isInView]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
            }
        });
        return unsubscribe;
    }, [spring, prefix, suffix]);

    return <span ref={ref} />;
};

// --- Re-styled Radial Progress Component ---
const RadialProgress = ({ progress, colorClass, label }) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
                <circle strokeWidth="7" stroke="currentColor" fill="transparent" r={radius} cx="45" cy="45" className="text-slate-200/70" />
                <motion.circle
                    strokeWidth="7"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="45"
                    cy="45"
                    className={colorClass}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                 <span className="text-xl font-bold text-slate-800">{progress}%</span>
            </div>
             <p className="text-sm font-semibold text-slate-700 -mt-2">{label}</p>
        </div>
    );
};

// --- Base Dashboard Card Component ---
const DashboardCard = ({ children, className }) => (
  <Card className={`bg-white/90 border-slate-200/60 backdrop-blur-2xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {children}
  </Card>
);

// --- FIX: Memoized Stat Card to prevent re-renders ---
type StatType = {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  iconColor: string;
  change: string;
};

const MemoizedStatCard = React.memo(({ stat }: { stat: StatType }) => {
  return (
    <DashboardCard className="">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.iconColor.replace('text-', 'from-').replace('-500', '-400/20')} ${stat.iconColor.replace('text-', 'to-').replace('-500', '-500/20')}`}>
            <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 font-semibold">{stat.change}</Badge>
        </div>
        <p className="text-4xl font-bold text-slate-800">
            <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
        </p>
        <p className="text-sm text-slate-600 font-medium mt-1">{stat.title}</p>
      </CardContent>
    </DashboardCard>
  );
});
MemoizedStatCard.displayName = 'MemoizedStatCard';


export const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [hoveredAction, setHoveredAction] = useState(null);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const stats = useMemo(() => [
    { title: "Today's Revenue", value: 45230, prefix: "₹", icon: IndianRupee, iconColor: "text-green-500", change: "+12.5%" },
    { title: "New Orders", value: 28, icon: ShoppingCart, iconColor: "text-blue-500", change: "+8.2%" },
    { title: "Customers", value: 1247, icon: Users, iconColor: "text-purple-500", change: "+15.3%" },
    { title: "Growth Rate", value: 23.5, suffix: "%", icon: Target, iconColor: "text-orange-500", change: "+3.1%" },
  ], []);

  const quickActions = useMemo(() => [
    { label: "New Order", icon: ShoppingCart, link: "/marketplace/products" },
    { label: "Apply for Loan", icon: Wallet, link: "/finance" },
    { label: "GST Filing", icon: FileText, link: "/tools/gst" },
    { label: "View Tenders", icon: Target, link: "/marketplace/tenders" },
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
    destructive: { bg: 'bg-red-500/10 border-red-500/20', icon: 'text-red-500' },
    success: { bg: 'bg-green-500/10 border-green-500/20', icon: 'text-green-500' },
    info: { bg: 'bg-sky-500/10 border-sky-500/20', icon: 'text-sky-500' }
  };
  
  const greetingText = `${greeting}, EkVyapar User`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans isolate">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/30 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/30 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/30 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative">
        <div className="relative pt-28 pb-16 flex items-center justify-center text-center bg-gradient-to-b from-slate-100/0 via-slate-100/80 to-slate-100">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative flex flex-col items-center px-4">
                <motion.h1 variants={sentence} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 tracking-tight">
                  {greetingText.split("").map((char, index) => (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mt-4">
                  Here's your complete business overview for today.
                </motion.p>
            </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 }}}>
                <MemoizedStatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
                <DashboardCard className="">
                  <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><Zap className="text-yellow-500"/>Quick Actions</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4" onMouseLeave={() => setHoveredAction(null)}>
                    {quickActions.map((action, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05, y: -5 }} 
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setHoveredAction(i)}
                        className="relative"
                      >
                        <AnimatePresence>
                          {hoveredAction === i && (
                            <motion.div
                              layoutId="quickActionHover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1, transition: { duration: 0.15 } }}
                              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                              className="absolute inset-0 bg-sky-100/60 rounded-xl"
                            />
                          )}
                        </AnimatePresence>
                        <Button variant="secondary" className="h-24 w-full flex-col gap-2 rounded-xl bg-slate-100/80 text-slate-800 border border-slate-200/80 transition-colors duration-300 shadow-sm relative">
                          <action.icon className="h-6 w-6 text-sky-600" /><span className="text-xs font-semibold text-center">{action.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </DashboardCard>
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <DashboardCard className="h-full">
                        <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><DollarSign className="text-green-500"/>Financial Health</CardTitle></CardHeader>
                        <CardContent className="flex justify-around items-center pt-4">
                           <RadialProgress progress={78} colorClass="text-blue-500" label="Cash Flow" />
                           <RadialProgress progress={65} colorClass="text-green-500" label="Profitability" />
                           <RadialProgress progress={92} colorClass="text-purple-500" label="Liquidity" />
                        </CardContent>
                    </DashboardCard>
                </motion.div>
                 <motion.div variants={itemVariants}>
                    <DashboardCard className="h-full relative overflow-hidden">
                        <motion.div 
                            className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-green-400/20 to-transparent -translate-x-full"
                            animate={{ translateX: ['-101%', '101%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
                        />
                        <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><ShieldCheck className="text-sky-500"/>Credit Score</CardTitle></CardHeader>
                        <CardContent className="text-center flex flex-col items-center justify-center pt-2">
                            <div className="text-7xl font-bold text-green-500 mb-2">
                                <AnimatedCounter value={742} />
                            </div>
                            <div className="text-md font-semibold text-green-600 mb-4">Excellent</div>
                            <Button variant="outline" size="sm" className="rounded-full bg-white/80 hover:bg-white">View Full Report</Button>
                        </CardContent>
                    </DashboardCard>
                </motion.div>
              </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
                    <DashboardCard className="">
                        <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><Activity className="text-sky-500"/>Recent Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          {activities.map((act, i) => (
                              <motion.div key={i} whileHover={{ scale: 1.02, x: 5 }} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100/80 transition-colors origin-left">
                                  <act.icon className={`h-6 w-6 flex-shrink-0 ${act.color}`} />
                                  <p className="text-sm text-slate-800 font-medium flex-grow">{act.text}</p>
                                  <p className="text-xs text-slate-500 flex-shrink-0">{act.time}</p>
                              </motion.div>
                          ))}
                        </CardContent>
                    </DashboardCard>
                </motion.div>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8">
              <motion.div variants={itemVariants}>
                <DashboardCard className="">
                  <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><Bell className="text-sky-500"/>Notifications</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((n, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex items-start gap-4 ${notificationStyles[n.type]?.bg || 'bg-slate-50 border-slate-200'}`}>
                        <n.icon className={`h-6 w-6 mt-0.5 flex-shrink-0 ${notificationStyles[n.type]?.icon || 'text-slate-500'}`} />
                        <div>
                            <p className="text-md font-semibold text-slate-800">{n.title}</p>
                            <p className="text-sm text-slate-600">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </DashboardCard>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <DashboardCard className="">
                  <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><Lightbulb className="text-yellow-500"/>Market Opportunities</CardTitle></CardHeader>
                   <CardContent className="space-y-4">
                        {marketOpportunities.map((op, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.02, x: 5 }} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100/80 transition-colors origin-left">
                            <op.icon className={`h-6 w-6 flex-shrink-0 ${op.color}`} />
                            <p className="text-sm text-slate-800 font-medium flex-grow">{op.title}</p>
                            <Badge variant={op.priority === "High" ? "destructive" : "secondary"} className="flex-shrink-0">{op.priority}</Badge>
                          </motion.div>
                        ))}
                   </CardContent>
                </DashboardCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <DashboardCard className="">
                  <CardHeader><CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800"><TrendingUp className="text-sky-500"/>Business Growth</CardTitle></CardHeader>
                  <CardContent className="h-64 pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}K`} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} labelStyle={{ color: '#1e293b', fontWeight: '600' }} formatter={(value) => [`₹${Number(value) * 1000}`, 'Revenue']} />
                        <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </DashboardCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}