import React from 'react';

const ImageSkeleton = ({ 
  width = '100%', 
  height = '200px', 
  className = '',
  variant = 'default' // default, card, banner, avatar
}) => {
  const getSkeletonClasses = () => {
    const baseClasses = 'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%]';
    
    switch (variant) {
      case 'card':
        return `${baseClasses} rounded-lg`;
      case 'banner':
        return `${baseClasses} rounded-xl`;
      case 'avatar':
        return `${baseClasses} rounded-full`;
      default:
        return `${baseClasses} rounded-md`;
    }
  };

  const getAnimationStyle = () => {
    return {
      animation: 'shimmer 2s infinite',
      backgroundSize: '200% 100%',
      backgroundImage: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)'
    };
  };

  return (
    <div
      className={`${getSkeletonClasses()} ${className}`}
      style={{
        width,
        height,
        ...getAnimationStyle()
      }}
    />
  );
};

export default ImageSkeleton; 