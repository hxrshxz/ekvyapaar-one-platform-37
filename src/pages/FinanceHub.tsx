"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle, ArrowRight, Sparkles, Scale, Search, X, ShieldCheck, Lightbulb, Loader2, Handshake, Landmark, FileText, Download
} from "lucide-react";

// --- HELPER COMPONENTS ---
const AnimatedNumber = ({ value, isInteger = false }: { value: number; isInteger?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value || 0, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Number(latest)),
    });
    return () => controls.stop();
  }, [value]);

  const formatOptions = isInteger
    ? { maximumFractionDigits: 0 }
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return <span>{displayValue.toLocaleString('en-IN', formatOptions)}</span>;
};

const CircularProgress = ({ score }: { score: number }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const scorePercentage = (score - 300) / (900 - 300);
    const offset = circumference - scorePercentage * circumference;

    const { colorClass, strokeColor } = useMemo(() => {
        if (score >= 750) return { colorClass: "text-green-500", strokeColor: "#22c55e" };
        if (score >= 700) return { colorClass: "text-yellow-500", strokeColor: "#eab308" };
        if (score >= 650) return { colorClass: "text-orange-500", strokeColor: "#f97316" };
        return { colorClass: "text-red-500", strokeColor: "#ef4444" };
    }, [score]);

    return (
        <div className="relative flex items-center justify-center">
            <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
                <circle stroke="#e2e8f0" fill="transparent" strokeWidth="10" r={radius} cx="75" cy="75" />
                <motion.circle
                    stroke={strokeColor} fill="transparent" strokeWidth="10" strokeLinecap="round" r={radius} cx="75" cy="75"
                    initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }} strokeDasharray={`${circumference} ${circumference}`}
                />
            </svg>
            <div className={`absolute flex flex-col items-center justify-center ${colorClass}`}>
                <span className="text-4xl font-bold"><AnimatedNumber value={score} isInteger={true} /></span>
                <span className="text-sm font-medium text-slate-500">CIBIL SCORE</span>
            </div>
        </div>
    );
};

// ===================================================================================
// --- DIGITAL LENDING MODULE & MOCK APIs ---
// ===================================================================================

const mockNbfcPartners = [
  { id: 'nbfc1', name: 'HDFC Bank', logo: Landmark, interestRate: "11.90% - 21.35%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-sky-500" },
  { id: 'nbfc2', name: 'Lendingkart', logo: Handshake, interestRate: "15.00% - 27.00%", tenure: "6-36 Months", maxAmount: "₹50,00,000", color: "text-green-500" },
  { id: 'nbfc3', name: 'Bajaj Finserv', logo: Sparkles, interestRate: "9.75% - 25.00%", tenure: "12-60 Months", maxAmount: "₹80,00,000", color: "text-purple-500" },
  { id: 'nbfc4', name: 'IndusInd Bank', logo: Landmark, interestRate: "13.00% - 22.00%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-sky-500" },
  { id: 'nbfc5', name: 'Aditya Birla Capital', logo: Handshake, interestRate: "14.00% - 24.00%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-green-500" },
  { id: 'nbfc6', name: 'Ziploan', logo: Sparkles, interestRate: "18.00% - 28.00%", tenure: "12-36 Months", maxAmount: "₹7,50,000", color: "text-purple-500" },
];
const mockKycApi = async (aadhaar: string, pan: string) => { await new Promise(r => setTimeout(r, 1500)); if (aadhaar === '123412341234' && pan) { return { success: true, name: 'Demo User', dob: '1990-01-01', address: '123, Business Lane, New Delhi' }; } return { success: false, error: 'Aadhaar OTP verification failed. Please check the number.' }; };
const mockCibilApi = async (pan: string) => { await new Promise(r => setTimeout(r, 1000)); return Math.floor(Math.random() * 201) + 650; };
const mockLoanSubmissionApi = async (data: any) => { await new Promise(r => setTimeout(r, 2000)); return { success: true, applicationId: `EKV${Math.floor(Math.random() * 90000) + 10000}` }; };

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;

