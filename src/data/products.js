// Datos de productos organizados por categorías
export const products = {
  men: [
    { 
      id: 1, 
      name: "Nike Air Max", 
      price: 120, 
      originalPrice: 150,
      image: "/src/assets/img/NIKE/10.webp",
      brand: "Nike",
      category: "men",
      description: "Zapatillas deportivas con tecnología Air Max",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Black", "White", "Red"],
      inStock: true,
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2, 
      name: "Adidas Ultraboost", 
      price: 180, 
      originalPrice: 200,
      image: "/src/assets/img/NIKE/11.webp",
      brand: "Adidas",
      category: "men",
      description: "Zapatillas de running con tecnología Boost",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Blue", "White", "Grey"],
      inStock: true,
      rating: 4.8,
      reviews: 95
    },
    { 
      id: 3, 
      name: "Jordan Retro", 
      price: 200, 
      originalPrice: 220,
      image: "/src/assets/img/Jordan/15.webp",
      brand: "Jordan",
      category: "men",
      description: "Zapatillas clásicas de Michael Jordan",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Red", "Black", "White"],
      inStock: true,
      rating: 4.9,
      reviews: 203
    },
    { 
      id: 4, 
      name: "Nike SB Dunk", 
      price: 90, 
      originalPrice: 110,
      image: "/src/assets/img/Nike SB/102.webp",
      brand: "Nike SB",
      category: "men",
      description: "Zapatillas de skateboarding",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Green", "Black", "White"],
      inStock: true,
      rating: 4.6,
      reviews: 87
    },
    { 
      id: 5, 
      name: "LeBron James", 
      price: 150, 
      originalPrice: 180,
      image: "/src/assets/img/LeBron/LeBron XX.webp",
      brand: "Nike",
      category: "men",
      description: "Zapatillas de LeBron James",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Purple", "Yellow", "Black"],
      inStock: true,
      rating: 4.7,
      reviews: 156
    },
    { 
      id: 6, 
      name: "Kevin Durant", 
      price: 130, 
      originalPrice: 160,
      image: "/src/assets/img/KD/KD 8.webp",
      brand: "Nike",
      category: "men",
      description: "Zapatillas de Kevin Durant",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Blue", "White", "Orange"],
      inStock: true,
      rating: 4.4,
      reviews: 92
    }
  ],
  
  women: [
    { 
      id: 7, 
      name: "Nike Air Force 1", 
      price: 100, 
      originalPrice: 120,
      image: "/src/assets/img/NIKE/18.webp",
      brand: "Nike",
      category: "women",
      description: "Zapatillas clásicas para mujer",
      sizes: [5, 6, 7, 8, 9, 10],
      colors: ["White", "Pink", "Purple"],
      inStock: true,
      rating: 4.6,
      reviews: 134
    },
    { 
      id: 8, 
      name: "Adidas Stan Smith", 
      price: 80, 
      originalPrice: 100,
      image: "/src/assets/img/NIKE/29.webp",
      brand: "Adidas",
      category: "women",
      description: "Zapatillas casuales para mujer",
      sizes: [5, 6, 7, 8, 9, 10],
      colors: ["White", "Green", "Blue"],
      inStock: true,
      rating: 4.5,
      reviews: 89
    }
  ],
  
  kids: [
    { 
      id: 9, 
      name: "Nike Kids Air Jordan", 
      price: 70, 
      originalPrice: 90,
      image: "/src/assets/img/Jordan/26.webp",
      brand: "Jordan",
      category: "kids",
      description: "Zapatillas para niños",
      sizes: [1, 2, 3, 4, 5, 6],
      colors: ["Red", "Blue", "Green"],
      inStock: true,
      rating: 4.7,
      reviews: 67
    },
    { 
      id: 10, 
      name: "Adidas Kids Superstar", 
      price: 60, 
      originalPrice: 75,
      image: "/src/assets/img/NIKE/37.webp",
      brand: "Adidas",
      category: "kids",
      description: "Zapatillas deportivas para niños",
      sizes: [1, 2, 3, 4, 5, 6],
      colors: ["White", "Black", "Yellow"],
      inStock: true,
      rating: 4.4,
      reviews: 45
    }
  ]
};

// Función para obtener todos los productos
export const getAllProducts = () => {
  return Object.values(products).flat();
};

// Función para obtener productos por categoría
export const getProductsByCategory = (category) => {
  return products[category] || [];
};

// Función para obtener producto por ID
export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
};

// Función para obtener productos por marca
export const getProductsByBrand = (brand) => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.brand === brand);
};

// Función para obtener productos en oferta
export const getProductsOnSale = () => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.price < product.originalPrice);
}; 