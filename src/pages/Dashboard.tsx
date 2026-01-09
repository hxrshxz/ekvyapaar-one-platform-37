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
  Calendar,
  Trophy,
  Flame,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
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
// PREMIUM CARD WITH GRADIENT TOP BORDER
// ═══════════════════════════════════════════════════════════════════════════

const PremiumCard = ({ children, className = "", gradientFrom = "from-amber-400", gradientTo = "to-orange-500" }: { children: React.ReactNode; className?: string; gradientFrom?: string; gradientTo?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
  >
    {/* Gradient top border */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />
    {/* Inner glow */}
    <div className={`absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b ${gradientFrom} ${gradientTo} opacity-10 blur-2xl`} />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// TIME STAT CARD (like the reference: TODAY, THIS WEEK, etc.)
// ═══════════════════════════════════════════════════════════════════════════

interface TimeStatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const TimeStatCard = ({ label, value, icon: Icon, iconColor, gradientFrom, gradientTo }: TimeStatCardProps) => (
  <PremiumCard gradientFrom={gradientFrom} gradientTo={gradientTo} className="p-5">
    <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{label}</p>
    <p className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">{value}</p>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// GOAL CARD (with radial progress like reference)
// ═══════════════════════════════════════════════════════════════════════════

const GoalCard = ({ progress, goal, completed }: { progress: number; goal: string; completed: string }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-6 flex flex-col items-center justify-center">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4 self-start">DAILY GOAL</p>
      <div className="relative mb-4">
        <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
          <circle strokeWidth="8" stroke="rgba(255,255,255,0.1)" fill="transparent" r={radius} cx="65" cy="65" />
          <motion.circle
            strokeWidth="8"
            stroke="url(#goalGradient)"
            fill="transparent"
            r={radius}
            cx="65"
            cy="65"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{progress}%</span>
          <span className="text-xs text-slate-500">{goal}</span>
        </div>
      </div>
      <p className="text-sm text-slate-400">{completed}</p>
    </PremiumCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STREAK CARD (Current Streak with progress bar)
// ═══════════════════════════════════════════════════════════════════════════

const StreakCard = ({ days, message }: { days: number; message: string }) => (
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-6">
    <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">CURRENT STREAK</p>
    <div className="flex items-baseline gap-2 mb-4">
      <span className="text-5xl font-display font-bold text-white">{days}</span>
      <span className="text-xl text-slate-400">days</span>
    </div>
    {/* Mini progress bar */}
    <div className="flex gap-1 mb-4">
      {[...Array(7)].map((_, i) => (
        <div key={i} className={`h-2 flex-1 rounded-full ${i < days ? "bg-gradient-to-r from-sky-400 to-cyan-400" : "bg-slate-700"}`} />
      ))}
    </div>
    <div className="flex items-center gap-2 text-amber-400">
      <Flame className="w-4 h-4" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// BEST STREAK / RECORD CARD
// ═══════════════════════════════════════════════════════════════════════════

const RecordCard = ({ record, label, sublabel }: { record: number; label: string; sublabel: string }) => (
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-6">
    <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">BEST STREAK</p>
    <div className="flex items-baseline gap-2 mb-3">
      <span className="text-5xl font-display font-bold text-white">{record}</span>
      <span className="text-xl text-slate-400">days</span>
    </div>
    <div className="flex items-center gap-2 text-amber-400 mb-2">
      <Trophy className="w-4 h-4" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
    <p className="text-xs text-slate-500">{sublabel}</p>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY OVERVIEW (Big chart section)
// ═══════════════════════════════════════════════════════════════════════════

const ActivityOverview = ({ data }: { data: { day: string; value: number }[] }) => {
  const [activeTab, setActiveTab] = useState("This Week");
  const tabs = ["Today", "This Week", "This Year"];

  return (
    <PremiumCard gradientFrom="from-violet-500" gradientTo="to-purple-600" className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">FOCUS TREND</p>
          <h2 className="text-2xl font-display font-bold text-white">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-slate-800 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? "bg-amber-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
              labelStyle={{ color: "#fff", fontWeight: "600" }}
              itemStyle={{ color: "#f59e0b" }}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} fill="url(#activityGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </PremiumCard>
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

  const timeStats = useMemo(() => [
    { label: "TODAY", value: "₹45,230", icon: Clock, iconColor: "bg-amber-500", gradientFrom: "from-amber-400", gradientTo: "to-orange-500" },
    { label: "THIS WEEK", value: "₹1,85,000", icon: Calendar, iconColor: "bg-sky-500", gradientFrom: "from-sky-400", gradientTo: "to-cyan-400" },
    { label: "THIS MONTH", value: "₹7,42,000", icon: Target, iconColor: "bg-emerald-500", gradientFrom: "from-emerald-400", gradientTo: "to-teal-400" },
    { label: "ALL TIME", value: "₹84,13,220", icon: CheckCircle2, iconColor: "bg-purple-500", gradientFrom: "from-purple-400", gradientTo: "to-pink-500" },
  ], []);

  const activityData = useMemo(() => [
    { day: "Mon", value: 2.5 },
    { day: "Tue", value: 3.2 },
    { day: "Wed", value: 1.8 },
    { day: "Thu", value: 4.1 },
    { day: "Fri", value: 3.5 },
    { day: "Sat", value: 2.0 },
    { day: "Sun", value: 0.5 },
  ], []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 -left-1/4 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[200px]" />
        <div className="absolute -bottom-1/4 left-1/3 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[200px]" />
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
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400">ANALYTICS</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 mt-1">
                Your Business Journey
              </h1>
              <p className="text-slate-400 mt-1">Track your progress and stay motivated</p>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 bg-slate-800/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-700/50">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">IST</Badge>
              <span className="text-lg font-mono text-white">{currentTime}</span>
            </div>
          </motion.div>

          {/* Time Stats Row (4 cards like reference) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeStats.map((stat, i) => (
              <TimeStatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Middle Row: Goal, Streak, Record (3 cards) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GoalCard progress={45} goal="₹1L goal" completed="₹45,230 of ₹1,00,000 completed" />
            <StreakCard days={5} message="Keep the momentum going!" />
            <RecordCard record={12} label="Personal record" sublabel="12 days to beat" />
          </motion.div>

          {/* Activity Overview (Big chart) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <ActivityOverview data={activityData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};