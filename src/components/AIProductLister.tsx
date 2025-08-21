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
  UploadCloud, ArrowRight, Sparkles, CheckCircle, Tags, Layers, Lightbulb, Target, Zap, ClipboardCopy, Check, ChevronLeft
} from "lucide-react";

// --- Mock AI Data ---
const mockAiResponse = {
  title: "Women's Classic Blue Denim Jacket - Regular Fit",
  description: "Crafted from premium, durable denim, this classic blue jacket is a timeless wardrobe essential. Featuring a regular fit, button-front closure, and two chest pockets, it offers both style and functionality. Perfect for layering over a t-shirt for a casual look or a sweater in cooler weather.",
  keyFeatures: ["Made from 100% high-quality cotton denim.", "Classic regular fit for all-day comfort.", "Features two button-flap chest pockets and two side pockets.", "Durable metal button closure.", "Machine washable for easy care."],
  category: "Fashion > Women's Clothing > Jackets & Coats > Denim Jackets",
  attributes: { Color: "Vintage Blue", Material: "Cotton Denim", Fit: "Regular", Sleeves: "Full" },
  seoKeywords: ["denim jacket", "blue jacket women", "jean jacket", "cotton jacket", "casual outerwear"],
  priceRange: "₹1,899 - ₹2,499"
};

// --- Shimmer/Skeleton Components & Styles ---
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

const AnalyzingSkeleton = () => (
    <div className="p-12">
        <div className="text-center mb-12">
            <div className="h-9 w-72 mx-auto rounded-2xl generative-bg"></div>
            <div className="h-6 w-96 mx-auto rounded-xl generative-bg mt-4"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="h-7 w-52 rounded-xl generative-bg"></div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-2xl aspect-square generative-bg"></div>
                    <div className="rounded-2xl aspect-square generative-bg"></div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="h-14 w-full rounded-2xl generative-bg"></div>
                <div className="h-32 w-full rounded-2xl generative-bg"></div>
                <div className="h-28 w-full rounded-2xl generative-bg"></div>
                <div className="h-24 w-full rounded-2xl generative-bg"></div>
            </div>
        </div>
    </div>
);

const CoPilotSkeleton = () => (
    <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl shimmer-effect"></div>
                    <div className="h-5 w-40 rounded shimmer-effect"></div>
                </div>
                <div className="space-y-2.5">
                    <div className="h-4 w-full rounded shimmer-effect"></div>
                    <div className={`h-4 w-${i % 2 === 0 ? '11/12' : '10/12'} rounded shimmer-effect`}></div>
                </div>
            </div>
        ))}
        <div className="h-12 w-full rounded-full shimmer-effect mt-6"></div>
    </div>
);


// --- Strategic Co-Pilot Component (Integrated & Restyled) ---
const StrategicCoPilot = ({ productDetails, onOptimizationApplied }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const analyzeProduct = async () => {
      await new Promise(resolve => setTimeout(resolve, 2500)); // Shortened for better UX
      const simulatedResponse = {
        mvs_analysis: "The target Minimum Viable Segment (MVS) is young adults (18-30) seeking timeless, versatile fashion staples that offer high value and durability for everyday wear.",
        capability_gaps: [{ suggestion: "Introduce Sustainable Materials", reasoning: "This demographic shows a strong preference for eco-friendly products. A version using recycled cotton could open a new market segment." }],
        seo_tags: ["women's denim jacket", "vintage blue jean jacket", "classic trucker jacket", "sustainable fashion", "all-season outerwear"],
        optimized_description: `Meet your new favorite layer. The Nomad Denim Jacket combines timeless style with rugged durability, crafted from 100% premium cotton for a comfortable, broken-in feel from day one. Its classic vintage blue wash and regular fit make it the ultimate versatile piece for any wardrobe. Engineered for everyday adventures and built to last.`
      };
      setAnalysisResult(simulatedResponse);
      setIsAnalyzing(false);
    };
    analyzeProduct();
  }, [productDetails]);

  const AnalysisCard = ({ icon: Icon, title, children }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
      <div className="flex items-center gap-3 mb-3">
          <div className="bg-violet-100 p-2 rounded-xl">
              <Icon className="h-5 w-5 text-violet-600" />
          </div>
          <h5 className="font-semibold text-slate-800">{title}</h5>
      </div>
      <div className="text-sm text-slate-600 space-y-2 pl-1">{children}</div>
    </div>
  );

  if (isAnalyzing) return <CoPilotSkeleton />;
  if (!analysisResult) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <AnalysisCard icon={Target} title="Minimum Viable Segment (MVS)"><p>{analysisResult.mvs_analysis}</p></AnalysisCard>
      <AnalysisCard icon={Zap} title="Capability Gaps & Improvements"><ul className="list-disc list-inside"><li><strong>{analysisResult.capability_gaps[0].suggestion}:</strong> {analysisResult.capability_gaps[0].reasoning}</li></ul></AnalysisCard>
      <AnalysisCard icon={Tags} title="Optimized SEO Tags"><div className="flex flex-wrap gap-2">{analysisResult.seo_tags.map(tag => <Badge key={tag} className="rounded-full py-1 px-3 text-violet-700 bg-violet-100 border-violet-200">{tag}</Badge>)}</div></AnalysisCard>
      <AnalysisCard icon={Lightbulb} title="Optimized Description"><p className="italic text-slate-700">"{analysisResult.optimized_description}"</p></AnalysisCard>
      <Button size="lg" className="w-full rounded-full h-12 text-base bg-green-500 hover:bg-green-600 text-white" onClick={() => onOptimizationApplied(analysisResult)}><Check className="mr-2 h-5 w-5"/> Apply Optimizations</Button>
    </motion.div>
  );
};

