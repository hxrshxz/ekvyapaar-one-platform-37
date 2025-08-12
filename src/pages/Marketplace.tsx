"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Star, MapPin, Sparkles, Factory, Palette, Smartphone, Truck, Briefcase, Laptop, FileText as FileTextIcon, Users, ShoppingCart, Printer, MessageSquare
} from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

export const Marketplace = () => {
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

  // --- EXPANDED DATA SETS ---
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
    // { name: "TMT Steel Rods (16mm)", seller: "Jindal Steel", price: "₹45,000 /ton", image: "https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Cotton Fabric (40s Count)", seller: "Ludhiana Textile Mills", price: "₹120 /meter", image: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Laptop Computers (Bulk)", seller: "Delhi IT Solutions", price: "₹35,000 /pc", image: "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: false },
    { name: "A4 Printing Paper Ream", seller: "TNPL Papers", price: "₹280 /ream", image: "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Clothes", seller: "Featherlite", price: "₹4,200 /pc", image: "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: false },
    { name: "Industrial Ball Valves (DN50)", seller: "Precision Engineering", price: "₹8,500 /unit", image: "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Corrugated Boxes (3 Ply)", seller: "National Packaging", price: "₹1,500 /100pcs", image: "https://images.pexels.com/photos/704555/pexels-photo-704555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "HDPE Granules (Natural)", seller: "Reliance Polymers", price: "₹95 /kg", image: "https://images.pexels.com/photos/6858688/pexels-photo-6858688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "calculators (Bulk)", seller: "Apex Safety Gear", price: "₹250 /pc", image: "https://images.pexels.com/photos/5412431/pexels-photo-5412431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
    { name: "Industrial Chemicals (HCL)", seller: "Surat Chemicals", price: "₹3,000 /barrel", image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", inStock: true },
  ], []);

  const tenders = useMemo(() => [
    { title: "Supply of Office Furniture", organization: "Municipal Corporation Delhi", value: "₹25,00,000", deadline: "15 Oct 2025" },
    { title: "Construction of School Building", organization: "Education Dept, Maharashtra", value: "₹1,50,00,000", deadline: "28 Oct 2025" },
    { title: "IT Equipment Procurement", organization: "State Bank of India", value: "₹75,00,000", deadline: "10 Nov 2025" },
    { title: "Annual Maintenance for ACs", organization: "CPWD, New Delhi", value: "₹15,00,000", deadline: "25 Nov 2025" },
    { title: "Hiring of Security Services", organization: "Bangalore Metro Rail", value: "₹50,00,000", deadline: "05 Dec 2025" },
    { title: "Digital Marketing Services", organization: "Ministry of Tourism", value: "₹80,00,000", deadline: "12 Dec 2025" },
    { title: "Procurement of Lab Equipment", organization: "AIIMS, Delhi", value: "₹2,00,00,000", deadline: "02 Jan 2026" },
    { title: "Logistics Partner for Events", organization: "FICCI", value: "₹40,00,000", deadline: "15 Jan 2026" },
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
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[5%] left-[20%] w-[300px] h-[300px] bg-green-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[28rem] overflow-hidden flex items-center justify-center text-center">
            <img src={marketplaceHero} alt="Marketplace" className="absolute w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-slate-900/70" />
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4">
                <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                  Connect & Grow
                </motion.h1>
                <motion.p variants={fadeIn} className="text-xl text-slate-300 max-w-2xl mt-4 mb-8">
                  Your one-stop B2B hub for services, products, and new business opportunities.
                </motion.p>
                <motion.div variants={fadeIn} className="relative w-full max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input placeholder="Search for 'CAD design', 'steel rods', or tenders..." className="w-full rounded-full bg-white/10 border-white/20 pl-12 h-12 text-white placeholder:text-slate-400" />
                </motion.div>
            </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <Tabs defaultValue="services" className="w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-800/80 backdrop-blur-sm p-1 h-12">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="tenders">Tenders</TabsTrigger>
              </TabsList>
            </motion.div>
            
            {/* Services Tab */}
            <TabsContent value="services" className="mt-8 space-y-8">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
                  <motion.h2 variants={fadeIn} className="text-2xl font-bold text-slate-100">Find Professional Services</motion.h2>
                  <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
                    {serviceCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "secondary"}
                        onClick={() => setActiveCategory(category.id)}
                        className="rounded-full"
                      >
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
                        <img src={freelancer.image} alt={freelancer.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"/>
                        <div>
                          <h3 className="font-bold text-slate-100">{freelancer.name}</h3>
                          <p className="text-sm text-sky-400">{freelancer.title}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" /> {freelancer.rating}</div>
                          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {freelancer.location}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {freelancer.skills.map((skill) => ( <Badge key={skill} variant="secondary">{skill}</Badge> ))}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="text-lg font-bold text-slate-100">{freelancer.hourlyRate}<span className="text-sm font-normal text-slate-400">/hr</span></div>
                          <Button size="sm" className="rounded-full bg-slate-700 hover:bg-slate-600">Contact</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Products Tab */}
            <TabsContent value="products" className="mt-8 space-y-8">
               <motion.h2 initial="hidden" animate="visible" variants={fadeIn} className="text-2xl font-bold text-slate-100">Browse Industrial & Business Products</motion.h2>
               <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <motion.div key={product.name} variants={fadeIn} className="group">
                      <Card className="h-full bg-white/5 border-white/10 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
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
            
            {/* Tenders Tab */}
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