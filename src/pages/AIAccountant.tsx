import React, { useState, useEffect, useRef } from 'react';

const AIAccountant = () => {
  const [step, setStep] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const fileInputRef = useRef(null);
  type ChatMessage = {
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
    actions?: string[];
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi there! I'm your AI Accountant. How can I help today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Simulate AI processing
  useEffect(() => {
    let timer;
    if (step === 'processing') {
      setProcessingProgress(0);
      
      // Set processing steps
      setProcessingSteps([
        "Receiving your bill...",
        "Reading document content...",
        "Identifying vendor information...",
        "Extracting GSTIN details...",
        "Analyzing tax components...",
        "Verifying invoice totals...",
        "Finalizing extraction..."
      ]);
      
      timer = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('verification');
            return 100;
          }
          return prev + 20;
        });
        
        // Move to next processing step every 1.5 seconds
        if (processingProgress % 20 === 0 && processingProgress < 100) {
          setCurrentStepIndex(prev => Math.min(prev + 1, processingSteps.length - 1));
        }
      }, 200);
    }
    return () => clearInterval(timer);
  }, [step, processingProgress]);

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
    setUploadedFile(null);
    setProcessingSteps([]);
    setCurrentStepIndex(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setStep('processing');
      
      // Add chat message
      setChatMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: `Uploaded file: ${file.name}`, sender: 'user', timestamp: new Date() }
      ]);
    }
  };

  const handleCameraClick = () => {
    setStep('processing');
    
    // Add chat message
    setChatMessages(prev => [
      ...prev,
      { id: prev.length + 1, text: "Started camera to capture bill", sender: 'user', timestamp: new Date() }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      let aiResponse = "I can help you scan and record bills. Would you like to scan a new bill?";
      
      if (newMessage.toLowerCase().includes('scan') || newMessage.toLowerCase().includes('bill')) {
        aiResponse = "Sure! Please choose how you'd like to add your bill:";
      } else if (newMessage.toLowerCase().includes('expense') || newMessage.toLowerCase().includes('record')) {
        aiResponse = "I can help record expenses. Would you like to scan a bill?";
      } else if (newMessage.toLowerCase().includes('gst') || newMessage.toLowerCase().includes('tax')) {
        aiResponse = "I can extract GST details from bills. Upload a bill to get started.";
      }
      
      setChatMessages(prev => [
        ...prev,
        { 
          id: prev.length + 2, 
          text: aiResponse, 
          sender: 'ai', 
          timestamp: new Date(),
          actions: aiResponse.includes('choose') ? ['camera', 'upload'] : []
        }
      ]);
    }, 1000);
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
      
      {/* Chat-like interface */}
      <div className="fixed bottom-6 right-6 z-10">
        <div 
          className="rounded-full w-16 h-16 flex items-center justify-center shadow-xl cursor-pointer transform hover:scale-110 transition-transform"
          style={{
            background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.5)'
          }}
          onClick={() => setStep('chat')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

  const renderChatScreen = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end justify-end z-50 p-4 md:p-8">
      <div 
        className="rounded-2xl w-full max-w-md h-5/6 flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}
      >
        <div className="p-4 border-b border-slate-200/30 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-white">AI Accountant</h3>
              <p className="text-xs text-blue-200">Online • Ready to help</p>
            </div>
          </div>
          <button 
            onClick={() => setStep('main')}
            className="text-blue-200 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${message.sender === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-none' 
                  : 'bg-slate-800 text-white rounded-bl-none'}`}
              >
                {message.text}
                {message.actions && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-blue-100">Choose an option:</div>
                    <div className="flex space-x-2">
                      {message.actions.includes('camera') && (
                        <button 
                          onClick={handleCameraClick}
                          className="flex items-center justify-center px-3 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Camera
                        </button>
                      )}
                      {message.actions.includes('upload') && (
                        <button 
                          onClick={() => fileInputRef.current.click()}
                          className="flex items-center justify-center px-3 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200/30">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything about bills, expenses, or taxes..."
              className="flex-grow bg-slate-800 text-white rounded-l-xl px-4 py-3 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-gradient-to-br from-blue-500 to-purple-500 text-white px-4 py-3 rounded-r-xl hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*, .pdf"
        onChange={handleFileUpload}
      />
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
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">Analyzing Your Bill</h2>
        
        <div className="w-full max-w-md space-y-4 mb-8">
          {processingSteps.slice(0, currentStepIndex + 1).map((step, index) => (
            <div 
              key={index} 
              className="flex items-start"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 mt-1 mr-3 ${index < currentStepIndex ? 'text-green-400' : 'text-blue-400'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-white">{step}</p>
                {index === currentStepIndex && (
                  <div className="w-48 h-1 bg-blue-800 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out"
                      style={{ width: `${processingProgress % 20 * 5}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
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
            <span>Processing</span>
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
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
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
        
        <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="bg-slate-800/50 rounded-lg p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-blue-200">Expense Recorded</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-800/50 rounded-lg p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-blue-200">GST Calculated</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-800/50 rounded-lg p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <span className="text-sm text-blue-200">Sheet Updated</span>
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
        
        <div className="mt-8 flex space-x-4">
          <button className="flex items-center text-blue-300 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View in Sheets
          </button>
          <button className="flex items-center text-blue-300 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Download PDF
          </button>
        </div>
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
        {step === 'chat' && renderChatScreen()}
        {step === 'processing' && renderProcessingScreen()}
        {step === 'verification' && renderVerificationScreen()}
        {step === 'automation' && renderAutomationScreen()}
        {step === 'confirmation' && renderConfirmationScreen()}
      </div>
    </div>
  );
};

export default AIAccountant;