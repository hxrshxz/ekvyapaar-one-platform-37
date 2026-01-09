"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useSpring } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
    Search, Wand2, Camera, Info, ChevronDown, Bot, User, X, Mic, Languages, Bell,
    IndianRupee, FileText, Wallet, Lightbulb, ShieldCheck, CheckCircle, AlertTriangle,
    Sheet, Database, FileDown, TrendingUp, DollarSign, ShoppingCart, BarChart2
} from "lucide-react";

import graphMonthly from '@/assets/graph-monthly.png';

// --- Custom Hook for Voice Recognition ---
const useSpeechRecognition = ({ lang }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const hasRecognitionSupport = useMemo(() => typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window), []);
  useEffect(() => {
    if (!hasRecognitionSupport) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.onresult = (event) => {
      let interimTranscript = '', finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }
      setText(finalTranscript + interimTranscript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, [lang, hasRecognitionSupport]);
  const startListening = () => { if (recognitionRef.current && !isListening) { setText(''); recognitionRef.current.start(); setIsListening(true); } };
  const stopListening = () => { if (recognitionRef.current && isListening) { recognitionRef.current.stop(); setIsListening(false); } };
  return { text, startListening, stopListening, isListening, hasRecognitionSupport };
};

// --- Toast Notification Component ---
const Toast = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-slate-800';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertTriangle : Info;
  return (<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-4 rounded-lg shadow-2xl text-white ${bgColor}`}><Icon className="h-6 w-6" /><span className="text-lg font-medium">{message}</span></motion.div>);
};

// --- MODIFIED: Notification Bell Component ---
const NotificationBell = ({ onSendSummary, onGenerateInvoice }) => { // MODIFICATION: Added onGenerateInvoice prop
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSummaryClick = () => {
    onSendSummary();
    setIsOpen(false);
  };

  // MODIFICATION: New handler for the invoice action
  const handleInvoiceClick = () => {
    onGenerateInvoice();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(prev => !prev)} className="rounded-full hover:bg-slate-200/70 relative">
        <Bell className="h-5 w-5 text-slate-600" />
        <span className="absolute top-1 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full z-20 mt-2 w-72 right-0 origin-top-right rounded-xl border border-slate-200 bg-white/90 p-2 shadow-xl backdrop-blur-sm"
          >
            <div className="font-semibold text-sm text-slate-800 p-2">Notifications</div>
            <button
              onClick={handleSummaryClick}
              className="w-full text-left p-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <p className="font-medium text-slate-700 text-sm">Action Required: Send Monthly Report</p>
              <p className="text-xs text-slate-500">Click here to email the August sales summary.</p>
            </button>
             <button
              onClick={handleInvoiceClick} // MODIFICATION: Changed onClick handler
              className="w-full text-left p-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <p className="font-medium text-slate-700 text-sm">Create invoice for the Last transaction</p>
              <p className="text-xs text-slate-500">Click here to generate the invoice</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Multilingual Placeholders ---
const englishPlaceholders = [ "Log expense from 'ABC Hardware'...", "Create invoice for 'Innovate Tech'...", "Show my ITC for last month...", "What are my total sales this quarter?", ];
const hindiPlaceholders = [ "'ABC हार्डवेयर' से खर्च दर्ज करें...", "'इनोवेट टेक' के लिए बिल बनाएं...", " पिछले महीने का मेरा ITC दिखाएं...", "इस तिमाही में मेरी कुल बिक्री क्या है?", ];

// --- Upgraded Shimmer/Generative Style Component ---
const GenerativeShimmerStyle = () => (
    <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes generative-gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blink { 50% { opacity: 0; } }

        .generative-bg {
            background: linear-gradient(110deg, #fde2ff, #e0f2fe, #fde2ff);
            background-size: 200% 200%;
            animation: generative-gradient 3s ease infinite;
        }
        .shimmer-effect { 
            position: relative; 
            overflow: hidden; 
            background-color: #e2e8f0;
        }
        .shimmer-effect::after { 
            content: ''; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 80%); 
            animation: shimmer 1.5s infinite; 
        }
        .typing-cursor { 
            display: inline-block; 
            width: 3px; 
            height: 1em; 
            background-color: #3b82f6; 
            margin-left: 4px; 
            animation: blink 1s step-end infinite; 
            vertical-align: bottom; 
        }
    `}</style>
);

