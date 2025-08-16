"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Search, Star, Factory, Smartphone, Truck, Wand2, Camera, Info, Loader2, X as XIcon, Check, ChevronRight, Shirt, Building, HeartPulse, Leaf, Droplets, Globe, Store, Gem, Watch, HardHat, Package, Paintbrush, ToyBrick, Dog } from "lucide-react";

// --- EXPANDED "DATABASE" WITH MANY MORE PRODUCTS ---
const marketplaceProducts = [
  { id: 1, category: "laptops", name: "2023 Hot Selling Laptop Windows 11", price: "₹21,687 - ₹25,435", seller: "DI Xiang Industrial", image: "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 2, category: "laptops", name: "Original Fairly Brand New Laptops", price: "₹11,602 - ₹19,188", seller: "Verified Electronics", image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 3, category: "laptops", name: "High-Performance Gaming Laptop", price: "₹85,000 - ₹95,000", seller: "Gamer's Hub", image: "https://images.pexels.com/photos/7915228/pexels-photo-7915228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 4, category: "textiles", name: "Organic Cotton Fabric (40s Count)", price: "₹120 - ₹150 /meter", seller: "Ludhiana Textile Mills", image: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 5, category: "textiles", name: "Hand-Blocked Print Silk Fabric", price: "₹450 - ₹600 /meter", seller: "Jaipur Prints Co.", image: "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 6, category: "industrial", name: "Stainless Steel Ball Valves (DN50)", price: "₹8,500 /unit", seller: "Precision Engineering", image: "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 7, category: "apparel", name: "Men's Formal Cotton Shirts", price: "₹450 - ₹700", seller: "Tiruppur Garments", image: "https://images.pexels.com/photos/5905915/pexels-photo-5905915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 8, category: "health", name: "N95 Protective Face Masks", price: "₹15 - ₹25 /piece", seller: "Surat Medical Supplies", image: "https://images.pexels.com/photos/3951615/pexels-photo-3951615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 9, category: "auto", name: "Motorcycle Alloy Wheels", price: "₹3,500 - ₹5,000 /set", seller: "Delhi Auto Parts", image: "https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 10, category: "electronics", name: "Smart Watch with AMOLED Display", price: "₹1,800 - ₹2,500", seller: "Shenzhen Tech", image: "https://images.pexels.com/photos/207823/pexels-photo-207823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: false },
  { id: 11, category: "agriculture", name: "Premium Basmati Rice", price: "₹80 - ₹120 /kg", seller: "Haryana Rice Mills", image: "https://images.pexels.com/photos/1547738/pexels-photo-1547738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 12, category: "construction", name: "UPVC Windows and Doors", price: "₹450 /sq.ft", seller: "Jaipur Fabricators", image: "https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 13, category: "industrial", name: "High-Pressure Hydraulic Pump", price: "₹35,000 /unit", seller: "Ahmedabad Hydraulics", image: "https://images.pexels.com/photos/6462713/pexels-photo-6462713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 14, category: "apparel", name: "Women's Kurtis (Rayon)", price: "₹300 - ₹550", seller: "Jaipur Prints Co.", image: "https://images.pexels.com/photos/17650033/pexels-photo-17650033/free-photo-of-a-woman-in-a-traditional-indian-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
  { id: 15, category: "electronics", name: "Bluetooth TWS Earbuds", price: "₹800 - ₹1,200", seller: "Global Imports", image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: false },
  { id: 16, category: "laptops", name: "Refurbished Business Laptops", price: "₹15,000 - ₹22,000", seller: "Laptop Renew", image: "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", certified: true },
];

const categories = [
    { name: "Industrial Machinery", icon: Factory, sub: ["Construction Machinery", "Manufacturing Equipment", "Tools & Hardware"] },
    { name: "Consumer Electronics", icon: Smartphone, sub: ["Mobile Phones", "Laptops & Gaming", "Smart Watches & Accessories"] },
    { name: "Vehicles & Transportation", icon: Truck, sub: ["Trucks & Buses", "Motorcycles", "Auto Parts & Accessories"] },
    { name: "Apparel & Accessories", icon: Shirt, sub: ["Men's Clothing", "Women's Clothing", "Fashion Accessories"] },
    { name: "Jewelry, Eyewear, Watches", icon: Gem, sub: ["Fine Jewelry", "Fashion Watches", "Eyeglasses & Frames"] },
    { name: "Home & Garden", icon: Building, sub: ["Furniture", "Garden Supplies", "Home Decor", "Home Appliances"] },
    { name: "Beauty & Personal Care", icon: HeartPulse, sub: ["Skincare", "Makeup", "Hair Care", "Medical Supplies"] },
    { name: "Packaging & Printing", icon: Package, sub: ["Packaging Boxes", "Printing Services", "Adhesive Tapes"] },
    { name: "Construction & Real Estate", icon: HardHat, sub: ["Building Materials", "Doors & Windows", "Real Estate Services"] },
    { name: "Agriculture & Food", icon: Leaf, sub: ["Fresh Produce", "Packaged Food", "Agricultural Machinery"] },
    { name: "Toys, Kids & Babies", icon: ToyBrick, sub: ["Baby Care", "Educational Toys", "Outdoor Play"] },
    { name: "Raw Materials", icon: Droplets, sub: ["Metals & Alloys", "Chemicals", "Plastics & Polymers"] },
    { name: "Gifts & Crafts", icon: Paintbrush, sub: ["Corporate Gifting", "Handicrafts", "Festive Decor"] },
    { name: "Pet Supplies", icon: Dog, sub: ["Pet Food", "Pet Toys", "Grooming Supplies"] },
];

const CategorySidebar = () => (
    <div>
        <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg p-4">
            <h3 className="font-bold text-lg text-slate-800 mb-4 px-2">Categories</h3>
            <nav className="space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100/50 scrollbar-thumb-rounded-full">
                {categories.map((category) => (
                    <div key={category.name} className="relative group">
                        <a href="#" className="flex items-center w-full text-left p-2 pr-1 rounded-lg text-slate-600 hover:bg-sky-100/70 hover:text-sky-700 transition-colors">
                            <category.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                            <span className="flex-grow font-medium text-sm">{category.name}</span>
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                        </a>
                        <div className="absolute left-full top-0 w-64 ml-2 pl-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10">
                           <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-xl shadow-xl p-4">
                             <h4 className="font-bold text-slate-800 mb-3">{category.name}</h4>
                             <div className="space-y-2">
                               {category.sub.map(subItem => ( <a href="#" key={subItem} className="block text-sm text-slate-600 hover:text-sky-600 hover:underline">{subItem}</a> ))}
                             </div>
                           </div>
                        </div>
                    </div>
                ))}
            </nav>
        </Card>
    </div>
);

const PromoCard = ({ title, subtitle, buttonText, image }) => (
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden group">
        <div className="relative">
            <img src={image} className="w-full h-40 object-cover" alt="Promotion"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-bold text-xl">{title}</h3>
                <p className="text-slate-200 text-sm">{subtitle}</p>
            </div>
        </div>
        <CardContent className="p-4">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">{buttonText}</Button>
        </CardContent>
    </Card>
);

const ProductCard = ({ product }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="group">
    <Card className="h-full bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" /></div>
      <CardContent className="p-4 space-y-2 flex flex-col h-full">
        <h3 className="font-semibold text-slate-800 h-12">{product.name}</h3>
        <p className="text-lg font-bold text-sky-600">{product.price}</p>
        <div className="text-sm text-slate-500"> Sold by <span className="text-slate-700 font-medium">{product.seller}</span> {product.certified && ( <Check className="inline-block h-4 w-4 ml-1 text-green-500" /> )} </div>
        <Button className="w-full mt-auto bg-slate-800 text-white hover:bg-slate-900"> Contact Supplier </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const SimpleProductCard = ({ item }) => (
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
        <a href="#" className="block">
            <CardHeader className="p-0">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-xs text-slate-500">Frequently searched</p>
                <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
            </CardContent>
        </a>
    </Card>
);

const HeroSearch = ({ inputValue, setInputValue, handleSearch, isLoading, selectedImage, onImageChange, clearImage, searchNetwork, setSearchNetwork }) => {
  const [deepSearch, setDeepSearch] = useState(true);
  const fileInputRef = useRef(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("Search for 'cotton fabric'...");
  const placeholders = useMemo(() => ["Search for 'cotton fabric'...", "Try 'industrial pumps'...", "Find 'gaming laptops'...", "Enter 'stainless steel parts'..."], []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => { index = (index + 1) % placeholders.length; setCurrentPlaceholder(placeholders[index]); }, 4000);
    return () => clearInterval(interval);
  }, [placeholders]);
  
  const searchNetworks = ["ONDC Network", "Global Sources"];
  const handleImageButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => { const file = event.target.files[0]; if (file) onImageChange(file); };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-sky-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-full flex items-center">
                <Search className="h-6 w-6 text-slate-500 flex-shrink-0 ml-3 absolute left-0" />
                <AnimatePresence mode="wait">
                  {!inputValue && (
                    <motion.p key={currentPlaceholder} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="absolute left-12 text-lg text-slate-500 pointer-events-none">
                      {currentPlaceholder}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full bg-transparent border-none text-lg h-auto py-3 pl-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0" onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSearch()} />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="rounded-xl h-12 px-8 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-32 flex-shrink-0">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="text-base">Search</span>}
            </Button>
          </div>
          <div className="flex items-center justify-between pl-2 pr-1">
            <div className="relative flex items-center gap-1 rounded-full bg-slate-200/70 p-1">
              {searchNetworks.map(network => (
                <button key={network} onClick={() => setSearchNetwork(network)} className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors">
                  {searchNetwork === network && ( <motion.div layoutId="searchNetworkPill" className="absolute inset-0 bg-purple-500 rounded-full" /> )}
                  <span className={`relative z-10 flex items-center gap-2 ${searchNetwork === network ? 'text-white' : 'text-slate-600'}`}>
                    {network === "ONDC Network" ? <Store className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                    {network}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild><div className="flex items-center space-x-2 cursor-pointer"><Wand2 className="h-5 w-5 text-purple-500" /><label htmlFor="deep-search" className="text-sm font-medium text-slate-700">Deep Search</label><Switch id="deep-search" checked={deepSearch} onCheckedChange={setDeepSearch} /></div></HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600"><Info className="h-5 w-5 text-sky-500 mt-1" /><div><h4 className="font-semibold text-slate-900">Live AI Search</h4><p className="text-sm">This search uses a live AI model to generate results.</p></div></HoverCardContent>
              </HoverCard>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg" onClick={handleImageButtonClick}><Camera className="h-4 w-4 mr-2" /><span className="text-sm">Image Search</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchProgress = ({ currentState }) => {
    const searchSteps = [ { key: "thinking", text: "Analyzing your query..." }, { key: "contacting_ai", text: "Contacting sourcing AI..." }, { key: "generating", text: "Generating product matches..." }, ];
    const currentIndex = searchSteps.findIndex( (step) => step.key === currentState );
    return ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg text-left"> <h3 className="font-semibold text-lg text-slate-900 mb-4"> Deep Search in Progress </h3> <div className="space-y-3"> {searchSteps.map((step, index) => { const isCompleted = currentIndex > index; const isActive = currentIndex === index; return ( <div key={step.key} className="flex items-center space-x-3 text-slate-600"> <div className={`flex items-center justify-center h-5 w-5 rounded-full transition-colors duration-300 ${ isCompleted ? "bg-green-500" : isActive ? "bg-sky-500/20" : "bg-slate-200" }`}> {isCompleted ? ( <Check className="h-4 w-4 text-white" /> ) : isActive ? ( <Loader2 className="h-4 w-4 animate-spin text-sky-500" /> ) : ( <div className="h-2 w-2 bg-slate-400 rounded-full"></div> )} </div> <span className={`transition-colors duration-300 ${ isCompleted ? "text-slate-400 line-through" : isActive ? "text-slate-900 font-medium" : "text-slate-500" }`}> {step.text} </span> </div> ); })} </div> </motion.div> );
};

export const Marketplace = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchSummary, setSearchSummary] = useState("");
  const [parsedProducts, setParsedProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchState, setSearchState] = useState("idle");
  const [searchType, setSearchType] = useState("Products");
  const [searchNetwork, setSearchNetwork] = useState("ONDC Network");

  const handleSearch = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    setIsLoading(true);
    setSearchSummary("");
    setParsedProducts([]);
    setError("");
    setSearchState('thinking');
    try {
        const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const prompt = `
            You are a B2B product sourcing AI. The user is searching for "${inputValue}" within the category "${searchType}" on the "${searchNetwork}" network.
            Your task is to provide a brief market summary and a list of 10 relevant product suggestions.
            You MUST respond with ONLY a valid JSON object. Do not include any text, backticks, or 'json' specifiers before or after the JSON.
            The JSON object must have this exact structure:
            { "summary": "A brief, one-sentence summary of the market for the user's query.", "products": [ { "name": "A specific, descriptive product name.", "price": "An estimated price range in INR (e.g., '₹12,000 - ₹18,000').", "seller": "A plausible Indian or international supplier name.", "image_query": "A simple, 2-3 word search term to find an image for this product (e.g., 'ergonomic gaming chair')." } ] }
            Generate 10 product objects in the 'products' array.
        `;
        await new Promise(r => setTimeout(r, 1000)); setSearchState('contacting_ai');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        await new Promise(r => setTimeout(r, 1500)); setSearchState('generating');
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        const jsonString = text.substring(startIndex, endIndex + 1);
        const aiData = JSON.parse(jsonString);
        setSearchSummary(aiData.summary);
        const productsWithImages = aiData.products.map(p => {
            const lowerImageQuery = p.image_query.toLowerCase();
            let dbProduct = marketplaceProducts.find(db => lowerImageQuery.split(' ').some(keyword => db.name.toLowerCase().includes(keyword)));
            if (!dbProduct) dbProduct = marketplaceProducts[0];
            return { ...dbProduct, name: p.name, price: p.price, seller: p.seller, image: dbProduct.image, };
        });
        setParsedProducts(productsWithImages);
    } catch (err) {
        console.error("Error with AI Search:", err);
        setError("The AI failed to generate a response. Please try again.");
    } finally {
        setSearchState('idle');
        setIsLoading(false);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const searchTypes = ["Products", "Manufacturers", "Suppliers"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 isolate">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/50 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/50 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/50 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative">
        <div className="relative pt-28 pb-16 flex items-center justify-center text-center bg-gradient-to-b from-slate-50/0 via-slate-50/80 to-slate-50">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex flex-col items-center px-4 w-full">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">Smart Sourcing, Simplified.</motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-2xl mt-4 mb-8">All tasks in one ask. Your B2B hub for services, products, and new opportunities.</motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-8 mb-6">
                {searchTypes.map(type => (
                    <button key={type} onClick={() => setSearchType(type)} className="relative text-xl font-bold transition-colors pb-2">
                        <span className={searchType === type ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}>{type}</span>
                        {searchType === type && ( <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" layoutId="searchTypeUnderline" /> )}
                    </button>
                ))}
            </motion.div>
            <motion.div variants={fadeIn} className="w-full">
              <HeroSearch 
                inputValue={inputValue} setInputValue={setInputValue} 
                handleSearch={handleSearch} isLoading={isLoading} 
                selectedImage={selectedImage} onImageChange={setSelectedImage} clearImage={() => setSelectedImage(null)}
                searchNetwork={searchNetwork} setSearchNetwork={setSearchNetwork}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-16">
           <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <div className="space-y-8">
                <CategorySidebar />
                <PromoCard  title="Savings Booster" subtitle="First order, FREE shipping" buttonText="Explore now" image="https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
              </div>
              <main className="w-full overflow-hidden">
                <AnimatePresence>
                  { (isLoading || parsedProducts.length > 0 || error) ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-12">
                        {isLoading && searchState !== 'idle' && <SearchProgress currentState={searchState} />}
                        {!isLoading && (parsedProducts.length > 0) && (
                            <div>
                                <div className="p-6 mb-8 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg">
                                    <h3 className="font-semibold text-lg text-slate-800 mb-2">AI Search Summary</h3>
                                    <p className="text-slate-600">{searchSummary}</p>
                                </div>
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {parsedProducts.map((product, index) => ( <ProductCard key={product.id || index} product={product} /> ))}
                                </motion.div>
                            </div>
                        )}
                        {!isLoading && error && ( <div className="mt-4 p-4 bg-red-50/80 border border-red-200/80 rounded-lg backdrop-blur-sm"><p className="text-red-700">{error}</p></div> )}
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                      <section>
                         <h2 className="text-3xl font-bold mb-6">Frequently Searched</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                             {marketplaceProducts.slice(8, 12).map((item) => (
                               <SimpleProductCard key={`freq-${item.id}`} item={item} />
                             ))}
                         </div>
                      </section>
                      
                      {/* --- MODIFIED: Sectional Backgrounds Updated to Match Reference --- */}
                      <section className="p-8 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-50">
                          <h2 className="text-3xl font-bold mb-6 text-rose-900">Recommended For You</h2>
                          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                              {marketplaceProducts.slice(0, 8).map((product) => (
                                  <div key={`rec-${product.id}`} className="w-64 flex-shrink-0">
                                     <ProductCard product={product} />
                                  </div>
                              ))}
                          </div>
                      </section>
                      
                      <section className="p-8 rounded-2xl bg-gradient-to-br from-indigo-300 to-slate-300">
                        <h2 className="text-3xl font-bold mb-8 text-white">More Products to Explore</h2>
                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                          {marketplaceProducts.map((product) => ( <ProductCard key={`feat-${product.id}`} product={product} /> ))}
                        </motion.div>
                      </section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
           </div>
        </div>
      </div>
    </div>
  );
};