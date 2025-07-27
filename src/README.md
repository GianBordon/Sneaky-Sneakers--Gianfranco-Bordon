# Sneaky Sneakers - Estructura del Proyecto

## 📁 Estructura de Carpetas

```
src/
├── data/           # Datos estáticos centralizados
├── services/       # Lógica de negocio y APIs
├── hooks/          # Custom hooks reutilizables
├── utils/          # Funciones utilitarias
├── components/     # Componentes React
├── pages/          # Páginas de la aplicación
└── assets/         # Recursos estáticos
```

## 🗂️ Descripción de Carpetas

### `/data`
Contiene todos los datos estáticos de la aplicación organizados por tipo:

- **`products.js`** - Datos de productos con funciones de búsqueda y filtrado
- **`players.js`** - Datos de jugadores y sus zapatillas
- **`brands.js`** - Datos de marcas
- **`categories.js`** - Datos de categorías
- **`carousel.js`** - Datos de carruseles e imágenes destacadas
- **`index.js`** - Exportaciones centralizadas

### `/services`
Contiene la lógica de negocio y servicios de la aplicación:

- **`productService.js`** - Servicio para manejar productos
- **`authService.js`** - Servicio para autenticación
- **`cartService.js`** - Servicio para el carrito de compras
- **`index.js`** - Exportaciones centralizadas

### `/hooks`
Custom hooks reutilizables:

- **`useCart.js`** - Hook para manejar el estado del carrito
- **`useAuth.js`** - Hook para manejar autenticación
- **`useProducts.js`** - Hook para manejar productos
- **`index.js`** - Exportaciones centralizadas

### `/utils`
Funciones utilitarias y constantes:

- **`constants.js`** - Constantes del proyecto
- **`helpers.js`** - Funciones de utilidad
- **`index.js`** - Exportaciones centralizadas

## 🔧 Uso de la Nueva Estructura

### Importar Datos
```javascript
import { 
  getAllProducts, 
  getProductsByCategory, 
  getAllPlayers,
  getFeaturedBrands 
} from '../data';
```

### Usar Servicios
```javascript
import { ProductService, AuthService, CartService } from '../services';
```

### Usar Hooks
```javascript
import { useCart, useAuth, useProducts } from '../hooks';
```

### Usar Utilidades
```javascript
import { formatPrice, formatDate, ROUTES } from '../utils';
```

## 📊 Datos de Productos

Los productos ahora incluyen información completa:

```javascript
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
}
```

## 🎯 Funcionalidades Implementadas

### Sistema de Carrito
- ✅ Agregar/remover productos
- ✅ Actualizar cantidades
- ✅ Calcular totales
- ✅ Persistencia en localStorage
- ✅ Verificación de stock

### Sistema de Autenticación
- ✅ Login/Logout
- ✅ Registro de usuarios
- ✅ Validación de formularios
- ✅ Gestión de sesiones
- ✅ Roles de usuario

### Gestión de Productos
- ✅ Filtros por categoría, marca, precio
- ✅ Búsqueda por nombre
- ✅ Ordenamiento
- ✅ Productos en oferta
- ✅ Productos recomendados

### Datos Centralizados
- ✅ Jugadores con logros y zapatillas
- ✅ Marcas con información
- ✅ Categorías organizadas
- ✅ Carruseles configurables

## 🚀 Próximos Pasos

1. **Implementar filtros avanzados** en las páginas de productos
2. **Agregar sistema de reviews** para productos
3. **Implementar wishlist** de productos
4. **Agregar animaciones** con MinuDev
5. **Mejorar responsive design**
6. **Implementar SEO** dinámico
7. **Agregar sistema de notificaciones**

## 📝 Notas de Desarrollo

- Todos los datos están centralizados en `/data`
- Los servicios manejan la lógica de negocio
- Los hooks proporcionan estado reutilizable
- Las utilidades son funciones puras y reutilizables
- La estructura es escalable y mantenible 