import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, CheckCircle, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-image.jpg";
import financeHub from "@/assets/finance-hub.jpg";
import marketplace from "@/assets/marketplace.jpg";
import businessTools from "@/assets/business-tools.jpg";

// A reusable component to apply fade-in effect when visible
const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible to prevent re-triggering
          observer.unobserve(domRef.current);
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const currentRef = domRef.current; // Capture current ref for cleanup
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${delay}ms` }} // Apply delay if provided
    >
      {children}
    </div>
  );
};

export const Homepage = () => {
  const { t } = useLanguage();
  
  const stats = [
    { number: "50,000+", label: t("registeredMSMEs"), icon: Users },
    { number: "₹500 Cr+", label: t("loansAdvanced"), icon: TrendingUp },
    { number: "25,000+", label: t("successfulOrders"), icon: Shield },
    { number: "95%", label: t("customerSatisfaction"), icon: Star },
  ];

  const howItWorks = [
    {
      step: "1",
      title: t("smartOnboardingTitle"),
      description: t("smartOnboardingDescription"),
      icon: "📝",
      features: [
        t("instantMSMEVerification"),
        t("seamlessKYC"),
        t("secureProcess")
      ]
    },
    {
      step: "2",
      title: t("apiAggregationTitle"),
      description: t("apiAggregationDescription"),
      icon: "📋",
      features: [
        t("eliminatesManual"),
        t("integratesGovernment"),
        t("oneSecureForm")
      ]
    },
    {
      step: "3",
      title: t("instantGrowthTitle"),
      description: t("instantGrowthDescription"),
      icon: "📈",
      features: [
        t("aiCreditScoring2"),
        t("immediateAccess"),
        t("fullPlatformEnablement")
      ]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar Auto Parts, Mayapuri",
      text: "Got ₹5 lakh loan in 48 hours through EkVyapaar. My business has grown 3x since then.",
      rating: 5
    },
    {
      name: "Sunita Devi",
      business: "Devi Textiles, Gurgaon",
      text: "Getting ₹2 lakh orders every month through GeM tenders. The process is so simple now.",
      rating: 5
    },
    {
      name: "Amit Sharma",
      business: "Sharma Engineering, Faridabad",
      text: "GST filing now takes just 10 minutes. The AI Accountant has been a game changer.",
      rating: 5
    }
  ];

  const partners = [
    { name: "Government of Delhi", logo: "🏛️" },
    { name: "State Bank of India", logo: "🏦" },
    { name: "Punjab National Bank", logo: "🏛️" },
    { name: "GeM Portal", logo: "💎" },
    { name: "NSDC", logo: "🎓" },
    { name: "ONDC Network", logo: "🌐" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8 animate-fade-in">
              <div>
                <Badge className="bg-white/20 text-white mb-6 text-sm px-6 py-3 rounded-full font-medium backdrop-blur-sm border-white/20">
                  🏦 {t("msmesBankingPlatform")}
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                  {t("heroTitle")}
                </h1>
                <p className="text-xl lg:text-2xl mb-10 text-white/95 leading-relaxed">
                  {t("heroSubtitle")}
                  <br />
                  <strong className="font-semibold">{t("heroSubtitleStrong")}</strong>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button variant="hero" size="lg" className="rounded-lg shadow-lg" asChild>
                  <Link to="/finance">
                    {t("startFreeToday")}
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm rounded-lg">
                  {t("watchDemo")}
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/15 transition-all duration-200 hover:scale-105">
                    <stat.icon className="h-8 w-8 text-white/90 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-2xl"></div>
                <img
                  src={heroImage}
                  alt="Indian MSME workers in modern workshop"
                  className="relative rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <FadeInWhenVisible>
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("threePillarsTitle")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                {t("threePillarsSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card rounded-2xl overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 z-10"></div>
                  <img src={financeHub} alt="Finance Hub" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">💰 {t("financeHubTitle")}</h3>
                  <p className="text-muted-foreground mb-6">{t("financeHubDescription")}</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /> <span className="text-sm">{t("loanApproval")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /> <span className="text-sm">{t("aiCreditScoring")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /> <span className="text-sm">{t("autoSubsidy")}</span></div>
                  </div>
                  <Button variant="default" asChild className="w-full rounded-lg"><Link to="/finance">{t("getStarted")} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card rounded-2xl overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 z-10"></div>
                  <img src={marketplace} alt="Marketplace" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">🛒 {t("marketplaceTitle")}</h3>
                  <p className="text-muted-foreground mb-6">{t("marketplaceDescription")}</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("gemTenderMatching")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("b2bMarketplace")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("serviceGigs")}</span></div>
                  </div>
                  <Button variant="accent" asChild className="w-full rounded-lg"><Link to="/marketplace">{t("exploreMarket")} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card rounded-2xl overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 z-10"></div>
                  <img src={businessTools} alt="Business Tools" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">🛠️ {t("businessToolsTitle")}</h3>
                  <p className="text-muted-foreground mb-6">{t("businessToolsDescription")}</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("voiceEnabledERP")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("aiAccountant")}</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-success" /><span className="text-sm">{t("gstAutomation")}</span></div>
                  </div>
                  <Button variant="default" asChild className="w-full rounded-lg"><Link to="/tools">{t("viewTools")} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
      
      {/* [IMPROVED] How It Works Section */}
      <FadeInWhenVisible>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">{t("howItWorksTitle")}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("saetipDescription")}
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div aria-hidden="true" className="absolute top-10 left-0 w-full h-0.5 bg-muted hidden md:block" style={{ zIndex: 0 }}>
                <svg width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="0" strokeWidth="2" strokeDasharray="8 8" className="stroke-muted-foreground/30" /></svg>
              </div>

              <div className="relative z-10 grid md:grid-cols-3 gap-8 lg:gap-12">
                {howItWorks.map((step) => (
                  <Card key={step.step} className="flex flex-col text-center p-6 sm:p-8 bg-card border shadow-card rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-4xl">{step.icon}</span>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-9 h-9 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm border-4 border-card">
                        {step.step}
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                      <p className="text-muted-foreground mb-6 flex-grow">{step.description}</p>
                      
                      <ul className="text-left space-y-3 text-muted-foreground mt-auto">
                        {step.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Testimonials */}
      <FadeInWhenVisible>
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">{t("successStoriesTitle")}</h2>
              <p className="text-xl text-muted-foreground">{t("trustedByThousands")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 shadow-card">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />))}
                    </div>
                    <blockquote className="text-lg italic text-muted-foreground">"{testimonial.text}"</blockquote>
                    <div className="pt-4 border-t">
                      <div className="font-bold text-primary">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Partners */}
      <FadeInWhenVisible>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">{t("trustedPartnersTitle")}</h2>
              <p className="text-muted-foreground">{t("workingWithIndia")}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
              {partners.map((partner, index) => (
                <div key={index} className="text-center p-6 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors duration-200">
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <div className="text-sm font-medium text-muted-foreground">{partner.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* CTA Section */}
      <FadeInWhenVisible>
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <FadeInWhenVisible delay={0}>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t("readyToTransformTitle")}</h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={150}>
                <p className="text-xl mb-8 text-white/90">{t("joinThousands")}</p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90 rounded-lg shadow-lg" asChild>
                    <Link to="/finance">{t("ctaStartFree")} <ArrowRight className="ml-3 h-6 w-6" /></Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white/10 rounded-lg">
                    {t("ctaBookDemo")}
                  </Button>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  );
};