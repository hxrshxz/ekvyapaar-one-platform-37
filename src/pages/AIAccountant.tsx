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
    Search, Wand2, Camera, Info, ChevronDown, Bot, User, X, Mic, Languages,
    IndianRupee, FileText, Wallet, Lightbulb, ShieldCheck, CheckCircle, AlertTriangle,
    Sheet, Database 
} from "lucide-react";

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

// --- Multilingual Placeholders ---
const englishPlaceholders = [ "Log expense from 'ABC Hardware'...", "Create invoice for 'Innovate Tech'...", "Show my ITC for last month...", "What are my total sales this quarter?", ];
const hindiPlaceholders = [ "'ABC हार्डवेयर' से खर्च दर्ज करें...", "'इनोवेट टेक' के लिए बिल बनाएं...", " पिछले महीने का मेरा ITC दिखाएं...", "इस तिमाही में मेरी कुल बिक्री क्या है?", ];


// --- Generative Shimmer and Skeleton Components ---
const GenerativeShimmerStyle = () => (
    <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(100%) skewX(-15deg); }
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
            background: linear-gradient(
                90deg,
                transparent 20%,
                rgba(165, 180, 252, 0.3) 40%,
                rgba(103, 232, 249, 0.4) 50%,
                rgba(165, 180, 252, 0.3) 60%,
                transparent 80%
            );
            animation: shimmer 2s infinite;
        }
    `}</style>
);

const InvoiceSkeleton = () => (
    <div className="bg-white/80 p-4 rounded-xl border border-slate-200/80 w-full max-w-md">
        <div className="flex justify-between items-start mb-6">
            <div className="shimmer-effect w-16 h-8 rounded-md"></div>
            <div className="shimmer-effect w-28 h-5 rounded-md"></div>
        </div>
        <div className="space-y-3">
            <div className="shimmer-effect w-3/4 h-4 rounded-md"></div>
            <div className="shimmer-effect w-1/2 h-4 rounded-md"></div>
        </div>
        <div className="mt-8 space-y-3">
            <div className="shimmer-effect w-full h-5 rounded-md"></div>
            <div className="shimmer-effect w-full h-5 rounded-md opacity-80"></div>
            <div className="shimmer-effect w-full h-5 rounded-md opacity-60"></div>
        </div>
    </div>
);

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


// --- UNIFIED & REUSABLE COMMAND BAR ---
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
  return (<motion.div className="w-full max-w-3xl mx-auto"><div className="relative"><div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-3xl blur-lg opacity-30"></div><div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 space-y-4"><div className="flex items-center space-x-2 md:space-x-4"><div className="relative w-full flex items-center"><Search className="h-6 w-6 text-slate-500 flex-shrink-0 ml-3 absolute left-0" /><AnimatePresence mode="wait">{!inputValue && (isListening ? (<motion.p key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-sky-600 pointer-events-none">Listening in {language === 'en-US' ? 'English' : 'Hindi'}...</motion.p>) : (<motion.p key={currentPlaceholder} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-slate-600 pointer-events-none">{currentPlaceholder}</motion.p>))}</AnimatePresence><Input value={inputValue} onChange={onInputChange} className="w-full bg-transparent border-none text-xl h-auto py-4 pl-12 pr-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0" onKeyDown={(e) => e.key === "Enter" && onSubmit()} />{hasSpeechSupport && (<button onClick={onMicClick} className="absolute right-3 p-2 rounded-full transition-colors hover:bg-slate-200/60"><Mic className={`h-6 w-6 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} /></button>)}</div><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button onClick={onSubmit} className="rounded-xl h-14 px-6 md:px-8 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-28 md:w-32 flex-shrink-0">Submit</Button></motion.div></div><div className="flex items-center justify-between pl-2 pr-1"><div className="flex items-center gap-2">
      <div ref={modeDropdownRef} className="relative"><button onClick={() => setModeDropdownOpen(!isModeDropdownOpen)} className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70"><Bot className="h-4 w-4 text-purple-600"/><span>{activeMode}</span><motion.div animate={{ rotate: isModeDropdownOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.div></button><AnimatePresence>{isModeDropdownOpen && (<motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-full z-10 mb-2 w-48 origin-bottom-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">{modes.map((mode) => (<button key={mode.name} onClick={() => handleModeChange(mode.name)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeMode === mode.name ? "bg-purple-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{mode.name}</button>))}</motion.div>)}</AnimatePresence></div>
      <div ref={ledgerDropdownRef} className="relative"><button onClick={() => setLedgerDropdownOpen(!isLedgerDropdownOpen)} className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70">{ActiveLedgerIcon && <ActiveLedgerIcon className="h-4 w-4 text-green-600" />}<span>{activeLedger}</span><motion.div animate={{ rotate: isLedgerDropdownOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.div></button><AnimatePresence>{isLedgerDropdownOpen && (<motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-full z-10 mb-2 w-52 origin-bottom-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">{ledgers.map((ledger) => (<HoverCard key={ledger.name} openDelay={250}><HoverCardTrigger asChild><button onClick={() => handleLedgerChange(ledger.name)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeLedger === ledger.name ? "bg-green-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}><ledger.icon className={`h-4 w-4 ${activeLedger === ledger.name ? 'text-white' : 'text-slate-500'}`}/>{ledger.name}</button></HoverCardTrigger><HoverCardContent className="w-64 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600 text-sm"><p>Your accounting info will be stored in <strong>{ledger.name}</strong>.</p></HoverCardContent></HoverCard>))}</motion.div>)}</AnimatePresence></div>
      </div><div className="flex items-center space-x-4"><HoverCard openDelay={200}><HoverCardTrigger asChild><div className="flex items-center space-x-2 cursor-pointer"><Wand2 className="h-5 w-5 text-purple-500" /><label htmlFor="ai-assist" className="text-sm font-medium text-slate-700 hidden md:inline">Agent mode</label><Switch id="ai-assist" checked={aiAssist} onCheckedChange={onAiAssistChange} /></div></HoverCardTrigger><HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600"><div className="flex items-start gap-3"><Info className="h-5 w-5 text-sky-500 mt-1 flex-shrink-0" /><div><h4 className="font-semibold text-slate-900">AI Agent Mode</h4><p className="text-sm">When enabled, the AI will automatically perform tasks for you.</p></div></div></HoverCardContent></HoverCard><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" /><Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={handleImageButtonClick}><Camera className="h-4 w-4 mr-2" /><span className="text-sm">Scan Invoice</span></Button></div></div></div></div></motion.div>);
};

// --- ANIMATION & HELPER COMPONENTS ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }};
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }};
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

  const triggerPlaywrightAutomation = async () => {
    showToast('Starting automation...', 'info');
    try {
      const response = await fetch('http://localhost:3000/run-automation');
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.text();
      showToast(result, 'success');
    } catch (error) {
      console.error('Playwright trigger error:', error);
      showToast('Error running automation.', 'error');
    }
  };

  const checkForAutomationKeywords = (text) => {
    const automationRegex = new RegExp( [ "log", "add", "expense", "invoice", "bill", "create", "scan", "automate", "receipt", "जोड़ें", "दर्ज करें", "खर्च", "बिल", "बीजक", "बनाएं", "स्कैन", "स्वचालित", "इनवॉइस", "रसीद" ].join("|"), "i" );
    return automationRegex.test(text);
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

  const stats = useMemo(() => [ { title: "Expenses (This Month)", value: 42500, prefix: "₹", icon: Wallet, iconColor: "text-orange-500", change: "+5.2%" }, { title: "ITC Claimable", value: 8600, prefix: "₹", icon: ShieldCheck, iconColor: "text-green-500", change: "+18.1%" }, { title: "Bills Processed", value: 3, icon: FileText, iconColor: "text-blue-500", change: "+1 this week" }, { title: "Total Sales", value: 150000, prefix: "₹", icon: IndianRupee, iconColor: "text-purple-500", change: "This Month" }], []);
  
  const handleChatSubmit = async (text) => {
    let automationWasTriggered = false;
    if (checkForAutomationKeywords(text)) {
      await triggerPlaywrightAutomation();
      automationWasTriggered = true;
    }
    
    setView('chat');
    setChatHistory(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    setIsThinking(true);
    setInputValue('');

    const API_KEY = "YOUR_GOOGLE_AI_API_KEY_HERE";
    
    if (API_KEY && API_KEY !== "YOUR_GOOGLE_AI_API_KEY_HERE") {
        try {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    <div className="container mx-auto px-4 py-16">
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
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200/80"><div className="flex items-center gap-3"><Bot className="h-6 w-6 text-purple-600"/><CardTitle className="text-xl">AI Accountant</CardTitle></div><Button variant="ghost" onClick={() => { setView('dashboard'); setChatHistory([]); }}><X className="h-4 w-4 mr-2"/> End Chat</Button></CardHeader>
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
                    <motion.div key={msg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 max-w-2xl ${msg.type === 'user' ? 'ml-auto justify-end' : 'mr-auto'}`}>
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
                  {isThinking && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center"><Bot className="w-5 h-5 text-sky-600"/></div><div className="p-3 rounded-2xl bg-white rounded-bl-lg border border-slate-200"><div className="flex items-center gap-2"><span className="h-2 w-2 bg-sky-500 rounded-full animate-bounce"></span><span className="h-2 w-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.1s]"></span><span className="h-2 w-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]"></span></div></div></motion.div>)}
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