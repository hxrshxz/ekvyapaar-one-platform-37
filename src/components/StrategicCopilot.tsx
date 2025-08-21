"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge'; // Use your UI Badge component
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Target, Zap, Tags, Palette, Check, Loader2 } from 'lucide-react';

// --- UI Components for Analysis Display ---
const AnalysisCard = ({ icon: Icon, title, children }) => (
  <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/80">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-sky-100 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-sky-600" />
      </div>
      <h5 className="font-semibold text-slate-800">{title}</h5>
    </div>
    <div className="text-sm text-slate-600 space-y-2">{children}</div>
  </div>
);

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-slate-200 h-9 w-9 rounded-lg animate-pulse"></div>
          <div className="bg-slate-200 h-5 w-32 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-200 h-4 w-full rounded-md animate-pulse"></div>
          <div className="bg-slate-200 h-4 w-3/4 rounded-md animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- Main Strategic CoPilot Component ---
export const StrategicCoPilot = ({ productDetails, onOptimizationApplied }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const analyzeProduct = async () => {
      if (!productDetails) return;
      setIsAnalyzing(true);
      setError('');
      setAnalysisResult(null);

      // In a real app, you would make an API call here.
      // We are simulating it with a delay.
      await new Promise(resolve => setTimeout(resolve, 2500));

      try {
        // --- SIMULATED AI RESPONSE ---
        // This is the kind of structured data you'd expect from the AI model.
        const simulatedResponse = {
          mvs_analysis: "The target Minimum Viable Segment (MVS) is likely small to medium-sized businesses (SMBs) and home office users looking for a durable, ergonomic, and stylish chair without the premium price tag of high-end brands.",
          capability_gaps: [
            { suggestion: "Add Adjustable Lumbar Support", reasoning: "This is a key feature for ergonomic chairs and a major decision factor for users with back pain concerns." },
            { suggestion: "Offer Multiple Color Options", reasoning: "Modern offices and homes value aesthetics. Offering colors like 'Ocean Blue' or 'Graphite Gray' can increase appeal." }
          ],
          seo_tags: ["ergonomic office chair", "lumbar support chair", "modern desk chair", "SMB office furniture", "home office upgrade", "comfortable computer chair"],
          marketplace_palette: {
            primary: "#0EA5E9", // sky-500
            secondary: "#475569", // slate-600
            accent: "#F59E0B", // amber-500
            reasoning: "A professional and trustworthy palette. Blue inspires confidence, slate provides a modern neutral base, and amber creates an energetic call-to-action."
          },
          optimized_description: `Elevate your workspace with the Apex Ergonomic Office Chair, engineered for ultimate comfort and productivity. Featuring dynamic adjustable lumbar support and a breathable mesh back, it's designed to keep you focused and pain-free through your longest days. Its sleek, modern design, available in multiple professional colors, seamlessly fits any office decor. Perfect for SMBs and discerning home office professionals seeking premium features without the premium price.`
        };
        setAnalysisResult(simulatedResponse);

      } catch (e) {
        setError("Failed to get analysis. Please try again.");
        console.error(e);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeProduct();
  }, [productDetails]);

  if (isAnalyzing) {
    return <SkeletonLoader />;
  }
  if (error) {
     return <p className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>;
  }
  if (!analysisResult) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <AnalysisCard icon={Target} title="Minimum Viable Segment (MVS)">
        <p>{analysisResult.mvs_analysis}</p>
      </AnalysisCard>

      <AnalysisCard icon={Zap} title="Capability Gaps & Improvements">
        <ul className="list-disc list-inside space-y-2">
          {analysisResult.capability_gaps.map((gap, i) => (
            <li key={i}><strong>{gap.suggestion}:</strong> {gap.reasoning}</li>
          ))}
        </ul>
      </AnalysisCard>
      
       <AnalysisCard icon={Tags} title="Marketplace SEO Tags">
        <div className="flex flex-wrap gap-2">
            {analysisResult.seo_tags.map(tag => <Badge key={tag} className="bg-slate-200 text-slate-700">{tag}</Badge>)}
        </div>
      </AnalysisCard>

      <AnalysisCard icon={Palette} title="Suggested Color Palette">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border" style={{backgroundColor: analysisResult.marketplace_palette.primary}}></div><span>Primary</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border" style={{backgroundColor: analysisResult.marketplace_palette.secondary}}></div><span>Secondary</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border" style={{backgroundColor: analysisResult.marketplace_palette.accent}}></div><span>Accent</span>
            </div>
        </div>
        <p className="text-xs italic mt-2 text-slate-500">{analysisResult.marketplace_palette.reasoning}</p>
      </AnalysisCard>

      <AnalysisCard icon={Lightbulb} title="Optimized Description">
        <Textarea 
          defaultValue={analysisResult.optimized_description} 
          rows={5} 
          className="bg-white" 
          readOnly 
        />
      </AnalysisCard>

      <div className="pt-2">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onOptimizationApplied(analysisResult)}
           >
             <Check className="mr-2 h-4 w-4"/> Apply Optimizations
           </Button>
      </div>
    </motion.div>
  );
};