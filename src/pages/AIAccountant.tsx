import React, { useState, useEffect } from 'react';

const AIAccountant = () => {
  const [step, setStep] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate AI processing
  useEffect(() => {
    let timer;
    if (step === 'processing') {
      setProcessingProgress(0);
      timer = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('verification');
            return 100;
          }
          return prev + 20;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [step]);

  // Simulate automation progress
  useEffect(() => {
    let timer;
    if (step === 'automation') {
      setAutomationProgress(0);
      timer = setInterval(() => {
        setAutomationProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStep('confirmation'), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setTimeout(() => setStep('automation'), 300);
  };

  const resetFlow = () => {
    setStep('main');
    setSelectedCategory('');
    setProcessingProgress(0);
    setAutomationProgress(0);
  };

  const renderMainScreen = () => (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div 
        className="rounded-2xl p-6 mb-6"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">AI Accountant</h1>
        <p className="text-blue-100 mb-6">Smart bill management for your business</p>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div 
            className="flex items-center rounded-xl px-4 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bills or vendors..."
              className="bg-transparent border-none text-white placeholder-blue-200 w-full focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Bills</h2>
          <div className="text-sm text-blue-200">August 2025</div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div 
            className="rounded-xl p-4 flex justify-between items-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <div className="font-medium text-white">Textile Traders Inc</div>
              <div className="text-sm text-blue-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Raw Material | ₹12,450
              </div>
            </div>
            <div className="text-blue-200">15 Aug</div>
          </div>
          
          <div 
            className="rounded-xl p-4 flex justify-between items-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <div className="font-medium text-white">Printing Solutions</div>
              <div className="text-sm text-blue-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Marketing | ₹8,200
              </div>
            </div>
            <div className="text-blue-200">10 Aug</div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={() => setStep('modal')}
            className="flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium text-lg transform hover:scale-105 transition-transform duration-300"
            style={{
              background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
            }}
          >
            + Scan New Bill
          </button>
        </div>
      </div>
      
      <div 
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Dashboard Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-blue-200 mb-1">Total Expenses (August)</div>
            <div className="text-2xl font-bold text-white">₹20,626</div>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-blue-200 mb-1">Input Tax Credit</div>
            <div className="text-2xl font-bold text-white">₹2,976</div>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-blue-200 mb-1">Bills Processed</div>
            <div className="text-2xl font-bold text-white">6</div>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-blue-200 mb-1">Savings</div>
            <div className="text-2xl font-bold text-white">₹1,850</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-95"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">Add New Bill</h2>
        <p className="text-blue-200 text-center mb-8">How would you like to add your bill?</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => setStep('processing')}
            className="flex items-center justify-center w-full py-4 rounded-xl text-lg text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Use Camera
          </button>
          
          <button 
            onClick={() => setStep('processing')}
            className="flex items-center justify-center w-full py-4 rounded-xl text-lg text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload File
          </button>
        </div>
        
        <button 
          onClick={() => setStep('main')}
          className="mt-6 text-blue-300 flex items-center justify-center w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );

  const renderProcessingScreen = () => (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div 
        className="rounded-2xl p-8 flex flex-col items-center"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>
            <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20 animate-ping"></div>
            <div className="text-5xl text-white">🤖</div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">AI Accountant is reading your bill...</h2>
        <p className="text-blue-200 mb-8 text-center">Extracting Vendor, GSTIN, and Tax Details...</p>
        
        <div className="w-full max-w-md">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              className="h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${processingProgress}%`,
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)'
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-blue-200 text-sm">
            <span>Scanning</span>
            <span>{processingProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerificationScreen = () => (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div 
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">Please Verify Bill Details</h2>
        <p className="text-blue-200 mb-6">Confirm extracted information</p>
        
        <div 
          className="rounded-xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Vendor Information
          </h3>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-blue-200 w-32">Vendor Name:</span>
              <span className="text-white">Ram Lal & Sons Fabrics</span>
            </div>
            <div className="flex">
              <span className="text-blue-200 w-32">Vendor GSTIN:</span>
              <span className="text-white">07AABCR1234F1Z5</span>
            </div>
          </div>
        </div>
        
        <div 
          className="rounded-xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Invoice Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-blue-200">Bill Number</div>
              <div className="text-white">INV/25-26/482</div>
            </div>
            <div>
              <div className="text-blue-200">Bill Date</div>
              <div className="text-white">18-Aug-2025</div>
            </div>
          </div>
        </div>
        
        <div 
          className="rounded-xl p-5 mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Amount Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-200">Taxable Value:</span>
              <span className="text-white">₹13,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">CGST (9%):</span>
              <span className="text-white">₹1,188</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">SGST (9%):</span>
              <span className="text-white">₹1,188</span>
            </div>
            <div className="flex justify-between border-t border-blue-800 pt-2 mt-2">
              <span className="text-blue-200 font-medium">Total GST Amount:</span>
              <span className="text-white font-medium">₹2,376</span>
            </div>
            <div className="flex justify-between border-t border-blue-800 pt-2 mt-2">
              <span className="text-blue-200 font-semibold">Invoice Total:</span>
              <span className="text-white font-semibold text-lg">₹15,576</span>
            </div>
          </div>
        </div>
        
        <div 
          className="rounded-xl p-5"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            What category is this expense?
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => handleCategorySelect('raw')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl text-sm text-white ${
                selectedCategory === 'raw' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                  : 'bg-transparent border border-white border-opacity-20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Raw Material
            </button>
            <button 
              onClick={() => handleCategorySelect('shop')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl text-sm text-white ${
                selectedCategory === 'shop' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                  : 'bg-transparent border border-white border-opacity-20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop Expense
            </button>
            <button 
              onClick={() => handleCategorySelect('utilities')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl text-sm text-white ${
                selectedCategory === 'utilities' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                  : 'bg-transparent border border-white border-opacity-20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Utilities
            </button>
            <button 
              onClick={() => handleCategorySelect('marketing')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl text-sm text-white ${
                selectedCategory === 'marketing' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                  : 'bg-transparent border border-white border-opacity-20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Marketing
            </button>
            <button 
              onClick={() => handleCategorySelect('other')}
              className={`flex flex-col items-center justify-center py-3 rounded-xl text-sm text-white ${
                selectedCategory === 'other' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                  : 'bg-transparent border border-white border-opacity-20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Other
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomationScreen = () => (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div 
        className="rounded-2xl p-8 flex flex-col items-center"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #06B6D4)' }}>
            <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20 animate-ping"></div>
            <div className="text-5xl text-white">🤖</div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">Recording to Your Ledger...</h2>
        <p className="text-blue-200 mb-8 text-center">
          Our AI assistant is now securely adding this expense to your Google Sheet.
        </p>
        
        <div className="w-full max-w-md">
          <div 
            className="h-3 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              className="h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${automationProgress}%`,
                background: 'linear-gradient(90deg, #0EA5E9, #06B6D4)'
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-blue-200 text-sm">
            <span>Processing</span>
            <span>{automationProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmationScreen = () => (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div 
        className="rounded-2xl p-10 flex flex-col items-center text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}
      >
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #10B981, #34D399)',
            animation: 'scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Recorded & Saved!</h2>
        
        <div 
          className="rounded-xl p-5 mb-8 max-w-md"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <p className="text-lg text-white">
            I've added it to your Google Sheet. Your total Input Tax Credit claim for August is now <span className="font-bold">₹16,676</span>.
          </p>
        </div>
        
        <button 
          onClick={resetFlow}
          className="px-8 py-3 rounded-xl text-white font-medium text-lg"
          style={{
            background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes scale-in {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          .animate-ping {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="container mx-auto">
        {step === 'main' && renderMainScreen()}
        {step === 'modal' && renderModal()}
        {step === 'processing' && renderProcessingScreen()}
        {step === 'verification' && renderVerificationScreen()}
        {step === 'automation' && renderAutomationScreen()}
        {step === 'confirmation' && renderConfirmationScreen()}
      </div>
    </div>
  );
};

export default AIAccountant;