import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'cyan', 
  text = 'Cargando...',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    cyan: 'text-cyan-600',
    white: 'text-white',
    neutral: 'text-neutral-600'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
        />
      </svg>
      {text && (
        <p className="mt-2 text-sm text-neutral-600">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 