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
    className={`relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 ${className}`}
  >
    {/* Gradient top border */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />
    {/* Inner glow (very subtle) */}
    <div className={`absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b ${gradientFrom} ${gradientTo} opacity-[0.03] blur-3xl`} />
    <div className="relative z-10 h-full flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
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
  <PremiumCard gradientFrom={gradientFrom} gradientTo={gradientTo} className="p-6">
    <div className="flex flex-col h-full justify-between">
      <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center mb-4 shadow-sm`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">{label}</p>
        <p className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  </PremiumCard>
);

const GoalCard = ({ progress, goal, completed }: { progress: number; goal: string; completed: string }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-7">
      <div className="flex flex-col h-full items-center justify-center text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-5 self-center">DAILY GOAL</p>
        <div className="relative mb-5">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            <circle strokeWidth="8" stroke="#f1f5f9" fill="transparent" r={radius} cx="70" cy="70" />
            <motion.circle
              strokeWidth="8"
              stroke="url(#goalGradient)"
              fill="transparent"
              r={radius}
              cx="70"
              cy="70"
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
            <span className="text-4xl font-bold text-slate-900">{progress}%</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{goal}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-500">{completed}</p>
      </div>
    </PremiumCard>
  );
};

const StreakCard = ({ days, message }: { days: number; message: string }) => (
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-7">
    <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">CURRENT STREAK</p>
      <div>
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-6xl font-display font-bold text-slate-900 leading-none">{days}</span>
          <span className="text-2xl text-slate-400 font-medium">days</span>
        </div>
        <div className="flex gap-1.5 mb-5 h-2.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`h-full flex-1 rounded-full ${i < days ? "bg-gradient-to-r from-sky-400 to-cyan-400 shadow-sm" : "bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex items-center gap-2 text-amber-500">
          <Flame className="w-5 h-5 fill-amber-500" />
          <span className="text-sm font-bold uppercase tracking-wide">{message}</span>
        </div>
      </div>
    </div>
  </PremiumCard>
);

const RecordCard = ({ record, label, sublabel }: { record: number; label: string; sublabel: string }) => (
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-7">
     <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">BEST STREAK</p>
      <div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-6xl font-display font-bold text-slate-900 leading-none">{record}</span>
          <span className="text-2xl text-slate-400 font-medium">days</span>
        </div>
        <div className="flex items-center gap-2 text-amber-500 mb-2">
          <Trophy className="w-5 h-5 fill-amber-500" />
          <span className="text-sm font-bold uppercase tracking-wide">{label}</span>
        </div>
        <p className="text-xs font-semibold text-slate-400 tracking-wider font-mono">{sublabel}</p>
      </div>
    </div>
  </PremiumCard>
);

const ActivityOverview = () => {
  const [activeTab, setActiveTab] = useState("This Week");
  
  const dataMap = {
      "Today": [
          { time: "9am", value: 0.5 }, { time: "11am", value: 1.2 }, { time: "1pm", value: 0.8 }, 
          { time: "3pm", value: 1.5 }, { time: "5pm", value: 0.9 }, { time: "7pm", value: 0.4 }
      ],
      "This Week": [
          { time: "Mon", value: 2.5 }, { time: "Tue", value: 3.2 }, { time: "Wed", value: 1.8 },
          { time: "Thu", value: 4.1 }, { time: "Fri", value: 3.5 }, { time: "Sat", value: 2.0 }, { time: "Sun", value: 0.5 }
      ],
      "This Year": [
          { time: "Jan", value: 120 }, { time: "Feb", value: 145 }, { time: "Mar", value: 160 },
          { time: "Apr", value: 135 }, { time: "May", value: 190 }, { time: "Jun", value: 210 }
      ]
  };

  const tabs = ["Today", "This Week", "This Year"];

  return (
    <PremiumCard gradientFrom="from-slate-700" gradientTo="to-slate-900" className="p-8 bg-slate-900 border-none text-white overflow-visible shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">FOCUS TREND</p>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "text-slate-400 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[activeTab as keyof typeof dataMap]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)" }}
              labelStyle={{ color: "#e2e8f0", fontWeight: "700", marginBottom: "0.5rem" }}
              itemStyle={{ color: "#f59e0b", fontWeight: "600" }}
              formatter={(value: any) => [`${value} hours`, "Focus Time"]}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={4} fill="url(#activityGradient)" activeDot={{ r: 8, strokeWidth: 0, fill: "#f59e0b" }} />
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
    { label: "THIS WEEK", value: "₹1,85,000", icon: Calendar, iconColor: "bg-sky-500", gradientFrom: "from-sky-500", gradientTo: "to-blue-600" },
    { label: "THIS MONTH", value: "₹7,42,000", icon: Target, iconColor: "bg-emerald-500", gradientFrom: "from-emerald-500", gradientTo: "to-teal-600" },
    { label: "ALL TIME", value: "₹84,13,220", icon: CheckCircle2, iconColor: "bg-purple-500", gradientFrom: "from-purple-500", gradientTo: "to-pink-600" },
  ], []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Subtle Premium Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-sky-50/50 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-slate-50/80 rounded-full blur-[100px]" />
      </div>

      <div className="relative pt-32 pb-24 px-10 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-amber-500 rounded-full" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">COMMAND CENTER</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-none">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic">Business</span> Journey
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed">Advanced insights and real-time tracking for your enterprise success.</p>
            </div>
            <div className="flex items-center gap-5 text-slate-600 bg-white px-8 py-4 rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] group transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 pr-5 border-r border-slate-100">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400">LIVE FEED</span>
              </div>
              <span className="text-2xl font-mono font-bold text-slate-800 tracking-tighter">{currentTime}</span>
            </div>
          </motion.div>

          {/* Time Stats Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeStats.map((stat, i) => (
              <TimeStatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Middle Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GoalCard progress={45} goal="₹1L target" completed="₹45,230 of ₹1,00,000 processed" />
            <StreakCard days={5} message="unboxing growth" />
            <RecordCard record={12} label="All-time high" sublabel="LATEST RECORD ACHIEVED" />
          </motion.div>

          {/* Activity Overview */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <ActivityOverview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};