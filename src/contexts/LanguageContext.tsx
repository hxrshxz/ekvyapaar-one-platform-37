import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    financeHub: "Finance Hub",
    marketplace: "Marketplace",
    businessTools: "Business Tools",
    support: "Support",
    dashboard: "Dashboard",
    login: "Login",
    
    // Hero Section
    heroTitle: "Business Made Simple",
    heroSubtitle: "Loans, Orders, GST, and all business tools in one platform.",
    heroSubtitleStrong: "One Number, One Dashboard, Zero Complexity.",
    startFreeToday: "Start Free Today",
    watchDemo: "Watch Demo",
    msmesBankingPlatform: "India's First MSME Banking Platform",
    
    // Stats
    registeredMSMEs: "Registered MSMEs",
    loansAdvanced: "Loans Advanced",
    successfulOrders: "Successful Orders",
    customerSatisfaction: "Customer Satisfaction",
    
    // Core Pillars
    threePillarsTitle: "Three Pillars of Your Business Growth",
    threePillarsSubtitle: "Finance, Marketplace, and Technology - all in one place with professional banking experience",
    
    // Finance Hub
    financeHubTitle: "Finance Hub",
    financeHubDescription: "Loans, credit scoring, and subsidies with professional banking experience",
    loanApproval: "48-hour loan approval",
    aiCreditScoring: "AI credit scoring",
    autoSubsidy: "Auto subsidy finder",
    getStarted: "Get Started",
    
    // Marketplace
    marketplaceTitle: "Marketplace",
    marketplaceDescription: "New customers, tenders, and B2B orders through enterprise marketplace",
    gemTenderMatching: "GeM tender matching",
    b2bMarketplace: "B2B marketplace",
    serviceGigs: "Service gigs platform",
    exploreMarket: "Explore Market",
    
    // Business Tools
    businessToolsTitle: "Business Tools",
    businessToolsDescription: "GST, accounting, and ERP - enterprise grade tools made simple",
    voiceEnabledERP: "Voice-enabled ERP",
    aiAccountant: "AI accountant",
    gstAutomation: "GST automation",
    viewTools: "View Tools",
    
    // How It Works
    howItWorksTitle: "How It Works",
    saetipDescription: "Our entire journey is powered by SAETIP: a Smart API-Enabled Trustworthy Integrated Process.",
    
    // Steps
    smartOnboardingTitle: "Smart Onboarding",
    smartOnboardingDescription: "Quickly register via Udyam, Aadhaar, or PAN with our AI-powered smart onboarding.",
    instantMSMEVerification: "Instant MSME verification via Udyam API",
    seamlessKYC: "Seamless Aadhaar & PAN-based e-KYC",
    secureProcess: "Secure and trustworthy process",
    
    apiAggregationTitle: "API-First Aggregation",
    apiAggregationDescription: "A single, dynamic form auto-populates data from GSTN & Account Aggregator networks.",
    eliminatesManual: "Eliminates manual data entry",
    integratesGovernment: "Integrates with government portals",
    oneSecureForm: "One secure form for all services",
    
    instantGrowthTitle: "Instant Growth",
    instantGrowthDescription: "Instantly become discoverable to lenders (OCEN), buyers (ONDC), and enterprise tools.",
    aiCreditScoring2: "AI-driven trustworthy credit scoring",
    immediateAccess: "Immediate access to loans & orders",
    fullPlatformEnablement: "Full platform-wide enablement",
    
    // Success Stories
    successStoriesTitle: "Success Stories",
    trustedByThousands: "Trusted by thousands of businesses",
    
    // Partners
    trustedPartnersTitle: "Trusted Partners",
    workingWithIndia: "Working with India's leading institutions",
    
    // CTA
    readyToTransformTitle: "Ready to Transform Your Business?",
    joinThousands: "Join thousands of MSMEs already growing with EkVyapaar",
    ctaStartFree: "Start Free Today",
    ctaBookDemo: "Book a Demo",
    
    // Language
    language: "Language",
    english: "English",
    hindi: "हिंदी"
  },
  hi: {
    // Navigation
    home: "होम",
    financeHub: "वित्त केंद्र",
    marketplace: "बाज़ार",
    businessTools: "व्यावसायिक उपकरण",
    support: "सहायता",
    dashboard: "डैशबोर्ड",
    login: "लॉगिन",
    
    // Hero Section
    heroTitle: "व्यवसाय आसान बनाया",
    heroSubtitle: "ऋण, ऑर्डर, जीएसटी, और सभी व्यावसायिक उपकरण एक ही प्लेटफॉर्म में।",
    heroSubtitleStrong: "एक नंबर, एक डैशबोर्ड, शून्य जटिलता।",
    startFreeToday: "आज मुफ्त शुरू करें",
    watchDemo: "डेमो देखें",
    msmesBankingPlatform: "भारत का पहला MSME बैंकिंग प्लेटफॉर्म",
    
    // Stats
    registeredMSMEs: "पंजीकृत MSMEs",
    loansAdvanced: "ऋण वितरित",
    successfulOrders: "सफल ऑर्डर",
    customerSatisfaction: "ग्राहक संतुष्टि",
    
    // Core Pillars
    threePillarsTitle: "आपके व्यावसायिक विकास के तीन स्तंभ",
    threePillarsSubtitle: "वित्त, बाज़ार, और तकनीक - सब एक जगह पेशेवर बैंकिंग अनुभव के साथ",
    
    // Finance Hub
    financeHubTitle: "वित्त केंद्र",
    financeHubDescription: "पेशेवर बैंकिंग अनुभव के साथ ऋण, क्रेडिट स्कोरिंग, और सब्सिडी",
    loanApproval: "48 घंटे में ऋण स्वीकृति",
    aiCreditScoring: "AI क्रेडिट स्कोरिंग",
    autoSubsidy: "ऑटो सब्सिडी खोजक",
    getStarted: "शुरू करें",
    
    // Marketplace
    marketplaceTitle: "बाज़ार",
    marketplaceDescription: "एंटरप्राइज मार्केटप्लेस के माध्यम से नए ग्राहक, टेंडर, और B2B ऑर्डर",
    gemTenderMatching: "GeM टेंडर मैचिंग",
    b2bMarketplace: "B2B मार्केटप्लेस",
    serviceGigs: "सेवा गिग्स प्लेटफॉर्म",
    exploreMarket: "बाज़ार एक्सप्लोर करें",
    
    // Business Tools
    businessToolsTitle: "व्यावसायिक उपकरण",
    businessToolsDescription: "जीएसटी, अकाउंटिंग, और ERP - एंटरप्राइज ग्रेड उपकरण आसान बनाए गए",
    voiceEnabledERP: "वॉयस-सक्षम ERP",
    aiAccountant: "AI अकाउंटेंट",
    gstAutomation: "जीएसटी ऑटोमेशन",
    viewTools: "उपकरण देखें",
    
    // How It Works
    howItWorksTitle: "यह कैसे काम करता है",
    saetipDescription: "हमारी पूरी यात्रा SAETIP द्वारा संचालित है: एक स्मार्ट API-सक्षम भरोसेमंद एकीकृत प्रक्रिया।",
    
    // Steps
    smartOnboardingTitle: "स्मार्ट ऑनबोर्डिंग",
    smartOnboardingDescription: "हमारे AI-संचालित स्मार्ट ऑनबोर्डिंग के साथ उद्यम, आधार, या PAN के माध्यम से तुरंत रजिस्टर करें।",
    instantMSMEVerification: "उद्यम API के माध्यम से तत्काल MSME सत्यापन",
    seamlessKYC: "निर्बाध आधार और PAN-आधारित e-KYC",
    secureProcess: "सुरक्षित और भरोसेमंद प्रक्रिया",
    
    apiAggregationTitle: "API-प्रथम एकत्रीकरण",
    apiAggregationDescription: "एक एकल, गतिशील फॉर्म GSTN और खाता एग्रीगेटर नेटवर्क से डेटा को स्वतः भरता है।",
    eliminatesManual: "मैन्युअल डेटा एंट्री को समाप्त करता है",
    integratesGovernment: "सरकारी पोर्टल के साथ एकीकृत",
    oneSecureForm: "सभी सेवाओं के लिए एक सुरक्षित फॉर्म",
    
    instantGrowthTitle: "तत्काल विकास",
    instantGrowthDescription: "तुरंत ऋणदाताओं (OCEN), खरीदारों (ONDC), और एंटरप्राइज उपकरणों के लिए खोजने योग्य बनें।",
    aiCreditScoring2: "AI-संचालित भरोसेमंद क्रेडिट स्कोरिंग",
    immediateAccess: "ऋण और ऑर्डर तक तत्काल पहुंच",
    fullPlatformEnablement: "पूर्ण प्लेटफॉर्म-व्यापी सक्रियता",
    
    // Success Stories
    successStoriesTitle: "सफलता की कहानियां",
    trustedByThousands: "हजारों व्यवसायों द्वारा भरोसेमंद",
    
    // Partners
    trustedPartnersTitle: "भरोसेमंद भागीदार",
    workingWithIndia: "भारत की अग्रणी संस्थानों के साथ काम करना",
    
    // CTA
    readyToTransformTitle: "अपने व्यवसाय को बदलने के लिए तैयार हैं?",
    joinThousands: "EkVyapaar के साथ पहले से बढ़ते हजारों MSMEs में शामिल हों",
    ctaStartFree: "आज मुफ्त शुरू करें",
    ctaBookDemo: "डेमो बुक करें",
    
    // Language
    language: "भाषा",
    english: "English",
    hindi: "हिंदी"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}