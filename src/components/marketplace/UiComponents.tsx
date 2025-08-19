// src/components/marketplace/UiComponents.tsx

"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Loader2, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { categories } from '@/data/marketplaceData';
import type { Product } from '@/data/marketplaceData';


// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { stiffness: 100, damping: 12 },
  },
};

export const CategorySidebar = () => (
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
          <motion.div key={category.name} variants={itemVariants} className="relative group">
            <a href="#" className="flex items-center w-full text-left p-2 pr-1 rounded-lg text-slate-600 hover:bg-sky-100/70 hover:text-sky-700 transition-colors">
              <category.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="flex-grow font-medium text-sm">{category.name}</span>
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
                  <h4 className="font-bold text-slate-800 mb-3">{category.name}</h4>
                  <div className="space-y-2">
                    {category.sub.map((subItem) => (
                      <a href="#" key={subItem} className="block text-sm text-slate-600 hover:text-sky-600 hover:underline">
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

export const PromoCard = ({ title, subtitle, buttonText, image }: { title: string, subtitle: string, buttonText: string, image: string }) => (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden group mr-[-20px] p-3">
      <div className="relative">
        <motion.img whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} src={image} className="w-full rounded-xl h-40 object-cover" alt="Promotion" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-slate-200 text-sm">{subtitle}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">{buttonText}</Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export const ProductCard = ({ product }: { product: Product }) => (
  <motion.div variants={itemVariants} className="group h-full flex flex-col">
    <Card className="h-full flex flex-col bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-400 ease-in-out" />
      </div>
      <CardContent className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 h-12">{product.name}</h3>
        <p className="text-lg font-bold text-sky-600">{product.price}</p>
        <div className="text-sm text-slate-500">
          Sold by <span className="text-slate-700 font-medium">{product.seller}</span>{" "}
          {product.certified && <Check className="inline-block h-4 w-4 ml-1 text-green-500" />}
        </div>
        <motion.div className="mt-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full mt-auto bg-slate-800 text-white hover:bg-slate-900">Contact Supplier</Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export const SimpleProductCard = ({ item }: { item: Product }) => (
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

export const SearchProgress = ({ currentState }: { currentState: string }) => {
  const searchSteps = [
    { key: "thinking", text: "Analyzing your query..." },
    { key: "contacting_ai", text: "Contacting sourcing AI..." },
    { key: "generating", text: "Generating product matches..." },
  ];
  const currentIndex = searchSteps.findIndex((step) => step.key === currentState);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg text-left"
    >
      <h3 className="font-semibold text-lg text-slate-900 mb-4">Deep Search in Progress</h3>
      <div className="space-y-3">
        {searchSteps.map((step, index) => {
          const isCompleted = currentIndex > index;
          const isActive = currentIndex === index;
          return (
            <div key={step.key} className="flex items-center space-x-3 text-slate-600">
              <div className={`flex items-center justify-center h-5 w-5 rounded-full transition-colors duration-300 ${isCompleted ? "bg-green-500" : isActive ? "bg-sky-500/20" : "bg-slate-200"}`}>
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
                ) : (
                  <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                )}
              </div>
              <span className={`transition-colors duration-300 ${isCompleted ? "text-slate-400 line-through" : isActive ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export const ManufacturerCard = ({ manufacturer }: { manufacturer: any }) => (
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
                            <h3 className="font-bold text-xl text-slate-900">{manufacturer.name}</h3>
                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                                {manufacturer.verified && <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-sky-500" /> Verified</span>}
                                <span>{manufacturer.years} yrs</span>
                                <span>{manufacturer.staff} staff</span>
                                <span>{manufacturer.revenue}</span>
                            </div>
                        </div>
                    </div>
                    <div><a href="#" className="text-sm font-medium text-sky-600 hover:underline">{manufacturer.rating} ★ ({manufacturer.reviews}+ reviews)</a></div>
                    <div>
                        <h4 className="font-semibold text-slate-600 mb-2">Factory Capabilities</h4>
                        <ul className="space-y-1 text-sm text-slate-500">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> On-time delivery: <span className="font-bold text-slate-700">{manufacturer.capabilities.onTimeDelivery}</span></li>
                            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-green-500" /> Response time: <span className="font-bold text-slate-700">{manufacturer.capabilities.responseTime}</span></li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 pt-2 mt-auto">
                        <Button variant="outline" className="w-full bg-white/50"><MessageSquare className="h-4 w-4 mr-2" />Chat now</Button>
                        <Button className="w-full">Contact us</Button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="col-span-1 row-span-2 relative rounded-lg overflow-hidden group aspect-video">
                        <motion.img whileHover={{ scale: 1.05 }} src={manufacturer.factoryImage} alt="Factory" className="w-full h-full object-cover transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    {manufacturer.products.map((product: any) => (
                        <a href="#" key={product.name} className="relative rounded-lg overflow-hidden group aspect-video">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                <p className="text-white text-xs font-bold">{product.name} <br /> {product.price}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            </CardContent>
        </Card>
    </motion.div>
);