"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { StrategicCoPilot } from '@/components/StrategicCopilot';
import { 
    X as XIcon, 
    UploadCloud, 
    Edit, 
    Loader2, 
    Wand2, 
    ChevronRight,
    Check,
    Sparkles
} from 'lucide-react';

// --- STYLES & SKELETON COMPONENT ---

// Enhanced styles for the generative shimmer effect
const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes generative-gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blink { 50% { opacity: 0; } }

        .generative-bg {
            background: linear-gradient(110deg, #fde2ff, #e0f2fe, #fde2ff);
            background-size: 200% 200%;
            animation: generative-gradient 3s ease infinite;
        }
        .shimmer-effect { 
            position: relative; 
            overflow: hidden; 
        }
        .shimmer-effect::after { 
            content: ''; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 80%); 
            animation: shimmer 1.5s infinite; 
        }
        .typing-cursor { 
            display: inline-block; 
            width: 3px; 
            height: 1em; 
            background-color: #3b82f6; 
            margin-left: 4px; 
            animation: blink 1s step-end infinite; 
            vertical-align: bottom; 
        }
    `}</style>
);

// New skeleton component for the loading state
const ListingGeneratorSkeleton = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-purple-400" />
        <h3 className="font-semibold text-slate-700">Analyzing image and generating details<span className="typing-cursor"></span></h3>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-1/3 rounded-lg generative-bg shimmer-effect"></div>
        <div className="h-9 w-full rounded-lg generative-bg shimmer-effect"></div>
      </div>
       <div className="space-y-4">
        <div className="h-5 w-1/4 rounded-lg generative-bg shimmer-effect"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-9 w-full rounded-lg generative-bg shimmer-effect"></div>
          <div className="h-9 w-full rounded-lg generative-bg shimmer-effect"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-1/2 rounded-lg generative-bg shimmer-effect"></div>
        <div className="h-20 w-full rounded-lg generative-bg shimmer-effect"></div>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-1/4 rounded-lg generative-bg shimmer-effect"></div>
        <div className="flex gap-2">
           <div className="h-6 w-24 rounded-full generative-bg shimmer-effect"></div>
           <div className="h-6 w-32 rounded-full generative-bg shimmer-effect"></div>
           <div className="h-6 w-28 rounded-full generative-bg shimmer-effect"></div>
        </div>
      </div>
    </div>
);


// --- MAIN COMPONENT ---

export const ListingManager = ({ isOpen, onClose, onAddProduct }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedListing, setGeneratedListing] = useState(null);
  const [error, setError] = useState('');
  const [showProductManager, setShowProductManager] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      generateListingDetails(file);
    }
  };

  const generateListingDetails = async (file) => {
    setIsGenerating(true);
    setShowProductManager(false);
    setError('');
    setGeneratedListing(null);

    await new Promise(resolve => setTimeout(resolve, 2500));

    setGeneratedListing({
      basicInfo: {
        name: "Modern Ergonomic Office Chair",
        brand: "ErgoComfort",
        modelNumber: "EC-PRO-BLK-24",
        category: "Office Furniture > Chairs",
      },
      pricing: {
        priceRange: "₹7,000 - ₹9,500",
        stock: 250,
        moq: 10,
      },
      specifications: {
        dimensions: "65cm x 60cm x 120cm",
        weight: "15 kg",
        material: "Mesh, Aluminum, High-density foam",
        colorOptions: ["Midnight Black", "Slate Gray", "Ocean Blue"],
      },
      marketing: {
        description: "A comfortable and stylish ergonomic chair designed for long hours of work. Features a breathable mesh back, 4D adjustable armrests, and a sturdy aluminum base for optimal support and productivity.",
        keyFeatures: [
          "Breathable mesh backrest for superior ventilation.",
          "4D adjustable armrests for personalized comfort.",
          "Certified Class-4 gas lift for smooth height adjustment.",
          "Durable aluminum base with smooth-rolling casters.",
        ],
        tags: ["office chair", "ergonomic", "computer chair", "mesh chair", "B2B furniture"],
      }
    });

    setIsGenerating(false);
  };

  const handleClose = () => {
    setImagePreview(null);
    setImageFile(null);
    setGeneratedListing(null);
    setIsGenerating(false);
    setShowProductManager(false);
    setError('');
    onClose();
  };

  const handleAddToListings = () => {
    if (!generatedListing || !imagePreview) return;
    // Pass a simplified object to onAddProduct, or the full one if the parent can handle it
    const productData = {
        name: generatedListing.basicInfo.name,
        price: generatedListing.pricing.priceRange
    }
    onAddProduct(productData, imagePreview);
    handleClose();
  };
  
  const handleOptimizationApplied = (optimizations) => {
    setGeneratedListing(prev => ({
      ...prev,
      marketing: {
        ...prev.marketing,
        description: optimizations.optimized_description,
      }
    }));
    setShowProductManager(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <ShimmerStyle />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200/80 flex justify-between items-center sticky top-0 bg-white/80 z-10">
              <h2 className="text-2xl font-bold text-slate-800">Create New Listing with AI</h2>
              <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full">
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-8 flex-grow">
              {!imagePreview ? (
                 <div 
                  className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-sky-500 hover:bg-sky-50/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-700">Click to upload an image</h3>
                  <p className="mt-1 text-sm text-slate-500">PNG, JPG, or WEBP. Our AI will do the rest.</p>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h3 className="font-bold text-lg text-slate-800">Product Image</h3>
                     <div className="relative">
                        <img src={imagePreview} alt="Product preview" className="rounded-xl w-full object-cover aspect-square" />
                        <Button variant="outline" size="sm" className="absolute top-3 right-3 bg-white/50" onClick={() => fileInputRef.current?.click()}>
                           <Edit className="h-4 w-4 mr-2" /> Change
                        </Button>
                         <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                     </div>
                  </div>
                  <div className="space-y-6">
                    {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                    
                    {isGenerating && <ListingGeneratorSkeleton />}

                    <AnimatePresence>
                    {generatedListing && !isGenerating && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {!showProductManager ? (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            {/* --- Basic Info --- */}
                            <div>
                               <h4 className="font-semibold text-slate-800 mb-3">Basic Information</h4>
                               <div className="space-y-3">
                                  <Input label="Product Name" defaultValue={generatedListing.basicInfo.name} />
                                  <div className="grid grid-cols-2 gap-3">
                                    <Input label="Brand" defaultValue={generatedListing.basicInfo.brand} />
                                    <Input label="Model / SKU" defaultValue={generatedListing.basicInfo.modelNumber} />
                                  </div>
                                  <Input label="Category" defaultValue={generatedListing.basicInfo.category} />
                               </div>
                            </div>
                            
                            {/* --- Pricing & Inventory --- */}
                            <div>
                               <h4 className="font-semibold text-slate-800 mb-3">Pricing & Inventory</h4>
                               <div className="grid grid-cols-3 gap-3">
                                   <Input label="Price Range (INR)" defaultValue={generatedListing.pricing.priceRange} />
                                   <Input label="Stock" type="number" defaultValue={generatedListing.pricing.stock} />
                                   <Input label="Min. Order (MOQ)" type="number" defaultValue={generatedListing.pricing.moq} />
                               </div>
                            </div>

                             {/* --- Marketing --- */}
                            <div>
                               <h4 className="font-semibold text-slate-800 mb-3">Marketing Details</h4>
                               <div className="space-y-3">
                                <Textarea label="Description" key={generatedListing.marketing.description} defaultValue={generatedListing.marketing.description} rows={5} />
                                 <div>
                                    <label className="text-sm font-medium text-slate-700">Keywords / Tags</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {generatedListing.marketing.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                 </div>
                               </div>
                            </div>

                            <div className="pt-4">
                                <Button onClick={() => setShowProductManager(true)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                                  <Wand2 className="mr-2 h-4 w-4" />
                                  Strategic Co-pilot: Analyze & Optimize
                                </Button>
                            </div>

                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-slate-800">Product Strategy Analysis</h4>
                                <Button variant="ghost" size="sm" onClick={() => setShowProductManager(false)}>
                                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                                  Back to Details
                                </Button>
                            </div>
                            <StrategicCoPilot productDetails={generatedListing} onOptimizationApplied={handleOptimizationApplied} />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-200/80 flex justify-end gap-4 sticky bottom-0 bg-white/80 z-10">
                 <Button variant="outline" onClick={handleClose} className="bg-white/50">Cancel</Button>
                 {!showProductManager && (
                   <Button onClick={handleAddToListings} className="bg-sky-500 hover:bg-sky-600 text-white" disabled={!generatedListing || isGenerating}>
                      {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</> : 'Add to Listings'}
                   </Button>
                 )}
                 {showProductManager && (
                   <Button onClick={() => setShowProductManager(false)} className="bg-green-600 hover:bg-green-700 text-white" disabled={!generatedListing}>
                      <Check className="mr-2 h-4 w-4" />
                      Apply Optimizations & Continue
                   </Button>
                 )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper component to avoid repeating label and input logic
const CustomInput = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <Input className="mt-1" label={label} {...props} />
  </div>
);

// We overwrite the default Input and Textarea to include our custom label logic
const InputWithLabel = CustomInput;
const TextareaWithLabel = ({ label, ...props }) => (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <Textarea className="mt-1" label={label} {...props} />
    </div>
);

// Re-exporting for use inside the component
const Input = InputWithLabel;
const Textarea = TextareaWithLabel;