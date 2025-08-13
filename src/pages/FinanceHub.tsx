"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Calculator, CheckCircle, ArrowRight, Sparkles, Scale, Search, X, ShieldCheck, Lightbulb, Loader2, Handshake, Landmark, FileText, Download
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
        if (score >= 750) return { colorClass: "text-green-400", strokeColor: "#34d399" };
        if (score >= 700) return { colorClass: "text-yellow-400", strokeColor: "#facc15" };
        if (score >= 650) return { colorClass: "text-orange-400", strokeColor: "#fb923c" };
        return { colorClass: "text-red-400", strokeColor: "#f87171" };
    }, [score]);

    return (
        <div className="relative flex items-center justify-center">
            <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
                <circle stroke="#334155" fill="transparent" strokeWidth="10" r={radius} cx="75" cy="75" />
                <motion.circle
                    stroke={strokeColor} fill="transparent" strokeWidth="10" strokeLinecap="round" r={radius} cx="75" cy="75"
                    initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }} strokeDasharray={`${circumference} ${circumference}`}
                />
            </svg>
            <div className={`absolute flex flex-col items-center justify-center ${colorClass}`}>
                <span className="text-4xl font-bold"><AnimatedNumber value={score} isInteger={true} /></span>
                <span className="text-sm font-medium">CIBIL SCORE</span>
            </div>
        </div>
    );
};

// ===================================================================================
// --- DIGITAL LENDING MODULE & MOCK APIs ---
// ===================================================================================

// --- MOCK APIs (Simulating Backend Calls directly in the Frontend) ---
const mockNbfcPartners = [
  { id: 'nbfc1', name: 'HDFC Bank', logo: Landmark, interestRate: "11.90% - 21.35%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-sky-400" },
  { id: 'nbfc2', name: 'Lendingkart', logo: Handshake, interestRate: "15.00% - 27.00%", tenure: "6-36 Months", maxAmount: "₹50,00,000", color: "text-green-400" },
  { id: 'nbfc3', name: 'Bajaj Finserv', logo: Sparkles, interestRate: "9.75% - 25.00%", tenure: "12-60 Months", maxAmount: "₹80,00,000", color: "text-purple-400" },
  { id: 'nbfc4', name: 'IndusInd Bank', logo: Landmark, interestRate: "13.00% - 22.00%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-sky-400" },
  { id: 'nbfc5', name: 'Aditya Birla Capital', logo: Handshake, interestRate: "14.00% - 24.00%", tenure: "12-48 Months", maxAmount: "₹50,00,000", color: "text-green-400" },
  { id: 'nbfc6', name: 'Ziploan', logo: Sparkles, interestRate: "18.00% - 28.00%", tenure: "12-36 Months", maxAmount: "₹7,50,000", color: "text-purple-400" },
];
const mockKycApi = async (aadhaar: string, pan: string) => { await new Promise(r => setTimeout(r, 1500)); if (aadhaar === '123412341234' && pan) { return { success: true, name: 'Demo User', dob: '1990-01-01', address: '123, Business Lane, New Delhi' }; } return { success: false, error: 'Aadhaar OTP verification failed. Please check the number.' }; };
const mockCibilApi = async (pan: string) => { await new Promise(r => setTimeout(r, 1000)); return Math.floor(Math.random() * 201) + 650; };
const mockLoanSubmissionApi = async (data: any) => { await new Promise(r => setTimeout(r, 2000)); return { success: true, applicationId: `EKV${Math.floor(Math.random() * 90000) + 10000}` }; };

