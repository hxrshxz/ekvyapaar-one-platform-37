"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  UploadCloud, ArrowRight, Sparkles, CheckCircle, Image as ImageIcon, Tags, Layers, DollarSign, Edit, ClipboardCopy, Loader2
} from "lucide-react";

const mockAiResponse = {
  title: "Men's Classic Blue Denim Jacket - Regular Fit",
  description: "Crafted from premium, durable denim, this classic blue jacket is a timeless wardrobe essential. Featuring a regular fit, button-front closure, and two chest pockets, it offers both style and functionality. Perfect for layering over a t-shirt for a casual look or a sweater in cooler weather. The versatile design ensures it will be your go-to jacket for years to come.",
  keyFeatures: [
    "Made from 100% high-quality cotton denim.",
    "Classic regular fit for all-day comfort.",
    "Features two button-flap chest pockets and two side pockets.",
    "Durable metal button closure.",
    "Machine washable for easy care."
  ],
  category: "Fashion > Men's Clothing > Jackets & Coats > Denim Jackets",
  attributes: {
    Color: "Vintage Blue",
    Material: "Cotton Denim",
    Fit: "Regular",
    Sleeves: "Full"
  },
  seoKeywords: ["denim jacket", "blue jacket men", "jean jacket", "cotton jacket", "casual outerwear", "trucker jacket"],
  priceRange: "₹1,899 - ₹2,499"
};

