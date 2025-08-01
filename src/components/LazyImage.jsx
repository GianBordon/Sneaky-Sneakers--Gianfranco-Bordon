import React, { useState, useEffect, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import ImageSkeleton from './ImageSkeleton';

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  variant = 'default',
  placeholder = true,
  skeleton = true,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px 0px', // Cargar 100px antes de que la imagen entre en viewport
        threshold: 0.01
      }
    );

    observer.observe(containerRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleImageLoad = (img) => {
    setIsLoading(false);
    onLoad?.(img);
  };

  const handleImageError = (error) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Skeleton mientras carga */}
      {isLoading && skeleton && (
        <ImageSkeleton
          width={width}
          height={height}
          variant={variant}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Imagen optimizada */}
      {isInView && (
        <OptimizedImage
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      )}

      {/* Placeholder si hay error */}
      {hasError && placeholder && (
        <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
          <div className="text-center text-neutral-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Imagen no disponible</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 