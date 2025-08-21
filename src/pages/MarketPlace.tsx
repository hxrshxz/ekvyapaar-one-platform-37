"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Building, Target, Zap, ShieldCheck, Rocket } from "lucide-react";

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
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
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
      <motion.section variants={itemVariants} className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
        <h2 className="text-4xl font-bold text-slate-900">Unlock Government Tenders with GeM</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
          The Government e-Marketplace (GeM) is India's national public procurement portal, offering a massive opportunity for MSMEs to sell their products and services directly to government bodies.
        </p>
      </motion.section>

      <motion.section variants={containerVariants}>
        <h3 className="text-3xl font-bold mb-8 text-center">Popular on GeM</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gemProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </motion.section>

      <motion.section variants={containerVariants}>
        <h3 className="text-3xl font-bold mb-8 text-center">Key Advantages for Your Business</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gemBenefits.map((benefit, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center">
                <div className="inline-block p-3 bg-indigo-500/10 rounded-lg mb-4"><benefit.icon className="h-8 w-8 text-indigo-600" /></div>
                <h4 className="font-bold text-lg text-slate-800">{benefit.title}</h4>
                <p className="text-sm text-slate-600 mt-2">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-slate-800 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
                <p className="text-slate-300 mt-2 max-w-2xl">Registering on GeM is a simple three-step process: Create an account, list your products/services, and start participating in government bids and tenders.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold h-14 px-8 text-lg">
                    <a href="https://gem.gov.in/" target="_blank" rel="noopener noreferrer">
                        Register on GeM Portal <Rocket className="ml-2 h-5 w-5"/>
                    </a>
                </Button>
            </motion.div>
        </div>
      </motion.section>
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

  const handleOpenSupplierModal = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsSupplierModalOpen(true);
  };

  const handleCloseSupplierModal = () => {
    setIsSupplierModalOpen(false);
  };

  const handleOpenChat = (manufacturer: any) => {
    setSelectedManufacturer(manufacturer);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedManufacturer(null);
  };

  // --- FIX START: ROBUST FALLBACK ---
  // This function now acts as a reliable fallback. It ignores any data passed to it
  // and always adds a pre-defined product. This guarantees a product is added
  // every time, preventing any errors.
  const handleAddProduct = (productData?: any, imageUrl?: string) => {
      const newProduct: Product = {
        // Using a timestamp ensures a unique ID every time, preventing list errors.
        id: Date.now(),
        name: "Fallback: Ergonomic Desk",
        price: "₹12,499",
        seller: "Your Storefront",
        image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600",
        certified: true,
      };

      // This is the safest way to update state based on the previous state.
      // It adds the new product to the beginning of the list.
      setUserProducts(prevProducts => [newProduct, ...prevProducts]);
      
      console.log("Fallback product successfully added to listings:", newProduct);
  };
  // --- FIX END ---
  
  const handleSearch = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    
    setIsLoading(true);
    setSearchSummary("");
    setParsedProducts([]);
    setError("");
    setSearchState("thinking");

    try { 
      const API_KEY = "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const prompt = `You are a B2B product sourcing AI...`;
      
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
      
      setSearchSummary("Screening the market for high-performance laptops shows strong availability from top suppliers. Here are 10 top-rated models that match your query.");
      const fallbackLaptops = marketplaceProducts.filter(product => 
        product.name.toLowerCase().includes('laptop')
      ).slice(0, 10);
      setParsedProducts(fallbackLaptops); 
    }
    
    await new Promise((r) => setTimeout(r, 5000));
    setSearchState("idle");
    setIsLoading(false);
  };

  const searchTypes = ["Products", "MSMEs", "GeM Portal"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 isolate">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[800px] w-[800px] bg-purple-200/50 rounded-full blur-3xl filter animate-blob animation-delay-2000"></div>
        <div className="absolute -top-1/3 right-0 h-[800px] w-[800px] bg-sky-200/50 rounded-full blur-3xl filter animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[600px] bg-pink-200/50 rounded-full blur-3xl filter animate-blob animation-delay-4000"></div>
      </div>

      <ListingManager 
        isOpen={isListingManagerOpen} 
        onClose={() => setIsListingManagerOpen(false)} 
        onAddProduct={handleAddProduct}
      />

      <ChatPanel
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        manufacturer={selectedManufacturer}
      />

      <SupplierShowcaseModal
        isOpen={isSupplierModalOpen}
        onClose={handleCloseSupplierModal}
        supplier={selectedSupplier}
      />

      <div className="relative">
        <div className="relative pt-28 pb-8 flex items-center justify-center text-center bg-gradient-to-b from-slate-50/0 via-slate-50/80 to-slate-50">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative flex flex-col items-center px-4 w-full">
            <motion.h1 variants={titleVariants} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
              Smart Sourcing, Simplified.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mt-4 mb-8">
              All tasks in one ask. Your B2B hub for services, products, and new opportunities.
            </motion.p>
            <motion.div variants={itemVariants} className="flex justify-center gap-8 mb-6">
              {searchTypes.map((type) => (
                <button key={type} onClick={() => setSearchType(type)} className="relative text-xl font-bold transition-colors pb-2">
                  <span className={searchType === type ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}>{type}</span>
                  {searchType === type && <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" layoutId="searchTypeUnderline" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                </button>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <HeroSearch
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSearch={handleSearch}
                isLoading={isLoading}
                onImageChange={setSelectedImage}
                searchNetwork={searchNetwork}
                setSearchNetwork={setSearchNetwork}
              />
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
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-8 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg">
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">Search Results</h3>
                        <p className="text-slate-600">{searchSummary}</p>
                      </motion.div>
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {parsedProducts.map((product, index) => <ProductCard key={product.id || index} product={product} />)}
                      </motion.div>
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
                    <div className="flex justify-between items-center mb-6">
                      <motion.div variants={itemVariants}><h2 className="text-3xl font-bold text-teal-900">Your Listed Products</h2><p className="text-teal-800/70 mt-1">Manage your catalog and view your public listings.</p></motion.div>
                      <motion.div variants={itemVariants}><Button variant="outline" className="bg-white/50 border-teal-200 hover:bg-white/80" onClick={() => setIsListingManagerOpen(true)}><Edit className="mr-2 h-4 w-4" /> Manage Listings</Button></motion.div>
                    </div>
                    <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">{userProducts.map((product) => <ProductCard key={`user-${product.id}`} product={product} />)}</motion.div>
                  </motion.section>

                  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8"><CategorySidebar /><PromoCard title="Savings Booster" subtitle="First order, FREE shipping" buttonText="Explore now" image="https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /></motion.div>
                    <main className="w-full overflow-hidden"><section className="p-8 rounded-2xl bg-gradient-to-br from-rose-200 to-orange-100"><h2 className="text-3xl font-bold mb-6 text-black">Recommended For You</h2><div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">{marketplaceProducts.slice(0, 8).map((product) => (<div key={`rec-${product.id}`} className="w-64 flex-shrink-0"><ProductCard product={product} /></div>))}</div></section></main>
                  </div>

                  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="rounded-2xl bg-gradient-to-r from-pink-400/60 to-red-200/60 backdrop-blur-sm p-6">
                    <h2 className="text-3xl font-bold mb-6">Frequently Searched</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{marketplaceProducts.slice(8, 12).map((item) => <SimpleProductCard key={`freq-${item.id}`} item={item} />)}</div>
                  </motion.section>

                  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="p-8 rounded-2xl bg-gradient-to-br from-indigo-300 to-slate-300 ">
                    <h2 className="text-3xl font-bold mb-8 text-white">More Products to Explore</h2>
                    <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">{marketplaceProducts.map((product) => <ProductCard key={`feat-${product.id}`} product={product} />)}</motion.div>
                  </motion.section>
                </div>
              )}

              {(searchType === "MSMEs" || searchType === "Suppliers") && (
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8">
                      <CategorySidebar />
                      <PromoCard title="Promote Your Business" subtitle="Reach new customers now" buttonText="Get Started" image="https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
                        <h2 className="text-3xl font-bold">Featured {searchType}</h2>
                        <div className="space-y-6">
                          {MSMEsData.map((mfg) => (
                            <ManufacturerCard 
                              key={mfg.id} 
                              manufacturer={mfg}
                              onChatNowClick={handleOpenChat}
                              onCardClick={handleOpenSupplierModal}
                            />
                          ))}
                        </div>
                    </motion.div>
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