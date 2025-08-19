"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone, Video, MessageCircle, MapPin, PlayCircle, Users, HelpCircle, CheckCircle, ArrowRight, Building2, GraduationCap, X, Search
} from "lucide-react";
import supportHero from "@/assets/support-hero.jpg"; // You'll need a suitable hero image

export const Support = () => {
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchedVideos, setWatchedVideos] = useState(new Set());

  const supportCenters = useMemo(() => [
    { name: "Mayapuri Center", address: "B-14, Mayapuri Industrial Area, New Delhi" },
    { name: "Lajpat Nagar Center", address: "Shop 45, Central Market, Lajpat Nagar II, New Delhi" },
    { name: "Karol Bagh Center", address: "15A, First Floor, Ajmal Khan Road, Karol Bagh, New Delhi" },
  ], []);

  const supportOptions = useMemo(() => [
    { title: "Talk to Support", icon: Phone, color: "text-green-500", bgColor: "bg-green-100", description: "Instant phone support for urgent queries.", availability: "24/7 Available", actionText: "Call Now", onClick: () => {} },
    { title: "Video Call Support", icon: Video, color: "text-blue-500", bgColor: "bg-blue-100", description: "Screen sharing for complex issues.", availability: "9 AM - 9 PM (Mon-Sat)", actionText: "Start Video Call", onClick: () => {} },
    { title: "WhatsApp Support", icon: MessageCircle, color: "text-emerald-500", bgColor: "bg-emerald-100", description: "Convenient chat, photo, and voice support.", availability: "24/7 Available", actionText: "Open WhatsApp", onClick: () => {} },
    { title: "Find Nearby Center", icon: Building2, color: "text-orange-500", bgColor: "bg-orange-100", description: "Personalized help at local centers.", availability: "10 AM - 8 PM (Mon-Fri)", actionText: "View Centers", onClick: () => setShowMap(true) },
    { title: "Email Support", icon: HelpCircle, color: "text-purple-500", bgColor: "bg-purple-100", description: "Detailed written assistance for non-urgent issues.", availability: "24/7 Available", actionText: "Send Email", onClick: () => {} },
    { title: "Community Forum", icon: Users, color: "text-yellow-500", bgColor: "bg-yellow-100", description: "Connect with other MSMEs for peer support.", availability: "24/7", actionText: "Visit Forum", onClick: () => {} },
  ], []);
  
  const videoModules = useMemo(() => [
    { id: 1, title: "How to Register on EkVyapar", duration: "5:32", thumbnail: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, title: "Filling Loan Application Form", duration: "8:15", thumbnail: "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, title: "How to Apply for GeM Tenders", duration: "12:45", thumbnail: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, title: "ERP Lite - Voice Commands Guide", duration: "15:22", thumbnail: "https://images.pexels.com/photos/7688160/pexels-photo-7688160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, title: "GST Return Filing Simplified", duration: "10:18", thumbnail: "https://images.pexels.com/photos/7821516/pexels-photo-7821516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 6, title: "Inventory Management Best Practices", duration: "11:05", thumbnail: "https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 7, title: "Understanding Working Capital", duration: "7:40", thumbnail: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 8, title: "Digital Marketing 101 for MSMEs", duration: "18:55", thumbnail: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 9, title: "CRM: Managing Customer Relationships", duration: "9:30", thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 10, title: "Using the Quick Billing Tool", duration: "6:25", thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 11, title: "Advanced GeM Bidding Strategies", duration: "22:10", thumbnail: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 12, title: "AI Accountant: Profit & Loss Reports", duration: "13:48", thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ], []);
  
  const faqs = useMemo(() => [
    { question: "What is required for registration?", answer: "Just your Udyam registration number and mobile number. The process is typically completed in under 2 minutes." },
    { question: "How long does loan approval take?", answer: "You can expect pre-approval within 48 hours. Final disbursement usually takes 5-7 business days, depending on documentation." },
    { question: "Is my business data secure on the ERP?", answer: "Absolutely. We employ bank-level security with full encryption to protect your data, stored on secure cloud servers." },
    { question: "Can I get a loan without collateral?", answer: "Yes, many of our loan products are designed to be collateral-free. Eligibility depends on your credit score and business history." },
  ], []);

  const filteredVideos = useMemo(() => 
    videoModules.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    ), [videoModules, searchTerm]);

  const progressPercentage = (watchedVideos.size / videoModules.length) * 100;

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;
  
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // <-- IMPORTANT: Replace with your actual key
  const origin = encodeURIComponent(supportCenters[0].address);
  const destination = encodeURIComponent(supportCenters[supportCenters.length - 1].address);
  const waypoints = supportCenters.slice(1, -1).map(center => encodeURIComponent(center.address)).join('|');
  const mapUrl = `http://googleusercontent.com/maps.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
  
  // Define a consistent glassmorphism style for all cards
  const glassCardStyle = "bg-white/50 backdrop-blur-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl";

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 overflow-x-hidden">
      {/* Dynamic Animated Background - now more visible */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-15%] w-96 h-96 md:w-[500px] md:h-[500px] bg-violet-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 md:w-[600px] md:h-[600px] bg-sky-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-5%] left-[20%] w-72 h-72 md:w-[400px] md:h-[400px] bg-emerald-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 mt-[-80px]">
        <section className="relative h-[32rem] overflow-hidden flex items-center justify-center text-center">
          <img src={supportHero} alt="Customer Support" className="absolute w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-white/50 backdrop-blur-lg" />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold text-slate-900">
              We're Here to Help
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-3xl mt-4 mb-8">
              Get instant, 24/7 support through calls, chats, video training, and local centers. Your success is our priority.
            </motion.p>
            <motion.div variants={fadeIn} className="flex gap-4">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white h-12 px-8 text-base shadow-lg shadow-sky-500/20"> <Phone className="mr-2 h-5 w-5" /> Get Instant Help</Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/70 backdrop-blur-sm border-slate-300 hover:bg-white shadow-lg"><PlayCircle className="mr-2 h-5 w-5" /> Watch Training</Button>
            </motion.div>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 py-24 space-y-24">
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-slate-900">How Can We Help You Today?</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">Choose the support channel that works best for you.</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportOptions.map((option) => (
                <motion.div key={option.title} variants={fadeIn}>
                  <Card className={`h-full p-6 hover:border-sky-500/50 ${glassCardStyle}`}>
                    <div className="flex items-start gap-4 mb-4">
                      {/* Premium Icon Styling */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${option.bgColor}`}>
                          <option.icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-900">{option.title}</CardTitle>
                        <CardDescription className="text-slate-500">{option.description}</CardDescription>
                      </div>
                    </div>
                    <CardContent className="p-0 space-y-4">
                      <Badge variant="secondary" className="bg-slate-100/70 text-slate-600 border-slate-200/80">{option.availability}</Badge>
                      <Button onClick={option.onClick} className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-md shadow-slate-800/20">{option.actionText}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-slate-900"><GraduationCap/> Video Training Library</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">Learn everything you need with our short, easy-to-follow video tutorials.</motion.p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Search for a video (e.g., 'GST', 'Loan')" 
                  className="w-full bg-white/70 backdrop-blur-sm border-slate-300 pl-12 h-12 text-base rounded-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-sky-600">Your Progress</span>
                  <span className="text-sm font-medium text-sky-600">{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full bg-slate-200/70 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-sky-400 to-sky-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              <motion.div layout initial="hidden" animate="visible" variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <motion.div layout key={video.id} variants={fadeIn}>
                      <Card 
                        className={`h-full overflow-hidden group cursor-pointer hover:border-sky-500/50 ${glassCardStyle}`}
                        onClick={() => {
                          setWatchedVideos(prev => new Set(prev).add(video.id));
                        }}
                      >
                        <div className="relative">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <PlayCircle className="h-16 w-16 text-white" />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-black/50 text-white backdrop-blur-sm">{video.duration}</Badge>
                          {watchedVideos.has(video.id) && (
                            <Badge variant="secondary" className="absolute top-2 left-2 bg-green-500 text-white border-green-600">
                              <CheckCircle className="h-4 w-4 mr-1"/>
                              Watched
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-slate-800">{video.title}</h3>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-slate-500 text-lg">No videos found for "{searchTerm}". Try another search.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
          
          <section>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</motion.h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <motion.div key={faq.question} variants={fadeIn}>
                  <Card className={`p-6 ${glassCardStyle}`}>
                    <h3 className="text-lg font-semibold text-sky-600 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>
          
          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className={`p-8 md:p-12 ${glassCardStyle}`}>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold text-slate-900">Contact Our Team</h2>
                      <p className="text-lg text-slate-600">Have a specific question or need detailed help? Fill out the form, and our support specialists will get back to you within 2-4 hours.</p>
                      <div className="space-y-3 pt-4 text-slate-700">
                        <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-sky-500"/><span>1800-123-MSME (6763)</span></div>
                        <div className="flex items-center gap-3"><HelpCircle className="h-5 w-5 text-sky-500"/><span>support@ekvyapar.com</span></div>
                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-sky-500"/><span>New Delhi, India</span></div>
                      </div>
                    </div>
                    <form className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><Label htmlFor="name" className="text-slate-700">Name</Label><Input id="name" placeholder="Your Name" className="bg-white/70 border-slate-300 mt-1"/></div>
                        <div><Label htmlFor="phone" className="text-slate-700">Phone</Label><Input id="phone" placeholder="+91" className="bg-white/70 border-slate-300 mt-1"/></div>
                      </div>
                      <div><Label htmlFor="email" className="text-slate-700">Email</Label><Input id="email" type="email" placeholder="you@company.com" className="bg-white/70 border-slate-300 mt-1"/></div>
                      <div><Label htmlFor="message" className="text-slate-700">Your Message</Label><Textarea id="message" placeholder="Describe your issue or question..." className="bg-white/70 border-slate-300 mt-1" rows={4}/></div>
                      <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-500/20">Send Message</Button>
                    </form>
                  </div>
                </Card>
            </motion.div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[90%] h-[90%] max-w-6xl"
            >
              <Card className="h-full bg-slate-50 border-slate-200 flex flex-col shadow-2xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
                  <div className="space-y-1">
                    <CardTitle>EkVyapar Support Centers - Delhi</CardTitle>
                    <CardDescription>Find the nearest center for in-person assistance.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowMap(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-grow p-0 rounded-b-2xl overflow-hidden">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};