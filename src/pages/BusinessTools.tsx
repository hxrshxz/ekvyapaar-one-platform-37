"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3, FileText as FileTextIcon, Bot, Users, Package, Receipt, Smartphone, CheckCircle, Mic, Cloud, Rocket, Award, TrendingUp
} from "lucide-react";
import toolsHero from "@/assets/tools-hero.jpg"; // Make sure this path is correct

// TYPEWRITER COMPONENT
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };
  const child = {
    // FIX: Corrected 'opacihy' to 'opacity'
    visible: { opacity: 1, y: 0, transition: { damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };
  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }} variants={container} initial="hidden" animate="visible">
      {characters.map((char, index) => (
        <motion.span variants={child} key={index}>
          {typeof char === "string" ? (char === " " ? "\u00A0" : char) : ""}
        </motion.span>
      ))}
    </motion.div>
  );
};

// LIVE UI MOCKUP COMPONENT
const AccountantDemoUI = ({ expenses, profit, highlightProfit }) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);

  return (
    <div className="mt-6 p-6 bg-slate-900 rounded-lg border border-slate-700 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <h3 className="text-lg font-semibold text-white">Financial Summary</h3>
        <motion.div
          animate={{
            borderColor: highlightProfit ? 'rgba(56, 189, 248, 1)' : 'rgba(56, 189, 248, 0)',
            boxShadow: highlightProfit ? '0 0 15px rgba(56, 189, 248, 0.5)' : '0 0 0px rgba(56, 189, 248, 0)',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="p-4 rounded-lg bg-slate-800 border"
        >
          <p className="text-sm text-slate-400">This Month's Profit</p>
          <AnimatePresence mode="wait">
            <motion.p key={profit} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="text-3xl font-bold text-green-400">
              {formatCurrency(profit)}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Expenses</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expenses.map((expense) => (
              <motion.div key={expense.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                <div>
                  <p className="font-medium text-slate-200">{expense.item}</p>
                  <p className="text-xs text-slate-500">{expense.category}</p>
                </div>
                <p className="font-semibold text-red-400">{formatCurrency(expense.amount)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


export const BusinessTools = () => {
  const [selectedTool, setSelectedTool] = useState("accountant");
  const [demoStep, setDemoStep] = useState(0);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [key, setKey] = useState(0);

  // --- State for the interactive UI demo ---
  const initialExpenses = [
    { id: 3, item: "Office Supplies", category: "Office", amount: 2500 },
    { id: 2, item: "Client Lunch", category: "Meals", amount: 1800 },
    { id: 1, item: "Software Subscription", category: "Software", amount: 4000 },
  ];
  const [expenses, setExpenses] = useState(initialExpenses);
  const [profit, setProfit] = useState(120000);
  const [highlightProfit, setHighlightProfit] = useState(false);
  // ---

  const tools = useMemo(() => [
    { id: "erp", name: "ERP Lite", description: "Manage inventory, billing, and customers with voice.", icon: BarChart3, color: "text-blue-400" },
    { id: "gst", name: "GST Helper", description: "Automate GST filing and track input credits easily.", icon: FileTextIcon, color: "text-green-400" },
    { id: "accountant", name: "AI Accountant", description: "Record expenses via voice and get financial reports.", icon: Bot, color: "text-purple-400" },
    { id: "crm", name: "Customer CRM", description: "Manage leads and customer follow-ups.", icon: Users, color: "text-orange-400" },
    { id: "inventory", name: "Smart Inventory", description: "Real-time stock tracking with low-stock alerts.", icon: Package, color: "text-indigo-400" },
    { id: "billing", name: "Quick Billing", description: "Generate fast invoices and track payments.", icon: Receipt, color: "text-cyan-400" },
    { id: "marketing", name: "Marketing Kit", description: "Tools for social media, email, and SEO.", icon: Smartphone, color: "text-red-400" },
  ], []);

  const featuresData = useMemo(() => ({
    erp: { demo: [{ action: "Check Stock", command: "EkVyapar, check steel rod stock", response: "Steel Rod: 150 kg remaining" }, { action: "Add Order", command: "New order: Ram Construction, 500 bricks", response: "Order saved. Delivery date?" }], benefits: ["Inventory Management", "WhatsApp Billing", "Sales Reports", "Multi-user Access"] },
    gst: { demo: [{ action: "Check Returns", command: "How much GST to pay this month?", response: "GSTR-1: ₹45,000" }, { action: "File Return", command: "File the return", response: "Return successfully filed" }], benefits: ["Auto GST Calculation", "Return Filing", "Compliance Alerts", "Input Credit Tracking"] },
    accountant: { demo: [{ action: "Add Expense", command: "Spent 5000 rupees on petrol", response: "Added to transport expenses" }, { action: "Request Report", command: "Show this month's profit", response: "Total Profit: ₹1,25,000" }], benefits: ["Voice Expense Entry", "Smart Categorization", "P&L Reports", "Tax Alerts"] },
    crm: { demo: [{ action: "Add Lead", command: "New customer: Suresh", response: "Customer added" }, { action: "Send Quotation", command: "Send quotation to Suresh", response: "Quotation sent" }], benefits: ["Customer Database", "Auto Follow-up", "WhatsApp Integration", "Sales Pipeline"] },
    inventory: { demo: [{ action: "Check Stock", command: "EkVyapar, check laptop stock", response: "Laptops: 25 units remaining" }, { action: "Generate Report", command: "Show low stock items", response: "Low stock: Printer ink" }], benefits: ["Real-time Tracking", "Low Stock Alerts", "Batch Management", "Barcode Scanning"] },
    billing: { demo: [{ action: "Create Invoice", command: "Create invoice for ABC Traders", response: "Invoice generated" }, { action: "Track Payment", command: "Has ABC Traders paid?", response: "Payment pending" }], benefits: ["Quick Invoice Generation", "Payment Tracking", "Digital Receipts", "Tax Calculation"] },
    marketing: { demo: [{ action: "Schedule Post", command: "Schedule Facebook post", response: "Post scheduled." }, { action: "Check Campaign", command: "Diwali campaign performance?", response: "15% conversion rate" }], benefits: ["Social Media Scheduler", "Email Marketing", "SEO Analysis", "Ad Campaign Tracking"] },
  }), []);

  const successStories = useMemo(() => [
    { name: "Rajesh Patel", business: "Patel Steel Works", benefit: "40% Time Saved", details: "ERP Lite's voice commands cut our billing time from 4 hours to just 1 hour daily.", toolId: "erp" },
    { name: "Sunita Devi", business: "Devi Garments", benefit: "Zero GST Penalties", details: "The automated reminders from GST Helper mean we never miss a filing deadline.", toolId: "gst" },
    { name: "Amit Sharma", business: "Sharma Engineering", benefit: "25% Profit Increase", details: "AI Accountant helped us identify and control unnecessary expenses, boosting our bottom line.", toolId: "accountant" },
  ], []);

  useEffect(() => {
    setIsDemoPlaying(false);
    setDemoStep(0);
    setKey(prevKey => prevKey + 1);
    setExpenses(initialExpenses);
    setProfit(120000);
    setHighlightProfit(false);
  }, [selectedTool]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && !isDemoPlaying) {
        event.preventDefault();
        setIsDemoPlaying(true);
        
        // --- LOGIC FOR DIFFERENT DEMOS ---
        if (selectedTool === 'accountant') {
          // Live UI Demo for Accountant
          setDemoStep(1);
          setTimeout(() => {
            setDemoStep(1.5);
            const newExpense = { id: 4, item: "Petrol for Van", category: "Transport", amount: 5000 };
            setExpenses(prev => [newExpense, ...prev]);
          }, 3000);
          setTimeout(() => setDemoStep(2), 6000);
          setTimeout(() => {
            setDemoStep(2.5);
            setProfit(125000);
            setHighlightProfit(true);
          }, 9000);
          setTimeout(() => setHighlightProfit(false), 11000);
        } else {
          // Standard Text-Only Demo for all other tools
          setDemoStep(1);
          setTimeout(() => setDemoStep(1.5), 3000);
          setTimeout(() => setDemoStep(2), 6000);
          setTimeout(() => setDemoStep(2.5), 9000);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDemoPlaying, selectedTool]);

  const currentTool = tools.find(t => t.id === selectedTool);
  const currentFeatures = featuresData[selectedTool];
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[300px] h-[300px] bg-green-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10">
        <section className="relative h-[32rem] overflow-hidden flex items-center justify-center text-center mt-[-80px]">
          <img src={toolsHero} alt="Business Tools" className="absolute w-full h-full object-cover animate-slow-zoom"/>
          <div className="absolute inset-0 bg-slate-900/70" />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4 ">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">Automate Your Business</motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-slate-300 max-w-3xl mt-4 mb-8">A full suite of free, AI-powered tools designed to simplify your operations.</motion.p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 py-16 space-y-24">
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">The MSME Growth Toolkit</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-400 mt-2">Select a tool to see how it can transform your business operations.</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {tools.map((tool) => (<motion.div key={tool.id} variants={fadeIn}><button onClick={() => setSelectedTool(tool.id)} className={`w-full p-4 rounded-xl transition-all duration-300 ${selectedTool === tool.id ? 'bg-white/10 ring-2 ring-sky-400' : 'bg-white/5 hover:bg-white/10'}`}><tool.icon className={`h-8 w-8 mx-auto ${tool.color}`} /><span className="block mt-2 text-sm font-semibold text-slate-100">{tool.name}</span></button></motion.div>))}
            </motion.div>
          </section>

          <AnimatePresence mode="wait">
            <motion.section key={selectedTool} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {currentTool && (
                <Card className="bg-slate-800/50 border-white/10 shadow-2xl backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center gap-3"><currentTool.icon className={currentTool.color} />{currentTool.name}</CardTitle>
                    <CardDescription className="text-slate-400 text-base">{currentTool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="demo" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 p-1 h-11"><TabsTrigger value="demo">Live Demo</TabsTrigger><TabsTrigger value="features">Features</TabsTrigger></TabsList>
                      <TabsContent value="demo" className="mt-4">
                        <div className="min-h-[120px]">
                          <AnimatePresence mode="wait">
                            <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              {isDemoPlaying && currentFeatures.demo.map((item, index) => (demoStep > index && (
                                <div key={index} className="grid grid-cols-3 gap-4 items-start p-3 mb-2">
                                  <div className="font-semibold text-slate-300"><Typewriter text={item.action} /></div>
                                  <div className="col-span-2 space-y-2">
                                    <div className="flex items-start gap-2 text-sm"><Mic className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" /><Typewriter text={`"${item.command}"`} delay={0.5} /></div>
                                    <AnimatePresence>{demoStep > index + 0.5 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="flex items-start gap-2 text-sm text-green-300"><Bot className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" /><Typewriter text={`"${item.response}"`} delay={0.5} /></div></motion.div>)}</AnimatePresence>
                                  </div>
                                </div>
                              )))}
                            </motion.div>
                          </AnimatePresence>
                          {!isDemoPlaying && (
                            <div className="flex flex-col items-center justify-center h-full w-full pt-8">
                              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><Mic className="h-12 w-12 text-sky-400" /></motion.div>
                              <p className="mt-4 text-slate-400">Press the Spacebar to start the live demo</p>
                            </div>
                          )}
                        </div>
                        {selectedTool === 'accountant' && (
                          <AccountantDemoUI expenses={expenses} profit={profit} highlightProfit={highlightProfit} />
                        )}
                      </TabsContent>
                      <TabsContent value="features" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {currentFeatures.benefits.map((benefit) => (<div key={benefit} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" /><span className="text-slate-200">{benefit}</span></div>))}
                          <div className="flex items-center gap-3"><Cloud className="h-5 w-5 text-sky-400 flex-shrink-0" /><span>Cloud Sync & Offline Mode</span></div>
                          <div className="flex items-center gap-3"><Smartphone className="h-5 w-5 text-sky-400 flex-shrink-0" /><span>Android & iOS Apps</span></div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </motion.section>
          </AnimatePresence>
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12"><motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">Real Results from Real Businesses</motion.h2><motion.p variants={fadeIn} className="text-lg text-slate-400 mt-2">See how MSMEs are saving time and money.</motion.p></motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {successStories.map((story) => (<motion.div key={story.name} variants={fadeIn}><Card className={`h-full p-6 bg-white/5 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20 ${story.toolId === selectedTool ? 'ring-2 ring-sky-400 shadow-sky-500/20' : 'border-transparent'}`}><div className="flex flex-col h-full"><div className="flex-grow space-y-3"><Award className="h-8 w-8 text-amber-400" /><p className="text-2xl font-bold text-sky-400">{story.benefit}</p><p className="text-slate-300 italic">"{story.details}"</p></div><div className="pt-4 border-t border-slate-700 mt-4"><div className="font-bold text-slate-100">{story.name}</div><div className="text-sm text-slate-400">{story.business}</div></div></div></Card></motion.div>))}
            </motion.div>
          </section>
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-white/10 shadow-2xl backdrop-blur-lg p-8 md:p-12">
                <div className="text-center space-y-6">
                  <Rocket className="h-16 w-16 mx-auto text-white" />
                  <h2 className="text-4xl font-bold text-white">Get Your Complete Business Suite Today</h2>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-cyan-300">COMPLETELY FREE</p>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto">Get all 7 tools, including ERP Lite, GST Helper, and AI Accountant, at no cost. No hidden charges, no credit card required.</p>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 h-14 px-10 text-lg font-bold"><TrendingUp className="mr-2 h-6 w-6" />Get Started for Free</Button>
                </div>
              </Card> 
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};