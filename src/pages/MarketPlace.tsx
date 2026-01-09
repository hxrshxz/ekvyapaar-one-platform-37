"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Edit, Building, Target, Zap, ShieldCheck, Rocket, 
  IndianRupee, Package, BarChart3, Globe, TrendingUp, TrendingDown, AreaChart,
  Lightbulb, FileText, Tag, Palette, Sparkles
} from "lucide-react";

// --- Import Refactored Components ---
import { ListingManager } from "@/components/marketplace/ListingManager";
import { HeroSearch } from "@/components/marketplace/HeroSearch";
import { SupplierShowcaseModal } from "@/components/marketplace/SupplierShowcaseModal";
import { 
    CategorySidebar, 
    PromoCard, 
    ProductCard, 
    SimpleProductCard,
    SearchProgress, 
    ManufacturerCard,
    ChatPanel
} from "@/components/marketplace/UiComponents";

// --- Import Data ---
import { 
  marketplaceProducts, 
  initialUserListedProducts,
  MSMEsData,
  Product 
} from "@/data/marketplaceData";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 12 } },
} as const;

// --- Custom Shimmer Styles and Skeleton Component ---
const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin-pulse { 0% { transform: scale(0.95) rotate(0deg); opacity: 0.7; } 50% { transform: scale(1.05) rotate(180deg); opacity: 1; } 100% { transform: scale(0.95) rotate(360deg); opacity: 0.7; } }
        .shimmer-effect { position: relative; overflow: hidden; background-color: #e2e8f0; }
        .shimmer-effect::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 80%); animation: shimmer 1.5s infinite; }
        .typing-cursor { display: inline-block; width: 3px; height: 1.1em; background-color: #0ea5e9; margin-left: 4px; animation: blink 1s step-end infinite; vertical-align: bottom; }
        .gemini-svg { animation: spin-pulse 4s infinite linear; }
        
        @keyframes generative-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .generative-bg {
            background: linear-gradient(120deg, #fce7f3, #e0f2fe, #f5d0fe, #fce7f3);
            background-size: 300% 300%;
            animation: generative-gradient 6s ease infinite;
        }
    `}</style>
);

const RecommendationSkeleton = () => (
    <Card>
        <CardHeader>
            <div className="h-6 w-3/4 rounded-md shimmer-effect" />
        </CardHeader>
        <CardContent className="space-y-5">
            <div className="space-y-2">
                <div className="h-4 w-1/4 rounded-md shimmer-effect" />
                <div className="h-4 w-full rounded-md shimmer-effect" />
                <div className="h-4 w-5/6 rounded-md shimmer-effect" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-1/4 rounded-md shimmer-effect" />
                <div className="h-4 w-full rounded-md shimmer-effect" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-1/4 rounded-md shimmer-effect" />
                <div className="h-4 w-5/6 rounded-md shimmer-effect" />
            </div>
        </CardContent>
    </Card>
);

// --- Custom Product Card for User's Listings ---
const UserProductCard = ({ product, onAnalyzeClick }: { product: Product, onAnalyzeClick: (product: Product) => void }) => (
    <motion.div variants={itemVariants} className="bg-white/50 border border-slate-200/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col">
        <div className="relative overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            {product.certified && <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">Certified</Badge>}
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-slate-800 truncate">{product.name}</h3>
            <p className="text-sm text-slate-600 mb-2">{product.seller}</p>
            <p className="font-semibold text-slate-900 text-lg mt-auto mb-4">{product.price}</p>
            <Button onClick={() => onAnalyzeClick(product)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                <AreaChart className="mr-2 h-4 w-4" />
                Analyze Performance
            </Button>
        </div>
    </motion.div>
);


// --- ONDC Performance Modal ---
const PerformanceAnalysisModal = ({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: Product | null }) => {
    const [recommendationState, setRecommendationState] = useState<'idle' | 'loading' | 'visible'>('idle');

    useEffect(() => {
      // Reset the recommendation state whenever the modal is closed
      if (!isOpen) {
        setTimeout(() => setRecommendationState('idle'), 300); // delay to prevent UI flash
      }
    }, [isOpen]);

    const handleAskAI = () => {
        setRecommendationState('loading');
        // Simulate an API call to get recommendations
        setTimeout(() => {
            setRecommendationState('visible');
        }, 2500);
    };

    if (!product) return null;

    const summaryData = { totalRevenue: 2847650, totalOrders: 1247, conversionRate: 3.2, networkReach: "250+ Cities" };
    const buyerAppData = [
        { name: "Myntra", logo: "🛍️", status: "Live", unitsSold: 456, revenue: 1041840, conversion: 3.7 },
        { name: "Paytm", logo: "💳", status: "Live", unitsSold: 321, revenue: 733164, conversion: 3.6 },
        { name: "Meesho", logo: "🌶️", status: "Live", unitsSold: 289, revenue: 659996, conversion: 3.2 },
        { name: "Magicpin", logo: "🪄", status: "Improving", unitsSold: 181, revenue: 413650, conversion: 2.8 },
    ];

    const StatCard = ({ icon, title, value, change }: { icon: React.ReactNode, title: string, value: string, change?: number }) => (
        <Card className="bg-slate-50/50"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>{icon}</CardHeader><CardContent><div className="text-2xl font-bold text-slate-900">{value}</div>{change !== undefined && (<p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>{change >= 0 ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown className="h-4 w-4 mr-1"/>}{change}% from last month</p>)}</CardContent></Card>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-slate-50/80 backdrop-blur-xl border-slate-200/60">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900">ONDC Network Performance</DialogTitle>
                    <p className="text-slate-600 pt-1">Analytics for '{product.name}'</p>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={<IndianRupee className="h-5 w-5 text-slate-500" />} title="Total Revenue" value={`₹${(summaryData.totalRevenue / 100000).toFixed(2)}L`} change={8.3} />
                        <StatCard icon={<Package className="h-5 w-5 text-slate-500" />} title="Total Orders" value={summaryData.totalOrders.toLocaleString()} change={12.5} />
                        <StatCard icon={<BarChart3 className="h-5 w-5 text-slate-500" />} title="Conversion Rate" value={`${summaryData.conversionRate}%`} change={-2.1} />
                        <StatCard icon={<Globe className="h-5 w-5 text-slate-500" />} title="Network Reach" value={summaryData.networkReach} />
                    </div>
                    <Card><CardHeader><CardTitle>Buyer App Breakdown</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead className="w-[200px]">Buyer App</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Units Sold</TableHead><TableHead className="text-right">Revenue</TableHead><TableHead className="text-right">Conversion</TableHead></TableRow></TableHeader><TableBody>{buyerAppData.map((app) => (<TableRow key={app.name}><TableCell className="font-medium">{app.logo} {app.name}</TableCell><TableCell><Badge variant={app.status === 'Live' ? 'default' : 'secondary'}>{app.status}</Badge></TableCell><TableCell className="text-right">{app.unitsSold.toLocaleString()}</TableCell><TableCell className="text-right">₹{app.revenue.toLocaleString()}</TableCell><TableCell className="text-right">{app.conversion}%</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>

                    <div className="pt-2">
                        {recommendationState === 'idle' && (
                            <Button onClick={handleAskAI} className="w-full h-12 text-base font-bold text-slate-800 hover:opacity-90 generative-bg transition-opacity">
                                <Sparkles className="mr-2 h-5 w-5 gemini-svg" />
                                Ask AI for Recommendations
                            </Button>
                        )}
                        {recommendationState === 'loading' && <RecommendationSkeleton />}
                        {recommendationState === 'visible' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card>
                                    <CardHeader><CardTitle className="flex items-center text-slate-800"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />AI-Powered Recommendations</CardTitle></CardHeader>
                                    <CardContent className="space-y-5 text-sm">
                                        <div className="flex items-start gap-3"><FileText className="h-5 w-5 flex-shrink-0 mt-1 text-indigo-500" /><div><h4 className="font-semibold text-slate-700">Title Optimization</h4><p className="text-slate-600">To improve click-through rates, try a more descriptive title:</p><p className="font-medium text-indigo-700 bg-indigo-100 rounded px-2 py-1 mt-1.5 inline-block">"Pro-Grade Ergonomic Office Chair for All-Day Comfort"</p></div></div>
                                        <div className="flex items-start gap-3"><Tag className="h-5 w-5 flex-shrink-0 mt-1 text-teal-500" /><div><h4 className="font-semibold text-slate-700">SEO Keywords</h4><p className="text-slate-600">Include these keywords in your product description to improve search visibility:</p><div className="flex flex-wrap gap-2 mt-2"><Badge variant="outline">lumbar support</Badge><Badge variant="outline">adjustable armrests</Badge><Badge variant="outline">home office</Badge><Badge variant="outline">wfh essential</Badge><Badge variant="outline">high-back design</Badge></div></div></div>
                                        <div className="flex items-start gap-3"><Palette className="h-5 w-5 flex-shrink-0 mt-1 text-rose-500" /><div><h4 className="font-semibold text-slate-700">Market Trend</h4><p className="text-slate-600">The color <span className="font-bold text-slate-800">Matte Black</span> is currently trending for office furniture. Consider adding it as a new product variant to capture more sales.</p></div></div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


// --- GeM Portal Content Component ---
const GeMPortalView = () => {
  const gemBenefits = [
    { icon: Target, title: "Direct Market Access", description: "Sell directly to Government departments, organizations, and Public Sector Units." },
    { icon: Zap, title: "Streamlined Process", description: "A fully online and paperless platform for easy registration and participation." },
    { icon: ShieldCheck, title: "Transparency & Security", description: "Ensures fair processes with online bidding and secure, timely payments." },
    { icon: Building, title: "MSME Focused", description: "Special provisions and preferences are given to MSME vendors in procurement." },
  ];
  const gemProducts: Product[] = [
    { id: 101, name: "Revolving Office Executive Chair", price: "₹5,000 - ₹12,000", seller: "GeM Vendor", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=600", certified: true },
    { id: 102, name: "High-Speed Multifunction Printer", price: "₹15,000 - ₹25,000", seller: "GeM Vendor", image: "https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=600", certified: true },
    { id: 103, name: "Manpower & Security Services", price: "Service-based", seller: "GeM Vendor", image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600", certified: true },
    { id: 104, name: "Desktop Computers (Core i5)", price: "₹40,000 - ₹55,000", seller: "GeM Vendor", image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600", certified: true },
  ];
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
      <motion.section variants={itemVariants} className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100"><h2 className="text-4xl font-bold text-slate-900">Unlock Government Tenders with GeM</h2><p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">The Government e-Marketplace (GeM) is India's national public procurement portal, offering a massive opportunity for MSMEs to sell their products and services directly to government bodies.</p></motion.section>
      <motion.section variants={containerVariants}><h3 className="text-3xl font-bold mb-8 text-center">Popular on GeM</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{gemProducts.map(product => <ProductCard key={product.id} product={product} />)}</div></motion.section>
      <motion.section variants={containerVariants}><h3 className="text-3xl font-bold mb-8 text-center">Key Advantages for Your Business</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{gemBenefits.map((benefit, i) => (<motion.div key={i} variants={itemVariants}><Card className="h-full bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center"><div className="inline-block p-3 bg-indigo-500/10 rounded-lg mb-4"><benefit.icon className="h-8 w-8 text-indigo-600" /></div><h4 className="font-bold text-lg text-slate-800">{benefit.title}</h4><p className="text-sm text-slate-600 mt-2">{benefit.description}</p></Card></motion.div>))}</div></motion.section>
      <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-slate-800 text-white"><div className="flex flex-col md:flex-row items-center justify-between gap-8"><div><h3 className="text-3xl font-bold">Ready to Get Started?</h3><p className="text-slate-300 mt-2 max-w-2xl">Registering on GeM is a simple three-step process: Create an account, list your products/services, and start participating in government bids and tenders.</p></div><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold h-14 px-8 text-lg"><a href="https://gem.gov.in/" target="_blank" rel="noopener noreferrer">Register on GeM Portal <Rocket className="ml-2 h-5 w-5"/></a></Button></motion.div></div></motion.section>
    </motion.div>
  );
};


export default function MarketplacePage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchSummary, setSearchSummary] = useState("");
  const [parsedProducts, setParsedProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [searchState, setSearchState] = useState("idle");
  const [searchType, setSearchType] = useState("Products");
  const [searchNetwork, setSearchNetwork] = useState("ONDC Network");
  const [isListingManagerOpen, setIsListingManagerOpen] = useState(false);
  const [userProducts, setUserProducts] = useState<Product[]>(initialUserListedProducts);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState<any | null>(null);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
  
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [selectedProductForAnalysis, setSelectedProductForAnalysis] = useState<Product | null>(null);

  const handleOpenPerformanceModal = (product: Product) => { setSelectedProductForAnalysis(product); setIsPerformanceModalOpen(true); };
  const handleClosePerformanceModal = () => { setIsPerformanceModalOpen(false); };
  const handleOpenSupplierModal = (supplier: any) => { setSelectedSupplier(supplier); setIsSupplierModalOpen(true); };
  const handleCloseSupplierModal = () => { setIsSupplierModalOpen(false); };
  const handleOpenChat = (manufacturer: any) => { setSelectedManufacturer(manufacturer); setIsChatOpen(true); };
  const handleCloseChat = () => { setIsChatOpen(false); setSelectedManufacturer(null); };

  const handleAddProduct = () => {
      const newProduct: Product = { id: Date.now(), name: "Fallback: Ergonomic Desk", price: "₹12,499", seller: "Your Storefront", image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600", certified: true, };
      setUserProducts(prevProducts => [newProduct, ...prevProducts]);
  };
  
  const handleSearch = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    setIsLoading(true); setSearchSummary(""); setParsedProducts([]); setError(""); setSearchState("thinking");
    try { 
      const API_KEY = "YOUR_API_KEY_HERE";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const prompt = `You are a B2B product sourcing AI. Based on the user query: "${inputValue}", generate a JSON response with:
1. "summary": A brief 1-2 sentence summary of the search results.
2. "products": An array of 4-8 product objects with "name", "price", "seller", and "image_query" (a short keyword for finding a stock image).
Respond ONLY with valid JSON.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      const jsonString = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const aiData = JSON.parse(jsonString);
      setSearchSummary(aiData.summary);
      const productsWithImages = aiData.products.map((p: any) => {
        const lowerImageQuery = p.image_query.toLowerCase();
        let dbProduct = marketplaceProducts.find((db) => lowerImageQuery.split(" ").some((keyword) => db.name.toLowerCase().includes(keyword)));
        if (!dbProduct) dbProduct = marketplaceProducts[Math.floor(Math.random() * marketplaceProducts.length)];
        return { ...dbProduct, name: p.name, price: p.price, seller: p.seller, image: dbProduct.image };
      });
      setParsedProducts(productsWithImages);
    } catch (err) {
      console.error("Error with AI Search, initiating seamless fallback:", err);
      // Query-aware fallback: search the local product database
      const queryWords = inputValue.toLowerCase().split(" ").filter(w => w.length > 2);
      let fallbackProducts = marketplaceProducts.filter(product => 
        queryWords.some(word => product.name.toLowerCase().includes(word))
      );
      if (fallbackProducts.length === 0) {
        // If no match, show a random selection
        fallbackProducts = marketplaceProducts.sort(() => 0.5 - Math.random()).slice(0, 8);
      }
      setSearchSummary(`Showing results for "${inputValue}". Here are ${fallbackProducts.length} products that match your query.`);
      setParsedProducts(fallbackProducts.slice(0, 10)); 
    }
    await new Promise((r) => setTimeout(r, 2500)); // Increased delay for demo
    setSearchState("idle"); setIsLoading(false);
  };

  const searchTypes = ["Products", "MSMEs", "GeM Portal"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 isolate">
      <ShimmerStyle />
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/50 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/50 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/50 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>

      <ListingManager isOpen={isListingManagerOpen} onClose={() => setIsListingManagerOpen(false)} onAddProduct={handleAddProduct} />
      <ChatPanel isOpen={isChatOpen} onClose={handleCloseChat} manufacturer={selectedManufacturer} />
      <SupplierShowcaseModal isOpen={isSupplierModalOpen} onClose={handleCloseSupplierModal} supplier={selectedSupplier} />
      <PerformanceAnalysisModal isOpen={isPerformanceModalOpen} onClose={handleClosePerformanceModal} product={selectedProductForAnalysis} />

      <div className="relative">
        <div className="relative pt-28 pb-8 flex items-center justify-center text-center bg-gradient-to-b from-slate-50/0 via-slate-50/80 to-slate-50 mt-[-4rem]">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative flex flex-col items-center px-4 w-full">
            <motion.h1 variants={titleVariants} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">Smart Sourcing, Simplified.</motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mt-4 mb-8">All tasks in one ask. Your B2B hub for services, products, and new opportunities.</motion.p>
            <motion.div variants={itemVariants} className="flex justify-center gap-8 mb-6">
              {searchTypes.map((type) => (
                <button key={type} onClick={() => setSearchType(type)} className="relative text-xl font-bold transition-colors pb-2">
                  <span className={searchType === type ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}>{type}</span>
                  {searchType === type && <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" layoutId="searchTypeUnderline" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                </button>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <HeroSearch inputValue={inputValue} setInputValue={setInputValue} handleSearch={handleSearch} isLoading={isLoading} onImageChange={setSelectedImage} searchNetwork={searchNetwork} setSearchNetwork={setSearchNetwork} />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="my-12">
            <AnimatePresence>
              {(isLoading || parsedProducts.length > 0) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {isLoading && searchState !== "idle" && <SearchProgress />}
                  {!isLoading && parsedProducts.length > 0 && (
                    <div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-8 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg"><h3 className="font-semibold text-lg text-slate-800 mb-2">Search Results</h3><p className="text-slate-600">{searchSummary}</p></motion.div>
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{parsedProducts.map((product, index) => <ProductCard key={product.id || index} product={product} />)}</motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div key={searchType} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {searchType === "Products" && (
                <div className="space-y-12">
                   <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="p-8 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100">
                    <div className="flex justify-between items-center mb-6"><motion.div variants={itemVariants}><h2 className="text-3xl font-bold text-teal-900">Your Listed Products</h2><p className="text-teal-800/70 mt-1">Manage your catalog and view your public listings.</p></motion.div><motion.div variants={itemVariants}><Button variant="outline" className="bg-white/50 border-teal-200 hover:bg-white/80" onClick={() => setIsListingManagerOpen(true)}><Edit className="mr-2 h-4 w-4" /> Manage Listings</Button></motion.div></div>
                    <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">{userProducts.map((product) => <UserProductCard key={`user-${product.id}`} product={product} onAnalyzeClick={handleOpenPerformanceModal} />)}</motion.div>
                  </motion.section>
                  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8"><CategorySidebar /><PromoCard title="Savings Booster" subtitle="First order, FREE shipping" buttonText="Explore now" image="https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /></motion.div>
                    <main className="w-full overflow-hidden"><section className="p-8 rounded-2xl bg-gradient-to-br from-rose-200 to-orange-100"><h2 className="text-3xl font-bold mb-6 text-black">Recommended For You</h2><div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">{marketplaceProducts.slice(0, 8).map((product) => (<div key={`rec-${product.id}`} className="w-64 flex-shrink-0"><ProductCard product={product} /></div>))}</div></section></main>
                  </div>
                  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="rounded-2xl bg-gradient-to-r from-pink-400/60 to-red-200/60 backdrop-blur-sm p-6"><h2 className="text-3xl font-bold mb-6">Frequently Searched</h2><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{marketplaceProducts.slice(8, 12).map((item) => <SimpleProductCard key={`freq-${item.id}`} item={item} />)}</div></motion.section>
                  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="p-8 rounded-2xl bg-gradient-to-br from-indigo-300 to-slate-300 "><h2 className="text-3xl font-bold mb-8 text-white">More Products to Explore</h2><motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">{marketplaceProducts.map((product) => <ProductCard key={`feat-${product.id}`} product={product} />)}</motion.div></motion.section>
                </div>
              )}
              {(searchType === "MSMEs" || searchType === "Suppliers") && (
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8"><CategorySidebar /><PromoCard title="Promote Your Business" subtitle="Reach new customers now" buttonText="Get Started" image="https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /></motion.div>
                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8"><h2 className="text-3xl font-bold">Featured {searchType}</h2><div className="space-y-6">{MSMEsData.map((mfg) => ( <ManufacturerCard key={mfg.id} manufacturer={mfg} onChatNowClick={handleOpenChat} onCardClick={handleOpenSupplierModal} /> ))}</div></motion.div>
                </div>
              )}
              {searchType === "GeM Portal" && (<GeMPortalView />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}