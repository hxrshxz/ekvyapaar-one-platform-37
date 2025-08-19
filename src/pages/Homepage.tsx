"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card as UICard } from "@/components/ui/card";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Landmark,
  Gem,
  Globe,
  FilePenLine,
  Combine,
  Rocket,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Local asset imports (ensure these paths are correct in your project)
import financeHub from "@/assets/finance-hub.jpg";
import marketplace from "@/assets/marketplace.jpg";
import businessTools from "@/assets/business-tools.jpg";
import dashboardPreviewImage from "@/assets/dashboard.png";
import { Spotlight } from "@/components/Spotlight";
import { LoginModal } from "./LoginModal";

// ===================================================================
// --- SCROLL ANIMATION COMPONENTS ---
// ===================================================================

const ContainerScrollAnimation = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-20 md:py-40 w-full relative mt-20"
        style={{ perspective: "1000px" }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <AnimatedCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </AnimatedCard>
      </div>
    </div>
  );
};

const ScrollHeader = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const AnimatedCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};


// ===================================================================
// --- HOMEPAGE COMPONENT ---
// ===================================================================

const SectionHeader = ({ pill, title, description }: { pill: string, title: string, description: string }) => (
    <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        className="text-left"
    >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-4 flex justify-start">
            <div className="flex items-center gap-2 rounded-full border border-sky-800/50 bg-slate-800/50 px-3 py-1 text-sm font-medium text-sky-300">
                <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                {pill} <ArrowRight className="h-4 w-4" />
            </div>
        </motion.div>
        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-100">{title}</motion.h2>
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-4 max-w-3xl text-lg text-slate-400">{description}</motion.p>
    </motion.div>
);

