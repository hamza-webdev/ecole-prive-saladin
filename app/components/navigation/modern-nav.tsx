import React from 'react';
import Link from 'next/link';
import { SchoolLogo } from '@/components/logo/school-logo';

export const ModernNav = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <SchoolLogo />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Accueil
              </Link>
              <Link href="/#about" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                À propos
              </Link>
              <Link href="/#programs" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Programmes
              </Link>
              <Link href="/#admissions" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Admissions
              </Link>
              <Link href="/#contact" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
