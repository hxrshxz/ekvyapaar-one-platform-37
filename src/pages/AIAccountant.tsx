"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee, FileText, Wallet, Lightbulb, CheckCircle2, ShieldCheck, Zap, Cog, Bot
} from "lucide-react";
import { AccountantCommandBar } from "@/components/AccountantCommandBar";
// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, stiffness: 100, damping: 12 },
  },
};

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.04 },
  },
};
const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- Animated Counter Hook ---
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

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

// --- Base Dashboard Card Component ---
const DashboardCard = ({ children, className = "" }) => (
  <Card className={`bg-white/90 border-slate-200/60 backdrop-blur-2xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {children}
  </Card>
);

// --- Memoized Stat Card for Dashboard items ---
type StatType = {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  iconColor: string;
  change: string;
};

interface MemoizedStatCardProps {
  stat: StatType;
}

const MemoizedStatCard = React.memo(({ stat }: MemoizedStatCardProps) => {
  return (
    <DashboardCard>
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

// --- MAIN AI ACCOUNTANT COMPONENT ---
export const AIAccountant = () => {
  const [step, setStep] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState('Log Expense');

  useEffect(() => {
    let timer;
    if (step === 'processing' || step === 'automation') {
      setProcessingProgress(0);
      timer = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            if (step === 'processing') setStep('verification');
            if (step === 'automation') setStep('confirmation');
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(timer);  
  }, [step]);
  
  const handleCommand = (command) => {
    if (command === 'scan') setStep('modal');
    if (command === 'invoice') alert('Invoice creation feature coming soon!');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setTimeout(() => setStep('automation'), 300);
  };

  const resetFlow = () => {
    setStep('main');
    setSelectedCategory('');
    setProcessingProgress(0);
  };

  const stats = useMemo(() => [
    { title: "Expenses (Aug)", value: 20626, prefix: "₹", icon: Wallet, iconColor: "text-orange-500", change: "+5.2%" },
    { title: "ITC Claimable", value: 2976, prefix: "₹", icon: ShieldCheck, iconColor: "text-green-500", change: "+18.1%" },
    { title: "Bills Processed", value: 6, icon: FileText, iconColor: "text-blue-500", change: "+2 this week" },
    { title: "Potential Savings", value: 1850, prefix: "₹", icon: Lightbulb, iconColor: "text-purple-500", change: "Auto-found" },
  ], []);
  
  const headingText = "AI Accountant";

  const renderMainScreen = () => (
    <>
      <div className="relative pt-28 pb-12 flex items-center justify-center text-center">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative flex flex-col items-center px-4">
            <motion.h1 variants={sentence} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 tracking-tight">
              {headingText.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mt-4 mb-8">
              Your intelligent command center for automated bookkeeping.
            </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <AccountantCommandBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleCommand={handleCommand}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          isLoading={step === 'processing' || step === 'automation'}
        />

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 }}}>
              <MemoizedStatCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );

  const renderFlowScreen = (title, description, content) => (
    <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div initial="hidden" animate="visible" variants={itemVariants} className="w-full max-w-2xl">
            <DashboardCard>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-slate-800">{title}</CardTitle>
                    {description && <p className="text-slate-500">{description}</p>}
                </CardHeader>
                <CardContent>
                    {content}
                </CardContent>
            </DashboardCard>
        </motion.div>
    </div>
  );

  const renderModal = () => renderFlowScreen(
    "Scan New Bill",
    "How would you like to add your bill?",
    <div className="space-y-4 pt-4">
      <Button size="lg" className="w-full h-16 text-lg bg-sky-600 hover:bg-sky-700 text-white" onClick={() => setStep('processing')}>Use Camera</Button>
      <Button size="lg" variant="outline" className="w-full h-16 text-lg" onClick={() => setStep('processing')}>Upload File</Button>
      <Button variant="ghost" className="w-full" onClick={resetFlow}>Cancel</Button>
    </div>
  );
  
  const renderProcessing = (title, description) => (
     <div className="flex flex-col items-center text-center gap-6 py-8">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-sky-100 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-sky-200 rounded-full">
                <Bot className="h-12 w-12 text-sky-600"/>
            </div>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-500">{description}</p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${processingProgress}%`, transition: 'width 0.2s ease-in-out' }}></div>
        </div>
     </div>
  );

  const renderProcessingScreen = () => renderFlowScreen(
    null, null, renderProcessing("Scanning & Extracting", "AI is reading vendor, GSTIN, and tax details...")
  );
  
  const renderAutomationScreen = () => renderFlowScreen(
    null, null, renderProcessing("Automating Entry", "Recording to your Google Sheet...")
  );

  const renderVerificationScreen = () => renderFlowScreen(
    "Please Verify Details",
    "Confirm the information extracted by the AI.",
    <div className="space-y-4 text-sm">
        <div className="p-4 bg-slate-50 rounded-lg border">
            <h4 className="font-bold mb-2 text-slate-700">Vendor Info</h4>
            <div className="flex justify-between"><span>Name:</span><span className="font-medium text-slate-900">Ram Lal & Sons Fabrics</span></div>
            <div className="flex justify-between"><span>GSTIN:</span><span className="font-medium text-slate-900">07AABCR1234F1Z5</span></div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border">
            <h4 className="font-bold mb-2 text-slate-700">Amount Breakdown</h4>
            <div className="flex justify-between"><span>Total GST:</span><span className="font-medium text-slate-900">₹2,376</span></div>
            <div className="flex justify-between text-lg"><strong>Invoice Total:</strong><strong>₹15,576</strong></div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border">
            <h4 className="font-bold mb-2 text-slate-700">Select Expense Category</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Raw Material', 'Shop Expense', 'Utilities', 'Marketing', 'Other'].map(cat => (
                    <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} className="h-12" onClick={() => handleCategorySelect(cat)}>{cat}</Button>
                ))}
            </div>
        </div>
    </div>
  );

  const renderConfirmationScreen = () => renderFlowScreen(
    "Success!",
    "The bill has been recorded and saved to your ledger.",
    <div className="text-center py-8 flex flex-col items-center gap-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <CheckCircle2 className="h-24 w-24 text-green-500"/>
        </motion.div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
                Your total ITC for August is now <strong className="text-xl">₹16,676</strong>.
            </p>
        </div>
        <Button size="lg" onClick={resetFlow}>Done</Button>
    </div>
  );
  
  const ActiveScreen = () => {
    switch(step) {
        case 'main': return renderMainScreen();
        case 'modal': return renderModal();
        case 'processing': return renderProcessingScreen();
        case 'verification': return renderVerificationScreen();
        case 'automation': return renderAutomationScreen();
        case 'confirmation': return renderConfirmationScreen();
        default: return renderMainScreen();
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans isolate">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/30 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/30 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/30 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ActiveScreen />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};