import React, { useState, useRef } from 'react';
import LazyImage from './LazyImage';

const ZoomImage = ({
  src,
  alt,
  className = '',
  zoomLevel = 1.5,
  zoomDuration = 300,
  ...props
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const getZoomStyle = () => {
    if (!isZoomed) return {};

    return {
      transform: `scale(${zoomLevel})`,
      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
      transition: `transform ${zoomDuration}ms ease-out`
    };
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LazyImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={getZoomStyle()}
        {...props}
      />
    </div>
  );
};

export default ZoomImage; 