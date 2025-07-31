# 📊 Datos de la Aplicación

Esta carpeta contiene todos los datos estáticos y configuraciones de la aplicación Sneaky Sneakers. Los archivos de datos proporcionan información de referencia, configuraciones y estructuras que no cambian frecuentemente.

## 📁 Estructura de Datos

### `index.js` (1.0KB, 44 líneas)
**Propósito:** Punto de entrada centralizado para todos los datos
**Funcionalidades:**
- Exportaciones centralizadas de todos los datos
- Facilita imports en componentes
- Mantiene organización de datos
- Proporciona interfaz unificada

**Exportaciones principales:**
```javascript
// Datos de carrusel
export { getCarouselImages, getCarouselConfig } from './carousel';

// Datos de marcas
export { getFeaturedBrands, getAllBrands } from './brands';

// Datos de categorías
export { getCategories, getCategoryById } from './categories';

// Datos de exportación
export { getExportData } from './exports';
```

## 🎠 Datos de Carrusel

### `carousel.js` (2.2KB, 88 líneas)
**Propósito:** Configuración y datos del carrusel principal
**Funcionalidades:**
- Imágenes del carrusel hero
- Configuración de animaciones
- Textos y enlaces de cada slide
- Configuración de autoplay
- Responsive breakpoints

**Datos incluidos:**
```javascript
// Imágenes del carrusel
const carouselImages = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    title: 'Nuevas Zapatillas',
    subtitle: 'Descubre la última colección',
    link: '/new-arrivals',
    buttonText: 'Ver Colección'
  },
  // ... más slides
];

// Configuración del carrusel
const carouselConfig = {
  autoplay: true,
  interval: 5000,
  showIndicators: true,
  showControls: true,
  responsive: {
    mobile: { slidesToShow: 1 },
    tablet: { slidesToShow: 1 },
    desktop: { slidesToShow: 1 }
  }
};
```

**Uso:** Componente `ImageCarousel` en la página de inicio

## 🏷️ Datos de Marcas

### `brands.js` (1.6KB, 64 líneas)
**Propósito:** Información de marcas de zapatillas
**Funcionalidades:**
- Lista de marcas disponibles
- Marcas destacadas para el home
- Información de cada marca
- Logos y enlaces
- Configuración de filtros

**Estructura de datos:**
```javascript
const brands = [
  {
    id: 'nike',
    name: 'Nike',
    logo: '/images/brands/nike.png',
    description: 'Just Do It',
    featured: true,
    categories: ['running', 'basketball', 'lifestyle'],
    website: 'https://nike.com'
  },
  // ... más marcas
];

const featuredBrands = brands.filter(brand => brand.featured);
```

**Marcas incluidas:**
- Nike
- Adidas
- Jordan
- Converse
- Vans
- New Balance
- Puma
- Under Armour

**Uso:** Componentes `BrandCard`, filtros de productos, página de marcas

## 📂 Datos de Categorías

### `categories.js` (1.9KB, 76 líneas)
**Propósito:** Categorías y subcategorías de productos
**Funcionalidades:**
- Jerarquía de categorías
- Subcategorías específicas
- Configuración de filtros
- Navegación por categorías
- Metadatos de SEO

**Estructura jerárquica:**
```javascript
const categories = [
  {
    id: 'men',
    name: 'Hombres',
    slug: 'men',
    description: 'Zapatillas para hombres',
    image: '/images/categories/men.jpg',
    subcategories: [
      {
        id: 'men-sneakers',
        name: 'Zapatillas',
        slug: 'sneakers',
        filters: ['brand', 'size', 'color', 'price']
      },
      {
        id: 'men-clothing',
        name: 'Ropa',
        slug: 'clothing',
        filters: ['brand', 'size', 'color', 'price']
      }
    ]
  },
  // ... más categorías
];
```

**Categorías principales:**
- **Hombres** (Men)
- **Mujeres** (Women)
- **Niños** (Kids)
- **Deportes** (Sports)
- **Lifestyle** (Casual)

**Uso:** Navegación, filtros de productos, breadcrumbs, SEO

## 📤 Datos de Exportación

