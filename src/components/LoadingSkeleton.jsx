import React from 'react';

const LoadingSkeleton = ({ type = 'product', count = 1 }) => {
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-neutral-200"></div>
      <div className="p-4">
        <div className="h-4 bg-neutral-200 rounded mb-2"></div>
        <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  const PlayerSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-80 bg-neutral-200"></div>
      <div className="p-6">
        <div className="h-6 bg-neutral-200 rounded mb-3"></div>
        <div className="h-4 bg-neutral-200 rounded mb-2"></div>
        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  const CardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      <div className="h-4 bg-neutral-200 rounded mb-4"></div>
      <div className="h-4 bg-neutral-200 rounded mb-2"></div>
      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'product':
        return <ProductSkeleton />;
      case 'player':
        return <PlayerSkeleton />;
      case 'card':
        return <CardSkeleton />;
      default:
        return <ProductSkeleton />;
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton; 