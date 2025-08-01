import React, { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  sizes = '100vw',
  loading = 'lazy',
  onLoad,
  onError,
  fallback = '/placeholder-image.jpg',
  quality = 80,
  format = 'webp',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Función para generar URL optimizada
  const getOptimizedUrl = (originalSrc, width = 400) => {
    if (!originalSrc || originalSrc.startsWith('data:') || originalSrc.startsWith('blob:')) {
      return originalSrc;
    }

    // Si es una imagen local, retornar como está
    if (originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
      return originalSrc;
    }

    // Para imágenes externas, podrías usar un servicio de optimización
    // Por ahora, retornamos la imagen original
    return originalSrc;
  };

  // Función para generar srcset
  const getSrcSet = (originalSrc) => {
    if (!originalSrc || originalSrc.startsWith('data:') || originalSrc.startsWith('blob:') || originalSrc.startsWith('/')) {
      return undefined;
    }

    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(width => `${getOptimizedUrl(originalSrc, width)} ${width}w`)
      .join(', ');
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

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
        rootMargin: '50px 0px', // Cargar 50px antes de que la imagen entre en viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Cargar imagen cuando esté en viewport
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.(img);
      };

      img.onerror = () => {
        setHasError(true);
        setImageSrc(fallback);
        onError?.(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    }
  }, [isInView, src, isLoaded, hasError, fallback, onLoad, onError]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      loading={loading}
      sizes={sizes}
      srcSet={getSrcSet(src)}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true);
        setImageSrc(fallback);
      }}
      {...props}
    />
  );
};

export default OptimizedImage; 