export const Homepage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const howItWorks = useMemo(() => [
    { step: "1", title: "Smart Onboarding", description: "Quickly register via Udyam, Aadhaar, or PAN with our AI-powered smart onboarding.", icon: FilePenLine, features: ["Instant MSME verification via Udyam API", "Seamless Aadhaar & PAN-based e-KYC", "Secure and trustworthy process",], },
    { step: "2", title: "API-First Aggregation", description: "A single, dynamic form auto-populates data from GSTN & Account Aggregator networks.", icon: Combine, features: ["Eliminates manual data entry", "Integrates with government portals", "One secure form for all services",], },
    { step: "3", title: "Instant Growth", description: "Instantly become discoverable to lenders (OCEN), buyers (ONDC), and enterprise tools.", icon: Rocket, features: ["AI-driven trustworthy credit scoring", "Immediate access to loans & orders", "Full platform-wide enablement",], },
  ], []);

  const testimonials = useMemo(() => [
    { name: "Rajesh Kumar", business: "Kumar Auto Parts, Mayapuri", text: "Got a ₹5 lakh loan through the govt scheme guidance on ekVyapaar. My business has grown 3x since then.", rating: 5, },
    { name: "Sunita Devi", business: "Devi Textiles, Gurgaon", text: "Getting ₹2 lakh orders every month through GeM tenders. The process is so simple now.", rating: 5, },
    { name: "Amit Sharma", business: "Sharma Engineering, Faridabad", text: "GST filing now takes just 10 minutes. The AI Accountant has been a game changer.", rating: 5, },
  ], []);

  const partners = useMemo(() => [
    { name: "Govt. of India", icon: Landmark }, { name: "State Bank of India", icon: Landmark }, { name: "GeM Portal", icon: Gem }, { name: "ONDC Network", icon: Globe }, { name: "Account Aggregator", icon: Banknote }, { name: "SIDBI", icon: Landmark },
  ], []);

  // --- NEW: Enhanced Animation Variants ---
  const titleAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };

  const wordAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  
  const slideUp = { 
    hidden: { y: 50, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }, 
  } as const;
  
  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, 
  } as const;
  
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }, }, } as const;

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white mt-[-80px] overflow-x-hidden">
        <div className="absolute top-0 left-0 h-full w-full">
            <div className={cn("absolute inset-0 h-full", "[background-size:40px_40px]", "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]")}/>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="relative z-10">
          
          <ContainerScrollAnimation
            titleComponent={
              <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                {/* --- FIX: Spotlight is now positioned in the top-left corner --- */}
                <Spotlight className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" fill="white" />
                
                {/* --- FIX: Headline now animates word-by-word --- */}
                <motion.h1
                  variants={titleAnimation}
                  className="text-5xl mt-20 md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 leading-tight"
                >
                  {"Unlock your Business Potential with".split(" ").map((word, i) => (
                    <motion.span key={i} variants={wordAnimation} className="inline-block mr-3">{word}</motion.span>
                  ))}
                  <br />
                  <motion.span variants={wordAnimation} className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-sky-400 to-sky-500">
                    EkVyapaar
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={slideUp}
                  className="mt-12 max-w-3xl text-xl text-slate-300"
                >
                  The all-in-one platform for MSMEs. Effortlessly manage your
                  finances, discover and engage new customers, and{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
                    Automate
                  </span>{" "}
                  your daily operations with powerful{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
                    AI-Powered Tools
                  </span>{" "}
                  designed to help your business grow faster and smarter.
                </motion.p>
                <motion.div
                  variants={slideUp}
                  className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-500 h-12 px-8 text-base w-full sm:w-auto" onClick={() => setShowLoginModal(true)}>
                    Login
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white w-full sm:w-auto">
                    <Link to="/#features">Explore Features</Link>
                  </Button>
                </motion.div>
              </motion.div>
            }
          >
            <img
              src={dashboardPreviewImage}
              alt="EkVyapaar Dashboard Preview"
              className="mx-auto rounded-2xl object-cover h-full w-full"
            />
          </ContainerScrollAnimation>
          
          <div className="container mx-auto px-4 space-y-56 md:space-y-64 pb-48 mt-20" id="features">
            {/* All other sections remain the same */}
            <section className="space-y-16">
              <SectionHeader
                pill="Core Features"
                title="Three Pillars of Your Growth"
                description="Finance, Marketplace, and Technology - a unified professional banking experience designed for MSMEs."
              />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Finance Hub", desc: "Loans, credit scoring, and subsidies.", features: ["48-hour loan approval", "AI credit scoring", "Auto subsidy finder"], image: financeHub, link: "/finance", buttonText: "Get Started" },
                  { title: "Marketplace", desc: "New customers, tenders, and B2B orders.", features: ["GeM tender matching", "B2B product store", "Service gigs platform"], image: marketplace, link: "/marketplace", buttonText: "Explore Market" },
                  { title: "Business Tools", desc: "GST, accounting, and ERP made simple.", features: ["Voice-enabled ERP", "AI accountant", "GST automation"], image: businessTools, link: "/tools", buttonText: "View Tools" },
                ].map((pillar, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <UICard className="h-full flex flex-col bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:border-sky-400 transition-all duration-300 overflow-hidden group">
                      <img src={pillar.image} alt={pillar.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"/>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-slate-100 mb-2">{pillar.title}</h3>
                        <p className="text-slate-400 mb-6 flex-grow">{pillar.desc}</p>
                        <div className="space-y-3 mb-6">
                          {pillar.features.map((feat, fi) => (<div key={fi} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400" /><span>{feat}</span></div>))}
                        </div>
                        <Button asChild className="w-full mt-auto bg-slate-700 hover:bg-slate-600"><Link to="/login">{pillar.buttonText}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                      </div>
                    </UICard>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section className="space-y-16">
              <SectionHeader pill="Our Process" title="A Smarter Way to Grow" description="Our entire journey is powered by SAETIP: a Smart API-Enabled Trustworthy Integrated Process that automates complexity."/>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
                {howItWorks.map((step) => (
                  <motion.div key={step.step} variants={fadeIn}>
                    <UICard className="h-full p-8 text-center bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:border-sky-400 transition-colors">
                      <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-slate-700"><step.icon className="h-10 w-10 text-sky-400" /></div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                      <p className="text-slate-400 mb-6">{step.description}</p>
                      <ul className="text-left space-y-3 text-slate-300">
                        {step.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" /><span>{feature}</span></li>))}
                      </ul>
                    </UICard>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section id="testimonials" className="space-y-16">
              <SectionHeader pill="Social Proof" title="Trusted by Thousands of MSMEs" description="Real stories from businesses in Delhi, Gurgaon, and Faridabad who have accelerated their growth with EkVyapaar."/>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <UICard className="h-full p-8 bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
                      <div className="flex items-center gap-1 mb-4">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400"/>))}</div>
                      <blockquote className="text-xl text-slate-300 italic mb-6">"{t.text}"</blockquote>
                      <div className="pt-4 border-t border-slate-700">
                        <div className="font-bold text-slate-100">{t.name}</div>
                        <div className="text-sm text-slate-400">{t.business}</div>
                      </div>
                    </UICard>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section className="space-y-16">
              <SectionHeader pill="Ecosystem" title="Our Trusted Partners & Integrations" description="Built on a foundation of India's robust digital public infrastructure and leading financial institutions."/>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                {partners.map((p, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                    <p.icon className="h-8 w-8" />
                    <span className="text-lg font-medium">{p.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <UICard className="bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-white/10 shadow-2xl backdrop-blur-lg p-16 md:p-24">
                  <div className="text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Ready to Transform Your Business?</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Join 50,000+ MSMEs who have already simplified their operations and accelerated their growth with EkVyapaar.</p>
                    <Button size="lg" asChild className="mt-12 bg-white text-slate-900 hover:bg-slate-200 h-14 px-10 text-lg font-bold">
                      <Link to="/register">Get Started for Free<ArrowRight className="ml-3 h-6 w-6" /></Link>
                    </Button>
                  </div>
                </UICard>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};