// --- HELPER for new Invoice Skeleton ---
const generateRandomSkeletons = () => {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return {
        header: [
            { width: `${random(20, 30)}%`, height: '32px' },
            { width: `${random(40, 50)}%`, height: '20px' }
        ],
        body: Array.from({ length: 2 }).map(() => ({
            width: `${random(60, 90)}%`, height: '16px'
        })),
        footer: Array.from({ length: 3 }).map((_, i) => ({
            width: `${random(70 - i * 10, 95 - i * 10)}%`,
            height: '20px',
            opacity: 1 - i * 0.2
        }))
    };
};

// --- MODIFIED: Upgraded Invoice Skeleton with Staggered Animation & Random Dimensions ---
const InvoiceSkeleton = () => {
    const [skeletonConfig] = useState(generateRandomSkeletons);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    } as const;

    return (
        <motion.div
            className="bg-white/80 p-4 rounded-xl border border-slate-200/80 w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex justify-between items-start mb-6">
                {skeletonConfig.header.map((skel, i) => (
                    <motion.div key={`header-${i}`} className="generative-bg rounded-md" variants={itemVariants} style={{ width: skel.width, height: skel.height }} />
                ))}
            </div>
            <div className="space-y-3">
                {skeletonConfig.body.map((skel, i) => (
                     <motion.div key={`body-${i}`} className="generative-bg rounded-md" variants={itemVariants} style={{ width: skel.width, height: skel.height }} />
                ))}
            </div>
            <div className="mt-8 space-y-3">
                {skeletonConfig.footer.map((skel, i) => (
                    <motion.div key={`footer-${i}`} className="generative-bg rounded-md" variants={itemVariants} style={{ width: skel.width, height: skel.height, opacity: skel.opacity }} />
                ))}
            </div>
        </motion.div>
    );
};

