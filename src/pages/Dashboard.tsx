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
// PREMIUM CARD WITH GRADIENT TOP BORDER (Light Version)
// ═══════════════════════════════════════════════════════════════════════════

const PremiumCard = ({ children, className = "", gradientFrom = "from-amber-400", gradientTo = "to-orange-500" }: { children: React.ReactNode; className?: string; gradientFrom?: string; gradientTo?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100/60 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {/* Gradient top border */}
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />
    {/* Inner glow (subtle for light theme) */}
    <div className={`absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b ${gradientFrom} ${gradientTo} opacity-5 blur-3xl`} />
    <div className="relative z-10 h-full flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// TIME STAT CARD
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
      <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">{label}</p>
        <p className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// GOAL CARD (with radial progress)
// ═══════════════════════════════════════════════════════════════════════════

const GoalCard = ({ progress, goal, completed }: { progress: number; goal: string; completed: string }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-6">
      <div className="flex flex-col h-full items-center justify-center text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4 self-center">DAILY GOAL</p>
        <div className="relative mb-4">
          <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
            <circle strokeWidth="8" stroke="#f1f5f9" fill="transparent" r={radius} cx="65" cy="65" />
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
            <span className="text-3xl font-bold text-slate-900">{progress}%</span>
            <span className="text-xs text-slate-500">{goal}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-500">{completed}</p>
      </div>
    </PremiumCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STREAK CARD
// ═══════════════════════════════════════════════════════════════════════════

const StreakCard = ({ days, message }: { days: number; message: string }) => (
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-6">
    <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">CURRENT STREAK</p>
      <div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-display font-bold text-slate-900">{days}</span>
          <span className="text-xl text-slate-400">days</span>
        </div>
        <div className="flex gap-1 mb-4 h-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`h-full flex-1 rounded-full ${i < days ? "bg-gradient-to-r from-sky-400 to-cyan-400 shadow-sm" : "bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex items-center gap-2 text-amber-500">
          <Flame className="w-4 h-4 fill-amber-500" />
          <span className="text-sm font-bold">{message}</span>
        </div>
      </div>
    </div>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// RECORD CARD
// ═══════════════════════════════════════════════════════════════════════════

const RecordCard = ({ record, label, sublabel }: { record: number; label: string; sublabel: string }) => (
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-6">
     <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">BEST STREAK</p>
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-display font-bold text-slate-900">{record}</span>
          <span className="text-xl text-slate-400">days</span>
        </div>
        <div className="flex items-center gap-2 text-amber-500 mb-1">
          <Trophy className="w-4 h-4 fill-amber-500" />
          <span className="text-sm font-bold">{label}</span>
        </div>
        <p className="text-xs font-medium text-slate-500">{sublabel}</p>
      </div>
    </div>
  </PremiumCard>
);

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY OVERVIEW (Interactive Chart)
// ═══════════════════════════════════════════════════════════════════════════

const ActivityOverview = () => {
  const [activeTab, setActiveTab] = useState("This Week");
  
  // Data for different tabs
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
    <PremiumCard gradientFrom="from-slate-700" gradientTo="to-slate-800" className="p-6 bg-slate-900 border-none text-white overflow-visible">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">FOCUS TREND</p>
          <h2 className="text-2xl font-display font-bold text-white">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-slate-800/50 p-1 rounded-lg border border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20" : "text-slate-400 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[activeTab as keyof typeof dataMap]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => activeTab === 'This Year' ? `${v}h` : `${v}h`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }}
              labelStyle={{ color: "#e2e8f0", fontWeight: "600", marginBottom: "0.25rem" }}
              itemStyle={{ color: "#f59e0b", fontWeight: "500" }}
              formatter={(value: any) => [`${value} hours`, "Focus Time"]}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fill="url(#activityGradient)" activeDot={{ r: 6, strokeWidth: 0, fill: "#f59e0b" }} />
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

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900">
      {/* Soft Light Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-amber-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-sky-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative pt-24 pb-16 px-6 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-widest uppercase text-amber-600">ANALYTICS</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your Business Journey
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Track your progress and stay motivated</p>
            </div>
            <div className="flex items-center gap-3 text-slate-500 bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs font-bold hover:bg-amber-100">IST</Badge>
              <span className="text-lg font-mono font-semibold text-slate-700">{currentTime}</span>
            </div>
          </motion.div>

          {/* Time Stats Row (4 cards like reference) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeStats.map((stat, i) => (
              <TimeStatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Middle Row: Goal, Streak, Record (3 cards) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoalCard progress={45} goal="₹1L goal" completed="₹45,230 of ₹1,00,000 completed" />
            <StreakCard days={5} message="Keep the momentum going!" />
            <RecordCard record={12} label="Personal record" sublabel="12 days to beat" />
          </motion.div>

          {/* Activity Overview (Big chart with dark contrast) */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <ActivityOverview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};