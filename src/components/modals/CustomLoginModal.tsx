// src/components/modals/CustomLoginModal.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, KeyRound } from 'lucide-react';

// Define the props the component will accept
interface CustomLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomLoginModal = ({ isOpen, onClose }: CustomLoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // <-- FIX #1: Use the correct hook

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate an API call with a 1.5-second delay
    setTimeout(() => {
      setIsLoading(false);
      onClose(); // Close the modal
      navigate('/dashboard'); // <-- FIX #2: Use the correct navigation function
    }, 1500);
  };

  // Allow closing the modal with the 'Escape' key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Use AnimatePresence to handle enter/exit animations
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // This is the backdrop
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            // This is the modal content
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-8 shadow-2xl shadow-sky-900/50"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white">Welcome to EkVyapaar</h3>
                <p className="mt-2 text-sm text-slate-400">
                    This is a demo login. Click continue to proceed.
                </p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="udyam" className="text-sm font-medium text-slate-300">Udyam/PAN</label>
                <input 
                  id="udyam"
                  type="text"
                  defaultValue="UDYAM-MH-01-0000001"
                  readOnly
                  className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 p-3 text-white focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
               <div>
                <label htmlFor="otp" className="text-sm font-medium text-slate-300">OTP</label>
                <input 
                  id="otp"
                  type="text"
                  defaultValue="123456"
                  readOnly
                  className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 p-3 text-white focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="mt-8">
               <button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full flex items-center justify-center rounded-md bg-sky-600 px-4 py-3 text-base font-semibold text-white hover:bg-sky-500 disabled:opacity-60 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <KeyRound className="mr-2 h-5 w-5" />
                    Continue to Dashboard
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};