"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Imports for Markdown rendering
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  Search, Star, MapPin, Sparkles, Factory, Palette, Smartphone, Truck, Briefcase, Laptop, FileText as FileTextIcon, Users, ShoppingCart, Printer, MessageSquare, Edit, BarChart3, Wand2, Camera, Info, Loader2
} from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

// --- AI-POWERED HERO SEARCH COMPONENT ---
// This component is now simpler. It receives state and handlers as props
// and is only responsible for the input UI, not for displaying results.
const HeroSearch = ({ inputValue, setInputValue, handleSearch, isLoading }) => {
  const [deepSearch, setDeepSearch] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-sky-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl shadow-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-slate-400 flex-shrink-0 ml-2" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your needs... electric bikes, bulk cotton, etc."
              className="w-full bg-transparent border-none text-base h-auto py-2 text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="rounded-xl px-6 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-28"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="hidden sm:inline">Search</span>}
              {!isLoading && <Search className="h-5 w-5 sm:hidden" />}
            </Button>
          </div>
          <div className="flex items-center justify-start space-x-4 pl-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Wand2 className="h-5 w-5 text-purple-400" />
                  <label htmlFor="deep-search" className="text-sm font-medium text-slate-300">Deep Search</label>
                  <Switch id="deep-search" checked={deepSearch} onCheckedChange={setDeepSearch} />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-slate-900/90 backdrop-blur-sm border-slate-700 text-slate-300">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-sky-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Deep Search (Free)</h4>
                    <p className="text-sm">Get more accurate results for detailed requests with Deep Search. Turn it off anytime to switch back to regular search.</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-700/50 h-auto px-3 py-1.5 rounded-lg">
              <Camera className="h-4 w-4 mr-2" />
              <span className="text-sm">Image Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Marketplace = () => {
  // --- MOVED STATE MANAGEMENT HERE ---
  // The state is "lifted up" from the search component to the main page component.
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState("");
  
  // --- MOVED SEARCH HANDLER FUNCTION HERE ---
  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setSearchResult("");
    setError("");

    try {
      const API_KEY = "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q"; // Replace with your actual API key
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Please provide a detailed answer for: "${inputValue}". Format your response using Markdown, including bold text for emphasis and clickable links where appropriate.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setSearchResult(text);
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError("Failed to get response from AI. Check the console for errors.");
    } finally {
      setIsLoading(false);
    }
  };

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const serviceCategories = [
    { id: "all", name: "All", icon: Sparkles },
    { id: "manufacturing", name: "Manufacturing", icon: Factory },
    { id: "design", name: "Design", icon: Palette },
    { id: "digital", name: "Marketing", icon: Smartphone },
    { id: "logistics", name: "Logistics", icon: Truck },
    { id: "finance", name: "Accounting", icon: Briefcase },
    { id: "tech", name: "Tech", icon: Laptop },
    { id: "legal", name: "Legal", icon: FileTextIcon },
    { id: "hr", name: "HR", icon: Users },
    { id: "printing", name: "Printing", icon: Printer },
    { id: "consulting", name: "Consulting", icon: MessageSquare },
  ];

  const freelancers = useMemo(() => [
    { name: "Rajesh Kumar", title: "CAD Designer & Prototyping", location: "Gurgaon, Haryana", rating: 4.9, hourlyRate: "₹500", skills: ["AutoCAD", "SolidWorks", "3D Printing"], image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "manufacturing" },
    { name: "Priya Sharma", title: "Digital Marketing & SEO Strategist", location: "Delhi, India", rating: 4.8, hourlyRate: "₹400", skills: ["SEO", "PPC", "Content Strategy"], image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "digital" },
    { name: "Amit Verma", title: "Full-Stack Web Developer", location: "Bangalore, Karnataka", rating: 4.9, hourlyRate: "₹650", skills: ["React", "Node.js", "MongoDB"], image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "tech" },
    { name: "Sneha Patel", title: "Chartered Accountant & GST Expert", location: "Mumbai, Maharashtra", rating: 5.0, hourlyRate: "₹800", skills: ["Taxation", "GST Filing", "Auditing"], image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "finance" },
    { name: "Kavya Reddy", title: "UI/UX & Brand Identity Designer", location: "Hyderabad, Telangana", rating: 4.8, hourlyRate: "₹450", skills: ["Figma", "Branding", "User Research"], image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "design" },
    { name: "Suresh Rao", title: "Corporate & Commercial Lawyer", location: "Bengaluru, Karnataka", rating: 4.7, hourlyRate: "₹1200", skills: ["Contract Law", "IP Law", "Compliance"], image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "legal" },
    { name: "Vikram Singh", title: "Logistics Optimization Consultant", location: "Chennai, Tamil Nadu", rating: 4.6, hourlyRate: "₹550", skills: ["Supply Chain", "Warehousing", "ERP"], image: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "logistics" },
    { name: "Anjali Mehta", title: "HR & Recruitment Specialist", location: "Pune, Maharashtra", rating: 4.8, hourlyRate: "₹500", skills: ["Recruitment", "Payroll", "Policy Making"], image: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "hr" },
    { name: "Manoj Desai", title: "Offset & Digital Printing Expert", location: "Ahmedabad, Gujarat", rating: 4.9, hourlyRate: "₹300", skills: ["Offset Printing", "Digital Print", "Color Matching"], image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "printing" },
    { name: "Sunita Iyer", title: "Business Strategy Consultant", location: "Delhi, India", rating: 5.0, hourlyRate: "₹2000", skills: ["Market Entry", "Growth Strategy", "Biz Plan"], image: "https://images.pexels.com/photos/1181579/pexels-photo-1181579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "consulting" },
    { name: "Nitin Gadkari", title: "App Developer (iOS & Android)", location: "Pune, Maharashtra", rating: 4.7, hourlyRate: "₹700", skills: ["Swift", "Kotlin", "React Native"], image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "tech" },
    { name: "Fatima Khan", title: "Social Media Manager", location: "Lucknow, UP", rating: 4.6, hourlyRate: "₹250", skills: ["Instagram Growth", "Facebook Ads", "Influencers"], image: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category: "digital" },
  ], []);

  const products = useMemo(() => [
    { name: "9W LED Bulbs (Pack of 10)", seller: "Surya Electronics", price: "₹850 /pack", image: "https://images.pexels.com/photos/8134762/pexels-photo-8134762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Solar Panels (330W)", seller: "Adani Solar", price: "₹8,000 /panel", image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
  ], []);

  const userProducts = useMemo(() => [
    { name: "Handcrafted Leather Wallets", image: "https://images.pexels.com/photos/163369/leather-craft-leather-wallet-craft-163369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", price: "₹1,200 /pc", stock: 50, status: "Active", views: "1.2k", sales: 82 },
    { name: "Organic Spice Blends", image: "https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", price: "₹450 /set", stock: 120, status: "Active", views: "3.4k", sales: 210 },
  ], []);

  const tenders = useMemo(() => [
    { title: "Supply of Office Furniture", organization: "Municipal Corporation Delhi", value: "₹25,00,000", deadline: "15 Oct 2025" },
    { title: "Construction of School Building", organization: "Education Dept, Maharashtra", value: "₹1,50,00,000", deadline: "28 Oct 2025" },
  ], []);

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter(f =>
      (activeCategory === 'all' || f.category === activeCategory) &&
      (f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [freelancers, activeCategory, searchTerm]);

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } } as const;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[300px] h-[300px] bg-green-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="relative h-[28rem] overflow-hidden flex items-center justify-center text-center mt-[-80px]">
          <img src={marketplaceHero} alt="Marketplace" className="absolute w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70" />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
              Smart Sourcing, Simplified.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-slate-300 max-w-2xl mt-4 mb-8">
             All tasks in one ask. Your B2B hub for services, products, and new opportunities.
            </motion.p>
            <motion.div variants={fadeIn} className="w-full">
              {/* --- PASSING PROPS DOWN TO HEROSEARCH --- */}
              <HeroSearch 
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* --- NEW DEDICATED AI RESULT AREA --- */}
        {/* This container now lives outside the hero section, solving the layout shift. */}
        <div className="relative px-4">
          <div className="w-full max-w-2xl mx-auto">
            {/* We reserve a minimum height to prevent large layout jumps */}
            <motion.div
              animate={{ minHeight: isLoading || searchResult || error ? '120px' : '0px' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-[-2rem] z-20" // Negative margin pulls it up into the hero's space
            >
              {isLoading && (
                 <div className="mt-4 p-4 h-full flex items-center justify-center bg-slate-800/50 border border-slate-700 rounded-lg">
                    <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
                 </div>
              )}
              {searchResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg text-left"
                >
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {searchResult}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                  <p className="text-red-300">{error}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* The rest of the page content... */}
           <Tabs defaultValue="services" className="w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex justify-center">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-slate-800/80 p-1.5 backdrop-blur-sm">
                <TabsTrigger value="products" className="rounded-full px-6 py-2 text-sm font-medium text-slate-300 transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white focus-visible:ring-offset-slate-900">Products</TabsTrigger>
                <TabsTrigger value="services" className="rounded-full px-6 py-2 text-sm font-medium text-slate-300 transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white focus-visible:ring-offset-slate-900">Services</TabsTrigger>
                <TabsTrigger value="tenders" className="rounded-full px-6 py-2 text-sm font-medium text-slate-300 transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white focus-visible:ring-offset-slate-900">Tenders</TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="services" className="mt-8 space-y-8">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
                <motion.h2 variants={fadeIn} className="text-2xl font-bold text-slate-100">Find Professional Services</motion.h2>
                <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
                  {serviceCategories.map((category) => (
                    <Button key={category.id} variant={activeCategory === category.id ? "default" : "secondary"} onClick={() => setActiveCategory(category.id)} className="rounded-full">
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFreelancers.map((freelancer) => (
                  <motion.div key={freelancer.name} variants={fadeIn} className="group">
                    <Card className="h-full bg-white/5 border-white/10 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <img src={freelancer.image} alt={freelancer.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
                        <div>
                          <h3 className="font-bold text-slate-100">{freelancer.name}</h3>
                          <p className="text-sm text-sky-400">{freelancer.title}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="products" className="mt-8 space-y-8">
              <Tabs defaultValue="browse" className="w-full">
                <TabsList className="border-b border-slate-700 w-full justify-start rounded-none bg-transparent p-0">
                  <TabsTrigger value="browse" className="data-[state=active]:border-sky-400 data-[state=active]:text-sky-400 border-b-2 border-transparent rounded-none bg-transparent text-slate-400 px-4 pb-3">Browse Marketplace</TabsTrigger>
                  <TabsTrigger value="listings" className="data-[state=active]:border-sky-400 data-[state=active]:text-sky-400 border-b-2 border-transparent rounded-none bg-transparent text-slate-400 px-4 pb-3">Your Listings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browse" className="mt-8">
                  <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-2xl font-bold text-slate-100 mb-6">Browse Industrial & Business Products</motion.h2>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <motion.div key={product.name} variants={fadeIn} className="group">
                        <Card className="h-full bg-white/5 border-white/10 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <CardContent className="p-4 space-y-3 flex flex-col justify-between h-[calc(100%-10rem)]">
                            <div>
                              <h3 className="font-bold text-slate-100 truncate">{product.name}</h3>
                              <p className="text-sm text-slate-400">by {product.seller}</p>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <div className="text-lg font-bold text-sky-400">{product.price}</div>
                                <Badge variant={product.inStock ? "default" : "destructive"}>{product.inStock ? "In Stock" : "Out of Stock"}</Badge>
                              </div>
                              <Button disabled={!product.inStock} className="w-full bg-slate-700 hover:bg-slate-600">Add to Cart</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="listings" className="mt-8">
                  <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-2xl font-bold text-slate-100">Manage Your Product Listings</motion.h2>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProducts.map((product) => (
                      <motion.div key={product.name} variants={fadeIn} className="group">
                        <Card className="h-full bg-white/5 border-white/10 transition-all duration-300 rounded-2xl shadow-lg overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-100">{product.name}</h3>
                              <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                            </div>
                            <div className="text-lg font-bold text-sky-400">{product.price}</div>
                            <Button variant="outline" className="w-full bg-transparent border-slate-700 hover:bg-slate-800 hover:text-white mt-2">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Listing
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="tenders" className="mt-8 space-y-8">
              <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-2xl font-bold text-slate-100">Latest Tenders & Procurement Orders</motion.h2>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                {tenders.map((tender) => (
                  <motion.div key={tender.title} variants={fadeIn}>
                    <Card className="bg-white/5 border-white/10 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20">
                      <CardContent className="p-6 grid md:grid-cols-4 items-center gap-6">
                        <div className="md:col-span-2">
                          <h3 className="font-bold text-lg text-sky-400">{tender.title}</h3>
                          <p className="text-sm text-slate-300">{tender.organization}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Value</p>
                          <p className="font-semibold text-slate-100">{tender.value}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Deadline</p>
                          <p className="font-semibold text-red-400">{tender.deadline}</p>
                        </div>
                        <Button className="md:col-start-4 rounded-full">View Details</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};