"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Shield,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

import marketplace from "@/assets/marketplace.jpg";
import businessTools from "@/assets/business-tools.jpg";
import dashboardPreviewImage from "@/assets/dashboard.png";
import { Spotlight } from "@/components/Spotlight";
import { LoginModal } from "./LoginModal";

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL ANIMATION COMPONENTS (Hero Section - Keeping As Is)
// ═══════════════════════════════════════════════════════════════════════════

const ContainerScrollAnimation = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
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
      <div className="py-20 md:py-40 w-full relative mt-20" style={{ perspective: "1000px" }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <AnimatedCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </AnimatedCard>
      </div>
    </div>
  );
};

const ScrollHeader = ({ translate, titleComponent }: any) => (
  <motion.div style={{ translateY: translate }} className="div max-w-5xl mx-auto text-center">
    {titleComponent}
  </motion.div>
);

const AnimatedCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#2a2a2a] p-2 md:p-6 bg-[#141414] rounded-[30px] shadow-2xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a] md:rounded-2xl md:p-4">
      {children}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS - New Style Matching Reference
// ═══════════════════════════════════════════════════════════════════════════

const SectionLabel = ({ children }: { children: string }) => (
  <span className="label-caps text-primary">{children}</span>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight gradient-text-warm">
    {children}
  </h2>
);

// ═══════════════════════════════════════════════════════════════════════════
// GLASS CARD COMPONENT - Matching Reference Style
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => (
  <div
    className={cn(
      "glass-card p-6 rounded-2xl",
      hover && "glass-card-hover card-glow",
      className
    )}
  >
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE CARD - Clean Style
// ═══════════════════════════════════════════════════════════════════════════

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, features, index }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard className="h-full">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-primary" />
        </div>

        {/* Content */}
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEP CARD
// ═══════════════════════════════════════════════════════════════════════════

interface ProcessCardProps {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ProcessCard = ({ icon: Icon, step, title, description, features, index }: ProcessCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <GlassCard className="h-full text-center">
        {/* Step indicator */}
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <ul className="text-left space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIAL CARD
// ═══════════════════════════════════════════════════════════════════════════

interface TestimonialCardProps {
  name: string;
  business: string;
  text: string;
  rating: number;
  index: number;
}

const TestimonialCard = ({ name, business, text, rating, index }: TestimonialCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg text-foreground/90 italic leading-relaxed flex-grow mb-6">
          "{text}"
        </blockquote>

        {/* Author */}
        <div className="pt-4 border-t border-white/10">
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-sm text-muted-foreground">{business}</div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Homepage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const features = useMemo(() => [
    {
      icon: Globe,
      title: "Marketplace",
      description: "Discover new customers, win tenders, and grow your B2B network.",
      features: ["GeM tender matching", "B2B product store", "Service gigs platform"],
    },
    {
      icon: Zap,
      title: "Business Tools",
      description: "GST, accounting, and ERP made simple with AI automation.",
      features: ["Voice-enabled ERP", "AI accountant", "GST automation"],
    },
    {
      icon: Shield,
      title: "Finance Hub",
      description: "Access credit, manage cash flow, and grow with trusted partners.",
      features: ["OCEN-powered lending", "Credit score insights", "Instant loan matching"],
    },
  ], []);

  const howItWorks = useMemo(() => [
    { step: "1", title: "Smart Onboarding", description: "Quickly register via Udyam, Aadhaar, or PAN with AI-powered onboarding.", icon: FilePenLine, features: ["Instant MSME verification", "Seamless e-KYC", "Secure process"] },
    { step: "2", title: "API-First Aggregation", description: "Auto-populate data from GSTN & Account Aggregator networks.", icon: Combine, features: ["No manual entry", "Government integration", "One secure form"] },
    { step: "3", title: "Instant Growth", description: "Become discoverable to lenders, buyers, and enterprise tools.", icon: Rocket, features: ["AI credit scoring", "Immediate access", "Full enablement"] },
  ], []);

  const testimonials = useMemo(() => [
    { name: "Rajesh Kumar", business: "Kumar Auto Parts, Mayapuri", text: "Got a ₹5 lakh loan through the govt scheme guidance. My business has grown 3x since then.", rating: 5 },
    { name: "Sunita Devi", business: "Devi Textiles, Gurgaon", text: "Getting ₹2 lakh orders every month through GeM tenders. The process is so simple now.", rating: 5 },
    { name: "Amit Sharma", business: "Sharma Engineering, Faridabad", text: "GST filing now takes just 10 minutes. The AI Accountant has been a game changer.", rating: 5 },
  ], []);

  const partners = useMemo(() => [
    { name: "Govt. of India", icon: Landmark },
    { name: "GeM Portal", icon: Gem },
    { name: "ONDC Network", icon: Globe },
    { name: "Account Aggregator", icon: Banknote },
  ], []);

