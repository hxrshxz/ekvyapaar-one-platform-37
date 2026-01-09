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
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ${className}`}
  >
    {/* Gradient top border with subtle glow */}
    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} z-20`} />
    {/* Subtle Inner Accent Glow */}
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b ${gradientFrom} ${gradientTo} opacity-[0.04] blur-[40px] z-0`} />
    
    <div className="relative z-10 h-full flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS (No changes to TimeStatCard, GoalCard, StreakCard, RecordCard logic, but added padding/radius)
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
  <PremiumCard gradientFrom={gradientFrom} gradientTo={gradientTo} className="p-7">
    <div className="flex flex-col h-full justify-between">
      <div className={`w-12 h-12 rounded-2xl ${iconColor} flex items-center justify-center mb-5 shadow-lg shadow-inherit/20`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-2">{label}</p>
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
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-8">
      <div className="flex flex-col h-full items-center justify-center text-center">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-6 self-center">DAILY TARGET</p>
        <div className="relative mb-6">
          <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
            <circle strokeWidth="10" stroke="#f1f5f9" fill="transparent" r={radius} cx="75" cy="75" />
            <motion.circle
              strokeWidth="10"
              stroke="url(#goalGradient)"
              fill="transparent"
              r={radius}
              cx="75"
              cy="75"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
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
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{goal}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">{completed}</p>
      </div>
    </PremiumCard>
  );
};

const StreakCard = ({ days, message }: { days: number; message: string }) => (
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-8">
    <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-3">CURRENT MOMENTUM</p>
      <div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-7xl font-display font-bold text-slate-900 leading-none tracking-tighter">{days}</span>
          <span className="text-2xl text-slate-400 font-bold">DAYS</span>
        </div>
        <div className="flex gap-2 mb-6 h-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`h-full flex-1 rounded-full ${i < days ? "bg-gradient-to-r from-sky-400 to-cyan-400 shadow-[0_2px_10px_rgba(56,189,248,0.4)]" : "bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex items-center gap-3 text-amber-500 bg-amber-50/50 w-fit px-4 py-2 rounded-2xl border border-amber-100/50">
          <Flame className="w-5 h-5 fill-amber-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">{message}</span>
        </div>
      </div>
    </div>
  </PremiumCard>
);

const RecordCard = ({ record, label, sublabel }: { record: number; label: string; sublabel: string }) => (
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-8">
     <div className="flex flex-col h-full justify-between">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-3">ELITE PERFORMANCE</p>
      <div>
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-7xl font-display font-bold text-slate-900 leading-none tracking-tighter">{record}</span>
          <span className="text-2xl text-slate-400 font-bold">RECORD</span>
        </div>
        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50/50 w-fit px-4 py-2 rounded-2xl border border-emerald-100/50 mb-3">
          <Trophy className="w-5 h-5 fill-emerald-500" />
          <span className="text-xs font-black uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] font-mono leading-none">{sublabel}</p>
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
    <PremiumCard gradientFrom="from-slate-800" gradientTo="to-black" className="p-10 bg-slate-950 border-none text-white overflow-visible shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-14">
        <div className="space-y-2">
          <p className="text-xs font-black tracking-[0.3em] uppercase text-slate-500">MOMENTUM ANALYTICS</p>
          <h2 className="text-4xl font-display font-bold text-white tracking-tighter">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? "bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-105" : "text-slate-500 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[activeTab as keyof typeof dataMap]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={12} fontWeight="bold" tickLine={false} axisLine={false} dy={20} />
            <YAxis stroke="#475569" fontSize={12} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(2, 6, 23, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "20px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 1)" }}
              labelStyle={{ color: "#f8fafc", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "14px", marginBottom: "10px" }}
              itemStyle={{ color: "#f59e0b", fontWeight: "bold" }}
              formatter={(value: any) => [`${value} hours`, "ACTIVE FOCUS"]}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={5} fill="url(#activityGradient)" activeDot={{ r: 10, strokeWidth: 0, fill: "#f59e0b" }} />
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
    { label: "DAILY REVENUE", value: "₹45,230", icon: Clock, iconColor: "bg-amber-500", gradientFrom: "from-amber-400", gradientTo: "to-orange-500" },
    { label: "WEEKLY GAIN", value: "₹1,85,000", icon: Calendar, iconColor: "bg-sky-500", gradientFrom: "from-sky-500", gradientTo: "to-blue-600" },
    { label: "MONTHLY TARGET", value: "₹7,42,000", icon: Target, iconColor: "bg-emerald-500", gradientFrom: "from-emerald-500", gradientTo: "to-teal-600" },
    { label: "TOTAL ASSETS", value: "₹84.13L", icon: CheckCircle2, iconColor: "bg-purple-500", gradientFrom: "from-purple-500", gradientTo: "to-pink-600" },
  ], []);

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-900 selection:bg-amber-200 selection:text-amber-900">
      {/* Dynamic Ambient Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-amber-50/40 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-50/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative pt-36 pb-32 px-12 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Advanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">COMMAND CENTER v3.0</span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-none">
                Elite <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-orange-600 to-pink-600 italic">Insights</span>
              </h1>
              <p className="text-xl text-slate-500 font-bold max-w-2xl leading-relaxed tracking-tight">Real-time enterprise intelligence & strategic growth monitoring.</p>
            </div>
            <div className="flex items-center gap-6 text-slate-600 bg-white/80 backdrop-blur-2xl px-10 py-6 rounded-[32px] border border-white shadow-[0_10px_50px_rgba(0,0,0,0.04)] group transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <div className="flex items-center gap-4 pr-6 border-r border-slate-100">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 relative" />
                </div>
                <span className="text-xs font-black tracking-[0.3em] text-slate-400">REALTIME</span>
              </div>
              <span className="text-3xl font-mono font-black text-slate-900 tracking-tighter">{currentTime}</span>
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