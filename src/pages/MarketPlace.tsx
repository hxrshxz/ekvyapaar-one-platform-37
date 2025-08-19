// src/app/page.tsx

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

// --- Import Refactored Components ---
import { ListingManager } from "@/components/marketplace/ListingManager";
import { HeroSearch } from "@/components/marketplace/HeroSearch";
import { 
    CategorySidebar, 
    PromoCard, 
    ProductCard, 
    SimpleProductCard,
    SearchProgress,
    ManufacturerCard
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
  visible: { opacity: 1, y: 0, transition: { stiffness: 120, damping: 12 } },
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

  const handleAddProduct = (productData: any, imageUrl: string) => {
      const newProduct: Product = {
        id: Math.max(0, ...userProducts.map(p => p.id), ...marketplaceProducts.map(p => p.id)) + 1,
        name: productData.name,
        price: productData.price,
        seller: "Your Storefront",
        image: imageUrl,
        certified: true,
      };
      setUserProducts([newProduct, ...userProducts]);
  };
  
  const handleSearch = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    setIsLoading(true);
    setSearchSummary("");
    setParsedProducts([]);
    setError("");
    setSearchState("thinking");
    try { 
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAHDq0R6ZwrEJpXtZ_tg3GmvxRTCvHvT_U";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const prompt = `
            You are a B2B product sourcing AI. The user is searching for "${inputValue}" within the category "${searchType}" on the "${searchNetwork}" network.
            Your task is to provide a brief market summary and a list of 10 relevant product suggestions.
            You MUST respond with ONLY a valid JSON object. Do not include any text, backticks, or 'json' specifiers before or after the JSON.
            The JSON object must have this exact structure:
            { "summary": "A brief, one-sentence summary of the market for the user's query.", "products": [ { "name": "A specific, descriptive product name.", "price": "An estimated price range in INR (e.g., '₹12,000 - ₹18,000').", "seller": "A plausible Indian or international supplier name.", "image_query": "A simple, 2-3 word search term to find an image for this product (e.g., 'ergonomic gaming chair')." } ] }
            Generate 10 product objects in the 'products' array.
        `;
      await new Promise((r) => setTimeout(r, 1000));
      setSearchState("contacting_ai");
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      await new Promise((r) => setTimeout(r, 1500));
      setSearchState("generating");
      const startIndex = text.indexOf("{");
      const endIndex = text.lastIndexOf("}");
      const jsonString = text.substring(startIndex, endIndex + 1);
      const aiData = JSON.parse(jsonString);
      setSearchSummary(aiData.summary);
      const productsWithImages = aiData.products.map((p: any) => {
        const lowerImageQuery = p.image_query.toLowerCase();
        let dbProduct = marketplaceProducts.find((db) =>
          lowerImageQuery.split(" ").some((keyword) => db.name.toLowerCase().includes(keyword))
        );
        if (!dbProduct) dbProduct = marketplaceProducts[0];
        return { ...dbProduct, name: p.name, price: p.price, seller: p.seller, image: dbProduct.image };
      });
      setParsedProducts(productsWithImages);
    } catch (err) {
      console.error("Error with AI Search:", err);
      setError("The AI failed to generate a response. Please try again.");
    } finally {
      setSearchState("idle");
      setIsLoading(false);
    }
  };

  const searchTypes = ["Products", "MSMEs", "Suppliers"];

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
              {(isLoading || parsedProducts.length > 0 || error) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {isLoading && searchState !== "idle" && <SearchProgress currentState={searchState} />}
                  {!isLoading && parsedProducts.length > 0 && (
                    <div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-8 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg">
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">AI Search Results</h3>
                        <p className="text-slate-600">{searchSummary}</p>
                      </motion.div>
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {parsedProducts.map((product, index) => <ProductCard key={product.id || index} product={product} />)}
                      </motion.div>
                    </div>
                  )}
                  {!isLoading && error && <div className="p-4 bg-red-50/80 border border-red-600/80 rounded-lg backdrop-blur-sm"><p className="text-red-700">{error}</p></div>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="p-8 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100">
            <div className="flex justify-between items-center mb-6">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-teal-900">Your Listed Products</h2>
                <p className="text-teal-800/70 mt-1">Manage your catalog and view your public listings.</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button variant="outline" className="bg-white/50 border-teal-200 hover:bg-white/80" onClick={() => setIsListingManagerOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Manage Listings
                </Button>
              </motion.div>
            </div>
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {userProducts.map((product) => <ProductCard key={`user-${product.id}`} product={product} />)}
            </motion.div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-8">
              <CategorySidebar />
              <PromoCard title="Savings Booster" subtitle="First order, FREE shipping" buttonText="Explore now" image="https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </motion.div>
            <main className="w-full overflow-hidden">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="space-y-16">
                <section className="p-8 rounded-2xl bg-gradient-to-br from-rose-200 to-orange-100">
                  <h2 className="text-3xl font-bold mb-6 text-black">Recommended For You</h2>
                  <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                    {marketplaceProducts.slice(0, 8).map((product) => (
                      <div key={`rec-${product.id}`} className="w-64 flex-shrink-0"><ProductCard product={product} /></div>
                    ))}
                  </div>
                </section>
                {searchType === "Products" && (
                  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-gradient-to-r from-pink-400/60 to-red-200/60 backdrop-blur-sm p-6">
                    <h2 className="text-3xl font-bold mb-6">Frequently Searched</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {marketplaceProducts.slice(8, 12).map((item) => <SimpleProductCard key={`freq-${item.id}`} item={item} />)}
                    </div>
                  </motion.section>
                )}
                {(searchType === "MSMEs" || searchType === "Suppliers") && (
                  <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
                    <h2 className="text-3xl font-bold">Featured {searchType}</h2>
                    <div className="space-y-6">
                      {MSMEsData.map((mfg) => <ManufacturerCard key={mfg.id} manufacturer={mfg} />)}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </main>
          </div>
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-300 to-slate-300 ">
            <h2 className="text-3xl font-bold mb-8 text-white">More Products to Explore</h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {marketplaceProducts.map((product) => <ProductCard key={`feat-${product.id}`} product={product} />)}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}