// src/components/marketplace/ListingManager.tsx

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X as XIcon, Edit, UploadCloud } from "lucide-react";

// --- Helper Function ---
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

// --- Component Definition ---
interface ListingManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (listing: any, imageUrl: string) => void;
}

export const ListingManager = ({ isOpen, onClose, onAddProduct }: ListingManagerProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedListing, setGeneratedListing] = useState<any>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setImageFile(null);
    setImagePreview("");
    setIsGenerating(false);
    setGeneratedListing(null);
    setError("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      generateListingDetails(file);
    }
  };

  const generateListingDetails = async (file: File) => {
    if (!file) return;
    setIsGenerating(true);
    setGeneratedListing(null);
    setError("");

    try {
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAHDq0R6ZwrEJpXtZ_tg3GmvxRTCvHvT_U";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `You are an expert B2B product cataloger. Based on the provided image, generate a product listing. Your response MUST follow this JSON schema: { "name": "A concise, descriptive product title.", "price": "An estimated B2B price range in INR (e.g., '₹500 - ₹750 /unit').", "category": "A relevant category from this list: [Industrial Machinery, Consumer Electronics, Apparel, Health, Agriculture, Construction]", "description": "A brief, compelling 2-sentence description for a B2B marketplace." }`;
      
      const imagePart = await fileToGenerativePart(file);
      
      const result = await model.generateContent([prompt, imagePart as Part]);
      const text = result.response.text();
      
      if (!text) {
        throw new Error("Received an empty response from the AI. The image might not be clear or recognizable.");
      }
      const aiData = JSON.parse(text);
      setGeneratedListing(aiData);

    } catch (err) {
      console.error("Error generating listing:", err);
      let errorMessage = "AI failed to generate details. Please try a different image.";
      if (err instanceof SyntaxError) {
        errorMessage = "The AI returned an invalid format. Please try again.";
      }
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToListings = () => {
    if (generatedListing && imagePreview) {
      onAddProduct(generatedListing, imagePreview);
      handleClose();
    }
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
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h3 className="font-bold text-lg text-slate-800">Product Image</h3>
                     <div className="relative">
                        <img src={imagePreview} alt="Product preview" className="rounded-xl w-full object-cover aspect-square" />
                        <Button variant="outline" size="sm" className="absolute top-3 right-3 bg-white/50" onClick={() => fileInputRef.current?.click()}>
                           <Edit className="h-4 w-4 mr-2" /> Change Image
                        </Button>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                         />
                     </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h3 className="font-bold text-lg text-slate-800">AI Generated Details</h3>
                       {isGenerating && <Loader2 className="h-5 w-5 animate-spin text-sky-500" />}
                    </div>
                    {error && (
                        <p className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>
                    )}
                    <AnimatePresence>
                    {generatedListing && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="font-medium text-slate-700">Product Name</label>
                          <Input defaultValue={generatedListing.name} className="mt-1" readOnly />
                        </div>
                        <div>
                          <label className="font-medium text-slate-700">Price Range (INR)</label>
                          <Input defaultValue={generatedListing.price} className="mt-1" readOnly />
                        </div>
                        <div>
                          <label className="font-medium text-slate-700">Category</label>
                          <Input defaultValue={generatedListing.category} className="mt-1" readOnly />
                        </div>
                        <div>
                          <label className="font-medium text-slate-700">Description</label>
                          <Textarea defaultValue={generatedListing.description} className="mt-1" rows={4} readOnly />
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-200/80 flex justify-end gap-4 sticky bottom-0 bg-white/80 z-10">
                <Button variant="outline" onClick={handleClose} className="bg-white/50">Cancel</Button>
                <Button 
                  onClick={handleAddToListings}
                  className="bg-sky-500 hover:bg-sky-600 text-white" 
                  disabled={!generatedListing || isGenerating}
                >
                   {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</> : 'Add to Listings'}
                </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};