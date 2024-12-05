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
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Newsletter Signup Teaser */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Stay Updated
          </h3>
          <p className="text-sm text-blue-600 mb-3">
            Subscribe to our newsletter for the latest updates and resources.
          </p>
          <button
            onClick={() => {/* TODO: Implement newsletter signup */}}
            className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
