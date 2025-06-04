'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="font-bold font-extra-large"
          style={{ color: 'var(--primary)', fontFamily: 'cursive' }}
        >
          Best wishes
        </div>

        {/* Navigation and Icons */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium font-content">
            <Link href="#services" className="hover:text-purple-600">
              Services
            </Link>
            <Link href="#gifts" className="hover:text-purple-600">
              Gift combo
            </Link>
            {isContactPage ? (
              <Link href="/contact" className="hover:text-purple-600">
                Contact Us
              </Link>
            ) : (
              <Link href="/about" className="hover:text-purple-600">
                About Us
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Heart className="w-5 h-5 text-gray-700 hover:text-purple-600 cursor-pointer" />
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-purple-600 cursor-pointer" />
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-purple-600 font-content"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
