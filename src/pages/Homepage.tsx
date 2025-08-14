"use client";
// ✨ Added useState to the import
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Zap,
} from "lucide-react";

// Local asset imports
import financeHub from "@/assets/finance-hub.jpg";
import marketplace from "@/assets/marketplace.jpg";
import businessTools from "@/assets/business-tools.jpg";
import dashboardPreviewImage from "@/assets/dashboard.png";
import { Spotlight } from "@/components/Spotlight";
import { LoginModal } from "./LoginModal";// ✨ 1. Import the new modal

export const Homepage = () => {
  // ✨ State to control the modal's visibility
  const [showLoginModal, setShowLoginModal] = useState(false);

  const howItWorks = useMemo(
    () => [
      {
        step: "1",
        title: "Smart Onboarding",
        description:
          "Quickly register via Udyam, Aadhaar, or PAN with our AI-powered smart onboarding.",
        icon: FilePenLine,
        features: [
          "Instant MSME verification via Udyam API",
          "Seamless Aadhaar & PAN-based e-KYC",
          "Secure and trustworthy process",
        ],
      },
      {
        step: "2",
        title: "API-First Aggregation",
        description:
          "A single, dynamic form auto-populates data from GSTN & Account Aggregator networks.",
        icon: Combine,
        features: [
          "Eliminates manual data entry",
          "Integrates with government portals",
          "One secure form for all services",
        ],
      },
      {
        step: "3",
        title: "Instant Growth",
        description:
          "Instantly become discoverable to lenders (OCEN), buyers (ONDC), and enterprise tools.",
        icon: Rocket,
        features: [
          "AI-driven trustworthy credit scoring",
          "Immediate access to loans & orders",
          "Full platform-wide enablement",
        ],
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Rajesh Kumar",
        business: "Kumar Auto Parts, Mayapuri",
        text: "Got a ₹5 lakh loan in 48 hours. My business has grown 3x since then.",
        rating: 5,
      },
      {
        name: "Sunita Devi",
        business: "Devi Textiles, Gurgaon",
        text: "Getting ₹2 lakh orders every month through GeM tenders. The process is so simple now.",
        rating: 5,
      },
      {
        name: "Amit Sharma",
        business: "Sharma Engineering, Faridabad",
        text: "GST filing now takes just 10 minutes. The AI Accountant has been a game changer.",
        rating: 5,
      },
    ],
    []
  );

  const partners = useMemo(
    () => [
      { name: "Govt. of India", icon: Landmark },
      { name: "State Bank of India", icon: Landmark },
      { name: "GeM Portal", icon: Gem },
      { name: "ONDC Network", icon: Globe },
      { name: "Account Aggregator", icon: Banknote },
      { name: "SIDBI", icon: Landmark },
    ],
    []
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  } as const;

  return (
    // ✨ 2. Wrap everything in a React Fragment
    <>
      <div className="min-h-screen w-full bg-black text-white mt-[-80px] overflow-x-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 ">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23334155'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
              maskImage:
                "radial-gradient(circle 1000px at 50% 120%, black, transparent)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 ">
          {/* ATMOSPHERIC HERO SECTION */}
          <motion.section
            id="home" // ID for header navigation
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-20"
          >
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 leading-tight mt-28"
            >
              Unlock your Business Potential with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-400 to-sky-500">
                EkVyapaar
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mt-6 max-w-2xl text-xl text-slate-300"
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
              variants={fadeIn}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* ✨ 3. Corrected Login button (no 'asChild') */}
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-500 h-12 px-8 text-base w-full sm:w-auto"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>
              {/* ✨ 3. Restored "Explore Features" button */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white w-full sm:w-auto"
              >
                <Link to="/#features">Explore Features</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeIn}
              style={{ perspective: "2000px" }}
              className="mt-40 w-full max-w-6xl"
            >
              <div
                style={{ transform: "rotateX(15deg) rotateZ(-2deg)" }}
                className="relative rounded-2xl p-2 transition-transform duration-500 hover:scale-105"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-sky-500/40 via-sky-500/10 to-transparent rounded-full filter blur-3xl" />
                <div className="relative border border-sky-500/30 bg-slate-900/50 rounded-xl shadow-2xl shadow-sky-500/10">
                  <img
                    src={dashboardPreviewImage}
                    alt="EkVyapaar Dashboard Preview"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* --- ALL OTHER SECTIONS NOW FOLLOW --- */}
          <div className="space-y-48 pb-48" id="features">
            {/* Core Pillars Section */}
            <section>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-24"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold"
                >
                  Three Pillars of Your Growth
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto"
                >
                  Finance, Marketplace, and Technology - a unified professional
                  banking experience designed for MSMEs.
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: "Finance Hub",
                    desc: "Loans, credit scoring, and subsidies.",
                    features: [
                      "48-hour loan approval",
                      "AI credit scoring",
                      "Auto subsidy finder",
                    ],
                    image: financeHub,
                    link: "/finance",
                    buttonText: "Get Started",
                  },
                  {
                    title: "Marketplace",
                    desc: "New customers, tenders, and B2B orders.",
                    features: [
                      "GeM tender matching",
                      "B2B product store",
                      "Service gigs platform",
                    ],
                    image: marketplace,
                    link: "/marketplace",
                    buttonText: "Explore Market",
                  },
                  {
                    title: "Business Tools",
                    desc: "GST, accounting, and ERP made simple.",
                    features: [
                      "Voice-enabled ERP",
                      "AI accountant",
                      "GST automation",
                    ],
                    image: businessTools,
                    link: "/tools",
                    buttonText: "View Tools",
                  },
                ].map((pillar, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <Card className="h-full flex flex-col bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:border-sky-400 transition-all duration-300 overflow-hidden group">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-slate-100 mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-400 mb-6 flex-grow">
                          {pillar.desc}
                        </p>
                        <div className="space-y-3 mb-6">
                          {pillar.features.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          asChild
                          className="w-full mt-auto bg-slate-700 hover:bg-slate-600"
                        >
                          <Link to="/login">
                            {pillar.buttonText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* How It Works Section */}
            <section>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-24"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold"
                >
                  A Smarter Way to Grow
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto"
                >
                  Our entire journey is powered by{" "}
                  <strong className="font-semibold text-sky-400">SAETIP</strong>:
                  a<br />
                  <span className="inline-block mt-3">
                    <span className="font-semibold">S</span>mart{" "}
                    <span className="font-semibold">A</span>PI-Enabled{" "}
                    <span className="font-semibold">T</span>rustworthy{" "}
                    <span className="font-semibold">I</span>ntegrated{" "}
                    <span className="font-semibold">P</span>rocess.
                  </span>
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                {howItWorks.map((step) => (
                  <motion.div key={step.step} variants={fadeIn}>
                    <Card className="h-full p-8 text-center bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:border-sky-400 transition-colors">
                      <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-slate-700">
                        <step.icon className="h-10 w-10 text-sky-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 mb-6">{step.description}</p>
                      <ul className="text-left space-y-3 text-slate-300">
                        {step.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-24"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold"
                >
                  Trusted by Thousands of MSMEs
                </motion.h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                {testimonials.map((t, i) => (
                  <motion.div key={i} variants={fadeIn}>
                    <Card className="h-full p-8 bg-white/5 border-white/10 backdrop-blur-lg rounded-2xl shadow-lg">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg text-slate-300 italic mb-6">
                        "{t.text}"
                      </blockquote>
                      <div className="pt-4 border-t border-slate-700">
                        <div className="font-bold text-slate-100">{t.name}</div>
                        <div className="text-sm text-slate-400">{t.business}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Partners Section */}
            <section>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center mb-20"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl font-bold text-slate-200"
                >
                  Our Trusted Partners & Integrations
                </motion.h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
              >
                {partners.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <p.icon className="h-8 w-8" />
                    <span className="text-lg font-medium">{p.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Final CTA Section */}
            <section>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-white/10 shadow-2xl backdrop-blur-lg p-12 md:p-16">
                  <div className="text-center space-y-6">
                    <h2 className="text-4xl font-bold text-white">
                      Ready to Transform Your Business?
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                      Join 50,000+ MSMEs who have already simplified their
                      operations and accelerated their growth with EkVyapaar.
                    </p>
                    <Button
                      size="lg"
                      asChild
                      className="mt-12 bg-white text-slate-900 hover:bg-slate-200 h-14 px-10 text-lg font-bold"
                    >
                      <Link to="/register">
                        Get Started for Free
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
      
      {/* ✨ 4. Render the modal component */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};