  // Animation variants
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
  };

  return (
    <>
      <div id="home" className="min-h-screen w-full bg-background text-foreground mt-[-80px] overflow-x-hidden">
        <div className="absolute top-0 left-0 h-full w-full">
          <div className={cn("absolute inset-0 h-full", "[background-size:50px_50px]", "[background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]")} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
        </div>

        <div className="relative z-10">
          {/* ═══════════════════════════════════════════════════════════════
              HERO SECTION (Keeping As Is)
              ═══════════════════════════════════════════════════════════════ */}
          <ContainerScrollAnimation
            titleComponent={
              <motion.div initial="hidden" animate="visible" className="flex flex-col items-center text-center">
                <Spotlight className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" fill="rgba(14, 165, 233, 0.8)" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.h1
                  variants={titleAnimation}
                  className="text-5xl mt-20 md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400 leading-tight"
                >
                  {"Unlock your Business Potential with".split(" ").map((word, i) => (
                    <motion.span key={i} variants={wordAnimation} className="inline-block mr-3">{word}</motion.span>
                  ))}
                  <br />
                  <motion.span variants={wordAnimation} className="inline-block gradient-text-warm">
                    EkVyapaar
                  </motion.span>
                </motion.h1>

                <motion.p variants={slideUp} className="mt-12 max-w-3xl text-xl text-muted-foreground">
                  The all-in-one platform for Businesses. Effortlessly manage your
                  finances, discover customers, and{" "}
                  <span className="text-primary font-semibold">Automate</span>{" "}
                  daily operations with powerful{" "}
                  <span className="text-primary font-semibold">AI-Powered Tools</span>.
                </motion.p>

                <motion.div variants={slideUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="btn-premium h-12 px-8 text-base w-full sm:w-auto" onClick={() => setShowLoginModal(true)}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-glass h-12 px-8 text-base w-full sm:w-auto">
                    <Link to="/#features">Explore Features</Link>
                  </Button>
                </motion.div>
              </motion.div>
            }
          >
            <img src={dashboardPreviewImage} alt="EkVyapaar Dashboard Preview" className="mx-auto rounded-2xl object-cover h-full w-full" />
          </ContainerScrollAnimation>

          {/* ═══════════════════════════════════════════════════════════════
              FEATURES SECTION - New Clean Style
              ═══════════════════════════════════════════════════════════════ */}
          <div className="container mx-auto px-4 space-y-32 pb-32 mt-20" id="features">
            
            <section className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <SectionLabel>CORE FEATURES</SectionLabel>
                <SectionTitle>Pillars of Your Growth</SectionTitle>
                <p className="mt-4 text-lg text-muted-foreground">
                  Finance, Marketplace, and Technology — unified for MSMEs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <FeatureCard key={i} {...feature} index={i} />
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                PROCESS SECTION
                ═══════════════════════════════════════════════════════════════ */}
            <section className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <SectionLabel>OUR PROCESS</SectionLabel>
                <SectionTitle>A Smarter Way to Grow</SectionTitle>
                <p className="mt-4 text-lg text-muted-foreground">
                  Powered by SAETIP — Smart API-Enabled Trustworthy Integrated Process.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {howItWorks.map((step, i) => (
                  <ProcessCard key={i} {...step} index={i} />
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                TESTIMONIALS SECTION
                ═══════════════════════════════════════════════════════════════ */}
            <section id="testimonials" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <SectionLabel>TESTIMONIALS</SectionLabel>
                <SectionTitle>Trusted by Thousands</SectionTitle>
                <p className="mt-4 text-lg text-muted-foreground">
                  Real stories from businesses who accelerated growth with EkVyapaar.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard key={i} {...testimonial} index={i} />
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                PARTNERS SECTION
                ═══════════════════════════════════════════════════════════════ */}
            <section className="space-y-12">
              <div className="text-center">
                <SectionLabel>ECOSYSTEM</SectionLabel>
                <h3 className="font-display text-2xl font-semibold text-foreground mt-2">
                  Our Trusted Partners
                </h3>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-12">
                {partners.map((partner, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <partner.icon className="w-7 h-7" />
                    <span className="text-lg font-medium">{partner.name}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                CTA SECTION
                ═══════════════════════════════════════════════════════════════ */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="p-12 md:p-20 text-center border-primary/20">
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Ready to Transform
                    <br />
                    <span className="gradient-text-warm">Your Business?</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Join 50,000+ MSMEs who have simplified operations and accelerated growth.
                  </p>
                  <Button size="lg" asChild className="btn-premium h-14 px-10 text-lg font-semibold">
                    <Link to="/register">
                      Get Started for Free
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>
                  </Button>
                </GlassCard>
              </motion.div>
            </section>
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};