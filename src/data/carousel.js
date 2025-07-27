// Datos de carruseles e imágenes destacadas
export const carouselData = {
  featured: [
    "/src/assets/img/Nike SB/102.webp",
    "/src/assets/img/Nike SB/186.webp",
    "/src/assets/img/Nike SB/189.webp",
    "/src/assets/img/Nike SB/22.webp",
    "/src/assets/img/Nike SB/57.webp",
  ],
  
  newArrivals: [
    "/src/assets/img/NIKE/118.webp",
    "/src/assets/img/NIKE/122.webp",
    "/src/assets/img/Jordan/116.webp",
    "/src/assets/img/Jordan/149.webp",
    "/src/assets/img/LeBron/LeBron XX Stocking Stuffer.webp",
  ],
  
  sale: [
    "/src/assets/img/NIKE/10.webp",
    "/src/assets/img/NIKE/11.webp",
    "/src/assets/img/Jordan/15.webp",
    "/src/assets/img/Nike SB/102.webp",
    "/src/assets/img/LeBron/LeBron XX.webp",
  ],
  
  men: [
    "/src/assets/img/NIKE/10.webp",
    "/src/assets/img/NIKE/11.webp",
    "/src/assets/img/Jordan/15.webp",
    "/src/assets/img/Nike SB/102.webp",
    "/src/assets/img/LeBron/LeBron XX.webp",
    "/src/assets/img/KD/KD 8.webp",
  ],
  
  women: [
    "/src/assets/img/NIKE/18.webp",
    "/src/assets/img/NIKE/29.webp",
    "/src/assets/img/NIKE/37.webp",
    "/src/assets/img/NIKE/9.webp",
  ],
  
  kids: [
    "/src/assets/img/Jordan/26.webp",
    "/src/assets/img/NIKE/37.webp",
    "/src/assets/img/NIKE/9.webp",
  ]
};

// Función para obtener imágenes de carrusel por categoría
export const getCarouselImages = (category = 'featured') => {
  return carouselData[category] || carouselData.featured;
};

// Función para obtener todas las imágenes de carrusel
export const getAllCarouselImages = () => {
  return Object.values(carouselData).flat();
};

// Configuración de carruseles
export const carouselConfig = {
  featured: {
    title: "Featured Sneakers",
    autoPlay: true,
    interval: 4000,
    showDots: true,
    showArrows: true
  },
  newArrivals: {
    title: "New Arrivals",
    autoPlay: true,
    interval: 3000,
    showDots: true,
    showArrows: true
  },
  sale: {
    title: "Sale Items",
    autoPlay: true,
    interval: 3500,
    showDots: true,
    showArrows: true
  }
};

// Función para obtener configuración de carrusel
export const getCarouselConfig = (category = 'featured') => {
  return carouselConfig[category] || carouselConfig.featured;
}; 