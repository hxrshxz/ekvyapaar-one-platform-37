"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, ArrowRight, Sparkles, Scale, Search, X, Handshake, Landmark, Building, MapPin, MessageSquareQuote, FileUp, Link as LinkIcon, Banknote, Rocket, MessageSquare
} from "lucide-react";


// --- SHIMMER EFFECT AND COMPONENTS ---
const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .shimmer-effect { position: relative; overflow: hidden; background-color: #e2e8f0; }
        .shimmer-effect::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 80%); animation: shimmer 1.5s infinite; }
        @keyframes typing-dot { 0%, 80%, 100% { opacity: 0; transform: scale(0.5); } 40% { opacity: 1; transform: scale(1); } }
        .typing-dot { display: inline-block; width: 8px; height: 8px; background-color: #94a3b8; border-radius: 50%; animation: typing-dot 1.4s infinite ease-in-out both; }
        .typing-dot:nth-of-type(1) { animation-delay: -0.32s; }
        .typing-dot:nth-of-type(2) { animation-delay: -0.16s; }
    `}</style>
);

const InfoCardShimmer = ({ glassCardStyle }: { glassCardStyle: string }) => (
    <Card className={`h-full flex flex-col justify-between ${glassCardStyle}`}>
        <div>
            <CardHeader>
                <div className="shimmer-effect h-6 w-3/4 rounded-md"></div>
                <div className="shimmer-effect h-4 w-1/2 rounded-md mt-2"></div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="shimmer-effect h-4 w-full rounded-md"></div>
                <div className="shimmer-effect h-4 w-5/6 rounded-md"></div>
                <div className="space-y-2 pt-4">
                    <div className="shimmer-effect h-5 w-full rounded-md"></div>
                    <div className="shimmer-effect h-5 w-full rounded-md"></div>
                </div>
            </CardContent>
        </div>
        <CardContent className="flex items-center gap-2 pt-4">
            <div className="shimmer-effect h-10 w-full rounded-lg"></div>
        </CardContent>
    </Card>
);

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

// --- CHATBOT COMPONENT ---
const Chatbot = ({ glassCardStyle }: { glassCardStyle: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Hello! I'm the MSME Scheme Assistant. How can I help you today?" }
    ]);
    const [options, setOptions] = useState([
        { text: "Find schemes for a new business", step: 'show_new_business_options' },
        { text: "Schemes for existing businesses", step: 'show_existing_business_options' },
        { text: "I need a collateral-free loan", step: 'collateral_free' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleOptionClick = (option: { text: string, step: string }) => {
        const userMessage = { id: Date.now(), sender: 'user', text: option.text };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setOptions([]);

        setTimeout(() => {
            let botResponse = { id: Date.now() + 1, sender: 'bot', text: "" };
            let newOptions: { text: string, step: string }[] = [];

            switch(option.step) {
                case 'start_over':
                    botResponse.text = "Of course. How can I help you?";
                    newOptions = [
                        { text: "Find schemes for a new business", step: 'show_new_business_options' },
                        { text: "Schemes for existing businesses", step: 'show_existing_business_options' },
                        { text: "I need a collateral-free loan", step: 'collateral_free' }
                    ];
                    break;
                case 'show_new_business_options':
                    botResponse.text = "Great! For new businesses, schemes like MUDRA, Stand-Up India, and PMEGP are excellent choices. Which one are you interested in?";
                    newOptions = [
                        { text: "Tell me about MUDRA", step: 'info_mudra' },
                        { text: "Tell me about Stand-Up India", step: 'info_standup' },
                        { text: "Start Over", step: 'start_over' }
                    ];
                    break;
                 case 'show_existing_business_options':
                    botResponse.text = "For existing businesses looking to grow, I recommend exploring CGTMSE for big projects, or CLCSS for tech upgrades. Which would you like to know more about?";
                    newOptions = [
                        { text: "Tell me about CGTMSE", step: 'info_cgtmse' },
                        { text: "Tell me about CLCSS", step: 'info_clcss' },
                        { text: "Start Over", step: 'start_over' }
                    ];
                    break;
                case 'info_mudra':
                    botResponse.text = "The MUDRA scheme offers loans up to ₹10 lakh without collateral. What would you like to know next?";
                    newOptions = [ { text: "What documents are needed?", step: 'docs_mudra' }, { text: "Go back", step: 'show_new_business_options' } ];
                    break;
                case 'docs_mudra':
                    botResponse.text = "For MUDRA, you'll generally need: 1. Proof of Identity & Address (like an Aadhaar Card from UIDAI). 2. A Business Plan (which you prepare). 3. Bank Statements (from your bank).";
                    newOptions = [ { text: "Thanks!", step: 'end' }, { text: "Go back", step: 'info_mudra' } ];
                    break;
                 case 'info_standup':
                    botResponse.text = "The Stand-Up India scheme facilitates loans from ₹10 lakh to ₹1 crore for businesses run by SC/ST or women entrepreneurs. What next?";
                    newOptions = [ { text: "What documents are needed?", step: 'docs_standup' }, { text: "Go back", step: 'show_new_business_options' } ];
                    break;
                case 'docs_standup':
                    botResponse.text = "You'll typically need: 1. A Caste/Tribe Certificate (from the State Revenue Department if applicable). 2. A detailed Project Report with financial projections (self-prepared).";
                    newOptions = [ { text: "Thanks!", step: 'end' }, { text: "Go back", step: 'info_standup' } ];
                    break;
                case 'collateral_free':
                    botResponse.text = "Excellent question! The MUDRA and CGTMSE schemes are specifically designed to provide loans without requiring collateral. You can find their details on the page.";
                    newOptions = [{ text: "Start Over", step: 'start_over' }];
                    break;
                case 'end':
                    botResponse.text = "You're welcome! Is there anything else I can help with?";
                    newOptions = [{ text: "Start Over", step: 'start_over' }];
                    break;
                default:
                    botResponse.text = "I'm sorry, I don't have information on that.";
                    newOptions = [{ text: "Start Over", step: 'start_over' }];
            }

            setIsTyping(false);
            setMessages(prev => [...prev, botResponse]);
            setOptions(newOptions);
        }, 1500);
    };
    
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-20 right-5 z-50 w-full max-w-sm">
                    <Card className={`${glassCardStyle} flex flex-col h-[60vh]`}>
                        <CardHeader className="flex-row items-center justify-between border-b border-white/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-sky-500 p-2 rounded-full"><Sparkles className="h-5 w-5 text-white"/></div>
                                <div>
                                    <CardTitle className="text-base">Scheme Assistant</CardTitle>
                                    <CardDescription className="text-xs text-slate-600">Online</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-5 w-5"/></Button>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 rounded-2xl rounded-bl-none px-4 py-3">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                             <div ref={messagesEndRef} />
                        </CardContent>
                        <CardContent className="border-t border-white/50 p-2">
                             <div className="flex flex-col gap-2">
                                {options.map(opt => (
                                    <Button key={opt.step} variant="outline" size="sm" 
                                        className="bg-white/80 text-slate-700 hover:bg-sky-100 hover:text-sky-800 border-slate-300" 
                                        onClick={() => handleOptionClick(opt)}>
                                        {opt.text}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-5 right-5 z-50">
                    <Button size="icon" className="rounded-full h-16 w-16 bg-sky-600 hover:bg-sky-700 shadow-lg" onClick={() => setIsOpen(true)}>
                        <MessageSquare className="h-8 w-8 text-white"/>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export const FinanceHub = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredSchemes, setFilteredSchemes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [compareList, setCompareList] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null); // Unified state
    const [quizAnswers, setQuizAnswers] = useState({ age: 'all' });
    
    const glassCardStyle = "bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl";
    
    const businessLoans = useMemo(() => [
        { 
            id: 'loan1', type: 'loan', name: 'Working Capital Loan', provider: 'HDFC Bank', logo: Landmark, color: 'text-sky-500', 
            purpose: 'Finance your day-to-day business operations, manage cash flow gaps, and fund short-term needs.',
            features: ["Interest Rate: 11.90% - 21.35%", "Max Amount: ₹50,00,000", "Tenure: 12-48 Months", "Processing Fee: Up to 2.5%"],
            applicationLink: 'https://www.hdfcbank.com/sme/business-loan',
            documents: [ { name: "KYC Documents", detail: "PAN Card, Aadhaar Card of proprietors/partners." }, { name: "Business Proof", detail: "GST Registration, Trade License." }, { name: "Financials", detail: "Last 2 years ITR and Bank Statements for 12 months." } ],
            beneficiaries: [ { name: "Gupta Trading Co.", location: "Delhi", story: "This loan helped us manage our inventory during the peak festive season without any cash crunch." } ]
        },
        { 
            id: 'loan2', type: 'loan', name: 'Business Growth Loan', provider: 'Lendingkart', logo: Rocket, color: 'text-green-500', 
            purpose: 'Fast, collateral-free loans for MSMEs looking to expand their business, purchase inventory, or invest in marketing.',
            features: ["Interest Rate: 15.00% - 27.00%", "Max Amount: ₹50,00,000", "Tenure: 6-36 Months", "Disbursal: Within 72 hours"],
            applicationLink: 'https://www.lendingkart.com/',
            documents: [ { name: "Bank Statements", detail: "Last 12 months in PDF format." }, { name: "Business Registration", detail: "GST Certificate or equivalent." }, { name: "Proprietor KYC", detail: "PAN and Aadhaar Card." } ],
            beneficiaries: [ { name: "Agile Software", location: "Pune, Maharashtra", story: "We secured ₹20 Lakhs in 3 days to onboard new clients. The process was incredibly fast." } ]
        },
        { 
            id: 'loan3', type: 'loan', name: 'Flexi Business Loan', provider: 'Bajaj Finserv', logo: Sparkles, color: 'text-purple-500', 
            purpose: 'A flexible credit line where you can withdraw funds as needed and pay interest only on the amount utilized.',
            features: ["Interest Rate: 9.75% - 25.00%", "Max Amount: ₹80,00,000", "Tenure: 12-60 Months", "Pay interest-only EMIs"],
            applicationLink: 'https://www.bajajfinserv.in/business-loan',
            documents: [ { name: "Financial Documents", detail: "Turnover of at least ₹1 Cr and 3 years of business vintage." }, { name: "KYC & Business Proof", detail: "Standard identity and business registration documents." } ],
            beneficiaries: [ { name: "Sharma Exports", location: "Moradabad, UP", story: "The flexi-loan is perfect for our export business, as our funding needs fluctuate with international orders." } ]
        },
        { 
            id: 'loan4', type: 'loan', name: 'MSME Loan', provider: 'ICICI Bank', logo: Landmark, color: 'text-orange-500', 
            purpose: 'Comprehensive loan products tailored for Micro, Small, and Medium Enterprises for various business needs.',
            features: ["Interest Rate: Starting at 10.50%", "Max Amount: Up to ₹2 Crore", "Tenure: Up to 7 years", "Collateral-free options available"],
            applicationLink: 'https://www.icicibank.com/business-banking/msme/loans',
            documents: [ { name: "Business Financials", detail: "Audited financials for the last 2 years." }, { name: "Udyam Registration", detail: "Required for MSME classification benefits." } ],
            beneficiaries: [ { name: "Patel Manufacturing", location: "Ahmedabad, Gujarat", story: "We got a ₹75 Lakh loan to purchase new machinery, which has boosted our production capacity." } ]
        },
        { 
            id: 'loan5', type: 'loan', name: 'Term Loan', provider: 'Axis Bank', logo: Landmark, color: 'text-red-500', 
            purpose: 'A secured or unsecured loan for capital expenditure, business expansion, or long-term working capital.',
            features: ["Interest Rate: Competitive floating/fixed rates", "Max Amount: Based on business profile", "Tenure: Up to 5 years", "Structured repayment options"],
            applicationLink: 'https://www.axisbank.com/business-banking/loans/business-loan',
            documents: [ { name: "Business Continuity Proof", detail: "Proof of being in the same business for a minimum period (e.g., 3 years)." }, { name: "Property Documents", detail: "Required if the loan is secured against property." } ],
            beneficiaries: [ { name: "South India Cafe", location: "Chennai, Tamil Nadu", story: "The term loan helped us renovate our main branch and open a new outlet." } ]
        },
        { 
            id: 'loan6', type: 'loan', name: 'Invoice Financing', provider: 'KredX', logo: Handshake, color: 'text-indigo-500', 
            purpose: 'Get early payment on your unpaid invoices from corporate clients to unlock working capital.',
            features: ["Discounting Rate: 1.25% - 2.5% per month", "Credit Period: 30-90 days", "Amount: Up to 90% of invoice value", "Digital platform"],
            applicationLink: 'https://www.kredx.com/invoice-discounting/',
            documents: [ { name: "Invoices", detail: "Unpaid invoices raised against blue-chip companies." }, { name: "Business & KYC", detail: "Standard business registration and KYC documents." } ],
            beneficiaries: [ { name: "NextGen IT Services", location: "Hyderabad, Telangana", story: "KredX helps us maintain healthy cash flow while offering a 60-day credit period to our enterprise clients." } ]
        },
    ], []);

    const governmentSchemes = useMemo(() => [
        { 
            name: "MUDRA Loans (PMMY)", type: 'scheme', category: "Credit Support", 
            purpose: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises without needing collateral.", 
            features: ["Loans up to ₹10 Lakh", "Three loan categories (Shishu, Kishore, Tarun)", "No collateral needed"], 
            link: "https://www.mudra.org.in", color: "bg-orange-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'],
            documents: [{ name: "Proof of Identity & Address", detail: "Aadhaar, PAN Card" }, { name: "Business Plan", detail: "A short report on your business" }, { name: "Bank Statements", detail: "Last 6 months" }],
            beneficiaries: [{ name: "Priya's Handicrafts", location: "Jaipur, Rajasthan", story: "Received a ₹50,000 Shishu loan to buy raw materials. Our sales doubled in 6 months!" }]
        },
        { 
            name: "Stand-Up India Scheme", type: 'scheme', category: "Credit Support", 
            purpose: "Facilitates bank loans between ₹10 lakh and ₹1 crore to SC/ST and women entrepreneurs.", 
            features: ["For SC/ST & Women", "Loan: ₹10 Lakh - ₹1 Crore", "Supports greenfield enterprises"], 
            link: "https://www.standupmitra.in", color: "bg-purple-500", tags: ['new_business', 'women_sc_st', 'all'],
            documents: [{ name: "Caste/Tribe Certificate", detail: "Required for SC/ST applicants." }, { name: "Project Report", detail: "Detailed report with financial projections." }],
            beneficiaries: [{ name: "Meena's Organics", location: "Pune, Maharashtra", story: "With a ₹25 Lakh loan, I was able to set up my own organic food processing unit. It's a dream come true." }]
        },
        { 
            name: "Startup India Seed Fund (SISFS)", type: 'scheme', category: "Funding", 
            purpose: "Provides financial assistance to startups for proof of concept, prototype development, product trials, and market entry.", 
            features: ["Up to ₹20 Lakhs as grant", "Up to ₹50 Lakhs via incubators", "For DPIIT-recognized startups"], 
            link: "https://seedfund.startupindia.gov.in", color: "bg-teal-500", tags: ['new_business', 'funding', 'all'],
            documents: [{ name: "DPIIT Recognition", detail: "Certificate of recognition as a startup." }, { name: "Pitch Deck", detail: "A presentation about your startup idea and plan." }],
            beneficiaries: [{ name: "EduVation Labs", location: "Hyderabad, Telangana", story: "The seed fund was critical for our prototype development. We're now launching our Ed-Tech platform." }]
        },
        { 
            name: "Credit Guarantee Trust (CGTMSE)", type: 'scheme', category: "Credit Support", 
            purpose: "Provides collateral-free credit up to ₹5 Crore to new and existing Micro and Small Enterprises by guaranteeing the loan.", 
            features: ["Collateral-free loans up to ₹5 Cr", "Guarantee cover for lenders", "For new & existing units"], 
            link: "https://www.cgtmse.in/", color: "bg-blue-500", tags: ['new_business', 'existing_business', 'collateral_free', 'all'],
            documents: [{ name: "Business Registration", detail: "Udyam Registration Certificate." }, { name: "Detailed Project Report (DPR)", detail: "Comprehensive report on business viability." }],
            beneficiaries: [{ name: "Apex Auto Components", location: "Gurugram, Haryana", story: "The CGTMSE scheme allowed us to secure a ₹1 Crore loan without property collateral, which was crucial for our expansion." }]
        },
        { 
            name: "PM's Employment Generation (PMEGP)", type: 'scheme', category: "Subsidy & Credit", 
            purpose: "Offers credit-linked subsidies for setting up new micro-enterprises in both rural and urban areas to promote self-employment.", 
            features: ["Credit-linked subsidy (15-35%)", "Promotes self-employment", "For new manufacturing/service units"], 
            link: "https://www.kviconline.gov.in/pmegpeportal/", color: "bg-green-500", tags: ['new_business', 'subsidy', 'all'],
            documents: [{ name: "Project Report for PMEGP", detail: "Standard format report for the proposed venture." }, { name: "Rural Area Certificate", detail: "If the unit is in a rural area." }],
            beneficiaries: [{ name: "Himalayan Agro Products", location: "Dehradun, Uttarakhand", story: "Thanks to the PMEGP subsidy, my project cost was significantly reduced, making it possible to start my business." }]
        },
        { 
            name: "Credit Linked Capital Subsidy (CLCSS)", type: 'scheme', category: "Technology Upgradation", 
            purpose: "Facilitates technology upgradation by providing a 15% upfront capital subsidy on institutional finance for modernizing machinery.", 
            features: ["15% upfront capital subsidy", "For technology modernization", "Max subsidy of ₹15 Lakh"], 
            link: "https://clcss.msme.gov.in/", color: "bg-rose-500", tags: ['existing_business', 'technology', 'subsidy', 'all'],
            documents: [{ name: "Udyam Registration", detail: "Proof of MSME status." }, { name: "Invoice of Machinery", detail: "Pro-forma invoice for the new machinery." }],
            beneficiaries: [{ name: "Precision Engineering", location: "Ludhiana, Punjab", story: "The CLCSS subsidy made it affordable for us to purchase a new CNC machine, improving our product quality." }]
        },
        {
            name: "Interest Subvention Scheme", type: 'scheme', category: "Interest Relief",
            purpose: "Provides a 2% interest subvention (discount) on fresh or incremental loans to all GST-registered MSMEs.",
            features: ["2% Interest relief", "For GST-registered MSMEs", "On loans up to ₹1 Crore"],
            link: "https://sidbi.in/en/interest-subvention-scheme", color: "bg-amber-500", tags: ['existing_business', 'interest_relief', 'all'],
            documents: [{ name: "GST Registration", detail: "Active GSTIN is mandatory." }, { name: "Loan Sanction Details", detail: "Proof of fresh or incremental loan from the bank." }],
            beneficiaries: [{ name: "Royal Bakers", location: "Kolkata, West Bengal", story: "The 2% interest relief on our loan significantly reduced our monthly EMI burden." }]
        },
        {
            name: "SFURTI", type: 'scheme', category: "Cluster Development",
            purpose: "Organizes traditional industries and artisans into clusters to make them competitive and provide long-term support.",
            features: ["Cluster-based development", "Supports artisans & traditional industries", "Financial support up to ₹5 Crore"],
            link: "https://sfurti.msme.gov.in/", color: "bg-indigo-500", tags: ['existing_business', 'artisans', 'all'],
            documents: [{ name: "Cluster Proposal", detail: "A detailed proposal submitted by an Implementing Agency." }, { name: "Artisan Details", detail: "List and details of the artisans in the cluster." }],
            beneficiaries: [{ name: "Channapatna Toys Cluster", location: "Channapatna, Karnataka", story: "SFURTI helped us establish a Common Facility Center with modern woodworking tools for all artisans." }]
        },
        {
            name: "NSIC Subsidy Scheme", type: 'scheme', category: "Support Services",
            purpose: "Aids MSMEs with raw material procurement, marketing support, and credit rating assistance at subsidized rates.",
            features: ["Raw material assistance", "Marketing support", "Subsidized services"],
            link: "http://www.nsic.co.in/", color: "bg-cyan-500", tags: ['existing_business', 'support', 'all'],
            documents: [{ name: "Udyam Registration", detail: "To register with NSIC." }, { name: "Application Form", detail: "For specific services like marketing or raw materials." }],
            beneficiaries: [{ name: "MetalKraft Industries", location: "Faridabad, Haryana", story: "Through NSIC, we procured steel at a much better rate, which improved our profitability." }]
        },
        {
            name: "Emergency Credit Line (ECLGS)", type: 'scheme', category: "Credit Support",
            purpose: "Provides 100% government-guaranteed collateral-free automatic loans for businesses to meet operational liabilities.",
            features: ["Emergency credit line", "100% guarantee coverage", "Collateral-free automatic loan"],
            link: "https://www.eclgs.com/", color: "bg-fuchsia-500", tags: ['existing_business', 'collateral_free', 'all'],
            documents: [{ name: "Existing Borrower Status", detail: "Must be an existing borrower with a bank." }, { name: "Business KYC", detail: "Standard business and promoter KYC." }],
            beneficiaries: [{ name: "Tirumala Textiles", location: "Tirupati, Andhra Pradesh", story: "The ECLGS loan was a lifeline during the pandemic, helping us pay salaries and retain our staff." }]
        },
    ], []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilteredSchemes(governmentSchemes);
            setIsLoading(false);
        }, 2000); 
        return () => clearTimeout(timer);
    }, [governmentSchemes]);

    useEffect(() => {
        let schemes = governmentSchemes;
        if (quizAnswers.age !== 'all') { schemes = schemes.filter(s => s.tags.includes(quizAnswers.age)); }
        if (searchTerm) { schemes = schemes.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.purpose.toLowerCase().includes(searchTerm.toLowerCase())); }
        setFilteredSchemes(schemes);
    }, [quizAnswers, searchTerm, governmentSchemes]);

    const handleCompareToggle = (schemeName: string) => setCompareList(prev => prev.includes(schemeName) ? prev.filter(n => n !== schemeName) : (prev.length < 3 ? [...prev, schemeName] : prev));
    
    // FIX: The duplicate `onDetailsClick` prop has been removed from the component definition below.
    const InfoCard = ({ item, onDetailsClick, onCompareClick, isCompared }: { item: any; onDetailsClick: () => void; onCompareClick?: () => void; isCompared?: boolean; }) => {
        const isScheme = item.type === 'scheme';
        const Icon = item.logo;
        return (
             <motion.div variants={fadeIn} layout>
                <Card className={`h-full flex flex-col justify-between hover:border-sky-400/80 ${glassCardStyle}`}>
                    <div>
                        <CardHeader>
                            <div className="flex justify-between items-start gap-2">
                                <CardTitle className="text-lg text-slate-800">{item.name}</CardTitle>
                                {isScheme ? <Badge variant="secondary">{item.category}</Badge> : <Icon className={`h-8 w-8 ${item.color}`} />}
                            </div>
                            <CardDescription>{isScheme ? '' : item.provider}</CardDescription>
                            <div className={`w-12 h-1 ${item.color.replace('text-', 'bg-')} rounded-full`}></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600 h-16">{item.purpose}</p>
                            <div className="space-y-2">
                                {item.features.slice(0, 2).map((feature: string) => (
                                    <div key={feature} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </div>
                    <CardContent className="flex items-center gap-2 pt-4">
                        <Button variant="secondary" className="w-full rounded-lg" onClick={onDetailsClick}>
                            View Details<ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                        {isScheme && onCompareClick && (
                             <Button size="icon" variant={isCompared ? "default" : "outline"} onClick={onCompareClick} className="flex-shrink-0">
                                <Scale className="h-4 w-4"/>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        );
    };
    
    const DetailsModal = ({ item, onClose }: { item: any; onClose: () => void }) => {
        const isScheme = item.type === 'scheme';
        const link = isScheme ? item.link : item.applicationLink;

        return (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div initial={{scale:0.95, y:10}} animate={{scale:1, y:0}} exit={{scale:0.95, y:10}} className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto ${glassCardStyle}`}>
                    <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 z-10"><X className="h-5 w-5"/></Button>
                    <CardHeader>
                        <CardTitle className="text-2xl text-slate-800">{item.name}</CardTitle>
                        <CardDescription>{isScheme ? item.category : item.provider}</CardDescription>
                        <div className={`w-16 h-1.5 ${isScheme ? item.color : item.color.replace('text-','bg-')} rounded-full`}></div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="w-full"><Button className="w-full text-lg">{isScheme ? 'Visit Scheme Portal' : 'Apply Now'}<LinkIcon className="ml-2 h-5 w-5"/></Button></a>
                        
                        <div>
                            <h3 className="font-semibold text-lg text-slate-700 mb-3 flex items-center gap-2"><Sparkles className="text-sky-500" />Key Features</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {item.features.map((feature: string) => (
                                    <div key={feature} className="flex items-center gap-2 p-2 bg-slate-50/70 rounded-md border border-slate-200/80">
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-slate-800 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-slate-700 mb-3 flex items-center gap-2"><FileUp className="text-sky-500" />Required Documents</h3>
                            <div className="space-y-3">
                                {item.documents.map((doc: any) => (
                                    <div key={doc.name} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80">
                                        <p className="font-bold text-slate-800">{doc.name}</p>
                                        <p className="text-sm text-slate-600">{doc.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-slate-700 mb-3 flex items-center gap-2"><Handshake className="text-green-500" />Recent Beneficiaries</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {item.beneficiaries.map((b: any) => (
                                    <div key={b.name} className="p-4 bg-slate-50/70 rounded-lg border border-slate-200/80">
                                        <p className="font-bold text-slate-800 flex items-center gap-2"><Building className="h-4 w-4 text-slate-500" />{b.name}</p>
                                        <p className="text-sm text-slate-500 flex items-center gap-2 mt-1"><MapPin className="h-4 w-4" />{b.location}</p>
                                        <p className="text-sm text-slate-600 mt-2 border-l-2 border-sky-300 pl-3 italic flex gap-2"><MessageSquareQuote className="h-5 w-5 text-sky-500 flex-shrink-0" />"{b.story}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans isolate">
             <ShimmerStyle />
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
                   
                    <section>
                         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
                            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3"><Banknote/>Explore Business Loans</motion.h2>
                            <motion.p variants={fadeIn} className="text-lg text-slate-600 mt-2">Find the right financing to fuel your business growth from leading institutions.</motion.p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => <InfoCardShimmer key={index} glassCardStyle={glassCardStyle} />)
                            ) : (
                                businessLoans.map((loan) => (
                                    <InfoCard key={loan.id} item={loan} onDetailsClick={() => setSelectedItem(loan)} />
                                ))
                            )}
                        </div>
                    </section>
                    
                    <section>
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Card className={glassCardStyle}>
                                <CardHeader><CardTitle className="flex items-center gap-3 text-2xl text-slate-800"><Landmark className="text-sky-500" />Explore Government Schemes</CardTitle><CardDescription>Find, compare, and understand schemes that can accelerate your growth.</CardDescription></CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                    <div><Label>Search by Keyword</Label><div className="relative mt-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="e.g., collateral, women, startup..." className="bg-white/70 border-slate-300 pl-10 h-11"/></div></div>
                                    <div><Label>Business Stage</Label><div className="flex gap-2 mt-2"><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'all'})} variant={quizAnswers.age === 'all' ? 'default' : 'secondary'} className="w-full">All</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'new_business'})} variant={quizAnswers.age === 'new_business' ? 'default' : 'secondary'} className="w-full">New</Button><Button onClick={() => setQuizAnswers({...quizAnswers, age: 'existing_business'})} variant={quizAnswers.age === 'existing_business' ? 'default' : 'secondary'} className="w-full">Existing</Button></div></div>
                                </CardContent>
                            </Card>
                        </motion.div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                           {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => <InfoCardShimmer key={index} glassCardStyle={glassCardStyle} />)
                            ) : (
                                <AnimatePresence>
                                    {filteredSchemes.map((scheme) => (
                                         <InfoCard 
                                            key={scheme.name} 
                                            item={scheme} 
                                            onDetailsClick={() => setSelectedItem(scheme)}
                                            onCompareClick={() => handleCompareToggle(scheme.name)}
                                            isCompared={compareList.includes(scheme.name)}
                                        />
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </section>

                   <AnimatePresence>
  {compareList.length > 0 && (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] z-50"
    > 
      <Card className="bg-white/80 backdrop-blur-xl border-slate-300 shadow-2xl"> 
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-slate-800">Scheme Comparison ({compareList.length}/3)</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setCompareList([])}><X className="h-5 w-5"/></Button>
        </CardHeader> 
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-0"> 
          {governmentSchemes.filter(s => compareList.includes(s.name)).map(scheme => (
            <div key={scheme.name} className="p-4 bg-slate-100 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-800">{scheme.name}</h4>
              <ul className="list-disc list-inside mt-2 text-sm text-slate-600">
                {scheme.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))} 
        </CardContent> 
      </Card>
    </motion.div>
  )}
</AnimatePresence>
                </div>
            </div>
            <Chatbot glassCardStyle={glassCardStyle} />
            <AnimatePresence>{selectedItem && <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}</AnimatePresence>
        </div>
    );
};