"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import toolsHero from "@/assets/tools-hero.jpg"; // Make sure this path is correct

// Import BOTH of your tool components
import { AIAccountant } from "./AIAccountant"; 
import { AIProductLister } from "@/components/AIProductLister";
import { Bot, Sparkles, TrendingUp } from "lucide-react";

export const BusinessTools = () => {
  // --- NEW: State to manage which tool is active ---
  const [activeTool, setActiveTool] = useState('accountant'); // 'accountant' or 'productLister'

  const fadeIn = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
  } as const;
  
  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
  } as const;

  const successStories = useMemo(() => [
    { name: "Amit Sharma", business: "Sharma Engineering", benefit: "25% Profit Increase", details: "AI Accountant helped us identify and control unnecessary expenses, boosting our bottom line." },
    { name: "Priya Singh", business: "Singh Handicrafts", benefit: "50% Faster Listings", details: "AI Product Lister creates perfect titles and descriptions in seconds, saving me hours of creative work." },
    { name: "Rajesh Patel", business: "Patel Steel Works", benefit: "40% Time Saved", details: "AI Accountant's automation cut our expense tracking time from 4 hours to just 1 hour daily." },
  ], []);
  
  const tools = [
      { id: 'accountant', label: 'AI Accountant', icon: Bot },
      { id: 'productLister', label: 'AI Product Lister', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 isolate">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/50 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/50 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/50 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <section className="relative h-[32rem] overflow-hidden flex items-center justify-center text-center mt-[-80px]">
          {/* <img src={toolsHero} alt="Business Tools" className="absolute w-full h-full object-cover animate-slow-zoom"/> */}
          <div className="absolute inset-0 bg-slate-50/60" />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4 ">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">AI Business Tools</motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-3xl mt-4 mb-8">A powerful suite of AI-driven tools to automate tasks, save time, and grow your business.</motion.p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 py-16 space-y-24">
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-8">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">Explore Our AI Suite</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">Switch between our powerful tools to streamline your operations.</motion.p>
            </motion.div>
            
            {/* --- NEW: Tab switching UI --- */}
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center mb-8">
                <div className="flex space-x-2 rounded-full bg-slate-200/80 p-1.5">
                    {tools.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className="relative rounded-full px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold transition-colors"
                        >
                            {activeTool === tool.id && (
                                <motion.div
                                    layoutId="activeToolPill"
                                    className="absolute inset-0 bg-white shadow-md"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                            <span className={`relative z-10 flex items-center gap-2 ${activeTool === tool.id ? 'text-sky-600' : 'text-slate-600'}`}>
                                <tool.icon className="h-5 w-5" />
                                {tool.label}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* --- NEW: Conditionally render the active tool --- */}
            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTool}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTool === 'accountant' && <AIAccountant />}
                  {activeTool === 'productLister' && <AIProductLister />}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">Real Results from Real Businesses</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">See how businesses are saving time and money with our AI suite.</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className={`h-full p-6 bg-white/60 backdrop-blur-xl hover:border-sky-500 transition-all duration-300 rounded-2xl shadow-lg`}>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow space-y-3">
                        <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                          <TrendingUp className="h-6 w-6 text-amber-600" />
                        </div>
                        <p className="text-2xl font-bold text-sky-600">{story.benefit}</p>
                        <p className="text-slate-600 italic">"{story.details}"</p>
                      </div>
                      <div className="pt-4 border-t border-slate-200/80 mt-4">
                        <div className="font-bold text-slate-800">{story.name}</div>
                        <div className="text-sm text-slate-500">{story.business}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>
          
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="bg-gradient-to-br from-sky-200/70 to-purple-200/70 border-slate-200/60 shadow-2xl backdrop-blur-lg p-8 md:p-12">
                <div className="text-center space-y-6">
                  <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Get Your AI Business Suite Today</h2>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-600">COMPLETELY FREE</p>
                  <p className="text-lg text-slate-700 max-w-2xl mx-auto">No hidden charges, no credit card required. Transform your business finances at zero cost.</p>
                  <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-lg font-bold shadow-lg">
                    Get Started for Free
                  </Button>
                </div>
              </Card> 
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};