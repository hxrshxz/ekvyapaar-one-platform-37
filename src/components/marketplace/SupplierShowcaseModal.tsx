// FILE: src/components/marketplace/SupplierShowcaseModal.tsx

"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Star, ShieldCheck, Users, Zap, Rotate3d, Download, MessageSquare, FileText } from "lucide-react";

// This component displays the immersive supplier profile modal.
export const SupplierShowcaseModal = ({ isOpen, onClose, supplier }) => {
  if (!isOpen || !supplier) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* --- Hero Video Banner --- */}
          <div className="relative h-64 w-full rounded-t-2xl overflow-hidden">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://videos.pexels.com/video-files/5944548/5944548-hd_1920_1080_25fps.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-4xl font-bold">{supplier.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-sm"><ShieldCheck className="h-4 w-4 text-green-400"/> Verified Supplier</span>
                <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 text-yellow-400"/> {supplier.rating} ({supplier.reviews}+ Reviews)</span>
                <span className="text-sm">{supplier.years}+ Years on Ekvyapaar</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* --- Detailed Content --- */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Key Business Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-100 p-3 rounded-lg"><p className="text-slate-500">Staff</p><p className="font-semibold text-slate-900">{supplier.staff}</p></div>
                  <div className="bg-slate-100 p-3 rounded-lg"><p className="text-slate-500">Revenue</p><p className="font-semibold text-slate-900">{supplier.revenue}</p></div>
                  <div className="bg-slate-100 p-3 rounded-lg"><p className="text-slate-500">Response Time</p><p className="font-semibold text-slate-900">{supplier.capabilities.responseTime}</p></div>
                  <div className="bg-slate-100 p-3 rounded-lg"><p className="text-slate-500">On-Time Delivery</p><p className="font-semibold text-slate-900">{supplier.capabilities.onTimeDelivery}</p></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Verifications & Certifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm p-2 bg-green-50 border border-green-200 rounded-lg"><ShieldCheck className="h-5 w-5 text-green-600 mr-3"/> Ekvyapaar On-Site Verified</div>
                  {supplier.capabilities.certifications.map(cert => (
                    <div key={cert} className="flex items-center text-sm p-2 bg-slate-100 rounded-lg"><FileText className="h-5 w-5 text-slate-500 mr-3"/> {cert}</div>
                  ))}
                </div>
              </div>
              <div>
                <Button className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold">
                  <Rotate3d className="mr-2 h-5 w-5"/> Take a 360° Virtual Factory Tour
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <Button size="lg" className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-bold text-base">
                  <FileText className="mr-2 h-5 w-5"/> Request a Quote
                </Button>
                <Button size="lg" variant="outline" className="w-full h-12 text-base font-bold">
                  <MessageSquare className="mr-2 h-5 w-5"/> Chat Now
                </Button>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Product Showcase</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {supplier.products.map(product => (
                    <div key={product.name} className="relative rounded-lg overflow-hidden group aspect-square">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <p className="text-white text-sm font-bold">{product.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};