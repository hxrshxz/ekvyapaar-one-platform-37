"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  IndianRupee,
  Users,
  ShoppingCart,
  Bell,
  Target,
  FileText,
  Wallet,
  DollarSign,
  ShieldCheck,
  Lightbulb,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (isInView) spring.set(value);
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

// ═══════════════════════════════════════════════════════════════════════════
// LIGHT CARD COMPONENT (Dashboard uses light theme)
// ═══════════════════════════════════════════════════════════════════════════

const LightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  change: number;
}

const StatCard = ({ title, value, prefix = "", suffix = "", icon: Icon, change }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <LightCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-sky-600" />
        </div>
        <Badge className={`text-xs ${isPositive ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(change)}%
        </Badge>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-display font-bold text-slate-900">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </LightCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// QUICK ACTION BUTTON
// ═══════════════════════════════════════════════════════════════════════════

const QuickActionButton = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="h-24 w-full rounded-xl bg-slate-50 border border-slate-200 hover:bg-sky-50 hover:border-sky-200 flex flex-col items-center justify-center gap-2 transition-colors"
  >
    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
      <Icon className="w-5 h-5 text-sky-600" />
    </div>
    <span className="text-xs font-medium text-slate-600">{label}</span>
  </motion.button>
);

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION CARD
// ═══════════════════════════════════════════════════════════════════════════

interface NotificationProps {
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  icon: React.ElementType;
}

const NotificationCard = ({ type, title, message, icon: Icon }: NotificationProps) => {
  const styles = {
    warning: { bg: "bg-amber-50 border-amber-200", icon: "text-amber-600" },
    success: { bg: "bg-emerald-50 border-emerald-200", icon: "text-emerald-600" },
    info: { bg: "bg-sky-50 border-sky-200", icon: "text-sky-600" },
  };

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-4 ${styles[type].bg}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles[type].icon}`} />
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY ITEM
// ═══════════════════════════════════════════════════════════════════════════

const ActivityItem = ({ icon: Icon, text, time }: { icon: React.ElementType; text: string; time: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-sky-600" />
    </div>
    <div className="flex-grow min-w-0">
      <p className="text-sm text-slate-900 font-medium truncate">{text}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// RADIAL PROGRESS
// ═══════════════════════════════════════════════════════════════════════════

const RadialProgress = ({ progress, label }: { progress: number; label: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative">
        <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
          <circle strokeWidth="6" stroke="#e2e8f0" fill="transparent" r={radius} cx="45" cy="45" />
          <motion.circle
            strokeWidth="6"
            stroke="#0ea5e9"
            fill="transparent"
            r={radius}
            cx="45"
            cy="45"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-900">{progress}%</span>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours < 12) setGreeting("Good Morning");
      else if (hours < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
      
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => [
    { title: "Today's Revenue", value: 45230, prefix: "₹", icon: IndianRupee, change: 12.5 },
    { title: "New Orders", value: 28, icon: ShoppingCart, change: 8.2 },
    { title: "Customers", value: 1247, icon: Users, change: 15.3 },
    { title: "Growth Rate", value: 23, suffix: "%", icon: Target, change: 3.1 },
  ], []);

  const quickActions = useMemo(() => [
    { label: "New Order", icon: ShoppingCart },
    { label: "GST Filing", icon: FileText },
    { label: "View Tenders", icon: Target },
    { label: "Apply for Loan", icon: Wallet },
  ], []);

  const activities = useMemo(() => [
    { icon: CheckCircle2, text: "Loan Approved - ₹5,00,000", time: "2 hours ago" },
    { icon: Target, text: "New Tender Match - LED Supply", time: "4 hours ago" },
    { icon: ShoppingCart, text: "New Order - 1000 Units", time: "6 hours ago" },
    { icon: IndianRupee, text: "Payment Received - ₹75,000", time: "3 days ago" },
  ], []);

  const notifications = useMemo(() => [
    { type: "warning" as const, title: "GST Filing Due!", message: "File returns by 20th to avoid penalties.", icon: AlertTriangle },
    { type: "success" as const, title: "Loan Approved", message: "Your business loan of ₹5 Lakh has been approved.", icon: CheckCircle2 },
    { type: "info" as const, title: "New Feature", message: "Voice commands are now live for Inventory.", icon: Lightbulb },
  ], []);

  const growthData = useMemo(() => [
    { month: "Jan", revenue: 250 },
    { month: "Feb", revenue: 320 },
    { month: "Mar", revenue: 410 },
    { month: "Apr", revenue: 380 },
    { month: "May", revenue: 450 },
    { month: "Jun", revenue: 520 },
    { month: "Jul", revenue: 480 },
    { month: "Aug", revenue: 550 },
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-100/30 rounded-full blur-[150px]" />
      </div>

      <div className="relative pt-24 pb-16 px-4 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-8 ">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-sky-600">ANALYTICS</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
                Your Business Journey
              </h1>
              <p className="text-slate-500 mt-2">Track your progress and stay motivated</p>
            </div>
            <div className="flex items-center gap-3 text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono">{currentTime}</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <LightCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-5 h-5 text-sky-600" />
                  <h2 className="font-display text-lg font-semibold text-slate-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, i) => (
                    <QuickActionButton key={i} {...action} />
                  ))}
                </div>
              </LightCard>

              {/* Financial Health */}
              <LightCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-5 h-5 text-sky-600" />
                  <h2 className="font-display text-lg font-semibold text-slate-900">Financial Health</h2>
                </div>
                <div className="flex justify-around items-center">
                  <RadialProgress progress={78} label="Cash Flow" />
                  <RadialProgress progress={65} label="Profit" />
                  <RadialProgress progress={92} label="Liquidity" />
                </div>
              </LightCard>

              {/* Activity Feed */}
              <LightCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-sky-600" />
                  <h2 className="font-display text-lg font-semibold text-slate-900">Recent Activity</h2>
                </div>
                <div className="space-y-2">
                  {activities.map((activity, i) => (
                    <ActivityItem key={i} {...activity} />
                  ))}
                </div>
              </LightCard>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Notifications */}
              <LightCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-sky-600" />
                  <h2 className="font-display text-lg font-semibold text-slate-900">Notifications</h2>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification, i) => (
                    <NotificationCard key={i} {...notification} />
                  ))}
                </div>
              </LightCard>

              {/* Credit Score */}
              <LightCard className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h2 className="font-display text-lg font-semibold text-slate-900">Credit Score</h2>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-emerald-600 mb-1">
                      <AnimatedCounter value={742} />
                    </div>
                    <div className="text-emerald-600 font-medium mb-4">Excellent</div>
                    <Button variant="outline" size="sm" className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </LightCard>

              {/* Growth Chart */}
              <LightCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  <h2 className="font-display text-lg font-semibold text-slate-900">Business Growth</h2>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}K`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        labelStyle={{ color: "#0f172a", fontWeight: "600" }}
                        formatter={(value) => [`₹${Number(value) * 1000}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </LightCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};