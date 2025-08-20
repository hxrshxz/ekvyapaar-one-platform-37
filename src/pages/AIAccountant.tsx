"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
    Search, Wand2, Camera, Info, ChevronDown, Bot, User, X, Mic, Languages,
    IndianRupee, FileText, Wallet, Lightbulb, ShieldCheck, CheckCircle, AlertTriangle
} from "lucide-react";

// --- Extend Window type for SpeechRecognition ---
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Custom Hook for Voice Recognition ---
const useSpeechRecognition = ({ lang }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window))) {
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }
      setText(finalTranscript + interimTranscript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, [lang]);

  const startListening = () => { if (recognitionRef.current && !isListening) { setText(''); recognitionRef.current.start(); setIsListening(true); } };
  const stopListening = () => { if (recognitionRef.current && isListening) { recognitionRef.current.stop(); setIsListening(false); } };
  const hasRecognitionSupport = !!recognitionRef.current;
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

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-4 rounded-lg shadow-2xl text-white ${bgColor}`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-lg font-medium">{message}</span>
    </motion.div>
  );
};

// --- FIX: Added Multilingual Placeholders ---
const englishPlaceholders = [
    "Log expense from 'ABC Hardware'...",
    "Create invoice for 'Innovate Tech'...",
    "Show my ITC for last month...",
    "What are my total sales this quarter?",
];
const hindiPlaceholders = [
    "'ABC हार्डवेयर' से खर्च दर्ज करें...",
    "'इनोवेट टेक' के लिए बिल बनाएं...",
    "पिछले महीने का मेरा ITC दिखाएं...",
    "इस तिमाही में मेरी कुल बिक्री क्या है?",
];


// --- UNIFIED & REUSABLE COMMAND BAR ---
const AccountantCommandBar = ({
  inputValue, onInputChange, onSubmit, activeMode, onModeChange,
  aiAssist, onAiAssistChange, handleScanCommand, isListening,
  onMicClick, hasSpeechSupport, language, onLanguageChange,
}) => {
  const [isModeDropdownOpen, setModeDropdownOpen] = useState(false);
  const modeDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // --- FIX: Logic to select and cycle through multilingual placeholders ---
  const placeholders = useMemo(() => {
    return language === 'en-US' ? englishPlaceholders : hindiPlaceholders;
  }, [language]);

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    setCurrentPlaceholder(placeholders[0]); // Immediately update on language change
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders]); // Reruns when the placeholders array changes (i.e., language changes)


  const modes = useMemo(() => [{ name: "Gemini-2.5-pro" }, { name: "DeepSeek R1" }], []);
  useEffect(() => { const handleClickOutside = (event) => { if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) setModeDropdownOpen(false); }; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
  const handleModeChange = (modeName) => { onModeChange(modeName); setModeDropdownOpen(false); };
  const handleImageButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => { if (event.target.files?.[0]) handleScanCommand(); };

  return (
    <motion.div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-3xl blur-lg opacity-30"></div>
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 space-y-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative w-full flex items-center">
              <Search className="h-6 w-6 text-slate-500 flex-shrink-0 ml-3 absolute left-0" />
              <AnimatePresence mode="wait">{!inputValue && (isListening ? (<motion.p key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-sky-600 pointer-events-none">Listening in {language === 'en-US' ? 'English' : 'Hindi'}...</motion.p>) : (<motion.p key={currentPlaceholder} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-12 text-base md:text-lg text-slate-600 pointer-events-none">{currentPlaceholder}</motion.p>))}</AnimatePresence>
              <Input value={inputValue} onChange={onInputChange} className="w-full bg-transparent border-none text-xl h-auto py-4 pl-12 pr-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0" onKeyDown={(e) => e.key === "Enter" && onSubmit()} />
              {hasSpeechSupport && (<button onClick={onMicClick} className="absolute right-3 p-2 rounded-full transition-colors hover:bg-slate-200/60"><Mic className={`h-6 w-6 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} /></button>)}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button onClick={onSubmit} className="rounded-xl h-14 px-6 md:px-8 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-28 md:w-32 flex-shrink-0">Submit</Button></motion.div>
          </div>
          <div className="flex items-center justify-between pl-2 pr-1">
            <div className="flex items-center gap-2">
                <div ref={modeDropdownRef} className="relative">
                  <button onClick={() => setModeDropdownOpen(!isModeDropdownOpen)} className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70"><span>{activeMode}</span><motion.div animate={{ rotate: isModeDropdownOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.div></button>
                  <AnimatePresence>{isModeDropdownOpen && (<motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-full z-10 mb-2 w-48 origin-bottom-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm">{modes.map((mode) => (<button key={mode.name} onClick={() => handleModeChange(mode.name)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeMode === mode.name ? "bg-purple-500 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{mode.name}</button>))}</motion.div>)}</AnimatePresence>
                </div>
                {hasSpeechSupport && (<Button variant="ghost" size="sm" onClick={onLanguageChange} className="rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70"><Languages className="h-4 w-4 mr-2" />{language === 'en-US' ? 'EN' : 'HI'}</Button>)}
            </div>
            <div className="flex items-center space-x-4">
              <HoverCard openDelay={200}><HoverCardTrigger asChild><div className="flex items-center space-x-2 cursor-pointer"><Wand2 className="h-5 w-5 text-purple-500" /><label htmlFor="ai-assist" className="text-sm font-medium text-slate-700 hidden md:inline">AI Assist</label><Switch id="ai-assist" checked={aiAssist} onCheckedChange={onAiAssistChange} /></div></HoverCardTrigger><HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600"><div className="flex items-start gap-3"><Info className="h-5 w-5 text-sky-500 mt-1 flex-shrink-0" /><div><h4 className="font-semibold text-slate-900">AI Smart Assist</h4><p className="text-sm">When enabled, the AI will automatically categorize expenses and suggest tax optimizations.</p></div></div></HoverCardContent></HoverCard>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={handleImageButtonClick}><Camera className="h-4 w-4 mr-2" /><span className="text-sm">Scan Invoice</span></Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- ANIMATION & HELPER COMPONENTS ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }};
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 12 } }};
const AnimatedCounter = ({ value, prefix = "" }) => { const ref = useRef(null); const isInView = useInView(ref, { once: true, margin: "-50px" }); const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 }); useEffect(() => { if (isInView) spring.set(value) }, [spring, value, isInView]); useEffect(() => { const unsubscribe = spring.on("change", (latest) => { if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}`}); return unsubscribe; }, [spring, prefix]); return <span ref={ref} />; };
const DashboardCard = ({ children, className = "" }) => ( <Card className={`bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>{children}</Card>);
const MemoizedStatCard = React.memo(({ stat }) => ( <DashboardCard><CardContent className="p-6"><div className="flex items-center justify-between mb-4"><div className={`p-2 rounded-lg bg-gradient-to-br ${stat.iconColor.replace('text-', 'from-').replace('-500', '-400/20')} ${stat.iconColor.replace('text-', 'to-').replace('-500', '-500/20')}`}><stat.icon className={`h-7 w-7 ${stat.iconColor}`} /></div><Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 font-semibold">{stat.change}</Badge></div><p className="text-4xl font-bold text-slate-800"><AnimatedCounter value={stat.value} prefix={stat.prefix} /></p><p className="text-sm text-slate-600 font-medium mt-1">{stat.title}</p></CardContent></DashboardCard>));
MemoizedStatCard.displayName = 'MemoizedStatCard';

// --- MAIN AI ACCOUNTANT APPLICATION ---
export const AIAccountant = () => {
  const [view, setView] = useState('dashboard');
  const [chatHistory, setChatHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState('Gemini-2.5-pro');
  const [aiAssist, setAiAssist] = useState(true);
  const [language, setLanguage] = useState('en-US');
  const chatContainerRef = useRef(null);
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  const { text: voiceText, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition({ lang: language });

  useEffect(() => { if (voiceText) setInputValue(voiceText); }, [voiceText]);
  
  const handleMicClick = () => isListening ? stopListening() : startListening();
  const handleLanguageChange = () => setLanguage(prev => prev === 'en-US' ? 'hi-IN' : 'en-US');

  useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, [chatHistory]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, visible: true });
  };

  const triggerPlaywrightAutomation = async () => {
    showToast('Starting Playwright automation...', 'info');
    try {
      const response = await fetch('http://localhost:3000/run-automation');
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.text();
      showToast(result, 'success');
    } catch (error) {
      console.error('Playwright trigger error:', error);
      showToast('Error running Playwright test.', 'error');
    }
  };

  const checkForAutomationKeywords = (text) => {
    const automationRegex = new RegExp( [ "log", "add", "expense", "invoice", "bill", "create", "जोड़ें", "दर्ज करें", "खर्च", "बिल", "बीजक", "बनाएं" ].join("|"), "i" );
    return automationRegex.test(text);
  };

  const stats = useMemo(() => [ { title: "Expenses (This Month)", value: 20626, prefix: "₹", icon: Wallet, iconColor: "text-orange-500", change: "+5.2%" }, { title: "ITC Claimable", value: 2976, prefix: "₹", icon: ShieldCheck, iconColor: "text-green-500", change: "+18.1%" }, { title: "Bills Processed", value: 6, icon: FileText, iconColor: "text-blue-500", change: "+2 this week" }, { title: "Potential Savings", value: 1850, prefix: "₹", icon: Lightbulb, iconColor: "text-purple-500", change: "Auto-found" }], []);
  
  const handleChatSubmit = async (text) => {
    if (checkForAutomationKeywords(text)) {
      await triggerPlaywrightAutomation();
    }
    if (view === 'dashboard') {
        setView('chat');
        setChatHistory([{ type: 'user', text }]);
        setIsThinking(true);
        setTimeout(() => { setChatHistory(prev => [...prev, { type: 'ai', text: `Certainly. Processing your request for "${text}"...` }]); setIsThinking(false); setInputValue(''); }, 1500);
    } else {
        setChatHistory(prev => [...prev, {type: 'user', text}]);
        setIsThinking(true);
        setTimeout(() => { setChatHistory(prev => [...prev, { type: 'ai', text: "Here is the follow-up information." }]); setIsThinking(false); }, 1500);
        setInputValue('');
    }
  };
  
  const handleScanCommand = async () => { 
    await triggerPlaywrightAutomation();
  };

  const commonCommandBarProps = {
    inputValue,
    onInputChange: (e) => setInputValue(e.target.value),
    onSubmit: () => { if (inputValue.trim()) handleChatSubmit(inputValue); },
    activeMode, onModeChange: setActiveMode,
    aiAssist, onAiAssistChange: setAiAssist,
    handleScanCommand,
    isListening, onMicClick: handleMicClick,
    hasSpeechSupport: hasRecognitionSupport,
    language, onLanguageChange: handleLanguageChange,
  };

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
                <AnimatePresence>
                  {chatHistory.map((msg, index) => (<motion.div key={index} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 max-w-xl ${msg.type === 'user' ? 'ml-auto justify-end' : 'mr-auto'}`}>{msg.type === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center"><Bot className="w-5 h-5 text-sky-600"/></div>}<div className={`p-3 rounded-2xl shadow-sm ${msg.type === 'user' ? 'bg-purple-500 text-white rounded-br-lg' : 'bg-white text-slate-800 rounded-bl-lg border border-slate-200'}`}><p className="text-sm leading-relaxed">{msg.text}</p></div>{msg.type === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><User className="w-5 h-5 text-slate-600"/></div>}</motion.div>))}
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