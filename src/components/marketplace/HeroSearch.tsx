// src/components/marketplace/HeroSearch.tsx

"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search, Wand2, Camera, Info, Loader2, Store, Globe } from "lucide-react";

interface HeroSearchProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSearch: () => void;
    isLoading: boolean;
    onImageChange: (file: File) => void;
    searchNetwork: string;
    setSearchNetwork: (network: string) => void;
}

export const HeroSearch = ({
  inputValue,
  setInputValue,
  handleSearch,
  isLoading,
  onImageChange,
  searchNetwork,
  setSearchNetwork,
}: HeroSearchProps) => {
  const [deepSearch, setDeepSearch] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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