// --- MODIFIED: Editable Field now accepts a className for the input ---
const EditableField = ({ label, value, type = "input", className = "" }: { label: string, value: string, type?: "input" | "textarea", className?: string }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const [copied, setCopied] = useState(false);
    
    useEffect(() => { setFieldValue(value); }, [value]);

    const handleCopy = () => {
        navigator.clipboard.writeText(fieldValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const InputComponent = type === 'input' ? Input : Textarea;
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <Label htmlFor={label} className="text-sm font-semibold text-zinc-600">{label}</Label>
                <Button variant="ghost" size="sm" className="rounded-full h-7 text-xs text-slate-500 hover:text-slate-800" onClick={handleCopy}>
                    {copied ? <Check className="h-3 w-3 mr-1.5 text-green-500"/> : <ClipboardCopy className="h-3 w-3 mr-1.5"/>}
                    {copied ? 'Copied' : 'Copy'}
                </Button>
            </div>
            <InputComponent id={label} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className={`bg-slate-50 border-slate-200 rounded-xl p-3 w-full focus-visible:ring-violet-400 ${className}`} rows={type === 'textarea' ? 8 : undefined}/>
        </div>
    );
};

// --- NEW: Amazon-Style Product Display Component ---
const AmazonStyleProductDisplay = ({ aiResults }) => (
  <div className="space-y-8">
    <EditableField 
      label="Product Title" 
      value={aiResults?.title} 
      className="text-3xl font-bold text-zinc-800 p-2 border-0 bg-transparent -ml-2" 
    />

    <div className="text-3xl font-medium text-red-600 flex items-center">
      <span className="text-xl mt-1 mr-1">₹</span>
      {aiResults?.priceRange.split(' - ')[0].replace('₹','')}
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-zinc-800">Variants</h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(aiResults?.attributes).map(([key, val]) => (
          <div key={key}>
            <span className="text-sm font-bold text-zinc-700">{key}:</span>
            <Badge variant="outline" className="ml-2 text-base border-2 border-slate-800 text-slate-800 bg-white rounded-lg px-3 py-1">{val as string}</Badge>
          </div>
        ))}
      </div>
    </div>
    
    <div className="border-t border-slate-200 pt-6">
      <h3 className="font-semibold text-zinc-800 text-lg mb-3">About this item</h3>
      <ul className="space-y-2.5">
        {aiResults?.keyFeatures.map((f: string, i: number) => (
          <li key={i} className="flex items-start text-slate-700">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="border-t border-slate-200 pt-6">
      <EditableField 
        label="Product Description" 
        value={aiResults?.description} 
        type="textarea" 
        className="text-red-500" // <-- THE FIX IS HERE
      />
    </div>

    <Card className="bg-slate-50/80 border-slate-200/80 rounded-2xl">
        <CardHeader><CardTitle className="text-lg">Listing & SEO Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
                <Layers className="h-5 w-5 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-zinc-800">Suggested Category</h4>
                    <p className="text-slate-600">{aiResults?.category}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <Tags className="h-5 w-5 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-zinc-800">SEO Keywords</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {aiResults?.seoKeywords.map((k: string) => (
                        <Badge key={k} className="rounded-full py-1 px-3 text-violet-700 bg-violet-100 border-violet-200">{k}</Badge>
                      ))}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  </div>
);


// --- Main Component ---
export const AIProductLister = () => {
  const [step, setStep] = useState('upload');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [aiResults, setAiResults] = useState<any | null>(null);
  const [showStrategicAnalysis, setShowStrategicAnalysis] = useState(false);

  useEffect(() => {
    if (productImages.length === 0) { setImagePreviews([]); return; }
    const newImageUrls = productImages.map(file => URL.createObjectURL(file));
    setImagePreviews(newImageUrls);
    return () => newImageUrls.forEach(url => URL.revokeObjectURL(url));
  }, [productImages]);

  useEffect(() => {
    if (step === 'analyzing') {
      const timer = setTimeout(() => {
        setAiResults(mockAiResponse);
        setStep('results');
      }, 5000); // Shortened for better UX
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProductImages(Array.from(event.target.files));
      setStep('analyzing');
    }
  };

  const resetFlow = () => {
    setStep('upload');
    setProductImages([]);
    setAiResults(null);
    setShowStrategicAnalysis(false);
  };

  const handleOptimizationApplied = (optimizations: any) => {
    setAiResults((prev: any) => ({
      ...prev,
      description: optimizations.optimized_description,
      seoKeywords: optimizations.seo_tags,
    }));
    setShowStrategicAnalysis(false);
  };
  
  const renderContent = () => {
    switch (step) {
      case 'upload':
        return (<>
          <CardHeader className="text-center p-12">
            <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 to-sky-100 mb-5"><Sparkles className="h-10 w-10 text-violet-500" /></div>
            <CardTitle className="text-4xl font-bold text-zinc-800">AI Product Studio</CardTitle>
            <CardDescription className="text-lg text-slate-600 mt-3">Instantly generate beautiful product listings from your images.</CardDescription>
          </CardHeader>
          <CardContent className="px-12 pb-12">
            <label htmlFor="file-upload" className="relative block w-full h-64 border-2 border-dashed border-slate-300 rounded-3xl cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 transition-all duration-300">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-4 bg-slate-100 rounded-2xl"><UploadCloud className="h-10 w-10 text-slate-400" /></div>
                    <p className="mt-4 font-semibold text-slate-700">Click to upload or drag & drop</p>
                    <p className="text-sm text-slate-500">Up to 5 images (PNG, JPG, WEBP)</p>
                </div>
                <Input id="file-upload" type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
            </label>
          </CardContent>
        </>);
      case 'analyzing':
        return <AnalyzingSkeleton />;
      case 'results':
        return (<>
          <CardHeader className="text-center py-8 border-b border-slate-200">
            <CardTitle className="text-3xl font-bold text-zinc-800">Generated Listing Preview</CardTitle>
            <CardDescription className="text-md text-slate-600 mt-2">This is how your product will look to customers. Edit fields directly.</CardDescription>
          </CardHeader>
          <CardContent className="mt-8 p-8 grid lg:grid-cols-[1fr,1.5fr] gap-12">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-800">Product Gallery</h3>
                <div className="grid gap-5">{imagePreviews.map((src, i) => (<div key={i} className="aspect-square overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/50"><img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" /></div>))}</div>
            </div>
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div key={showStrategicAnalysis ? 'analysis' : 'details'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex-grow">
                  {!showStrategicAnalysis ? (
                    <AmazonStyleProductDisplay aiResults={aiResults} />
                  ) : (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-xl font-bold text-zinc-800 flex items-center"><Sparkles className="h-6 w-6 mr-3 text-violet-500"/> Strategic Co-Pilot</h3>
                           <Button variant="ghost" size="sm" className="rounded-full text-slate-600" onClick={() => setShowStrategicAnalysis(false)}>
                               <ChevronLeft className="mr-1 h-4 w-4"/>
                               Back to Editor
                           </Button>
                        </div>
                        <StrategicCoPilot 
                            productDetails={aiResults} 
                            onOptimizationApplied={handleOptimizationApplied} 
                        />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              {!showStrategicAnalysis && (
                <div className="mt-auto pt-8 flex items-center justify-end gap-4">
                  <Button size="lg" variant="outline" className="rounded-full h-12 text-base" onClick={() => setShowStrategicAnalysis(true)}>
                    <Sparkles className="mr-2 h-5 w-5"/> Analyze & Optimize
                  </Button>
                  <Button size="lg" className="rounded-full h-12 text-base text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity" onClick={() => setStep('published')}>
                    Publish Listing <ArrowRight className="ml-2 h-5 w-5"/>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </>);
      case 'published':
        return (<div className="flex flex-col items-center justify-center text-center p-12 min-h-[40rem]"><CheckCircle className="h-28 w-28 text-green-500" /><h3 className="text-4xl font-bold text-zinc-800 mt-8">Product Listing Published!</h3><p className="text-slate-500 mt-3 max-w-md text-lg">Your new product is now live. You can view it in your catalog or list another item.</p><Button size="lg" className="rounded-full h-12 mt-10" onClick={resetFlow}>List Another Product</Button></div>);
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-sky-50 text-zinc-700 font-sans">
      <ShimmerStyle/>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Card className="bg-white/80 backdrop-blur-2xl border border-slate-200/50 shadow-2xl shadow-violet-100/50 rounded-[2.5rem] max-w-7xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>{renderContent()}</motion.div></AnimatePresence>
        </Card>
      </div>
    </div>
  );
};  