// --- Animation Variants ---
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ["easeInOut"] } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// --- Main Component ---
export const AIProductLister = () => {
  const [step, setStep] = useState('upload'); // 'upload', 'analyzing', 'results', 'published'
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [aiResults, setAiResults] = useState<any | null>(null);

  // Effect to handle image preview generation
  useEffect(() => {
    if (productImages.length === 0) {
      setImagePreviews([]);
      return;
    }
    const newImageUrls = productImages.map(file => URL.createObjectURL(file));
    setImagePreviews(newImageUrls);

    // Cleanup function to revoke the object URLs
    return () => newImageUrls.forEach(url => URL.revokeObjectURL(url));
  }, [productImages]);
  
  // Effect to simulate AI analysis
  useEffect(() => {
    if (step === 'analyzing') {
      const timer = setTimeout(() => {
        setAiResults(mockAiResponse);
        setStep('results');
      }, 3000); // Simulate a 3-second analysis
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProductImages(Array.from(event.target.files));
      setStep('analyzing');
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here for better UX
  };
  
  const resetFlow = () => {
    setStep('upload');
    setProductImages([]);
    setImagePreviews([]);
    setAiResults(null);
  };

  const renderContent = () => {
    switch (step) {
      case 'upload':
        return (
          <motion.div >
            <CardHeader className="text-center">
              <Sparkles className="mx-auto h-12 w-12 text-purple-500 mb-2" />
              <CardTitle className="text-3xl font-bold">AI Product Manager</CardTitle>
              <CardDescription className="text-lg text-slate-600">Upload your product images to get started.</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <label htmlFor="file-upload" className="relative block w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-sky-500 hover:bg-sky-50/50 transition-colors">
                <div className="flex flex-col items-center justify-center h-full">
                  <UploadCloud className="h-12 w-12 text-slate-400" />
                  <p className="mt-2 font-semibold text-slate-700">Click to upload or drag & drop</p>
                  <p className="text-sm text-slate-500">PNG, JPG, or WEBP (up to 5 images)</p>
                </div>
                <Input id="file-upload" type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
              </label>
            </CardContent>
          </motion.div>
        );
      case 'analyzing':
        return (
          <motion.div  className="flex flex-col items-center justify-center text-center p-8 min-h-[30rem]">
            <Loader2 className="h-16 w-16 text-sky-500 animate-spin" />
            <h3 className="text-2xl font-bold text-slate-800 mt-6">AI is analyzing your product...</h3>
            <p className="text-slate-500 mt-2">Identifying features, analyzing market data, and writing copy.</p>
          </motion.div>
        );
      case 'results':
        return (
          <motion.div>
            <CardHeader className="text-center">
                <Sparkles className="mx-auto h-12 w-12 text-purple-500 mb-2" />
                <CardTitle className="text-3xl font-bold">Generated Listing Details</CardTitle>
                <CardDescription className="text-lg text-slate-600">Review, edit, and use the AI-generated content for your product.</CardDescription>
            </CardHeader>
            <CardContent className="mt-4 grid lg:grid-cols-2 gap-8">
              {/* Left Column: Images */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                <motion.h3  className="text-xl font-bold text-slate-800">Uploaded Images</motion.h3>
                <motion.div  className="grid grid-cols-2 gap-4">
                  {imagePreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Product preview ${index + 1}`} className="rounded-lg object-cover aspect-square" />
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Right Column: AI Results */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                <EditableField label="Product Title" value={aiResults?.title} />
                <EditableField label="Description" value={aiResults?.description} type="textarea" />
                
                <div>
                  <Label className="text-base font-semibold">Key Features</Label>
                  <ul className="mt-2 space-y-2">
                    {aiResults?.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* --- FIX: Added Product Attributes Section --- */}
                <div>
                  <Label className="text-base font-semibold">Product Attributes</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {Object.entries(aiResults?.attributes || {}).map(([key, value]) => (
                      <div key={key} className="p-3 bg-slate-50/50 rounded-lg border border-slate-200/80">
                        <p className="text-xs text-slate-500 font-medium">{key}</p>
                        <p className="font-semibold text-slate-800">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <InfoCard icon={Layers} title="Suggested Category" value={aiResults?.category} />
                <InfoCard icon={DollarSign} title="Suggested Price Range" value={aiResults?.priceRange} />

                <div>
                    <Label className="text-base font-semibold">SEO Keywords</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {aiResults?.seoKeywords.map((keyword: string) => (
                            <Badge key={keyword} variant="secondary" className="bg-sky-100 text-sky-800 border-sky-200">{keyword}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button size="lg" className="w-full bg-slate-800 hover:bg-slate-900 text-white" onClick={resetFlow}>Start Over</Button>
                  <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={() => setStep('published')}>Publish Listing</Button>
                </div>
              </motion.div>
            </CardContent>
          </motion.div>
        );
      case 'published':
        return (
            <motion.div variants={fadeIn} className="flex flex-col items-center justify-center text-center p-8 min-h-[30rem]">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <h3 className="text-3xl font-bold text-slate-800 mt-6">Product Listing Published!</h3>
                <p className="text-slate-500 mt-2 max-w-md">Your new product is now live on your marketplace channels. You can view it in your catalog.</p>
                <Button size="lg" className="mt-8" onClick={resetFlow}>List Another Product</Button>
            </motion.div>
        );
      default:
        return null;
    }
  };
  
  const EditableField = ({ label, value, type = "input" }: { label: string, value: string, type?: "input" | "textarea" }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const InputComponent = type === 'input' ? Input : Textarea;
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label htmlFor={label} className="text-base font-semibold">{label}</Label>
          <Button variant="ghost" size="sm" className="h-7" onClick={() => handleCopyToClipboard(fieldValue)}>
            <ClipboardCopy className="h-4 w-4 mr-1"/> Copy
          </Button>
        </div>
        <InputComponent 
            id={label}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="bg-white/70 border-slate-300"
            rows={type === 'textarea' ? 5 : undefined}
        />
      </div>
    );
  };
  
  const InfoCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) => (
    <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/80">
        <Icon className="h-6 w-6 text-sky-600 flex-shrink-0 mt-1" />
        <div>
            <h4 className="font-semibold text-slate-800">{title}</h4>
            <p className="text-slate-600">{value}</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans isolate">
      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-96 h-96 md:w-[500px] md:h-[500px] bg-violet-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 md:w-[600px] md:h-[600px] bg-sky-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <Card className="bg-white/60 backdrop-blur-2xl border border-white/20 shadow-xl rounded-3xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};