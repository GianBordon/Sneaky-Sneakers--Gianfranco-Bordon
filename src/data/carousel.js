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

// Links de productos para el carrusel (IDs de productos en Supabase)
export const carouselProductLinks = {
  featured: [
    "/product/1", // Nike SB 102
    "/product/2", // Nike SB 186
    "/product/3", // Nike SB 189
    "/product/4", // Nike SB 22
    "/product/5", // Nike SB 57
  ],
  
  newArrivals: [
    "/product/6", // Nike 118
    "/product/7", // Nike 122
    "/product/8", // Jordan 116
    "/product/9", // Jordan 149
    "/product/10", // LeBron XX Stocking Stuffer
  ],
  
  sale: [
    "/product/11", // Nike 10
    "/product/12", // Nike 11
    "/product/13", // Jordan 15
    "/product/1", // Nike SB 102
    "/product/14", // LeBron XX
  ],
  
  men: [
    "/product/11", // Nike 10
    "/product/12", // Nike 11
    "/product/13", // Jordan 15
    "/product/1", // Nike SB 102
    "/product/14", // LeBron XX
    "/product/15", // KD 8
  ],
  
  women: [
    "/product/16", // Nike 18
    "/product/17", // Nike 29
    "/product/18", // Nike 37
    "/product/19", // Nike 9
  ],
  
  kids: [
    "/product/20", // Jordan 26
    "/product/18", // Nike 37
    "/product/19", // Nike 9
  ]
};

// Función para obtener imágenes de carrusel por categoría
export const getCarouselImages = (category = 'featured') => {
  return carouselData[category] || carouselData.featured;
};

// Función para obtener links de productos por categoría
export const getCarouselProductLinks = (category = 'featured') => {
  return carouselProductLinks[category] || carouselProductLinks.featured;
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