const DigitalLendingModule = ({ glassCardStyle }: { glassCardStyle: string }) => {
    const [step, setStep] = useState(0);
    const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
    const [formData, setFormData] = useState({ businessName: '', gst: '', annualTurnover: '' });
    const [kycData, setKycData] = useState({ aadhaar: '', pan: '' });
    const [kycResult, setKycResult] = useState<any | null>(null);
    const [cibilScore, setCibilScore] = useState<number | null>(null);
    const [kfs, setKfs] = useState<any | null>(null);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const steps = ["Loan Products", "Your Details", "Digital KYC", "Review & Confirm", "Application Sent"];
    const handleSelectProduct = (product: any) => { setSelectedLoan(product); setStep(1); };
    const handleFormSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep(2); };

    const handleKycSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const kycResponse = await mockKycApi(kycData.aadhaar, kycData.pan);
        if (!kycResponse.success) {
            setError(kycResponse.error);
            setIsLoading(false);
            return;
        }
        setKycResult(kycResponse);

        const cibil = await mockCibilApi(kycData.pan);
        setCibilScore(cibil);

        const loanAmount = 500000;
        const interest = loanAmount * 0.14;
        const processingFee = loanAmount * 0.02;
        setKfs({ loanAmount, interestRate: "14% p.a.", tenure: "24 Months", processingFee, totalInterest: interest, totalPayable: loanAmount + interest + processingFee });

        setIsLoading(false);
        setStep(3);
    };
    
    const handleFinalSubmission = async () => {
        setIsLoading(true);
        const applicationData = { ...formData, ...kycResult, cibilScore, loanDetails: kfs, partner: selectedLoan };
        const submissionResponse = await mockLoanSubmissionApi(applicationData);
        if(submissionResponse.success) {
            setApplicationId(submissionResponse.applicationId);
            setStep(4);
        } else {
            setError("Failed to submit application. Please try again.");
        }
        setIsLoading(false);
    };

    const renderStepContent = () => {
        switch(step) {
            case 0: return (
                <motion.div initial="hidden" animate="visible" variants={{hidden: {}, visible: {transition: {staggerChildren: 0.05}}}} className="grid md:grid-cols-3 gap-6">
                    {mockNbfcPartners.map(p => (
                       <motion.div key={p.id} variants={{hidden: {opacity:0, y:20}, visible: {opacity:1, y:0}}}>
                         <Card className={`text-center hover:border-sky-400/80 h-full flex flex-col ${glassCardStyle}`}>
                            <CardHeader><p.logo className={`mx-auto h-10 w-10 mb-2 ${p.color}`} /><CardTitle className="text-slate-800">{p.name}</CardTitle></CardHeader>
                            <CardContent className="space-y-4 flex flex-col flex-grow">
                                <div className="flex-grow space-y-4">
                                  <div><p className="text-slate-500 text-sm">Interest Rate</p><p className="font-semibold text-slate-700">{p.interestRate}</p></div>
                                  <div><p className="text-slate-500 text-sm">Max. Loan Amount</p><p className="font-semibold text-slate-700">{p.maxAmount}</p></div>
                                </div>
                                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={() => handleSelectProduct(p)}>Apply Now</Button>
                            </CardContent>
                        </Card>
                       </motion.div>
                    ))}
                </motion.div>
            );
            case 1:
            case 2:
            case 3:
            case 4:
                return (
                    <Card className={`max-w-2xl mx-auto p-6 md:p-8 ${glassCardStyle}`}>
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} exit={{opacity:0, x: -20}}>
                                {step === 1 && (
                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        <h3 className="text-xl font-semibold text-center text-slate-800">Tell us about your business</h3>
                                        <div><Label htmlFor="businessName">Business Name</Label><Input id="businessName" required className="bg-white/70 border-slate-300 mt-1" /></div>
                                        <div><Label htmlFor="gst">GST Number</Label><Input id="gst" required className="bg-white/70 border-slate-300 mt-1" /></div>
                                        <div><Label htmlFor="turnover">Annual Turnover (₹)</Label><Input id="turnover" type="number" required className="bg-white/70 border-slate-300 mt-1" /></div>
                                        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Proceed to KYC</Button>
                                    </form>
                                )}
                                {step === 2 && (
                                    <form onSubmit={handleKycSubmit} className="space-y-4">
                                        <h3 className="text-xl font-semibold text-center text-slate-800">Digital KYC Verification</h3>
                                        <p className="text-sm text-center text-slate-500">For demo, use Aadhaar: <strong className="text-sky-600">123412341234</strong> and any PAN.</p>
                                        <div><Label htmlFor="aadhaar">Aadhaar Number</Label><Input id="aadhaar" value={kycData.aadhaar} onChange={e => setKycData({...kycData, aadhaar: e.target.value})} maxLength={12} required className="bg-white/70 border-slate-300 mt-1" /></div>
                                        <div><Label htmlFor="pan">PAN Number</Label><Input id="pan" value={kycData.pan} onChange={e => setKycData({...kycData, pan: e.target.value})} maxLength={10} required className="bg-white/70 border-slate-300 mt-1" /></div>
                                        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Verify via OTP"}</Button>
                                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                    </form>
                                )}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-center text-slate-800">Key Fact Statement (KFS)</h3>
                                        <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 space-y-2 text-slate-800">
                                            <div className="flex justify-between"><span className="text-slate-500">Lender:</span><span className="font-semibold">{selectedLoan.name}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">Loan Amount:</span><span className="font-semibold">₹{kfs.loanAmount.toLocaleString('en-IN')}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">Interest Rate:</span><span className="font-semibold">{kfs.interestRate}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">Processing Fee:</span><span className="font-semibold">₹{kfs.processingFee.toLocaleString('en-IN')}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">Total Interest Payable:</span><span className="font-semibold text-red-500">₹{kfs.totalInterest.toLocaleString('en-IN')}</span></div>
                                            <div className="flex justify-between text-lg"><span className="text-slate-500">Total Amount Payable:</span><span className="font-bold text-green-600">₹{kfs.totalPayable.toLocaleString('en-IN')}</span></div>
                                        </div>
                                        <div className="text-center"><Button variant="outline" onClick={() => alert("This would trigger a PDF download of the KFS.")}><Download className="mr-2 h-4 w-4"/>Download KFS</Button></div>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-500 mb-2">Funds disbursed directly to your account from {selectedLoan.name}. EkVyapaar is an LSP and does not hold funds.</p>
                                            <Button onClick={handleFinalSubmission} className="w-full max-w-sm bg-green-600 hover:bg-green-500 text-white" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin"/> : "Accept & Submit"}</Button>
                                        </div>
                                    </div>
                                )}
                                {step === 4 && (
                                    <div className="text-center py-4">
                                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                        <h3 className="text-2xl font-bold text-slate-800">Application Sent!</h3>
                                        <p className="text-slate-600 mt-2">Your application has been submitted to {selectedLoan.name}.</p>
                                        <p className="text-slate-500 mt-1">Application ID: <span className="font-mono text-sky-600">{applicationId}</span></p>
                                        <p className="text-sm text-slate-500 mt-4">You will receive an email/SMS notification shortly.</p>
                                        <Button onClick={() => {setStep(0); setSelectedLoan(null);}} className="mt-6">Apply for Another Loan</Button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </Card>
                );
            default: return null;
        }
    };

    return (
        <section className="py-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-slate-900">Digital Loans from 25+ Partners</motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">Get instant, pre-approved offers with minimal documentation.</motion.p>
            </motion.div>
            {renderStepContent()}
        </section>
    );
};