// --- LENDING MODULE COMPONENT ---
const DigitalLendingModule = () => {
    const [step, setStep] = useState(0); // 0: Products, 1: Form, 2: KYC, 3: KFS, 4: Confirmation
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
                <div className="grid md:grid-cols-3 gap-6">
                    {mockNbfcPartners.map(p => (
                        <Card key={p.id} className="bg-slate-800/50 border-slate-700 text-center hover:border-sky-500 transition-all">
                            <CardHeader><p.logo className={`mx-auto h-10 w-10 mb-2 ${p.color}`} /><CardTitle>{p.name}</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div><p className="text-slate-400 text-sm">Interest Rate</p><p className="font-semibold">{p.interestRate}</p></div>
                                <div><p className="text-slate-400 text-sm">Max. Loan Amount</p><p className="font-semibold">{p.maxAmount}</p></div>
                                <Button className="w-full bg-sky-600 hover:bg-sky-500" onClick={() => handleSelectProduct(p)}>Apply Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
            case 1: return (
                <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto space-y-4">
                    <h3 className="text-xl font-semibold text-center">Tell us about your business</h3>
                    <div><Label htmlFor="businessName">Business Name</Label><Input id="businessName" required className="bg-slate-800 border-slate-700 mt-1" /></div>
                    <div><Label htmlFor="gst">GST Number</Label><Input id="gst" required className="bg-slate-800 border-slate-700 mt-1" /></div>
                    <div><Label htmlFor="turnover">Annual Turnover (₹)</Label><Input id="turnover" type="number" required className="bg-slate-800 border-slate-700 mt-1" /></div>
                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500">Proceed to KYC</Button>
                </form>
            );
            case 2: return (
                <form onSubmit={handleKycSubmit} className="max-w-lg mx-auto space-y-4">
                     <h3 className="text-xl font-semibold text-center">Digital KYC Verification</h3>
                     <p className="text-sm text-center text-slate-400">For demo, use Aadhaar: <strong className="text-sky-400">123412341234</strong> and any PAN.</p>
                     <div><Label htmlFor="aadhaar">Aadhaar Number</Label><Input id="aadhaar" value={kycData.aadhaar} onChange={e => setKycData({...kycData, aadhaar: e.target.value})} maxLength={12} required className="bg-slate-800 border-slate-700 mt-1" /></div>
                     <div><Label htmlFor="pan">PAN Number</Label><Input id="pan" value={kycData.pan} onChange={e => setKycData({...kycData, pan: e.target.value})} maxLength={10} required className="bg-slate-800 border-slate-700 mt-1" /></div>
                     <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Verify via OTP"}</Button>
                     {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </form>
            );
            case 3: return (
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-center mb-4">Key Fact Statement (KFS)</h3>
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-6 space-y-3">
                            <div className="flex justify-between"><span className="text-slate-400">Lender:</span><span className="font-semibold">{selectedLoan.name}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Loan Amount:</span><span className="font-semibold">₹{kfs.loanAmount.toLocaleString('en-IN')}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Interest Rate:</span><span className="font-semibold">{kfs.interestRate}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Processing Fee:</span><span className="font-semibold">₹{kfs.processingFee.toLocaleString('en-IN')}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Total Interest Payable:</span><span className="font-semibold text-red-400">₹{kfs.totalInterest.toLocaleString('en-IN')}</span></div>
                            <div className="flex justify-between text-lg"><span className="text-slate-400">Total Amount Payable:</span><span className="font-bold text-green-400">₹{kfs.totalPayable.toLocaleString('en-IN')}</span></div>
                        </CardContent>
                    </Card>
                    <div className="text-center mt-4"><Button variant="outline" onClick={() => alert("This would trigger a PDF download of the KFS.")}><Download className="mr-2 h-4 w-4"/>Download KFS as PDF</Button></div>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500 mb-2">Funds disbursed directly to your account from {selectedLoan.name}. EkVyapaar is an LSP and does not hold funds.</p>
                        <Button onClick={handleFinalSubmission} className="w-full max-w-sm bg-green-600 hover:bg-green-500" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin"/> : "Accept & Submit Application"}</Button>
                    </div>
                </div>
            );
            case 4: return (
                 <div className="text-center max-w-lg mx-auto">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold">Application Sent Successfully!</h3>
                    <p className="text-slate-300 mt-2">Your application has been submitted to {selectedLoan.name}.</p>
                    <p className="text-slate-400 mt-1">Application ID: <span className="font-mono text-sky-400">{applicationId}</span></p>
                    <p className="text-sm text-slate-500 mt-4">You will receive an email/SMS notification shortly. The lender will contact you for the next steps.</p>
                    <Button onClick={() => setStep(0)} className="mt-6">Apply for Another Loan</Button>
                 </div>
            );
            default: return null;
        }
    };

    return (
        <motion.div variants={{hidden: {}, visible: {}}} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <Card className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl"><Handshake className="text-sky-400" />Digital Business Loans</CardTitle>
                    <CardDescription>Apply for RBI-approved business loans from our NBFC/Bank partners. 100% digital process.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center max-w-2xl mx-auto my-4">
                       {steps.map((s, i) => (
                           <React.Fragment key={s}>
                            <div className="flex flex-col items-center text-center w-20">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= i ? 'bg-sky-500 border-sky-500' : 'bg-slate-700 border-slate-600'}`}>
                                    {step > i ? <CheckCircle className="h-6 w-6 text-white"/> : <span className="font-bold text-sm">{i+1}</span>}
                                </div>
                                <p className={`mt-2 text-xs transition-colors duration-300 ${step >= i ? 'text-white' : 'text-slate-400'}`}>{s}</p>
                            </div>
                            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 -translate-y-4 ${step > i ? 'bg-sky-500' : 'bg-slate-600'}`} />}
                           </React.Fragment>
                       ))}
                    </div>
                    <div className="mt-8 min-h-[300px] flex items-center justify-center">
                       {renderStepContent()}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};


