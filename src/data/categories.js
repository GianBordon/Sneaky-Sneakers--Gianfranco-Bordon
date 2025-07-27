// Datos de categorías
export const categories = [
  {
    id: 1,
    name: 'Men',
    path: '/men',
    description: 'Zapatillas para hombres',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: true
  },
  {
    id: 2,
    name: 'Women',
    path: '/women',
    description: 'Zapatillas para mujeres',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: true
  },
  {
    id: 3,
    name: 'Kids',
    path: '/kids',
    description: 'Zapatillas para niños',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: true
  },
  {
    id: 4,
    name: 'New Arrivals',
    path: '/new-arrivals',
    description: 'Últimas novedades',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: true
  },
  {
    id: 5,
    name: 'Sale',
    path: '/sale',
    description: 'Ofertas especiales',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: true
  },
  {
    id: 6,
    name: 'All Products',
    path: '/all-products',
    description: 'Todos los productos',
    image: '/src/assets/img/banners/pexels-kaique-rocha-250356.jpg',
    featured: false
  }
];

// Función para obtener todas las categorías
export const getAllCategories = () => {
  return categories;
};

// Función para obtener categorías destacadas
export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};

// Función para obtener categoría por ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Función para obtener categoría por nombre
export const getCategoryByName = (name) => {
  return categories.find(category => category.name === name);
};

// Función para obtener categoría por path
export const getCategoryByPath = (path) => {
  return categories.find(category => category.path === path);
}; 