"use client";
import React, { useState } from 'react';

const AICommandCenter = ({ onCommand }) => {
  const [query, setQuery] = useState('');

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    alert(`Query submitted to AI: "${query}"\n(This is where you would connect to a language model)`);
    setQuery('');
  };

  const actionButtons = [
    {
      action: 'scan',
      label: 'Scan Bill',
      icon: (
        <svg xmlns="http://www.w.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      action: 'invoice',
      label: 'Create Invoice',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      action: 'report',
      label: 'View Reports',
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative mb-8 rounded-2xl p-4"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      {/* --- Main Input Bar --- */}
      <form onSubmit={handleQuerySubmit} className="flex items-center space-x-2 mb-3">
        <div className="flex-grow flex items-center rounded-lg px-3" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask or command your AI Accountant..."
            className="bg-transparent border-none text-white placeholder-blue-200 w-full h-12 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 h-12 rounded-lg text-white font-semibold transition-transform duration-200 transform hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #6366F1, #8B5CF6)'}}
        >
          Ask AI
        </button>
      </form>

      {/* --- Action Buttons --- */}
      <div className="flex items-center space-x-2">
        {actionButtons.map(({ action, label, icon }) => (
          <button
            key={action}
            onClick={() => onCommand(action)}
            className="flex-1 flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-colors duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1', // slate-300
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AICommandCenter;