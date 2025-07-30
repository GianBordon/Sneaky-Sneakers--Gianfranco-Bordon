// Datos de marcas
export const brands = [
  { 
    id: 1,
    name: 'Jordan', 
    image: '/src/assets/img/seccion-zapas/Jordan.webp',
    description: 'Zapatillas de Michael Jordan',
    category: 'basketball',
    featured: true,
    path: '/all-products?brand=jordan'
  },
  { 
    id: 2,
    name: 'Nike', 
    image: '/src/assets/img/seccion-zapas/nike.jpg',
    description: 'Just Do It',
    category: 'sports',
    featured: true,
    path: '/all-products?brand=nike'
  },
  { 
    id: 3,
    name: 'Adidas', 
    image: '/src/assets/img/seccion-zapas/adid.jpg',
    description: 'Impossible is Nothing',
    category: 'sports',
    featured: true,
    path: '/all-products?brand=adidas'
  },
  { 
    id: 4,
    name: 'Nike SB', 
    image: '/src/assets/img/seccion-zapas/nikesb.jfif',
    description: 'Skateboarding',
    category: 'skateboarding',
    featured: false,
    path: '/all-products?brand=nike-sb'
  }
];

// Función para obtener todas las marcas
export const getAllBrands = () => {
  return brands;
};

// Función para obtener marcas destacadas
export const getFeaturedBrands = () => {
  return brands.filter(brand => brand.featured);
};

// Función para obtener marca por ID
export const getBrandById = (id) => {
  return brands.find(brand => brand.id === id);
};

// Función para obtener marca por nombre
export const getBrandByName = (name) => {
  return brands.find(brand => brand.name === name);
};

// Función para obtener marcas por categoría
export const getBrandsByCategory = (category) => {
  return brands.filter(brand => brand.category === category);
}; 