// ===================================================================================
// --- MAIN FINANCE HUB COMPONENT (Now includes the Lending Module) ---
// ===================================================================================
export const FinanceHub = () => {
    // States for Loan Calculator
    const [loanAmount, setLoanAmount] = useState("1000000");
    const [downPayment, setDownPayment] = useState("100000");
    const [loanTenure, setLoanTenure] = useState("24");
    const [annualInterestRate, setAnnualInterestRate] = useState("11.5");
    const [monthlyEMI, setMonthlyEMI] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    const [totalAmountPayable, setTotalAmountPayable] = useState(0);
    const pieChartData = [{ name: 'Principal', value: totalPrincipal }, { name: 'Total Interest', value: totalInterest }];
    const PIE_COLORS = ['#38bdf8', '#f87171'];

    // States for CIBIL Calculator
    const [cibilFormData, setCibilFormData] = useState({ name: '', pan: '', dob: '', mobile: '' });
    const [consentGiven, setConsentGiven] = useState(false);
    const [cibilScore, setCibilScore] = useState<number | null>(null);
    const [isCibilLoading, setIsCibilLoading] = useState(false);
    const [cibilAnalysis, setCibilAnalysis] = useState<any | null>(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');

    // States for Scheme Finder
    const [quizAnswers, setQuizAnswers] = useState({ age: 'all', need: 'all' });
    const [filteredSchemes, setFilteredSchemes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [compareList, setCompareList] = useState<string[]>([]);

    // --- Data ---
    const governmentSchemes = useMemo(() => [
        { name: "Credit Guarantee Fund Trust (CGTMSE)", category: "Credit Support", purpose: "Provides collateral-free credit to new and existing Micro and Small Enterprises.", features: ["Collateral-free loans", "Up to ₹5 Crore coverage", "Guarantee for lenders"], link: "https://www.cgtmse.in", color: "bg-blue-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'] },
        { name: "Prime Minister’s Employment Generation (PMEGP)", category: "Credit Support", purpose: "Offers subsidies for setting up new micro-enterprises in both rural and urban areas.", features: ["Credit-linked subsidy", "Promotes self-employment", "For new enterprises"], link: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp", color: "bg-green-500", tags: ['new_business', 'subsidy', 'all'] },
        { name: "MUDRA Loans (under PMMY)", category: "Credit Support", purpose: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.", features: ["Loans up to ₹10 Lakh", "Three loan categories", "No collateral needed"], link: "https://www.mudra.org.in", color: "bg-orange-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'] },
        { name: "Stand-Up India Scheme", category: "Credit Support", purpose: "Facilitates bank loans between ₹10 lakh and ₹1 crore to SC/ST and women entrepreneurs.", features: ["For SC/ST & Women", "Loan: ₹10 Lakh - ₹1 Crore", "Supports greenfield enterprises"], link: "https://www.standupmitra.in", color: "bg-purple-500", tags: ['new_business', 'women_sc_st', 'all'] },
        { name: "SIDBI Make in India Loan (SMILE)", category: "Credit Support", purpose: "Offers soft loans to MSMEs for expansion, supporting the 'Make in India' initiative.", features: ["Soft loan terms", "Focus on 'Make in India'", "For expansion & modernization"], link: "https://www.sidbi.in/en/smile", color: "bg-rose-500", tags: ['existing_business', 'new_business', 'make_in_india', 'all'] },
        { name: "Interest Subvention Scheme", category: "Credit Support", purpose: "Provides a 2% interest subsidy on loans for all GST-registered MSMEs.", features: ["2% interest subsidy", "For GST-registered MSMEs", "Reduces borrowing cost"], link: "https://www.dcmsme.gov.in/", color: "bg-amber-500", tags: ['existing_business', 'gst_registered', 'all'] },
        { name: "Technology Upgradation Fund (TUFS)", category: "Tech & Development", purpose: "Facilitates technology upgradation and modernization in the Indian textile industry.", features: ["For textile sector", "Capital investment subsidy", "Promotes modern technology"], link: "https://texmin.nic.in/technology-upgradation-fund-scheme", color: "bg-teal-500", tags: ['existing_business', 'tech_upgrade', 'textile', 'all'] },
        { name: "MSME Cluster Development (CDP)", category: "Tech & Development", purpose: "Promotes development of MSME clusters to enhance their productivity and competitiveness.", features: ["Cluster-based approach", "Common Facility Centers", "Infrastructure development"], link: "https://my.msme.gov.in/mymsme/reg/COM_ClusterForm.aspx", color: "bg-cyan-500", tags: ['existing_business', 'infrastructure', 'all'] },
        { name: "ECGC Schemes for Exporters", category: "Export Promotion", purpose: "Provides export credit insurance to MSME exporters to protect against payment risks.", features: ["Credit risk insurance", "Covers payment risks", "Facilitates export finance"], link: "https://www.ecgc.in", color: "bg-sky-500", tags: ['existing_business', 'export', 'all'] },
        { name: "Duty Drawback Scheme", category: "Export Promotion", purpose: "Offers refunds on customs duties paid on materials used in the manufacture of exported goods.", features: ["Refund of duties", "For exporters", "Boosts export competitiveness"], link: "https://www.cbic.gov.in/htdocs-cbec/customs/cs-act/duty-drawback", color: "bg-indigo-500", tags: ['existing_business', 'export', 'all'] },
        { name: "Market Development Assistance (MDA)", category: "Export Promotion", purpose: "Supports MSMEs in promoting their products in international markets by funding participation in fairs.", features: ["International market access", "Funding for trade fairs", "Promotes 'Brand India'"], link: "https://www.dgft.gov.in/CP/", color: "bg-pink-500", tags: ['existing_business', 'export', 'marketing', 'all'] },
    ], []);

    // --- Logic & Effects ---
    const getCIBILScore = async (formData: any) => { await new Promise(r => setTimeout(r, 2000)); return Math.floor(Math.random() * 601) + 300; };
    const getScoreAnalysis = (score: number) => {
        if (score >= 750) return { chance: "Very High", remarks: "Best rates, quick approval.", tips: ["Maintain timely payments.", "Keep credit utilization below 30%."], colorClass: "text-green-400", badgeClass: "bg-green-500/10 text-green-400 border-green-500/30"};
        if (score >= 700) return { chance: "Good", remarks: "Loan possible at slightly higher rates.", tips: ["Pay all bills on time.", "Avoid multiple new loan applications."], colorClass: "text-yellow-400", badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"};
        return { chance: "Moderate", remarks: "Approval possible with higher rates.", tips: ["Reduce outstanding debt.", "Check your report for errors."], colorClass: "text-orange-400", badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/30"};
    };
    const handleGetOtp = (e: React.FormEvent) => { e.preventDefault(); setShowOtpModal(true); };
    const handleVerifyOtpAndCheckCibil = async (e: React.FormEvent) => { e.preventDefault(); setIsCibilLoading(true); setShowOtpModal(false); setCibilScore(null); setCibilAnalysis(null); const score = await getCIBILScore(cibilFormData); const analysis = getScoreAnalysis(score); setCibilScore(score); setCibilAnalysis(analysis); setIsCibilLoading(false); setOtp(''); };
    useEffect(() => { if (showOtpModal) { const timer = setTimeout(() => { setOtp('123456'); }, 1500); return () => clearTimeout(timer); } }, [showOtpModal]);
    
    useEffect(() => {
        const p_loan = parseFloat(loanAmount) || 0; const dp = parseFloat(downPayment) || 0; const p = p_loan - dp; const r = (parseFloat(annualInterestRate) || 0) / (12 * 100); const n = parseFloat(loanTenure) || 0;
        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyEMI(emi); const totalAmount = emi * n; setTotalAmountPayable(totalAmount); setTotalInterest(totalAmount - p); setTotalPrincipal(p);
        } else {
            setMonthlyEMI(0); setTotalAmountPayable(p > 0 ? p : 0); setTotalInterest(0); setTotalPrincipal(p > 0 ? p : 0);
        }
    }, [loanAmount, downPayment, loanTenure, annualInterestRate]);

    useEffect(() => {
        let schemes = governmentSchemes;
        if (quizAnswers.age !== 'all') { schemes = schemes.filter(s => s.tags.includes(quizAnswers.age)); }
        if (searchTerm) { schemes = schemes.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())); }
        setFilteredSchemes(schemes);
    }, [quizAnswers, searchTerm, governmentSchemes]);

    const handleCompareToggle = (schemeName: string) => setCompareList(prev => prev.includes(schemeName) ? prev.filter(n => n !== schemeName) : (prev.length < 3 ? [...prev, schemeName] : prev));

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-sky-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] bg-green-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 py-16">
                <section className="relative text-center my-16 h-80 flex flex-col justify-center items-center">
                  <img src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Financial Growth Chart" className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl opacity-20"/>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative">
                      <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">Finance & Credit Hub</motion.h1>
                      <motion.p variants={fadeIn} className="text-xl text-slate-300 max-w-3xl mx-auto mt-4">Empowering MSMEs with financial tools, government schemes, and credit insights.</motion.p>
                  </motion.div>
                </section>
                
                {/* === NEW DIGITAL LENDING MODULE === */}
                <DigitalLendingModule />

                {/* === EXISTING FEATURES BELOW === */}
                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-24">
                    <Card className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-lg">
                        <CardHeader><CardTitle className="flex items-center gap-3 text-2xl"><Sparkles className="text-sky-400" />Find Your Perfect Scheme</CardTitle><CardDescription>Answer a few questions to find the most relevant government schemes for your business.</CardDescription></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div><Label className="text-slate-300">Search by Keyword</Label><div className="relative mt-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" /><Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="e.g., collateral, subsidy..." className="bg-slate-800 border-slate-700 pl-10 h-11"/></div></div>
                            <div><Label className="text-slate-300">Business Age</Label><div className="flex gap-2 mt-2"><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'all'})} variant={quizAnswers.age === 'all' ? 'default' : 'secondary'} className="w-full">All</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'new_business'})} variant={quizAnswers.age === 'new_business' ? 'default' : 'secondary'} className="w-full">New</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'existing_business'})} variant={quizAnswers.age === 'existing_business' ? 'default' : 'secondary'} className="w-full">Existing</Button></div></div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {filteredSchemes.map((scheme) => (
                        <motion.div key={scheme.name} variants={fadeIn}>
                          <Card className="h-full flex flex-col justify-between bg-white/5 border-white/10 hover:border-sky-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-sky-500/20">
                            <div>
                                <CardHeader>
                                  <div className="flex justify-between items-start gap-2"><CardTitle className="text-lg text-slate-100">{scheme.name}</CardTitle><Badge variant="secondary" className="flex-shrink-0">{scheme.category}</Badge></div>
                                  <div className={`w-12 h-1 ${scheme.color} rounded-full`}></div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <p className="text-sm text-slate-400 h-20">{scheme.purpose}</p>
                                  <div className="space-y-2">{scheme.features.map((feature) => ( <div key={feature} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /><span className="text-sm text-slate-300">{feature}</span></div> ))}</div>
                                </CardContent>
                            </div>
                            <CardContent className="flex items-center gap-2 pt-4">
                                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="w-full"><Button className="w-full rounded-lg bg-slate-700 hover:bg-slate-600 text-white">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button></a>
                                <Button size="icon" variant={compareList.includes(scheme.name) ? "default" : "outline"} onClick={() => handleCompareToggle(scheme.name)} className="flex-shrink-0"><Scale className="h-4 w-4"/></Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                  {compareList.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] z-50">
                      <Card className="bg-slate-800/80 backdrop-blur-xl border-sky-500/50 shadow-2xl">
                          <CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle>Scheme Comparison ({compareList.length}/3)</CardTitle><Button variant="ghost" size="icon" onClick={() => setCompareList([])}><X className="h-5 w-5"/></Button></CardHeader>
                          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-0">
                            {governmentSchemes.filter(s => compareList.includes(s.name)).map(scheme => (<div key={scheme.name} className="p-4 bg-slate-700/50 rounded-lg"><h4 className="font-bold">{scheme.name}</h4><ul className="list-disc list-inside mt-2 text-sm text-slate-300">{scheme.features.map(f => <li key={f}>{f}</li>)}</ul></div>))}
                          </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="grid lg:grid-cols-2 gap-16 items-start mt-24">
                    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader><CardTitle className="text-2xl flex items-center gap-3"><ShieldCheck className="text-sky-400"/>Check Your CIBIL Score</CardTitle><CardDescription className="text-slate-400">Get a free, instant CIBIL score check to understand your loan eligibility.</CardDescription></CardHeader>
                            <CardContent>
                              <div className="grid lg:grid-cols-2 gap-8">
                                <form onSubmit={handleGetOtp} className="space-y-4">
                                    <div><Label htmlFor="cibil-name" className="text-slate-300">Full Name (as on PAN)</Label><Input id="cibil-name" type="text" required className="bg-slate-800 border-slate-700 mt-1"/></div>
                                    <div><Label htmlFor="cibil-pan" className="text-slate-300">PAN Number</Label><Input id="cibil-pan" type="text" required className="bg-slate-800 border-slate-700 mt-1 uppercase"/></div>
                                    <div><Label htmlFor="cibil-dob" className="text-slate-300">Date of Birth</Label><Input id="cibil-dob" type="date" required className="bg-slate-800 border-slate-700 mt-1"/></div>
                                    <div><Label htmlFor="cibil-mobile" className="text-slate-300">Mobile Number</Label><Input id="cibil-mobile" type="tel" required className="bg-slate-800 border-slate-700 mt-1"/></div>
                                    <div className="flex items-center space-x-2 pt-2"><Checkbox id="cibil-consent" onCheckedChange={(checked) => setConsentGiven(Boolean(checked))}/><label htmlFor="cibil-consent" className="text-sm text-slate-400 leading-none">I agree to the terms and provide consent.</label></div>
                                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500" disabled={!consentGiven}>Get OTP</Button>
                                </form>
                                <div className="bg-slate-800/50 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                                  <AnimatePresence mode="wait">
                                    {isCibilLoading ? <motion.div key="loader"><Loader2 className="h-12 w-12 animate-spin text-sky-400"/></motion.div> : cibilScore && cibilAnalysis ? <motion.div key="results" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full space-y-4 text-center"><CircularProgress score={cibilScore} /><div className="space-y-2"><Badge variant="outline" className={cibilAnalysis.badgeClass}>{cibilAnalysis.chance} Approval</Badge><p className="text-slate-300 text-sm">{cibilAnalysis.remarks}</p></div><Card className="bg-slate-900/50 border-slate-700 text-left"><CardHeader className="p-3"><CardTitle className="text-sm flex items-center gap-2"><Lightbulb className="h-4 w-4 text-yellow-400"/>Tips to Improve</CardTitle></CardHeader><CardContent className="p-3 pt-0 space-y-1">{cibilAnalysis.tips.map((tip: string, i: number) => (<div key={i} className="flex items-start gap-2 text-xs text-slate-400"><CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0"/><span>{tip}</span></div>))}</CardContent></Card></motion.div> : <motion.div key="initial" className="text-center text-slate-500"><ShieldCheck className="mx-auto h-12 w-12 mb-4"/><p>Your data is secure.</p><p>Fill the form to get your report.</p></motion.div>}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader><CardTitle className="text-2xl flex items-center gap-3"><Calculator className="text-sky-400"/>Loan EMI Calculator</CardTitle><CardDescription className="text-slate-400">Estimate your monthly payments to plan your finances effectively.</CardDescription></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div><Label htmlFor="loan-amount" className="text-slate-300">Loan Amount (₹)</Label><Input id="loan-amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="bg-slate-800 border-slate-700 mt-1"/></div>
                                  <div><Label htmlFor="down-payment" className="text-slate-300">Down Payment (₹)</Label><Input id="down-payment" value={downPayment} onChange={e => setDownPayment(e.target.value)} className="bg-slate-800 border-slate-700 mt-1"/></div>
                                  <div><Label htmlFor="loan-tenure" className="text-slate-300">Loan Tenure (Months)</Label><Input id="loan-tenure" value={loanTenure} onChange={e => setLoanTenure(e.target.value)} className="bg-slate-800 border-slate-700 mt-1"/></div>
                                  <div><Label htmlFor="interest-rate" className="text-slate-300">Interest Rate (% p.a.)</Label><Input id="interest-rate" value={annualInterestRate} onChange={e => setAnnualInterestRate(e.target.value)} className="bg-slate-800 border-slate-700 mt-1"/></div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 items-center bg-slate-800/50 p-4 rounded-lg">
                                  <div className="space-y-2">
                                      <div className="text-sm text-slate-400">Monthly EMI<p className="text-2xl font-bold text-sky-400">₹<AnimatedNumber value={monthlyEMI} /></p></div>
                                      <div className="text-sm text-slate-400">Total Interest<p className="text-lg font-semibold text-red-400">₹<AnimatedNumber value={totalInterest} /></p></div>
                                      <div className="text-sm text-slate-400">Total Payable<p className="text-lg font-semibold text-green-400">₹<AnimatedNumber value={totalAmountPayable} /></p></div>
                                  </div>
                                  <div className="h-[150px]">
                                      <ResponsiveContainer width="100%" height="100%">
                                          <PieChart>
                                            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={5}>{pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}</Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} itemStyle={{ color: '#e2e8f0' }} formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                                          </PieChart>
                                      </ResponsiveContainer>
                                  </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showOtpModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-md">
                            <Card className="bg-slate-800 border-slate-700">
                                <CardHeader>
                                    <CardTitle>Enter OTP</CardTitle>
                                    <CardDescription>An OTP has been sent to your mobile number. (This is a demo - it will auto-fill)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleVerifyOtpAndCheckCibil} className="space-y-6">
                                        <div>
                                            <Label htmlFor="otp" className="text-slate-300">6-Digit OTP</Label>
                                            <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="bg-slate-900 border-slate-600 mt-1 text-center text-2xl tracking-[0.5em]" required />
                                        </div>
                                        <div className="flex gap-4">
                                            <Button type="button" variant="outline" className="w-full" onClick={() => setShowOtpModal(false)}>Cancel</Button>
                                            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500" disabled={otp.length < 6}>Verify & Check Score</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