const ExtractedDataTable = ({ data, activeLedger }) => {
    const headers = ["Type", "Date", "Vendor/Customer", "Details", "Amount", "GST (%)", "ITC", "GST Payable"];
    return (
        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80 w-full text-slate-800">
            <p className="font-bold mb-2 text-base">✅ Invoice Details Extracted</p>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="bg-slate-100">
                        <tr>{headers.map(h => <th key={h} className="p-2 text-left font-semibold text-slate-600">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b border-slate-200 last:border-b-0">
                                <td className="p-2">{row.type}</td>
                                <td className="p-2">{row.date}</td>
                                <td className="p-2">{row.vendor}</td>
                                <td className="p-2">{row.details}</td>
                                <td className="p-2">₹{row.amount.toLocaleString('en-IN')}</td>
                                <td className="p-2">{row.gstRate}</td>
                                <td className="p-2">₹{row.itc.toLocaleString('en-IN')}</td>
                                <td className="p-2">₹{row.gstPayable.toLocaleString('en-IN')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">Now logging this expense to <strong>{activeLedger}</strong>...</p>
        </div>
    );
};

// --- Monthly Report Visual Component ---
const MonthlyReportCard = () => {
  const reportMonth = "August 2025";
  const augustSales = 120000;
  const transactionCount = 6;
  const averageSaleValue = augustSales / transactionCount;
  const highestTransaction = {
    customer: 'XYZ Corp',
    amount: 45000
  };
  const topTransactions = [
    { id: 'INV-08-001', customer: 'XYZ Corp', amount: 45000, date: '17/08/2025' },
    { id: 'INV-08-002', customer: 'ABC Retail', amount: 35000, date: '18/08/2025' },
    { id: 'INV-08-003', customer: 'Innovate LLC', amount: 25000, date: '21/08/2025' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 w-full max-w-2xl text-slate-800 shadow-xl font-sans">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-2xl text-slate-900">Monthly Sales Report</h3>
          <p className="text-sm text-slate-500">{reportMonth} • Generated on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Sent</span>
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <FileDown className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-sm">
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
          <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1"><DollarSign className="h-4 w-4 text-sky-600" /> Total Sales</div>
          <p className="text-sky-800 font-bold text-2xl">₹{augustSales.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1"><ShoppingCart className="h-4 w-4 text-purple-600" /> Transactions</div>
          <p className="text-purple-800 font-bold text-2xl">{transactionCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1"><BarChart2 className="h-4 w-4 text-green-600" /> Avg. Sale Value</div>
          <p className="text-green-800 font-bold text-2xl">₹{averageSaleValue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1"><TrendingUp className="h-4 w-4 text-orange-600" /> Highest Sale</div>
          <p className="text-orange-800 font-bold text-2xl">₹{highestTransaction.amount.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
        <h4 className="font-semibold text-slate-700 mb-4">Sales Trend (Quarterly)</h4>
        <div className="my-4 p-3 bg-slate-50 rounded-lg">
          <img src={graphMonthly} alt="Bar chart showing monthly sales" className="w-full h-auto rounded-md border border-slate-200"/>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-slate-700 mb-2">Top Transactions This Month</h4>
        <div className="overflow-x-auto rounded-lg border border-slate-200/80">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left font-semibold text-slate-600">Invoice ID</th>
                <th className="p-3 text-left font-semibold text-slate-600">Customer</th>
                <th className="p-3 text-left font-semibold text-slate-600">Date</th>
                <th className="p-3 text-right font-semibold text-slate-600">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {topTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-slate-200">
                  <td className="p-3 text-slate-500 font-mono text-xs">{tx.id}</td>
                  <td className="p-3 font-medium text-slate-800">{tx.customer}</td>
                  <td className="p-3 text-slate-500">{tx.date}</td>
                  <td className="p-3 text-right font-semibold text-slate-800">₹{tx.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MODIFIED: UNIFIED & REUSABLE COMMAND BAR ---
const AccountantCommandBar = ({ inputValue, onInputChange, onSubmit, activeMode, onModeChange, aiAssist, onAiAssistChange, handleScanCommand, isListening, onMicClick, hasSpeechSupport, language, onLanguageChange, activeLedger, onLedgerChange }) => {
  const [isModeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [isLedgerDropdownOpen, setLedgerDropdownOpen] = useState(false);
  const modeDropdownRef = useRef(null);
  const ledgerDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const placeholders = useMemo(() => language === 'en-US' ? englishPlaceholders : hindiPlaceholders, [language]);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  useEffect(() => { setCurrentPlaceholder(placeholders[0]); let index = 0; const interval = setInterval(() => { index = (index + 1) % placeholders.length; setCurrentPlaceholder(placeholders[index]); }, 4000); return () => clearInterval(interval); }, [placeholders]);
  const modes = useMemo(() => [{ name: "Gemini-2.5-pro" }, { name: "DeepSeek R1" }], []);
  const ledgers = useMemo(() => [{ name: "Google Sheets", icon: Sheet }, { name: "Excel", icon: Sheet }, { name: "EtherCalc", icon: Database }], []);
  const ActiveLedgerIcon = ledgers.find(l => l.name === activeLedger)?.icon;
  useEffect(() => { const handleClickOutside = (event) => { if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) setModeDropdownOpen(false); if (ledgerDropdownRef.current && !ledgerDropdownRef.current.contains(event.target)) setLedgerDropdownOpen(false);}; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
  const handleModeChange = (modeName) => { onModeChange(modeName); setModeDropdownOpen(false); };
  const handleLedgerChange = (ledgerName) => { onLedgerChange(ledgerName); setLedgerDropdownOpen(false); };
  const handleImageButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => { const file = event.target.files?.[0]; if (file) handleScanCommand(file); };
  return (
    <motion.div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 bg-slate-200/50 rounded-3xl blur-md opacity-30"></div>
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 space-y-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative w-full flex items-center">
              <Search className="h-6 w-6 text-slate-500 flex-shrink-0 ml-3 absolute left-0" />
              <AnimatePresence mode="wait">
                {!inputValue && (isListening ? (
                  <motion.p key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-sky-600 pointer-events-none">Listening in {language === 'en-US' ? 'English' : 'Hindi'}...</motion.p>
                ) : (
                  <motion.p key={currentPlaceholder} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-slate-600 pointer-events-none">{currentPlaceholder}</motion.p>
                ))}
              </AnimatePresence>
              <Input value={inputValue} onChange={onInputChange} className="w-full bg-transparent border-none text-xl h-auto py-4 pl-12 pr-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0" onKeyDown={(e) => e.key === "Enter" && onSubmit()} />
              {hasSpeechSupport && (
                <button onClick={onMicClick} className="absolute right-3 p-2 rounded-full transition-colors hover:bg-slate-200/60">
                  <Mic className={`h-6 w-6 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} />
                </button>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={onSubmit} 
                className="rounded-xl h-14 px-6 md:px-8 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold w-28 md:w-32 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-800 border-t-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Submit
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center justify-between pl-2 pr-1"><div className="flex items-center gap-2">
      <div ref={modeDropdownRef} className="relative"><button onClick={() => setModeDropdownOpen(!isModeDropdownOpen)} className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70"><Bot className="h-4 w-4 text-purple-600"/><span>{activeMode}</span><motion.div animate={{ rotate: isModeDropdownOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.div></button><AnimatePresence>{isModeDropdownOpen && (<motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-full z-10 mb-2 w-48 origin-bottom-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">{modes.map((mode) => (<button key={mode.name} onClick={() => handleModeChange(mode.name)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeMode === mode.name ? "bg-purple-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{mode.name}</button>))}</motion.div>)}</AnimatePresence></div>
      <div ref={ledgerDropdownRef} className="relative"><button onClick={() => setLedgerDropdownOpen(!isLedgerDropdownOpen)} className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70">{ActiveLedgerIcon && <ActiveLedgerIcon className="h-4 w-4 text-green-600" />}<span>{activeLedger}</span><motion.div animate={{ rotate: isLedgerDropdownOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.div></button><AnimatePresence>{isLedgerDropdownOpen && (<motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-full z-10 mb-2 w-52 origin-bottom-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">{ledgers.map((ledger) => (<HoverCard key={ledger.name} openDelay={250}><HoverCardTrigger asChild><button onClick={() => handleLedgerChange(ledger.name)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeLedger === ledger.name ? "bg-green-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}><ledger.icon className={`h-4 w-4 ${activeLedger === ledger.name ? 'text-white' : 'text-slate-500'}`}/>{ledger.name}</button></HoverCardTrigger><HoverCardContent className="w-64 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600 text-sm"><p>Your accounting info will be stored in <strong>{ledger.name}</strong>.</p></HoverCardContent></HoverCard>))}</motion.div>)}</AnimatePresence></div>
      {/* </div><div className="flex items-center space-x-2"><HoverCard openDelay={200}><HoverCardTrigger asChild><div className="flex items-center space-x-2 cursor-pointer"><Wand2 className="h-5 w-5 text-purple-500" /><label htmlFor="ai-assist" className="text-sm font-medium text-slate-700 hidden md:inline">Agent mode</label><Switch id="ai-assist" checked={aiAssist} onCheckedChange={onAiAssistChange} /></div></HoverCardTrigger><HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600"><div className="flex items-start gap-3"><Info className="h-5 w-5 text-sky-500 mt-1 flex-shrink-0" /><div><h4 className="font-semibold text-slate-900">AI Agent Mode</h4><p className="text-sm">When enabled, the AI will automatically perform tasks for you.</p></div></div></HoverCardContent></HoverCard> */}
      
      {/* --- MODIFICATION START: Language Toggle Button --- */}
      {hasSpeechSupport && (
        <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={onLanguageChange}>
            <Languages className="h-4 w-4 mr-2" />
            <span className="text-sm font-semibold">{language === 'en-US' ? 'EN' : 'HI'}</span>
        </Button>
      )}
      {/* --- MODIFICATION END --- */}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" /><Button variant="ghost" className="text-slate-500 hover:text-slate-900 ml-20 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={handleImageButtonClick}><Camera className="h-4 w-4 mr-2" /><span className="text-sm">Scan Invoice</span></Button></div></div></div></div></motion.div>);
};


// --- ANIMATION & HELPER COMPONENTS ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }} as const;
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 12 } }} as const;
const AnimatedCounter = ({ value, prefix = "" }) => { const ref = useRef(null); const isInView = useInView(ref, { once: true, margin: "-50px" }); const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 }); useEffect(() => { if (isInView) spring.set(value) }, [spring, value, isInView]); useEffect(() => { const unsubscribe = spring.on("change", (latest) => { if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}`}); return unsubscribe; }, [spring, prefix]); return <span ref={ref} />; };
const DashboardCard = ({ children, className = "" }) => ( <Card className={`bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>{children}</Card>);
type Stat = { title: string; value: number; prefix?: string; icon: React.ComponentType<{ className?: string }>; iconColor: string; change: string; };
const MemoizedStatCard = React.memo(({ stat }: { stat: Stat }) => ( <DashboardCard><CardContent className="p-6"><div className="flex items-center justify-between mb-4"><div className={`p-2 rounded-lg bg-gradient-to-br ${stat.iconColor.replace('text-', 'from-').replace('-500', '-400/20')} ${stat.iconColor.replace('text-', 'to-').replace('-500', '-500/20')}`}><stat.icon className={`h-7 w-7 ${stat.iconColor}`} /></div><Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 font-semibold">{stat.change}</Badge></div><p className="text-4xl font-bold text-slate-800"><AnimatedCounter value={stat.value} prefix={stat.prefix} /></p><p className="text-sm text-slate-600 font-medium mt-1">{stat.title}</p></CardContent></DashboardCard>));
MemoizedStatCard.displayName = 'MemoizedStatCard';

// --- MAIN AI ACCOUNTANT APPLICATION ---
export const AIAccountant = () => {
  const [view, setView] = useState('dashboard');
  const [chatHistory, setChatHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState('Gemini-2.5-pro');
  const [activeLedger, setActiveLedger] = useState('Google Sheets');
  const [aiAssist, setAiAssist] = useState(true);
  const [language, setLanguage] = useState('en-US');
  const chatContainerRef = useRef(null);
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  const transactionData = useMemo(() => [ { type: 'Purchase', date: '18/08/2025', vendor: 'Tech Supplies Inc.', details: 'Wireless Mouse x15, Keyboard x10', amount: 15000, gstRate: 18, itcClaimable: 2700 }, { type: 'Sale', date: '18/08/2025', customer: 'ABC Retail', details: 'Laptops x5, Monitors x5', amount: 75000, gstPayable: 13500 }, { type: 'Purchase', date: '17/08/2025', vendor: 'Office Depot', details: 'Printer Paper x20, Pens x50', amount: 2500, gstRate: 12, itcClaimable: 300 }, { type: 'Sale', date: '17/08/2025', customer: 'XYZ Corp', details: 'Software Licenses x3', amount: 45000, gstPayable: 8100 }, { type: 'Purchase', date: '25/07/2025', vendor: 'Creative Solutions', details: 'Graphic Design Services', amount: 22000, gstRate: 18, itcClaimable: 3960 }, { type: 'Sale', date: '22/07/2025', customer: 'Innovate LLC', details: 'Consulting Retainer', amount: 150000, gstPayable: 27000 }, ], []);
  const { text: voiceText, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition({ lang: language });
  useEffect(() => { if (voiceText) setInputValue(voiceText); }, [voiceText]);
  const handleMicClick = () => isListening ? stopListening() : startListening();
  const handleLanguageChange = () => setLanguage(prev => prev === 'en-US' ? 'hi-IN' : 'en-US');
  useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, [chatHistory, isThinking]);
  
  const showToast = (message, type = 'info') => { setToast({ message, type, visible: true }); };

  const handleSendSummaryReport = async () => {
    showToast('Sending summary report...', 'info');
    
    const N8N_WEBHOOK_URL = "https://hxrshxz.app.n8n.cloud/webhook/b783d68a-1898-4385-98ef-b087054aa7a1";

    const augustSales = transactionData.filter(t => t.type === 'Sale' && t.date.includes('/08/2025'));
    const totalAugustSales = augustSales.reduce((sum, t) => sum + t.amount, 0);
    
    const summaryData = {
      reportType: "August Sales Summary",
      totalSales: `₹${totalAugustSales.toLocaleString('en-IN')}`,
      transactionCount: augustSales.length,
      generatedOn: new Date().toISOString(),
      recipientEmail: "reports@example.com"
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summaryData),
      });

      if (!response.ok) {
        throw new Error(`n8n workflow failed with status: ${response.status}`);
      }
      
      showToast('Summary report sent successfully!', 'success');
    } catch (error) {
      console.error('n8n trigger error:', error);
      // showToast('Could not send the report.', 'error');
    }
  };

  const triggerPlaywrightAutomation = async () => {
    showToast('Starting automation...', 'info');
    try {
      // NOTE: Ensure your Playwright server is running on localhost:3000
      const response = await fetch('http://localhost:3000/run-automation');
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.text();
      showToast(result, 'success');
    } catch (error) {
      console.error('Playwright trigger error:', error);
      // showToast('Error running automation.', 'error');
    }
  };

  const checkForAutomationKeywords = (text) => {
    const automationRegex = new RegExp( [ "log", "add", "expense", "invoice", "bill", "create", "scan", "automate", "receipt", "जोड़ें", "दर्ज करें", "खर्च", "बिल", "बीजक", "बनाएं", "स्कैन", "स्वचालित", "इनवॉइस", "रसीद" ].join("|"), "i" );
    return automationRegex.test(text);
  };

  const checkForReportKeywords = (text) => {
    const reportRegex = new RegExp([
      "monthly report", "sales summary", "send the report", "generate report",
      "मासिक रिपोर्ट", "बिक्री का सारांश", "रिपोर्ट भेजो"
    ].join("|"), "i");
    return reportRegex.test(text);
  };

  const getFallbackResponse = (text, automationTriggered) => {
    if (automationTriggered) {
      return `Understood. I've successfully logged it to the ${activeLedger}.`;
    }
    const lowerText = text.toLowerCase();
    if (lowerText.includes('total sales')) {
        const total = transactionData.filter(t => t.type === 'Sale').reduce((sum, t) => sum + t.amount, 0);
        return `Based on the provided data, your total sales are ₹${total.toLocaleString('en-IN')}.`;
    }
    if (lowerText.includes('total itc') || lowerText.includes('itc claimable')) {
        const total = transactionData.filter(t => t.type === 'Purchase').reduce((sum, t) => sum + t.itcClaimable, 0);
        return `Your total ITC claimable from the provided purchases is ₹${total.toLocaleString('en-IN')}.`;
    }
    if (lowerText.includes('last month')) {
        return "Based on the data for July 2025, the total sales were ₹150,000 and total ITC claimable was ₹3,960."
    }
    return "I can answer questions about total sales, ITC, and transactions from the sample data. Please try one of the suggested prompts!";
  };

  const stats = useMemo(() => [ { title: "Expenses (This Month)", value: 42500, prefix: "₹", icon: Wallet, iconColor: "text-orange-500", change: "+5.2%" }, { title: "ITC Claimable", value: 8600, prefix: "₹", icon: ShieldCheck, iconColor: "text-green-500", change: "+18.1%" }, { title: "Bills Processed", value: 4, icon: FileText, iconColor: "text-blue-500", change: "+1 this week" }, { title: "Total Sales", value: 150000, prefix: "₹", icon: IndianRupee, iconColor: "text-purple-500", change: "This Month" }], []);
  
  const handleChatSubmit = async (text) => {
    setView('chat');
    setChatHistory(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    setInputValue('');

    if (checkForReportKeywords(text)) {
      setIsThinking(true);
      await handleSendSummaryReport();
      
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { id: Date.now(), type: 'ai', component: <MonthlyReportCard /> }
        ]);
        setIsThinking(false);
      }, 3000);
      
      return;
    }

    let automationWasTriggered = false;
    if (checkForAutomationKeywords(text)) {
      await triggerPlaywrightAutomation();
      automationWasTriggered = true;
    }
    
    setIsThinking(true);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (API_KEY ) {
        try {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
          const dataContext = transactionData.map(t => `- ${t.type} on ${t.date} with ${t.vendor || t.customer}: ${t.details} for ₹${t.amount}`).join("\n");
          
          let prompt;
          if (automationWasTriggered) {
            prompt = `You are an expert AI Accountant assistant. An automation has just been triggered to handle the user's request: "${text}". Your task is to ACKNOWLEDGE this. Respond by confirming the process has started and mention the destination ledger: ${activeLedger}. Be brief.`;
          } else {
            prompt = `You are an expert AI Accountant assistant for an Indian business. Here is the user's transaction data:\n---\n${dataContext}\n---\nBased ONLY on this data, answer the user's question: "${text}". If the question cannot be answered from the data, say so clearly. Be concise.`;
          }

          const result = await model.generateContent(prompt);
          const response = await result.response;
          const aiResponseText = response.text();
          setChatHistory(prev => [...prev, { id: Date.now(), type: 'ai', text: aiResponseText }]);
        } catch (error) {
          console.error("Error calling Gemini API:", error);
          setChatHistory(prev => [...prev, { id: Date.now(), type: 'ai', text: "Sorry, I couldn't process that request. Please check your API key and try again." }]);
        } finally {
          setIsThinking(false);
        }
    } else {
        setTimeout(() => {
          const demoResponse = getFallbackResponse(text, automationWasTriggered);
          setChatHistory(prev => [...prev, { id: Date.now(), type: 'ai', text: demoResponse }]);
          setIsThinking(false);
        }, 1500);
    }
  };
  
  const handleScanCommand = async (file) => {
    if (!file) return;

    setView('chat');
    showToast(`Scanning ${file.name}...`, 'info');
    const skeletonId = Date.now();
    
    setChatHistory(prev => [...prev, { id: skeletonId, type: 'ai', component: <InvoiceSkeleton /> }]);
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    const fakeExtractedData = [
        { type: 'Purchase', date: '20-Aug-2025', vendor: 'Kiroshi Optics', details: 'Cybernetic Eyes x5', amount: 75000, gstRate: 18, itc: 13500, gstPayable: 0 },
    ];

    setChatHistory(prev => prev.map(msg => 
        msg.id === skeletonId 
        ? { ...msg, component: <ExtractedDataTable data={fakeExtractedData} activeLedger={activeLedger} /> }
        : msg
    ));
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await triggerPlaywrightAutomation();
  };

  const commonCommandBarProps = {
    inputValue,
    onInputChange: (e) => setInputValue(e.target.value),
    onSubmit: () => { if (inputValue.trim()) handleChatSubmit(inputValue); },
    activeMode, onModeChange: setActiveMode,
    activeLedger, onLedgerChange: setActiveLedger,
    aiAssist, onAiAssistChange: setAiAssist,
    handleScanCommand,
    isListening, onMicClick: handleMicClick,
    hasSpeechSupport: hasRecognitionSupport,
    language, onLanguageChange: handleLanguageChange,
  };

  const suggestedPrompts = [ { title: "Summarize Sales", text: "What were my total sales from this data?", description: "Get quick calculations from your data." }, { title: "List Purchases", text: "List all my recent purchases.", description: "Filter and view specific transaction types." }, { title: "Find a Transaction", text: "Tell me about the transaction with XYZ Corp.", description: "Query specific details about a vendor or customer." }, { title: "Last Month's ITC", text: "What is my total ITC claimable for last month?", description: "Perform tax calculations on historical data." }, ];

  const renderDashboard = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="relative w-full h-16 flex justify-end items-center">
             {/* MODIFICATION: Pass the automation trigger function to the bell */}
             <NotificationBell onSendSummary={handleSendSummaryReport} onGenerateInvoice={triggerPlaywrightAutomation} />
        </div>
        <div className="text-center"><h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">AI Accountant</h1><p className="text-xl text-slate-600 max-w-2xl mt-4 mx-auto">Your intelligent command center for automated bookkeeping.</p></div>
        <div className="mt-12"><AccountantCommandBar {...commonCommandBarProps} /></div>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (<motion.div key={i} variants={itemVariants} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}><MemoizedStatCard stat={stat} /></motion.div>))}
        </motion.div>
    </div>
  );

  const renderChatView = () => (
     <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl h-[calc(100vh-4rem)] flex flex-col bg-white/60 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200/80">
                <div className="flex items-center gap-3"><Bot className="h-6 w-6 text-purple-600"/><CardTitle className="text-xl">AI Accountant</CardTitle></div>
                <div className="flex items-center gap-2">
                    {/* MODIFICATION: Pass the automation trigger function to the bell */}
                    <NotificationBell onSendSummary={handleSendSummaryReport} onGenerateInvoice={triggerPlaywrightAutomation} />
                    <Button variant="ghost" onClick={() => { setView('dashboard'); setChatHistory([]); }}><X className="h-4 w-4 mr-2"/> End Chat</Button>
                </div>
            </CardHeader>
            <CardContent ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                {chatHistory.length === 0 && (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-4 pb-8 text-center">
                    <motion.h3 variants={itemVariants} className="text-lg font-semibold text-slate-700 mb-4">Or try asking one of these...</motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {suggestedPrompts.map((prompt, i) => (
                        <motion.button key={i} variants={itemVariants} onClick={() => handleChatSubmit(prompt.text)} className="p-4 bg-white/60 rounded-lg text-left text-sm font-medium text-slate-800 border border-slate-200/80 shadow-sm hover:bg-slate-100/80 hover:shadow-md transition-all focus:ring-2 focus:ring-purple-400 outline-none">
                          <p className="font-semibold">{prompt.title}</p>
                          <p className="text-slate-500 text-xs mt-1">{prompt.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                <AnimatePresence>
                  {chatHistory.map((msg) => (
                    <motion.div key={msg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }} className={`flex items-start gap-3 max-w-2xl ${msg.type === 'user' ? 'ml-auto justify-end' : 'mr-auto'}`}>
                        {msg.type === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center"><Bot className="w-5 h-5 text-sky-600"/></div>}
                        
                        <div className="max-w-xl">
                          {msg.type === 'user' ? (
                            <div className="bg-purple-500 text-white p-3 rounded-2xl rounded-br-lg shadow-sm">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          ) : (
                            <>
                              {msg.text && (
                                <div className="bg-white p-3 rounded-2xl rounded-bl-lg border border-slate-200 shadow-sm text-slate-800">
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                              )}
                              {msg.component && msg.component}
                            </>
                          )}
                        </div>

                        {msg.type === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><User className="w-5 h-5 text-slate-600"/></div>}
                    </motion.div>
                  ))}
                  {isThinking && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center"><Bot className="w-5 h-5 text-sky-600"/></div>
                    <div className="p-3 rounded-2xl bg-white rounded-bl-lg border border-slate-200 space-y-2">
                       <div className="generative-bg h-4 w-48 rounded"></div>
                       <div className="generative-bg h-4 w-32 rounded"></div>
                    </div>
                  </motion.div>)}
                </AnimatePresence>
            </CardContent>
            <CardContent className="border-t border-slate-200/80 pt-4">
                <AccountantCommandBar {...commonCommandBarProps} />
            </CardContent>
        </Card>
     </div>
  );

  return (  
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans isolate">
      <GenerativeShimmerStyle />
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/30 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/30 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
      </div>
      <AnimatePresence>
        {toast.visible && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast({ ...toast, visible: false })} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {view === 'dashboard' ? renderDashboard() : renderChatView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};