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
  ReferenceLine,
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
// PREMIUM CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const PremiumCard = ({ children, className = "", gradientFrom = "from-amber-400", gradientTo = "to-orange-500" }: { children: React.ReactNode; className?: string; gradientFrom?: string; gradientTo?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`relative bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-200/50 hover:shadow-[0_15px_35px_rgb(0,0,0,0.05)] transition-all duration-300 ${className}`}
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
  <PremiumCard gradientFrom={gradientFrom} gradientTo={gradientTo} className="p-5">
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
    <PremiumCard gradientFrom="from-purple-500" gradientTo="to-pink-500" className="p-6">
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
  <PremiumCard gradientFrom="from-sky-500" gradientTo="to-cyan-400" className="p-6">
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
  <PremiumCard gradientFrom="from-amber-400" gradientTo="to-orange-500" className="p-6">
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
          { time: "00:00", value: 0.2, target: 0.5 }, { time: "02:00", value: 0.1, target: 0.5 }, { time: "04:00", value: 0.1, target: 0.5 },
          { time: "06:00", value: 0.4, target: 0.8 }, { time: "08:00", value: 1.2, target: 1.0 }, { time: "10:00", value: 2.1, target: 1.5 },
          { time: "12:00", value: 1.8, target: 1.5 }, { time: "14:00", value: 2.5, target: 2.0 }, { time: "16:00", value: 2.2, target: 2.0 },
          { time: "18:00", value: 1.4, target: 1.5 }, { time: "20:00", value: 0.9, target: 1.0 }, { time: "22:00", value: 0.5, target: 0.5 }
      ],
      "This Week": [
          { time: "Mon", value: 2.5, target: 3.0 }, { time: "Tue", value: 3.2, target: 3.0 }, { time: "Wed", value: 1.8, target: 3.0 },
          { time: "Thu", value: 4.1, target: 4.0 }, { time: "Fri", value: 3.5, target: 4.0 }, { time: "Sat", value: 2.0, target: 2.5 }, 
          { time: "Sun", value: 0.5, target: 1.0 }
      ],
      "This Year": [
          { time: "Jan", value: 120, target: 140 }, { time: "Feb", value: 145, target: 140 }, { time: "Mar", value: 160, target: 150 },
          { time: "Apr", value: 135, target: 150 }, { time: "May", value: 190, target: 180 }, { time: "Jun", value: 210, target: 200 },
          { time: "Jul", value: 180, target: 200 }, { time: "Aug", value: 205, target: 210 }, { time: "Sep", value: 195, target: 220 },
          { time: "Oct", value: 240, target: 230 }, { time: "Nov", value: 220, target: 230 }, { time: "Dec", value: 260, target: 250 }
      ]
  };

  const tabs = ["Today", "This Week", "This Year"];

  return (
    <PremiumCard gradientFrom="from-slate-800" gradientTo="to-black" className="p-6 bg-slate-950 border-none text-white overflow-visible">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            LIVE PERFORMANCE TRACKING
          </p>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">Activity Overview</h2>
        </div>
        <div className="flex items-center bg-white/5 backdrop-blur-xl p-1 rounded-xl border border-white/10 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105" : "text-slate-500 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[activeTab as keyof typeof dataMap]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="5 5" vertical={true} horizontal={true} />
            <XAxis dataKey="time" stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} dy={15} />
            <YAxis stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}${activeTab === 'This Year' ? '' : 'h'}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(2, 6, 23, 0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "16px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)" }}
              labelStyle={{ color: "#f8fafc", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "10px", marginBottom: "8px" }}
              itemStyle={{ fontWeight: "bold", fontSize: "12px", padding: "2px 0" }}
              cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            {/* Target Area (Subtle Layer) */}
            <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={1} strokeDasharray="4 4" fill="url(#targetGradient)" />
            {/* Actual Activity Area (High Density) */}
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={4} fill="url(#activityGradient)" activeDot={{ r: 8, strokeWidth: 0, fill: "#f59e0b" }} />
            
            <ReferenceLine y={Math.max(...dataMap[activeTab as keyof typeof dataMap].map(d => d.value))} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} label={{ value: 'PEAK', position: 'right', fill: '#f59e0b', fontSize: 9, fontWeight: 'bold' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Performance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600/50" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Baseline Target</span>
        </div>
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
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden mt-[-4rem]">
      {/* VIBRANT Ambient Glows (Marketplace Style) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Sky Blue Glow - Top Right */}
        <div className="absolute top-[-10%] right-[-15%] w-[70%] h-[70%] bg-blue-400/15 rounded-full blur-[140px] animate-pulse" />
        {/* Soft Pink Glow - Top Left */}
        <div className="absolute top-[5%] left-[-15%] w-[60%] h-[60%] bg-pink-400/10 rounded-full blur-[120px]" />
        {/* Vibrant Cyan Glow - Mid Right */}
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[100px]" />
        {/* Soft Purple Glow - Lower Left */}
        <div className="absolute bottom-[10%] left-[-5%] w-[45%] h-[45%] bg-purple-400/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative pt-28 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="h-[2px] w-12 bg-amber-500" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">COMMAND CENTER v4.0</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter leading-none">
                Elite <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-orange-600 to-pink-600 italic">Insights</span>
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-bold tracking-tight opacity-80">Real-time enterprise intelligence & strategic growth monitoring.</p>
            </div>
            
            <div className="flex items-center justify-center gap-5 text-slate-600 bg-white/70 backdrop-blur-2xl px-6 py-4 rounded-2xl border border-white shadow-xl shadow-slate-200/20 self-center md:self-end">
              <div className="flex items-center gap-3 pr-5 border-r border-slate-200">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-slate-400">SYNCED</span>
              </div>
              <span className="text-2xl font-mono font-black text-slate-800 tracking-tighter">{currentTime}</span>
            </div>
          </motion.div>

          {/* Time Stats Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {timeStats.map((stat, i) => (
              <TimeStatCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Middle Row */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <GoalCard progress={45} goal="Target Processed" completed="₹45,230 of ₹1,00,000 Today" />
            <StreakCard days={5} message="unboxing excellence" />
            <RecordCard record={12} label="New Daily High" sublabel="VERIFIED PERFORMANCE" />
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