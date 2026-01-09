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
  Sparkles,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
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
// GLASS CARD COMPONENT (Dark, premium glassmorphism)
// ═══════════════════════════════════════════════════════════════════════════

const GlassCard = ({ children, className = "", glowColor = "sky" }: { children: React.ReactNode; className?: string; glowColor?: "sky" | "purple" | "emerald" | "amber" }) => {
  const glowStyles = {
    sky: "hover:shadow-sky-500/20",
    purple: "hover:shadow-purple-500/20",
    emerald: "hover:shadow-emerald-500/20",
    amber: "hover:shadow-amber-500/20",
  };
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl ${glowStyles[glowColor]} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD COMPONENT (with gradient icon backgrounds)
// ═══════════════════════════════════════════════════════════════════════════

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  change: number;
  gradient: string;
}

const StatCard = ({ title, value, prefix = "", suffix = "", icon: Icon, change, gradient }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <GlassCard className="p-5" glowColor="sky">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <Badge className={`text-xs font-semibold ${isPositive ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(change)}%
        </Badge>
      </div>
      <div className="space-y-0.5">
        <p className="text-3xl font-display font-bold text-white">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="text-sm text-slate-400">{title}</p>
      </div>
    </GlassCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// QUICK ACTION BUTTON (with glow effect)
// ═══════════════════════════════════════════════════════════════════════════

const QuickActionButton = ({ icon: Icon, label, gradient }: { icon: React.ElementType; label: string; gradient: string }) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="h-20 w-full rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
  >
    <div className={`w-9 h-9 rounded-lg ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
  </motion.button>
);

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION CARD (dark theme)
// ═══════════════════════════════════════════════════════════════════════════

interface NotificationProps {
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  icon: React.ElementType;
}

const NotificationCard = ({ type, title, message, icon: Icon }: NotificationProps) => {
  const styles = {
    warning: { bg: "bg-amber-500/10 border-amber-500/30", icon: "text-amber-400" },
    success: { bg: "bg-emerald-500/10 border-emerald-500/30", icon: "text-emerald-400" },
    info: { bg: "bg-sky-500/10 border-sky-500/30", icon: "text-sky-400" },
  };

  return (
    <div className={`p-3 rounded-xl border flex items-start gap-3 ${styles[type].bg}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles[type].icon}`} />
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-400">{message}</p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY ITEM (dark theme)
// ═══════════════════════════════════════════════════════════════════════════

const ActivityItem = ({ icon: Icon, text, time }: { icon: React.ElementType; text: string; time: string }) => (
  <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors">
    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="flex-grow min-w-0">
      <p className="text-sm text-white font-medium truncate">{text}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// RADIAL PROGRESS (animated, premium)
// ═══════════════════════════════════════════════════════════════════════════

const RadialProgress = ({ progress, label, color = "#0ea5e9" }: { progress: number; label: string; color?: string }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <div className="relative">
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
          <circle strokeWidth="5" stroke="rgba(255,255,255,0.1)" fill="transparent" r={radius} cx="40" cy="40" />
          <motion.circle
            strokeWidth="5"
            stroke={color}
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{progress}%</span>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => [
    { title: "Today's Revenue", value: 45230, prefix: "₹", icon: IndianRupee, change: 12.5, gradient: "bg-gradient-to-br from-sky-500 to-cyan-400" },
    { title: "New Orders", value: 28, icon: ShoppingCart, change: 8.2, gradient: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { title: "Customers", value: 1247, icon: Users, change: 15.3, gradient: "bg-gradient-to-br from-amber-500 to-orange-500" },
    { title: "Growth Rate", value: 23, suffix: "%", icon: Target, change: 3.1, gradient: "bg-gradient-to-br from-emerald-500 to-teal-400" },
  ], []);

  const quickActions = useMemo(() => [
    { label: "New Order", icon: ShoppingCart, gradient: "bg-gradient-to-br from-sky-500 to-cyan-400" },
    { label: "GST Filing", icon: FileText, gradient: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { label: "View Tenders", icon: Target, gradient: "bg-gradient-to-br from-amber-500 to-orange-500" },
    { label: "Apply for Loan", icon: Wallet, gradient: "bg-gradient-to-br from-emerald-500 to-teal-400" },
  ], []);

  const activities = useMemo(() => [
    { icon: CheckCircle2, text: "Loan Approved - ₹5,00,000", time: "2 hours ago" },
    { icon: Target, text: "New Tender Match - LED Supply", time: "4 hours ago" },
    { icon: ShoppingCart, text: "New Order - 1000 Units", time: "6 hours ago" },
    { icon: IndianRupee, text: "Payment Received - ₹75,000", time: "3 days ago" },
  ], []);

  const notifications = useMemo(() => [
    { type: "warning" as const, title: "GST Filing Due!", message: "File returns by 20th to avoid penalties.", icon: AlertTriangle },
    { type: "success" as const, title: "Loan Approved", message: "Your business loan of ₹5 Lakh is approved.", icon: CheckCircle2 },
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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-sky-600/20 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-1/4 left-1/3 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative pt-20 pb-12 px-4 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400">COMMAND CENTER</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Your Business Journey
              </h1>
              <p className="text-slate-400 mt-1">Track progress & stay ahead of the curve.</p>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="text-base font-mono text-white">{currentTime}</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Quick Actions */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h2 className="font-display text-base font-semibold text-white">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action, i) => (
                    <QuickActionButton key={i} {...action} />
                  ))}
                </div>
              </GlassCard>

              {/* Financial Health */}
              <GlassCard className="p-5" glowColor="emerald">
                <div className="flex items-center gap-2.5 mb-4">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-display text-base font-semibold text-white">Financial Health</h2>
                </div>
                <div className="flex justify-around items-center">
                  <RadialProgress progress={78} label="Cash Flow" color="#0ea5e9" />
                  <RadialProgress progress={65} label="Profit" color="#a855f7" />
                  <RadialProgress progress={92} label="Liquidity" color="#10b981" />
                </div>
              </GlassCard>

              {/* Activity Feed */}
              <GlassCard className="p-5" glowColor="purple">
                <div className="flex items-center gap-2.5 mb-4">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h2 className="font-display text-base font-semibold text-white">Recent Activity</h2>
                </div>
                <div className="space-y-1">
                  {activities.map((activity, i) => (
                    <ActivityItem key={i} {...activity} />
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Notifications */}
              <GlassCard className="p-5" glowColor="amber">
                <div className="flex items-center gap-2.5 mb-4">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h2 className="font-display text-base font-semibold text-white">Notifications</h2>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((notification, i) => (
                    <NotificationCard key={i} {...notification} />
                  ))}
                </div>
              </GlassCard>

              {/* Credit Score */}
              <GlassCard className="p-5 relative overflow-hidden" glowColor="emerald">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h2 className="font-display text-base font-semibold text-white">Credit Score</h2>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-emerald-400 mb-0.5" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}>
                      <AnimatedCounter value={742} />
                    </div>
                    <div className="text-emerald-400 font-medium text-sm mb-3">Excellent</div>
                    <Button variant="outline" size="sm" className="bg-white/5 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </GlassCard>

              {/* Growth Chart */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <TrendingUp className="w-5 h-5 text-sky-400" />
                  <h2 className="font-display text-base font-semibold text-white">Business Growth</h2>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorRevenueDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}K`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(10px)" }}
                        labelStyle={{ color: "#fff", fontWeight: "600" }}
                        itemStyle={{ color: "#0ea5e9" }}
                        formatter={(value) => [`₹${Number(value) * 1000}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorRevenueDark)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};