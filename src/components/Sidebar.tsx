'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { title: 'News', path: '/' },
  { title: 'Salary Calculator', path: '/calculator' },
  { title: 'Useful Links', path: '/links' }
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const pathname = usePathname();

  const handleSubscribe = () => {
    window.open('https://docs.google.com/forms/d/1VIiE4BEpdVcQabeYPPqfjBxL2Db9MzeCaE5j5zqMSnY/viewform', '_blank');
    if (onClose) onClose();
  };

  return (
    <nav className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="py-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={onClose}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Newsletter subscription button */}
        <div className="mt-6 px-4">
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
      </div>
    </nav>
  );
};

export default Sidebar;