export const FinanceHub = () => {
    const [cibilFormData, setCibilFormData] = useState({ name: '', pan: '', dob: '', mobile: '' });
    const [consentGiven, setConsentGiven] = useState(false);
    const [cibilScore, setCibilScore] = useState<number | null>(null);
    const [isCibilLoading, setIsCibilLoading] = useState(false);
    const [cibilAnalysis, setCibilAnalysis] = useState<any | null>(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');

    const [quizAnswers, setQuizAnswers] = useState({ age: 'all', need: 'all' });
    const [filteredSchemes, setFilteredSchemes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [compareList, setCompareList] = useState<string[]>([]);
    
    // A consistent glassmorphism style for all cards
    const glassCardStyle = "bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl";

    const governmentSchemes = useMemo(() => [
        { name: "Credit Guarantee Fund Trust (CGTMSE)", category: "Credit Support", purpose: "Provides collateral-free credit up to ₹5 Crore to new and existing Micro and Small Enterprises.", features: ["Collateral-free loans", "Up to ₹5 Crore coverage", "Guarantee for lenders"], link: "https://www.cgtmse.in", color: "bg-blue-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'] },
        { name: "Prime Minister’s Employment Generation (PMEGP)", category: "Credit Support", purpose: "Offers credit-linked subsidies for setting up new micro-enterprises in both rural and urban areas.", features: ["Credit-linked subsidy", "Promotes self-employment", "For new enterprises"], link: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp", color: "bg-green-500", tags: ['new_business', 'subsidy', 'all'] },
        { name: "MUDRA Loans (under PMMY)", category: "Credit Support", purpose: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.", features: ["Loans up to ₹10 Lakh", "Three loan categories (Shishu, Kishore, Tarun)", "No collateral needed"], link: "https://www.mudra.org.in", color: "bg-orange-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'] },
        { name: "Stand-Up India Scheme", category: "Credit Support", purpose: "Facilitates bank loans between ₹10 lakh and ₹1 crore to SC/ST and women entrepreneurs.", features: ["For SC/ST & Women", "Loan: ₹10 Lakh - ₹1 Crore", "Supports greenfield enterprises"], link: "https://www.standupmitra.in", color: "bg-purple-500", tags: ['new_business', 'women_sc_st', 'all'] },
        { name: "SIDBI Make in India Loan (SMILE)", category: "Credit Support", purpose: "Offers soft loans to MSMEs for expansion, supporting the 'Make in India' initiative.", features: ["Soft loan terms", "Focus on 'Make in India'", "For expansion & modernization"], link: "https://www.sidbi.in/en/smile", color: "bg-rose-500", tags: ['existing_business', 'new_business', 'make_in_india', 'all'] },
        { name: "Startup India Seed Fund Scheme (SISFS)", category: "Funding", purpose: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.", features: ["Up to ₹20 Lakhs as grant", "Up to ₹50 Lakhs via incubators", "For DPIIT-recognized startups"], link: "https://seedfund.startupindia.gov.in", color: "bg-teal-500", tags: ['new_business', 'funding', 'all'] },
        { name: "National Small Industries Corporation (NSIC) Subsidy", category: "Support Services", purpose: "Aids MSMEs with raw material procurement, marketing support, and credit rating assistance at subsidized rates.", features: ["Raw material assistance", "Marketing support", "Subsidized services"], link: "http://www.nsic.co.in", color: "bg-cyan-500", tags: ['existing_business', 'support', 'all'] },
        { name: "Interest Subvention Scheme for MSMEs", category: "Interest Relief", purpose: "Provides a 2% interest subvention on fresh or incremental loans to all GST-registered MSMEs.", features: ["2% Interest relief", "For GST-registered MSMEs", "On loans up to ₹1 Crore"], link: "https://sidbi.in/en/interest-subvention-scheme", color: "bg-amber-500", tags: ['existing_business', 'interest_relief', 'all'] },
        { name: "Credit Linked Capital Subsidy Scheme (CLCSS)", category: "Technology Upgradation", purpose: "Facilitates technology upgradation by providing a 15% upfront capital subsidy to MSMEs.", features: ["15% upfront capital subsidy", "For technology modernization", "Max subsidy of ₹15 Lakh"], link: "https://clcss.msme.gov.in", color: "bg-lime-500", tags: ['existing_business', 'technology', 'subsidy', 'all'] },
        { name: "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)", category: "Cluster Development", purpose: "Organizes traditional industries and artisans into clusters to make them competitive and provide support for long-term sustainability.", features: ["Cluster-based development", "Supports artisans & traditional industries", "Financial support up to ₹5 Crore"], link: "https://sfurti.msme.gov.in", color: "bg-indigo-500", tags: ['existing_business', 'artisans', 'all'] },
        { name: "Atmanirbhar Bharat Abhiyan (MSME Package)", category: "Credit Support", purpose: "Emergency credit line guarantee scheme (ECLGS) providing collateral-free automatic loans for businesses to meet operational liabilities.", features: ["Emergency credit line", "100% guarantee coverage", "Collateral-free automatic loan"], link: "https://www.eclgs.com", color: "bg-fuchsia-500", tags: ['existing_business', 'collateral_free', 'all'] },
    ], []);

    const getCIBILScore = async (formData: any) => { await new Promise(r => setTimeout(r, 2000)); return Math.floor(Math.random() * 601) + 300; };
    const getScoreAnalysis = (score: number) => {
        if (score >= 750) return { chance: "Very High", remarks: "Best rates, quick approval.", tips: ["Maintain timely payments.", "Keep credit utilization below 30%."], colorClass: "text-green-500", badgeClass: "bg-green-100 text-green-700 border-green-200"};
        if (score >= 700) return { chance: "Good", remarks: "Loan possible at slightly higher rates.", tips: ["Pay all bills on time.", "Avoid multiple new loan applications."], colorClass: "text-yellow-500", badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200"};
        return { chance: "Moderate", remarks: "Approval possible with higher rates.", tips: ["Reduce outstanding debt.", "Check your report for errors."], colorClass: "text-orange-500", badgeClass: "bg-orange-100 text-orange-700 border-orange-200"};
    };
    const handleGetOtp = (e: React.FormEvent) => { e.preventDefault(); setShowOtpModal(true); };
    const handleVerifyOtpAndCheckCibil = async (e: React.FormEvent) => { e.preventDefault(); setIsCibilLoading(true); setShowOtpModal(false); setCibilScore(null); setCibilAnalysis(null); const score = await getCIBILScore(cibilFormData); const analysis = getScoreAnalysis(score); setCibilScore(score); setCibilAnalysis(analysis); setIsCibilLoading(false); setOtp(''); };
    useEffect(() => { if (showOtpModal) { const timer = setTimeout(() => { setOtp('123456'); }, 1500); return () => clearTimeout(timer); } }, [showOtpModal]);

    useEffect(() => {
        let schemes = governmentSchemes;
        if (quizAnswers.age !== 'all') { schemes = schemes.filter(s => s.tags.includes(quizAnswers.age)); }
        if (searchTerm) { schemes = schemes.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())); }
        setFilteredSchemes(schemes);
    }, [quizAnswers, searchTerm, governmentSchemes]);

    const handleCompareToggle = (schemeName: string) => setCompareList(prev => prev.includes(schemeName) ? prev.filter(n => n !== schemeName) : (prev.length < 3 ? [...prev, schemeName] : prev));

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans isolate">
            <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
                <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/40 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
                <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/40 rounded-full blur-3xl filter animate-blob"></div>
                <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/40 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="relative z-10">
                <div className="relative pt-28 pb-16 flex items-center justify-center text-center">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative">
                        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">Finance & Credit Hub</motion.h1>
                        <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-3xl mx-auto mt-4">Empowering MSMEs with financial tools, government schemes, and credit insights.</motion.p>
                    </motion.div>
                </div>
                
                <div className="container mx-auto px-4 pb-16 space-y-24">
                    <DigitalLendingModule glassCardStyle={glassCardStyle}/>

                    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                       <Card className={glassCardStyle}>
                          <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
                              {/* <div className="flex flex-col items-center">
                                <CardTitle className="flex items-center gap-3 text-2xl text-slate-800 mb-4"><ShieldCheck className="text-sky-500" />Free CIBIL Score Check</CardTitle>
                                {isCibilLoading ? <Loader2 className="h-16 w-16 animate-spin text-sky-500"/> : cibilScore ? <CircularProgress score={cibilScore} /> : (
                                  <form onSubmit={handleGetOtp} className="w-full max-w-sm space-y-4">
                                      <div><Label>Full Name</Label><Input onChange={e => setCibilFormData({...cibilFormData, name: e.target.value})} className="bg-white/70 border-slate-300 mt-1"/></div>
                                      <div><Label>PAN</Label><Input onChange={e => setCibilFormData({...cibilFormData, pan: e.target.value})} className="bg-white/70 border-slate-300 mt-1"/></div>
                                      <div><Label>Date of Birth</Label><Input type="date" onChange={e => setCibilFormData({...cibilFormData, dob: e.target.value})} className="bg-white/70 border-slate-300 mt-1"/></div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="consent"
                                        checked={consentGiven}
                                        onCheckedChange={checked => setConsentGiven(checked === true)}
                                      />
                                      <Label htmlFor="consent" className="text-xs">I agree to the terms and authorize EkVyapaar to check my credit report.</Label>
                                    </div>
                                      <Button className="w-full" disabled={!consentGiven}>Get OTP</Button>
                                  </form>
                                )}
                              </div> */}
                              {/* <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200/80">
                                {cibilAnalysis ? (
                                    <div>
                                        <h4 className="font-bold text-slate-800">Your Loan Analysis</h4>
                                        <p className="mt-2 text-sm">Approval Chance: <Badge className={cibilAnalysis.badgeClass}>{cibilAnalysis.chance}</Badge></p>
                                        <p className="mt-2 text-sm text-slate-600">{cibilAnalysis.remarks}</p>
                                        <div className="mt-4">
                                            <h5 className="font-semibold text-slate-700 flex items-center gap-2"><Lightbulb className="text-yellow-500 h-4 w-4"/>Improvement Tips</h5>
                                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-slate-600">{cibilAnalysis.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="font-bold text-slate-800">Why Check Your Score?</h4>
                                        <ul className="list-disc list-inside mt-2 space-y-2 text-sm text-slate-600">
                                            <li>Unlock better loan interest rates.</li>
                                            <li>Understand your financial health.</li>
                                            <li>Identify errors in your credit history.</li>
                                            <li>Improve chances of loan approval.</li>
                                        </ul>
                                    </div>
                                )}
                              </div> */}
                          </div>
                       </Card>
                    </motion.div>
                    
                    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-24">
                        <Card className={glassCardStyle}>
                            <CardHeader><CardTitle className="flex items-center gap-3 text-2xl text-slate-800"><Sparkles className="text-sky-500" />Find Your Perfect Scheme</CardTitle><CardDescription>Answer a few questions to find the most relevant government schemes for your business.</CardDescription></CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div><Label>Search by Keyword</Label><div className="relative mt-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="e.g., collateral, subsidy..." className="bg-white/70 border-slate-300 pl-10 h-11"/></div></div>
                                <div><Label>Business Age</Label><div className="flex gap-2 mt-2"><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'all'})} variant={quizAnswers.age === 'all' ? 'default' : 'secondary'} className="w-full">All</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'new_business'})} variant={quizAnswers.age === 'new_business' ? 'default' : 'secondary'} className="w-full">New</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'existing_business'})} variant={quizAnswers.age === 'existing_business' ? 'default' : 'secondary'} className="w-full">Existing</Button></div></div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {filteredSchemes.map((scheme) => (
                            <motion.div key={scheme.name} variants={fadeIn}>
                              <Card className={`h-full flex flex-col justify-between hover:border-sky-400/80 ${glassCardStyle}`}>
                                <div>
                                    <CardHeader>
                                      <div className="flex justify-between items-start gap-2"><CardTitle className="text-lg text-slate-800">{scheme.name}</CardTitle><Badge variant="secondary" className="bg-slate-100/70 border-slate-200/80 flex-shrink-0">{scheme.category}</Badge></div>
                                      <div className={`w-12 h-1 ${scheme.color} rounded-full`}></div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <p className="text-sm text-slate-600 h-20">{scheme.purpose}</p>
                                      <div className="space-y-2">{scheme.features.map((feature) => ( <div key={feature} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-slate-700">{feature}</span></div> ))}</div>
                                    </CardContent>
                                </div>
                                <CardContent className="flex items-center gap-2 pt-4">
                                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="w-full"><Button variant="secondary" className="w-full rounded-lg">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button></a>
                                    <Button size="icon" variant={compareList.includes(scheme.name) ? "default" : "outline"} onClick={() => handleCompareToggle(scheme.name)} className="flex-shrink-0"><Scale className="h-4 w-4"/></Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <AnimatePresence>
                      {compareList.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] z-50">
                          <Card className="bg-white/80 backdrop-blur-xl border-slate-300 shadow-2xl">
                              <CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle className="text-slate-800">Scheme Comparison ({compareList.length}/3)</CardTitle><Button variant="ghost" size="icon" onClick={() => setCompareList([])}><X className="h-5 w-5"/></Button></CardHeader>
                              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-0">
                                {governmentSchemes.filter(s => compareList.includes(s.name)).map(scheme => (<div key={scheme.name} className="p-4 bg-slate-100 rounded-lg border border-slate-200"><h4 className="font-bold text-slate-800">{scheme.name}</h4><ul className="list-disc list-inside mt-2 text-sm text-slate-600">{scheme.features.map(f => <li key={f}>{f}</li>)}</ul></div>))}
                              </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence>
                {showOtpModal && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{scale:0.95, y:10}} animate={{scale:1, y:0}} exit={{scale:0.95, y:10}} className="w-full max-w-md">
                            <Card className={glassCardStyle}>
                                <CardHeader><CardTitle>Verify Mobile Number</CardTitle><CardDescription>An OTP has been sent to your mobile. It will auto-fill for this demo.</CardDescription></CardHeader>
                                <form onSubmit={handleVerifyOtpAndCheckCibil}>
                                    <CardContent>
                                        <Label>Enter OTP</Label>
                                        <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="_ _ _ _ _ _" className="text-center tracking-[0.5em] font-mono mt-1 bg-white/70 border-slate-300"/>
                                    </CardContent>
                                    <CardContent>
                                        <Button className="w-full" type="submit" disabled={otp.length < 6}>Verify & Check Score</Button>
                                    </CardContent>
                                </form>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};