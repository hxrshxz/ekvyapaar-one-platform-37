"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
// MODIFIED: Added ChevronDown for the dropdown
import { Search, Wand2, Camera, Info, Loader2, Download, Upload, ChevronDown } from "lucide-react";

// NEW: Define modes as an array of objects for cleaner rendering
const modes = [
  { name: "Gemini-2.5-pro", icon: <Download className="h-4 w-4" /> },
  { name: "DeepSeek R1", icon: <Upload className="h-4 w-4" /> },
];

export const AccountantCommandBar = ({ handleStartChat, handleScanCommand }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState('Gemini-2.5-pro');
  const [aiAssist, setAiAssist] = useState(true);
  const fileInputRef = useRef(null);

  // NEW: State and ref for the mode dropdown
  const [isModeDropdownOpen, setModeDropdownOpen] = useState(false);
  const modeDropdownRef = useRef(null);

  const [currentPlaceholder, setCurrentPlaceholder] = useState("Log expense from 'ABC Hardware'...");
  const placeholders = useMemo(() => [
    "Log expense from 'ABC Hardware'...",
    "Create invoice for 'Innovate Tech'...",
    "Show my ITC for last month...",
    "What are my total sales this quarter?",
  ], []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders]);

  // NEW: Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) {
        setModeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (inputValue) {
      handleStartChat(inputValue);
    }
  };

  // NEW: Handler to change mode and close the dropdown
  const handleModeChange = (modeName) => {
    setActiveMode(modeName);
    setModeDropdownOpen(false);
  };
  
  const handleImageButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => {
    if (event.target.files?.[0]) {
      handleScanCommand();
    }
  };

  const currentMode = modes.find((mode) => mode.name === activeMode);

  return (
    <motion.div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-3xl blur-lg opacity-30"></div> */}
        {/* <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 space-y-4"> */}
          {/* <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative w-full flex items-center">
              <Search className="h-6 w-6 text-slate-500 flex-shrink-0 ml-3 absolute left-0" />
              <AnimatePresence mode="wait">
                {!inputValue && (
                  <motion.p
                    key={currentPlaceholder}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-12 text-base md:text-lg text-slate-600 pointer-events-none"
                  >
                    {currentPlaceholder}
                  </motion.p>
                )}
              </AnimatePresence>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent border-none text-lg h-auto py-3 pl-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSubmit}
                className="rounded-xl h-12 px-6 md:px-8 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-28 md:w-32 flex-shrink-0"
              >
                <span className="text-base">Submit</span>
              </Button>
            </motion.div> */}
          {/* </div> */}
          {/* <div className="flex items-center justify-between pl-2 pr-1"> */}
            
            {/* --- REPLACED CODE BLOCK START --- */}
            <div ref={modeDropdownRef} className="relative">
              <button
                onClick={() => setModeDropdownOpen(!isModeDropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300/70"
              >
                {/* ICON TO THE LEFT OF MODEL  */}
                {/* {currentMode?.icon} */}
                <span>{currentMode?.name}</span>
                <motion.div animate={{ rotate: isModeDropdownOpen ? 180 : 0 }}>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isModeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute top-full z-10 mt-2 w-48 origin-top-left rounded-xl border border-slate-200 bg-white/90 p-1 shadow-xl backdrop-blur-sm"
                  >
                    {modes.map((mode) => (
                      <button
                        key={mode.name}
                        onClick={() => handleModeChange(mode.name)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                          activeMode === mode.name
                            ? "bg-purple-500 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {mode.icon}
                        {mode.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* --- REPLACED CODE BLOCK END --- */}
            
            <div className="flex items-center space-x-4">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Wand2 className="h-5 w-5 text-purple-500" />
                    <label htmlFor="ai-assist" className="text-sm font-medium text-slate-700 hidden md:inline">AI Agent</label>
                    <Switch id="ai-assist" checked={aiAssist} onCheckedChange={setAiAssist} />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-sky-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">AI Smart Assist</h4>
                      <p className="text-sm">When enabled The Agent mode will automatically perform tasks it is given.</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={handleImageButtonClick}>
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm">Scan Invoice</span>
              </Button>
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </motion.div>
  );
};