"use client";
// import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea for AI form
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import {
  Search,
  Star,
  Factory,
  Smartphone,
  Truck,
  Wand2,
  Camera,
  Info,
  Loader2,
  X as XIcon,
  Check,
  ChevronRight,
  Shirt,
  Building,
  HeartPulse,
  Leaf,
  Droplets,
  Globe,
  Store,
  Gem,
  Watch,
  HardHat,
  Package,
  Paintbrush,
  ToyBrick,
  Dog,
  ShieldCheck,
  Clock,
  MessageSquare,
  Edit,
  PlusCircle,
  UploadCloud, // Added for AI modal
} from "lucide-react";

// --- [NEW] AI-Powered Listing Manager Component ---
const ListingManager = ({ isOpen, onClose, onAddProduct }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedListing, setGeneratedListing] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      generateListingDetails(file); // Trigger AI generation on file selection
    }
  };

  // Function to convert a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  // Marketplace.tsx

  const generateListingDetails = async (file) => {
    if (!file) return;
    setIsGenerating(true);
    setGeneratedListing(null);
    setError("");

    try {
      // It's highly recommended to move your API key to a .env.local file
      // and access it via process.env.NEXT_PUBLIC_GEMINI_API_KEY
      const API_KEY = "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q"; // Replace with your actual API key
      const genAI = new GoogleGenerativeAI(API_KEY);

      // For guaranteed JSON output, configure the model to use JSON mode.
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `You are an expert B2B product cataloger. Based on the provided image, generate a product listing. Your response MUST follow this JSON schema: { "name": "A concise, descriptive product title.", "price": "An estimated B2B price range in INR (e.g., '₹500 - ₹750 /unit').", "category": "A relevant category from this list: [Industrial Machinery, Consumer Electronics, Apparel, Health, Agriculture, Construction]", "description": "A brief, compelling 2-sentence description for a B2B marketplace." }`;

      const imagePart = await fileToGenerativePart(file);

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

      // Because we are using JSON mode, the response text is already a clean JSON string.
      const text = response.text();
      const aiData = JSON.parse(text);

      setGeneratedListing(aiData);
    } catch (err) {
      console.error("Error generating listing:", err);
      // Provide a more specific error message if parsing failed.
      let errorMessage =
        "AI failed to generate details. Please try a different image.";
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
      handleClose(); // Close modal after adding
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
              <h2 className="text-2xl font-bold text-slate-800">
                Create New Listing with AI
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full"
              >
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
                  <h3 className="mt-4 text-lg font-semibold text-slate-700">
                    Click to upload an image
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    PNG, JPG, or WEBP. Our AI will do the rest.
                  </p>
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
                    <h3 className="font-bold text-lg text-slate-800">
                      Product Image
                    </h3>
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="rounded-xl w-full object-cover aspect-square"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/50"
                        onClick={() => fileInputRef.current?.click()}
                      >
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
                      <h3 className="font-bold text-lg text-slate-800">
                        AI Generated Details
                      </h3>
                      {isGenerating && (
                        <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
                      )}
                    </div>
                    {error && (
                      <p className="text-red-600 bg-red-100 p-3 rounded-lg">
                        {error}
                      </p>
                    )}
                    <AnimatePresence>
                      {generatedListing && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="font-medium text-slate-700">
                              Product Name
                            </label>
                            <Input
                              defaultValue={generatedListing.name}
                              className="mt-1"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="font-medium text-slate-700">
                              Price Range (INR)
                            </label>
                            <Input
                              defaultValue={generatedListing.price}
                              className="mt-1"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="font-medium text-slate-700">
                              Category
                            </label>
                            <Input
                              defaultValue={generatedListing.category}
                              className="mt-1"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="font-medium text-slate-700">
                              Description
                            </label>
                            <Textarea
                              defaultValue={generatedListing.description}
                              className="mt-1"
                              rows={4}
                              readOnly
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-200/80 flex justify-end gap-4 sticky bottom-0 bg-white/80 z-10">
              <Button
                variant="outline"
                onClick={handleClose}
                className="bg-white/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddToListings}
                className="bg-sky-500 hover:bg-sky-600 text-white"
                disabled={!generatedListing || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  "Add to Listings"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- EXPANDED "DATABASE" WITH MANY MORE PRODUCTS ---
const marketplaceProducts = [
  {
    id: 1,
    category: "laptops",
    name: "2023 Hot Selling Laptop Windows 11",
    price: "₹21,687 - ₹25,435",
    seller: "DI Xiang Industrial",
    image:
      "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 2,
    category: "laptops",
    name: "Original Fairly Brand New Laptops",
    price: "₹11,602 - ₹19,188",
    seller: "Verified Electronics",
    image:
      "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 3,
    category: "laptops",
    name: "High-Performance Gaming Laptop",
    price: "₹85,000 - ₹95,000",
    seller: "Gamer's Hub",
    image:
      "https://images.pexels.com/photos/7915228/pexels-photo-7915228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 4,
    category: "textiles",
    name: "Organic Cotton Fabric (40s Count)",
    price: "₹120 - ₹150 /meter",
    seller: "Ludhiana Textile Mills",
    image:
      "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 5,
    category: "textiles",
    name: "Hand-Blocked Print Silk Fabric",
    price: "₹450 - ₹600 /meter",
    seller: "Jaipur Prints Co.",
    image:
      "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 6,
    category: "industrial",
    name: "Stainless Steel Ball Valves (DN50)",
    price: "₹8,500 /unit",
    seller: "Precision Engineering",
    image:
      "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 7,
    category: "apparel",
    name: "Men's Formal Cotton Shirts",
    price: "₹450 - ₹700",
    seller: "Tiruppur Garments",
    image:
      "https://images.pexels.com/photos/5905915/pexels-photo-5905915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 8,
    category: "health",
    name: "N95 Protective Face Masks",
    price: "₹15 - ₹25 /piece",
    seller: "Surat Medical Supplies",
    image:
      "https://images.pexels.com/photos/3951615/pexels-photo-3951615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 9,
    category: "auto",
    name: "Motorcycle Alloy Wheels",
    price: "₹3,500 - ₹5,000 /set",
    seller: "Delhi Auto Parts",
    image:
      "https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 10,
    category: "electronics",
    name: "Smart Watch with AMOLED Display",
    price: "₹1,800 - ₹2,500",
    seller: "Shenzhen Tech",
    image:
      "https://images.pexels.com/photos/207823/pexels-photo-207823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: false,
  },
  {
    id: 11,
    category: "agriculture",
    name: "Premium Basmati Rice",
    price: "₹80 - ₹120 /kg",
    seller: "Haryana Rice Mills",
    image:
      "https://images.pexels.com/photos/1547738/pexels-photo-1547738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 12,
    category: "construction",
    name: "UPVC Windows and Doors",
    price: "₹450 /sq.ft",
    seller: "Jaipur Fabricators",
    image:
      "https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
];

const initialUserListedProducts = [
  {
    id: 101,
    name: "Premium Packaging Box Kit (Pack of 100)",
    price: "₹2,500",
    seller: "Your Storefront",
    image:
      "https://images.pexels.com/photos/7208103/pexels-photo-7208103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 102,
    name: "MSME Precision Tool Set (45 Pieces)",
    price: "₹12,000",
    seller: "Your Storefront",
    image:
      "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 103,
    name: "Certified LED Bulbs (10W, Pack of 50)",
    price: "₹3,750",
    seller: "Your Storefront",
    image:
      "https://images.pexels.com/photos/8133591/pexels-photo-8133591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 104,
    name: "Industrial Safety Helmets (Yellow)",
    price: "₹250 /piece",
    seller: "Your Storefront",
    image:
      "https://images.pexels.com/photos/5693422/pexels-photo-5693422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
];

// --- Massively Expanded Category List ---
const categories = [
  {
    name: "Industrial Machinery",
    icon: Factory,
    sub: [
      "Construction Machinery",
      "Manufacturing Equipment",
      "Tools & Hardware",
    ],
  },
  {
    name: "Consumer Electronics",
    icon: Smartphone,
    sub: ["Mobile Phones", "Laptops & Gaming", "Smart Watches & Accessories"],
  },
  {
    name: "Vehicles & Transportation",
    icon: Truck,
    sub: ["Trucks & Buses", "Motorcycles", "Auto Parts & Accessories"],
  },
  {
    name: "Apparel & Accessories",
    icon: Shirt,
    sub: ["Men's Clothing", "Women's Clothing", "Fashion Accessories"],
  },
  {
    name: "Jewelry, Eyewear, Watches",
    icon: Gem,
    sub: ["Fine Jewelry", "Fashion Watches", "Eyeglasses & Frames"],
  },
  {
    name: "Home & Garden",
    icon: Building,
    sub: ["Furniture", "Garden Supplies", "Home Decor", "Home Appliances"],
  },
  {
    name: "Beauty & Personal Care",
    icon: HeartPulse,
    sub: ["Skincare", "Makeup", "Hair Care", "Medical Supplies"],
  },
  {
    name: "Packaging & Printing",
    icon: Package,
    sub: ["Packaging Boxes", "Printing Services", "Adhesive Tapes"],
  },
  {
    name: "Construction & Real Estate",
    icon: HardHat,
    sub: ["Building Materials", "Doors & Windows", "Real Estate Services"],
  },
  {
    name: "Agriculture & Food",
    icon: Leaf,
    sub: ["Fresh Produce", "Packaged Food", "Agricultural Machinery"],
  },
  {
    name: "Toys, Kids & Babies",
    icon: ToyBrick,
    sub: ["Baby Care", "Educational Toys", "Outdoor Play"],
  },
  {
    name: "Raw Materials",
    icon: Droplets,
    sub: ["Metals & Alloys", "Chemicals", "Plastics & Polymers"],
  },
  {
    name: "Gifts & Crafts",
    icon: Paintbrush,
    sub: ["Corporate Gifting", "Handicrafts", "Festive Decor"],
  },
  {
    name: "Pet Supplies",
    icon: Dog,
    sub: ["Pet Food", "Pet Toys", "Grooming Supplies"],
  },
];
// --- Dummy Data for MSMEs ---
const MSMEsData = [
  {
    id: 1,
    name: "Jaipur Textiles & Co.",
    logo: Shirt,
    verified: true,
    years: 5,
    staff: "50-100",
    revenue: "US$500,000+",
    rating: 4.9,
    reviews: 150,
    capabilities: {
      onTimeDelivery: "99.2%",
      responseTime: "<2h",
      customization: "Full customization",
      certifications: ["ISO 9001", "GOTS Certified"],
    },
    products: [
      {
        name: "Hand-Blocked Silk",
        image:
          "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹450-600/m",
        minOrder: "50 meters",
      },
      {
        name: "Organic Cotton",
        image:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹120-150/m",
        minOrder: "100 meters",
      },
    ],
    factoryImage:
      "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
  },
  {
    id: 2,
    name: "Ahmedabad Precision Parts",
    logo: Factory,
    verified: true,
    years: 12,
    staff: "100-200",
    revenue: "US$2,000,000+",
    rating: 4.8,
    reviews: 210,
    capabilities: {
      onTimeDelivery: "100.0%",
      responseTime: "<1h",
      customization: "Minor customization",
      certifications: ["ISO 14001"],
    },
    products: [
      {
        name: "Hydraulic Pumps",
        image:
          "https://images.pexels.com/photos/6754395/pexels-photo-6754395.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹35,000/unit",
        minOrder: "10 units",
      },
      {
        name: "Ball Valves",
        image:
          "https://images.pexels.com/photos/4178885/pexels-photo-4178885.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹8,500/unit",
        minOrder: "50 units",
      },
    ],
    factoryImage:
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
  },
  {
    id: 3,
    name: "Global Electronics Sourcing",
    logo: Smartphone,
    verified: true,
    years: 2,
    staff: "20-50",
    revenue: "US$1,000,000+",
    rating: 4.7,
    reviews: 95,
    capabilities: {
      onTimeDelivery: "97.5%",
      responseTime: "<4h",
      customization: "ODM service available",
      certifications: ["CE Certified", "RoHS Compliant"],
    },
    products: [
      {
        name: "TWS Earbuds",
        image:
          "https://images.pexels.com/photos/7156881/pexels-photo-7156881.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹800-1,200/pc",
        minOrder: "100 pieces",
      },
      {
        name: "Smart Watches",
        image:
          "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2",
        price: "₹1,800-2,500/pc",
        minOrder: "50 pieces",
      },
    ],
    factoryImage:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      // Framer Motion expects 'type' to be a specific enum, not a string.
      // Remove 'type' or use 'type: AnimationType.Spring' if imported.
      stiffness: 100,
      damping: 12,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 120,
      damping: 12,
    },
  },
};

const CategorySidebar = () => (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg p-4 mr-[-20px]">
      <h3 className="font-bold text-lg text-slate-800 mb-4 px-2">Categories</h3>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100/50 scrollbar-thumb-rounded-full"
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            className="relative group"
          >
            <a
              href="#"
              className="flex items-center w-full text-left p-2 pr-1 rounded-lg text-slate-600 hover:bg-sky-100/70 hover:text-sky-700 transition-colors"
            >
              <category.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="flex-grow font-medium text-sm">
                {category.name}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </a>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-full top-0 w-64 ml-2 pl-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-xl shadow-xl p-4">
                  <h4 className="font-bold text-slate-800 mb-3">
                    {category.name}
                  </h4>
                  <div className="space-y-2">
                    {category.sub.map((subItem) => (
                      <a
                        href="#"
                        key={subItem}
                        className="block text-sm text-slate-600 hover:text-sky-600 hover:underline"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.nav>
    </Card>
  </motion.div>
);

const PromoCard = ({ title, subtitle, buttonText, image }) => (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden group mr-[-20px] p-3">
      <div className="relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={image}
          className="w-full rounded-xl h-40 object-cover"
          alt="Promotion"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-slate-200 text-sm">{subtitle}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">
            {buttonText}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

const ProductCard = ({ product }) => (
  <motion.div variants={itemVariants} className="group h-full flex flex-col">
    <Card className="h-full flex flex-col bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-400 ease-in-out"
        />
      </div>
      <CardContent className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 h-12">{product.name}</h3>
        <p className="text-lg font-bold text-sky-600">{product.price}</p>
        <div className="text-sm text-slate-500">
          Sold by{" "}
          <span className="text-slate-700 font-medium">{product.seller}</span>{" "}
          {product.certified && (
            <Check className="inline-block h-4 w-4 ml-1 text-green-500" />
          )}{" "}
        </div>
        <motion.div
          className="mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full mt-auto bg-slate-800 text-white hover:bg-slate-900">
            Contact Supplier
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

const SimpleProductCard = ({ item }) => (
  <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
    <a href="#" className="block">
      <CardHeader className="p-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs text-slate-500">Frequently searched</p>
        <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
      </CardContent>
    </a>
  </Card>
);

const HeroSearch = ({
  inputValue,
  setInputValue,
  handleSearch,
  isLoading,
  selectedImage,
  onImageChange,
  clearImage,
  searchNetwork,
  setSearchNetwork,
}) => {
  const [deepSearch, setDeepSearch] = useState(true);
  const fileInputRef = useRef(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    "Search for 'cotton fabric'..."
  );
  const placeholders = useMemo(
    () => [
      "Search for 'cotton fabric'...",
      "Try 'industrial pumps'...",
      "Find 'gaming laptops'...",
      "Enter 'stainless steel parts'...",
    ],
    []
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders]);

  const searchNetworks = ["ONDC Network", "Global Sources"];
  const handleImageButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onImageChange(file);
  };

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
                  <motion.p
                    key={currentPlaceholder}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-12 text-lg text-slate-500 pointer-events-none"
                  >
                    {currentPlaceholder}
                  </motion.p>
                )}
              </AnimatePresence>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent border-none text-lg h-auto py-3 pl-12 text-slate-900 placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyDown={(e) =>
                  e.key === "Enter" && !isLoading && handleSearch()
                }
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="rounded-xl h-12 px-8 bg-gradient-to-r from-purple-500 to-sky-500 hover:opacity-90 transition-opacity text-white font-semibold w-32 flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="text-base">Search</span>
                )}
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center justify-between pl-2 pr-1">
            <div className="relative flex items-center gap-1 rounded-full bg-slate-200/70 p-1">
              {searchNetworks.map((network) => (
                <button
                  key={network}
                  onClick={() => setSearchNetwork(network)}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {searchNetwork === network && (
                    <motion.div
                      layoutId="searchNetworkPill"
                      className="absolute inset-0 bg-purple-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 ${
                      searchNetwork === network
                        ? "text-white"
                        : "text-slate-600"
                    }`}
                  >
                    {network === "ONDC Network" ? (
                      <Store className="h-4 w-4" />
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                    {network}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Wand2 className="h-5 w-5 text-purple-500" />
                    <label
                      htmlFor="deep-search"
                      className="text-sm font-medium text-slate-700"
                    >
                      Deep Search
                    </label>
                    <Switch
                      id="deep-search"
                      checked={deepSearch}
                      onCheckedChange={setDeepSearch}
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border-slate-200 text-slate-600">
                  <Info className="h-5 w-5 text-sky-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Live AI Search
                    </h4>
                    <p className="text-sm">
                      This search uses a live AI model to generate results.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                variant="ghost"
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 h-auto px-3 py-1.5 rounded-lg"
                onClick={handleImageButtonClick}
              >
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm">Image Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchProgress = ({ currentState }) => {
  const searchSteps = [
    { key: "thinking", text: "Analyzing your query..." },
    { key: "contacting_ai", text: "Contacting sourcing AI..." },
    { key: "generating", text: "Generating product matches..." },
  ];
  const currentIndex = searchSteps.findIndex(
    (step) => step.key === currentState
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg text-left"
    >
      <h3 className="font-semibold text-lg text-slate-900 mb-4">
        Deep Search in Progress
      </h3>
      <div className="space-y-3">
        {searchSteps.map((step, index) => {
          const isCompleted = currentIndex > index;
          const isActive = currentIndex === index;
          return (
            <div
              key={step.key}
              className="flex items-center space-x-3 text-slate-600"
            >
              <div
                className={`flex items-center justify-center h-5 w-5 rounded-full transition-colors duration-300 ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-sky-500/20"
                    : "bg-slate-200"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
                ) : (
                  <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                )}
              </div>
              <span
                className={`transition-colors duration-300 ${
                  isCompleted
                    ? "text-slate-400 line-through"
                    : isActive
                    ? "text-slate-900 font-medium"
                    : "text-slate-500"
                }`}
              >
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ManufacturerCard = ({ manufacturer }) => {
  const navigate = useNavigate();
  return (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-inner">
                <manufacturer.logo className="h-8 w-8 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">
                  {manufacturer.name}
                </h3>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                  {manufacturer.verified && (
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-sky-500" /> Verified
                    </span>
                  )}
                  <span>{manufacturer.years} yrs</span>
                  <span>{manufacturer.staff} staff</span>
                  <span>{manufacturer.revenue}</span>
                </div>
              </div>
            </div>
            <div>
              <a
                href="#"
                className="text-sm font-medium text-sky-600 hover:underline"
              >
                {manufacturer.rating} ★ ({manufacturer.reviews}+ reviews)
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-600 mb-2">
                Factory Capabilities
              </h4>
              <ul className="space-y-1 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> On-time delivery:{" "}
                  <span className="font-bold text-slate-700">
                    {manufacturer.capabilities.onTimeDelivery}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" /> Response time:{" "}
                  <span className="font-bold text-slate-700">
                    {manufacturer.capabilities.responseTime}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2 pt-2 mt-auto">
              <Button
                variant="outline"
                className="w-full text-black bg-white/50"
                onClick={() => {
                  navigate("/chat");
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat now
              </Button>
              <Button className="w-full">Contact us</Button>
            </div>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-span-1 row-span-2 relative rounded-lg overflow-hidden group aspect-video">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={manufacturer.factoryImage}
                alt="Factory"
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            {manufacturer.products.map((product) => (
              <a
                href="#"
                key={product.name}
                className="relative rounded-lg overflow-hidden group aspect-video"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-xs font-bold">
                    {product.name} <br /> {product.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
  );
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
  const [isListingManagerOpen, setIsListingManagerOpen] = useState(false);
  // State for user's products is now managed here
  const [userProducts, setUserProducts] = useState(initialUserListedProducts);

  const handleAddProduct = (productData, imageUrl) => {
    const newProduct = {
      id: Math.max(0, ...userProducts.map((p) => p.id)) + 101, // Ensure unique ID
      name: productData.name,
      price: productData.price,
      seller: "Your Storefront",
      image: imageUrl,
      certified: true, // Default to certified
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
      // IMPORTANT: Replace with your actual Google Gemini API key
      const API_KEY = "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro",
      });
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
      const productsWithImages = aiData.products.map((p) => {
        const lowerImageQuery = p.image_query.toLowerCase();
        let dbProduct = marketplaceProducts.find((db) =>
          lowerImageQuery
            .split(" ")
            .some((keyword) => db.name.toLowerCase().includes(keyword))
        );
        if (!dbProduct) dbProduct = marketplaceProducts[0];
        return {
          ...dbProduct,
          name: p.name,
          price: p.price,
          seller: p.seller,
          image: dbProduct.image,
        };
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
  const [selectedType, setSelectedType] = useState();

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative flex flex-col items-center px-4 w-full"
          >
            <motion.h1
              variants={titleVariants}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600"
            >
              Smart Sourcing, Simplified.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mt-4 mb-8"
            >
              All tasks in one ask. Your B2B hub for services, products, and new
              opportunities.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-8 mb-6"
            >
              {searchTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchType(type)}
                  className="relative text-xl font-bold transition-colors pb-2"
                >
                  <span
                    className={
                      searchType === type
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-700"
                    }
                  >
                    {type}
                  </span>
                  {searchType === type && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full"
                      layoutId="searchTypeUnderline"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <HeroSearch
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSearch={handleSearch}
                isLoading={isLoading}
                selectedImage={selectedImage}
                onImageChange={setSelectedImage}
                clearImage={() => setSelectedImage(null)}
                searchNetwork={searchNetwork}
                setSearchNetwork={setSearchNetwork}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="my-12">
            <AnimatePresence>
              {isLoading || parsedProducts.length > 0 || error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {isLoading && searchState !== "idle" && (
                    <SearchProgress currentState={searchState} />
                  )}
                  {!isLoading && parsedProducts.length > 0 && (
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 mb-8 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg"
                      >
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">
                          AI Search Results
                        </h3>
                        <p className="text-slate-600">{searchSummary}</p>
                      </motion.div>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      >
                        {parsedProducts.map((product, index) => (
                          <ProductCard
                            key={product.id || index}
                            product={product}
                          />
                        ))}
                      </motion.div>
                    </div>
                  )}
                  {!isLoading && error && (
                    <div className="p-4 bg-red-50/80 border border-red-600/80 rounded-lg backdrop-blur-sm">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {searchType !== "MSMEs" && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="p-8 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100"
            >
              <div className="flex justify-between items-center mb-6">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-teal-900">
                    Your Listed Products
                  </h2>
                  <p className="text-teal-800/70 mt-1">
                    Manage your catalog and view your public listings.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    className="bg-white/50 border-teal-200 hover:bg-white/80"
                    onClick={() => setIsListingManagerOpen(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Manage Listings
                  </Button>
                </motion.div>
              </div>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
              >
                {userProducts.map((product) => (
                  <ProductCard key={`user-${product.id}`} product={product} />
                ))}
              </motion.div>
            </motion.section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="space-y-8 fit-content"
            >
              <CategorySidebar />
              <PromoCard
                title="Savings Booster"
                subtitle="First order, FREE shipping"
                buttonText="Explore now"
                image="https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </motion.div>

            <main className="w-full overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="space-y-16"
              >
                {searchType !== "MSMEs" && (
                  <section className="p-8 rounded-2xl bg-gradient-to-br from-rose-200 to-orange-100">
                    <h2 className="text-3xl font-bold mb-6 text-black">
                      Recommended For You
                    </h2>
                    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                      {marketplaceProducts.slice(0, 8).map((product) => (
                        <div
                          key={`rec-${product.id}`}
                          className="w-64 flex-shrink-0"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {searchType === "Products" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-16"
                  >
                    <section className="rounded-2xl bg-gradient-to-r from-pink-400/60 to-red-200/60 backdrop-blur-sm p-6">
                      <h2 className="text-3xl font-bold mb-6">
                        Frequently Searched
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {marketplaceProducts.slice(8, 12).map((item) => (
                          <SimpleProductCard
                            key={`freq-${item.id}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}
                {(searchType === "MSMEs" || searchType === "Suppliers") && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold">
                      Featured {searchType}
                    </h2>
                    <div className="space-y-6">
                      {MSMEsData.map((mfg) => (
                        <ManufacturerCard key={mfg.id} manufacturer={mfg} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </main>
          </div>
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-300 to-slate-300 "
          >
            <h2 className="text-3xl font-bold mb-8 text-white">
              More Products to Explore
            </h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {marketplaceProducts.map((product) => (
                <ProductCard key={`feat-${product.id}`} product={product} />
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};
