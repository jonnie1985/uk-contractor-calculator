'use client';

import React from 'react';

export default function NewsletterSignup() {
  const handleSubscribe = () => {
    window.open('https://docs.google.com/forms/d/1VIiE4BEpdVcQabeYPPqfjBxL2Db9MzeCaE5j5zqMSnY/viewform', '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Join Our Newsletter
      </h3>
      <div className="text-gray-600 mb-6">
        <p className="mb-2">Get exclusive access to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Latest contractor news</li>
          <li>Tax updates and advice</li>
          <li>Industry insights</li>
          <li>Tips for maximizing your earnings</li>
        </ul>
      </div>

      <button
        onClick={handleSubscribe}
        className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Subscribe Now</span>
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </button>
    </div>
  );
}
