import React, { useEffect } from 'react';
import { useImageOptimization } from '../hooks/useImageOptimization';

const ImagePreloader = ({ images = [], priority = false }) => {
  const { preloadImages } = useImageOptimization();

  useEffect(() => {
    if (images.length === 0) return;

    // Precargar imágenes inmediatamente si son prioritarias
    if (priority) {
      preloadImages(images);
    } else {
      // Precargar imágenes después de un pequeño delay para no bloquear la carga inicial
      const timeoutId = setTimeout(() => {
        preloadImages(images);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [images, priority, preloadImages]);

  // Este componente no renderiza nada visible
  return null;
};

export default ImagePreloader; 