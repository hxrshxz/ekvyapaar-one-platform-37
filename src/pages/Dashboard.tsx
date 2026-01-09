"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  Target,
  CheckCircle2,
  Flame,
  Trophy,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM CARD COMPONENT (Compact & Subtle Glow)
// ═══════════════════════════════════════════════════════════════════════════

const PremiumCard = ({ children, className = "", gradientFrom = "from-amber-400", gradientTo = "to-orange-500" }: { children: React.ReactNode; className?: string; gradientFrom?: string; gradientTo?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-200/50 hover:shadow-[0_15px_35px_rgb(0,0,0,0.05)] transition-all duration-300 ${className}`}
  >
    {/* Gradient top border */}
    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${gradientFrom} ${gradientTo} z-20`} />
    {/* Subtle Inner Accent Glow */}
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-b ${gradientFrom} ${gradientTo} opacity-[0.03] blur-[30px] z-0`} />
    
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
  <PremiumCard gradientFrom={gradientFrom} gradientTo={gradientTo} className="p-4 md:p-5">
    <div className="flex flex-col h-full justify-between">
      <div className={`w-9 h-9 rounded-xl ${iconColor} flex items-center justify-center mb-3 shadow-sm`}>
        <Icon className="w-4.5 h-4.5 text-white" />
      </div>
      <div>
        <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-400 mb-0.5">{label}</p>
        <p className="text-xl md:text-2xl font-display font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  </PremiumCard>
);

const GoalCard = ({ progress, goal, completed }: { progress: number; goal: string; completed: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-5 md:p-6">
      <div className="flex flex-col h-full items-center justify-center text-center">
        <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-400 mb-3">DAILY TARGET</p>
        <div className="relative mb-3">
          <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
            <circle strokeWidth="6" stroke="#f1f5f9" fill="transparent" r={radius} cx="50" cy="50" />
            <motion.circle
              strokeWidth="6"
              stroke="url(#goalGradient)"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
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
            <span className="text-2xl font-bold text-slate-900">{progress}%</span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">{goal}</span>
          </div>
        </div>
        <p className="text-[10px] font-semibold text-slate-500">{completed}</p>
      </div>
    </PremiumCard>
  );
};

const StreakCard = ({ days, message }: { days: number; message: string }) => (
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-5 md:p-6">
    <div className="flex flex-col h-full justify-between">
      <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-400 mb-2">MOMENTUM</p>
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-display font-bold text-slate-900 leading-none tracking-tighter">{days}</span>
          <span className="text-sm text-slate-400 font-bold uppercase">DAYS</span>
        </div>
        <div className="flex gap-1.5 mb-3 h-1.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`h-full flex-1 rounded-full ${i < days ? "bg-gradient-to-r from-sky-400 to-cyan-400 shadow-sm" : "bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-amber-500">
          <Flame className="w-3.5 h-3.5 fill-amber-500" />
          <span className="text-[9px] font-black uppercase tracking-widest">{message}</span>
        </div>
      </div>
    </div>
  </PremiumCard>
);

const RecordCard = ({ record, label, sublabel }: { record: number; label: string; sublabel: string }) => (
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-5 md:p-6">
     <div className="flex flex-col h-full justify-between">
      <p className="text-[9px] font-black tracking-[0.1em] uppercase text-slate-400 mb-2">PERSONAL BEST</p>
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-display font-bold text-slate-900 leading-none tracking-tighter">{record}</span>
          <span className="text-sm text-slate-400 font-bold uppercase">RECORD</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-600 mb-1.5">
          <Trophy className="w-3.5 h-3.5 fill-emerald-500" />
          <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-[8px] font-bold text-slate-400 tracking-wider font-mono">{sublabel}</p>
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
    <PremiumCard gradientFrom="from-slate-800" gradientTo="to-black" className="p-5 bg-slate-950 border-none text-white overflow-visible">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-500">ANALYTICS</p>
          <h2 className="text-xl font-display font-bold text-white tracking-tight">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-white/5 backdrop-blur-xl p-1 rounded-xl border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "text-slate-500 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[activeTab as keyof typeof dataMap]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={9} fontWeight="bold" tickLine={false} axisLine={false} dy={5} />
            <YAxis stroke="#475569" fontSize={9} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(2, 6, 23, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "8px", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)" }}
              labelStyle={{ color: "#f8fafc", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "9px", marginBottom: "3px" }}
              itemStyle={{ color: "#f59e0b", fontWeight: "bold", fontSize: "11px" }}
              formatter={(value: any) => [`${value}h`, "TIME"]}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} fill="url(#activityGradient)" activeDot={{ r: 5, strokeWidth: 0, fill: "#f59e0b" }} />
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
    { label: "DAILY SALES", value: "₹45,230", icon: Clock, iconColor: "bg-amber-500", gradientFrom: "from-amber-400", gradientTo: "to-orange-500" },
    { label: "WEEKLY GAIN", value: "₹1,85,000", icon: Calendar, iconColor: "bg-sky-500", gradientFrom: "from-sky-500", gradientTo: "to-blue-600" },
    { label: "MONTHLY TARGET", value: "₹7,42,000", icon: Target, iconColor: "bg-emerald-500", gradientFrom: "from-emerald-500", gradientTo: "to-teal-600" },
    { label: "TOTAL ASSETS", value: "₹84.13L", icon: CheckCircle2, iconColor: "bg-purple-500", gradientFrom: "from-purple-500", gradientTo: "to-pink-600" },
  ], []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      {/* Subtle Marketplace-style Ambient Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Top-right sky blue glow */}
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-sky-200/20 rounded-full blur-[100px]" />
        {/* Mid-left purple/pink glow */}
        <div className="absolute top-[15%] left-[-10%] w-[50%] h-[50%] bg-purple-200/20 rounded-full blur-[100px]" />
        {/* Soft bottom-center glow */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-blue-100/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative pt-20 pb-12 px-4 md:px-8 mt-[-4rem]">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="h-[1px] w-8 bg-amber-500" />
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-400">COMMAND CENTER</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 italic">Business</span> Journey
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-bold tracking-tight">Advanced tracking and real-time enterprise insights.</p>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-slate-600 bg-white/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/80 shadow-sm self-center md:self-end">
              <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black tracking-widest text-slate-400">LIVE FEED</span>
              </div>
              <span className="text-lg font-mono font-black text-slate-800 tracking-tighter">{currentTime}</span>
            </div>
          </motion.div>

          {/* Time Stats Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {timeStats.map((stat, i) => (
              <TimeStatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Middle Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <GoalCard progress={45} goal="₹1L target" completed="₹45,230 of ₹1,00,000 processed" />
            <StreakCard days={5} message="keep the momentum" />
            <RecordCard record={12} label="Elite High" sublabel="VERIFIED BEST" />
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