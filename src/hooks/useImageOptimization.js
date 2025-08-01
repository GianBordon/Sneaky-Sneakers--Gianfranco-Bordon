import { useState, useEffect, useCallback } from 'react';

export const useImageOptimization = () => {
  const [imageCache, setImageCache] = useState(new Map());
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Función para generar URL optimizada
  const getOptimizedUrl = useCallback((originalSrc, options = {}) => {
    const {
      width = 400,
      height,
      quality = 80,
      format = 'webp',
      fit = 'cover'
    } = options;

    if (!originalSrc) return '';

    // Si es una imagen local o data URL, retornar como está
    if (originalSrc.startsWith('data:') || originalSrc.startsWith('blob:') || 
        originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
      return originalSrc;
    }

    // Para imágenes externas, podrías usar un servicio de optimización
    // Por ahora, retornamos la imagen original
    return originalSrc;
  }, []);

  // Función para generar srcset
  const getSrcSet = useCallback((originalSrc, breakpoints = [320, 640, 768, 1024, 1280, 1920]) => {
    if (!originalSrc || originalSrc.startsWith('data:') || originalSrc.startsWith('blob:') || 
        originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
      return undefined;
    }

    return breakpoints
      .map(width => `${getOptimizedUrl(originalSrc, { width })} ${width}w`)
      .join(', ');
  }, [getOptimizedUrl]);

  // Función para generar sizes
  const getSizes = useCallback((sizes = '100vw') => {
    return sizes;
  }, []);

  // Función para preload imagen
  const preloadImage = useCallback((src) => {
    if (!src || preloadedImages.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(src));
        resolve(img);
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }, [preloadedImages]);

  // Función para precargar múltiples imágenes
  const preloadImages = useCallback(async (imageUrls) => {
    const promises = imageUrls.map(url => preloadImage(url));
    return Promise.allSettled(promises);
  }, [preloadImage]);

  // Función para obtener imagen desde cache
  const getCachedImage = useCallback((src) => {
    return imageCache.get(src);
  }, [imageCache]);

  // Función para cachear imagen
  const cacheImage = useCallback((src, data) => {
    setImageCache(prev => new Map(prev).set(src, data));
  }, []);

  // Función para limpiar cache
  const clearCache = useCallback(() => {
    setImageCache(new Map());
    setPreloadedImages(new Set());
  }, []);

  // Función para verificar si una imagen está preloadada
  const isImagePreloaded = useCallback((src) => {
    return preloadedImages.has(src);
  }, [preloadedImages]);

  // Función para obtener dimensiones de imagen
  const getImageDimensions = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  // Función para generar placeholder
  const generatePlaceholder = useCallback((width = 400, height = 300, text = 'Loading...') => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#667387" text-anchor="middle" dy=".3em">${text}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, []);

  // Función para optimizar imagen para diferentes dispositivos
  const getResponsiveImage = useCallback((originalSrc, breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1920
  }) => {
    const srcSet = Object.entries(breakpoints)
      .map(([device, width]) => `${getOptimizedUrl(originalSrc, { width })} ${width}w`)
      .join(', ');

    const sizes = `(max-width: 640px) ${breakpoints.mobile}px, (max-width: 1024px) ${breakpoints.tablet}px, ${breakpoints.desktop}px`;

    return {
      src: getOptimizedUrl(originalSrc, { width: breakpoints.desktop }),
      srcSet,
      sizes
    };
  }, [getOptimizedUrl]);

  return {
    // Funciones principales
    getOptimizedUrl,
    getSrcSet,
    getSizes,
    preloadImage,
    preloadImages,
    
    // Cache management
    getCachedImage,
    cacheImage,
    clearCache,
    isImagePreloaded,
    
    // Utilidades
    getImageDimensions,
    generatePlaceholder,
    getResponsiveImage,
    
    // Estado
    imageCache,
    preloadedImages
  };
}; 