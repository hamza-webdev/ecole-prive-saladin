import React from 'react';

export const SchoolLogo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center space-x-2`}>
      <div className="relative">
        {/* Cercle principal avec dégradé rouge */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
          {/* Icône de livre stylisée */}
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        {/* Décoration supplémentaire */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-300 rounded-full"></div>
      </div>
      <div>
        <h1 className="font-bold text-xl text-gray-900">École</h1>
        <p className="text-xs text-gray-600">Saladin</p>
      </div>
    </div>
  );
};