### `exports/` (Directorio)
**Propósito:** Datos exportados para uso externo
**Contenido:**
- `brands.json` - Datos de marcas en formato JSON
- `categories.json` - Datos de categorías en formato JSON
- `summary.json` - Resumen de datos para analytics

**Uso:** APIs externas, herramientas de análisis, backups

### `brands.json`
**Propósito:** Exportación de marcas en formato JSON
**Estructura:**
```json
{
  "brands": [
    {
      "id": "nike",
      "name": "Nike",
      "logo": "/images/brands/nike.png",
      "featured": true,
      "categories": ["running", "basketball"]
    }
  ],
  "metadata": {
    "total": 8,
    "featured": 4,
    "lastUpdated": "2024-01-15"
  }
}
```

### `categories.json`
**Propósito:** Exportación de categorías en formato JSON
**Estructura:**
```json
{
  "categories": [
    {
      "id": "men",
      "name": "Hombres",
      "slug": "men",
      "subcategories": [
        {
          "id": "men-sneakers",
          "name": "Zapatillas",
          "slug": "sneakers"
        }
      ]
    }
  ],
  "metadata": {
    "total": 5,
    "subcategories": 15,
    "lastUpdated": "2024-01-15"
  }
}
```

### `summary.json`
**Propósito:** Resumen de datos para analytics
**Estructura:**
```json
{
  "summary": {
    "totalBrands": 8,
    "totalCategories": 5,
    "totalSubcategories": 15,
    "featuredBrands": 4,
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "analytics": {
    "mostPopularBrands": ["nike", "adidas", "jordan"],
    "mostPopularCategories": ["men", "women", "kids"]
  }
}
```

## 🎯 Características Comunes

### Estructura de Datos:
1. **Consistencia** en formato y nomenclatura
2. **Validación** de datos
3. **Versionado** de cambios
4. **Documentación** inline
5. **Optimización** para rendimiento

### Tipos de Datos:
- **Referencia** - Datos que no cambian (marcas, categorías)
- **Configuración** - Ajustes de la aplicación
- **Contenido** - Textos y metadatos
- **Exportación** - Datos para uso externo

### Validación:
- **Esquemas** de datos
- **Tipos** de datos
- **Campos requeridos**
- **Formato** de datos
- **Integridad** referencial

## 🔧 Mantenimiento

### Agregar Nuevos Datos:
1. **Crear** archivo de datos
2. **Validar** estructura
3. **Agregar** export en index.js
4. **Documentar** cambios
5. **Probar** integración

### Actualizar Datos:
1. **Backup** de datos actuales
2. **Validar** nuevos datos
3. **Actualizar** archivos
4. **Probar** funcionalidad
5. **Actualizar** documentación

### Versionado:
- **Semantic Versioning** para cambios
- **Changelog** de modificaciones
- **Migration** scripts si es necesario
- **Rollback** procedures

## 📊 Analytics y Métricas

### Datos Rastreados:
- **Uso de categorías** más populares
- **Marcas** más vistas
- **Navegación** de usuarios
- **Performance** de filtros
- **Conversiones** por categoría

### Herramientas:
- **Google Analytics** para tracking
- **Custom Events** para métricas específicas
- **Heatmaps** para UX
- **A/B Testing** para optimización

## 🔒 Seguridad

### Medidas Implementadas:
- **Validación** de datos de entrada
- **Sanitización** de contenido
- **Rate Limiting** para APIs
- **Logging** de accesos
- **Backup** automático

### Privacidad:
- **GDPR Compliance** para datos de usuarios
- **Anonymization** de datos sensibles
- **Consent** management
- **Data Retention** policies

## 🚀 Performance

### Optimizaciones:
- **Lazy Loading** de datos grandes
- **Caching** de datos frecuentes
- **Compression** de archivos JSON
- **CDN** para assets estáticos
- **Tree Shaking** para imports

### Métricas:
- **Load Time** < 100ms para datos
- **Bundle Size** optimizado
- **Memory Usage** < 10MB
- **Cache Hit Rate** > 90%

---

**Total de Archivos:** 6
**Líneas de Código:** ~7KB
**Cobertura de Datos:** 100% de datos estáticos
**Integración:** Completa con componentes y servicios 