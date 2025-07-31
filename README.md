# 🏀 Sneaky Sneakers - E-commerce de Zapatillas Deportivas

Una aplicación de comercio electrónico moderna y completa para zapatillas deportivas, construida con React, Vite y Supabase. La aplicación incluye funcionalidades avanzadas de e-commerce, sistema de autenticación, gestión de carrito, wishlist, y una experiencia de usuario optimizada.

## 📋 Tabla de Contenidos

- [🚀 Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [📁 Estructura de Carpetas](#-estructura-de-carpetas)
- [⚙️ Configuración e Instalación](#️-configuración-e-instalación)
- [🗄️ Base de Datos y Supabase](#️-base-de-datos-y-supabase)
- [🎯 Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [🔧 Desarrollo y Mantenimiento](#-desarrollo-y-mantenimiento)
- [🚀 Despliegue](#-despliegue)
- [📊 Métricas y Performance](#-métricas-y-performance)
- [🔒 Seguridad](#-seguridad)
- [🤝 Contribución](#-contribución)
- [📝 Licencia](#-licencia)

## 🚀 Características Principales

### 🛍️ **E-commerce Completo**
- **Catálogo de Productos**: 98+ zapatillas deportivas con filtros avanzados
- **Categorías**: Hombres, Mujeres, Niños, Deportes, Lifestyle
- **Marcas**: Nike, Adidas, Jordan, Converse, Vans, New Balance, Puma, Under Armour
- **Búsqueda Inteligente**: Búsqueda en tiempo real con autocompletado
- **Filtros Avanzados**: Por precio, marca, categoría, talla, color

### 🏀 **Sección de Jugadores NBA**
- **Jugadores Destacados**: 5 jugadores de la NBA con estadísticas
- **Páginas Dinámicas**: Detalles de jugadores con productos relacionados
- **Navegación Intuitiva**: Sistema de rutas dinámicas

### 🛒 **Sistema de Compras**
- **Carrito de Compras**: Gestión completa con localStorage
- **Lista de Deseos**: Wishlist persistente
- **Cupones de Descuento**: Sistema de cupones con validación
- **Checkout Completo**: Proceso de compra con validaciones
- **Confirmación de Pedidos**: Página de confirmación con detalles

### 👤 **Autenticación y Usuarios**
- **Registro/Login**: Sistema completo de autenticación
- **Perfiles de Usuario**: Gestión de datos personales
- **Recuperación de Contraseña**: Sistema de reset seguro
- **Sesiones Persistentes**: Mantenimiento de sesiones

### 📱 **Experiencia de Usuario**
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Animaciones Suaves**: Transiciones y micro-interacciones
- **Loading States**: Estados de carga optimizados
- **Error Handling**: Manejo robusto de errores
- **Accesibilidad**: Cumplimiento de estándares WCAG

## 🛠️ Stack Tecnológico

### **Frontend**
- **React 18**: Biblioteca de UI con hooks modernos
- **Vite**: Build tool ultra-rápido para desarrollo
- **Tailwind CSS**: Framework CSS utility-first
- **React Router DOM**: Enrutamiento del lado del cliente
- **Heroicons**: Iconografía moderna

### **Backend y Base de Datos**
- **Supabase**: Backend-as-a-Service completo
- **PostgreSQL**: Base de datos relacional
- **Supabase Auth**: Sistema de autenticación
- **Row Level Security (RLS)**: Seguridad a nivel de fila
- **Real-time Subscriptions**: Actualizaciones en tiempo real

### **Estado y Gestión de Datos**
- **React Hooks**: useState, useEffect, useCallback, useMemo
- **Custom Hooks**: Lógica reutilizable encapsulada
- **Context API**: Estado global de la aplicación
- **LocalStorage**: Persistencia local de datos

### **Herramientas de Desarrollo**
- **ESLint**: Linting de código JavaScript/React
- **PostCSS**: Procesamiento de CSS
- **Git**: Control de versiones
- **Node.js**: Runtime de JavaScript

## 🏗️ Arquitectura del Proyecto

### **Patrón de Arquitectura**
La aplicación sigue una arquitectura **Component-Based** con separación clara de responsabilidades:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │      Pages      │    │      Hooks      │
│   (UI Layer)    │◄──►│   (Route Layer) │◄──►│  (Logic Layer)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Services     │    │      Utils      │    │     Config      │
│  (API Layer)    │    │  (Helpers)      │    │  (Settings)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Flujo de Datos**
1. **Components** → Renderizan la UI
2. **Pages** → Manejan rutas y composición
3. **Hooks** → Gestionan estado y lógica
4. **Services** → Comunican con APIs externas
5. **Utils** → Proporcionan funciones auxiliares

## 📁 Estructura de Carpetas

### **📦 [Componentes](./src/components/COMPONENTS.md)**
Contiene todos los componentes reutilizables de la aplicación:

- **Navegación**: `Navbar`, `Footer`, `ScrollToTop`
- **Compras**: `CartModal`, `WishlistModal`, `CouponSystem`, `ProductCard`
- **Búsqueda**: `SearchBar` con filtros avanzados
- **Jugadores**: `PlayerCard`, `PlayerPage`
- **UI/UX**: `LoadingSpinner`, `LoadingSkeleton`, `Accordion`
- **Multimedia**: `ImageCarousel`, `ImageGrid`
- **Formularios**: `FormInput`, `NewsletterSection`

**Total**: 25 componentes (~150KB de código)

### **📄 [Páginas](./src/pages/PAGES.md)**
Contiene todas las páginas principales de la aplicación:

- **Principales**: `Home`, `AllProducts`
- **Categorías**: `Men`, `Women`, `Kids`
- **Especiales**: `NewArrivals`, `Sale`
- **Jugadores**: `PlayerDetail` (dinámica)
- **Compras**: `ProductDetail`, `Checkout`, `OrderConfirmation`
- **Autenticación**: `LoginPage`
- **Políticas**: `AboutUs`, `FAQ`, `ShippingPolicy`, `ExchangePolicy`, `PaymentMethods`
- **Administración**: `AdminDashboard`

**Total**: 18 páginas (~200KB de código)

### **🎣 [Hooks Personalizados](./src/hooks/HOOKS.md)**
Contiene la lógica reutilizable de la aplicación:

- **Compras**: `useCart`, `useWishlist`
- **Autenticación**: `useAuth`
- **Base de Datos**: `useSupabase`, `useProducts`

**Total**: 6 hooks (~30KB de código)

### **🔧 [Servicios](./src/services/SERVICES.md)**
Contiene la capa de servicios y comunicación con APIs:

- **Base de Datos**: `supabaseService` (principal)
- **Compras**: `cartService`, `wishlistService`
- **Autenticación**: `authService`
- **Productos**: `productService`

**Total**: 6 servicios (~35KB de código)

### **📊 [Datos](./src/data/DATA.md)**
Contiene datos estáticos y configuraciones:

- **Carrusel**: `carousel.js` - Configuración del hero
- **Marcas**: `brands.js` - Información de marcas
- **Categorías**: `categories.js` - Jerarquía de categorías
- **Exportaciones**: `exports/` - Datos para APIs externas

**Total**: 6 archivos (~7KB de código)

### **⚙️ [Configuración](./src/config/CONFIG.md)**
Contiene configuraciones de la aplicación:

- **Supabase**: `supabase.js` - Configuración de conexión

**Total**: 1 archivo (~3KB de código)

### **🛠️ [Utilidades](./src/utils/UTILS.md)**
Contiene funciones auxiliares y helpers:

- **Helpers**: `helpers.js` - Funciones generales
- **Constantes**: `constants.js` - Valores estáticos
- **Analytics**: `analytics.js` - Tracking y métricas
- **Testing**: `testing.js` - Utilidades para testing

**Total**: 5 archivos (~35KB de código)

### **📜 [Scripts](./src/scripts/SCRIPTS.md)**
Contiene scripts de desarrollo y automatización:

- **Verificación**: `checkComponents.js` - Análisis de componentes

**Total**: 1 script (~3KB de código)

## ⚙️ Configuración e Instalación

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### **1. Clonar el Repositorio**
```bash
git clone <repository-url>
cd Sneaky-Sneakers--Gianfranco-Bordon
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crear archivo `.env` en la raíz del proyecto:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **4. Configurar Supabase**
1. Crear proyecto en [supabase.com](https://supabase.com)
2. Obtener credenciales desde Settings → API
3. Crear tablas `products` y `players`
4. Configurar Row Level Security (RLS)

### **5. Ejecutar en Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🗄️ Base de Datos y Supabase

### **Estructura de Tablas**

#### **Tabla `products`**
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT,
  image TEXT,
  rating DECIMAL(3,2),
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Tabla `players`**
```sql
CREATE TABLE players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL,
  image TEXT,
  description TEXT,
  stats JSONB,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Políticas de Seguridad (RLS)**
- **Productos**: Lectura pública, escritura solo para admins
- **Jugadores**: Lectura pública, escritura solo para admins
- **Usuarios**: Cada usuario solo puede acceder a su propio perfil

### **Datos Incluidos**
- **98 productos** de zapatillas deportivas
- **5 jugadores** destacados de la NBA
- **8 marcas** principales
- **5 categorías** principales

## 🎯 Funcionalidades Detalladas

### **🛍️ Sistema de Productos**
- **Catálogo Completo**: 98 productos con imágenes y descripciones
- **Filtros Avanzados**: Por precio, marca, categoría, talla
- **Búsqueda Inteligente**: Búsqueda en tiempo real con sugerencias
- **Paginación**: Carga eficiente de productos
- **Ordenamiento**: Por precio, popularidad, fecha

### **🏀 Sección de Jugadores**
- **Jugadores Destacados**: Giannis, LeBron, Durant, George, Harden
- **Páginas Dinámicas**: Detalles completos de cada jugador
- **Productos Relacionados**: Zapatillas asociadas a cada jugador
- **Estadísticas**: Datos de rendimiento en formato JSON

### **🛒 Carrito de Compras**
- **Gestión Completa**: Agregar, remover, actualizar cantidades
- **Persistencia**: Datos guardados en localStorage
- **Cálculos Automáticos**: Subtotal, impuestos, envío
- **Cupones**: Sistema de descuentos con validación
- **Stock**: Verificación de disponibilidad

### **💝 Lista de Deseos**
- **Funcionalidad Completa**: Agregar, remover, vaciar
- **Persistencia**: Datos guardados en localStorage
- **Integración**: Transferir productos al carrito
- **Sincronización**: Con base de datos de productos

### **🔍 Búsqueda y Filtros**
- **Búsqueda en Tiempo Real**: Con debouncing
- **Autocompletado**: Sugerencias de búsqueda
- **Filtros Múltiples**: Combinación de criterios
- **Historial**: Búsquedas recientes
- **Resultados**: Paginación y ordenamiento

### **👤 Autenticación**
- **Registro**: Formulario completo con validaciones
- **Login**: Autenticación segura
- **Recuperación**: Sistema de reset de contraseña
- **Perfiles**: Gestión de datos personales
- **Sesiones**: Mantenimiento de estado de autenticación

### **📱 Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 768px, 1024px, 1200px
- **Flexible Layout**: Adaptación a diferentes pantallas
- **Touch Friendly**: Interacciones optimizadas para touch

## 🔧 Desarrollo y Mantenimiento

### **Comandos Disponibles**
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Linting
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas automáticamente

# Testing (futuro)
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
```

### **Convenciones de Código**
- **Componentes**: PascalCase (ej: `ProductCard`)
- **Hooks**: camelCase con prefijo `use` (ej: `useCart`)
- **Servicios**: camelCase con sufijo `Service` (ej: `cartService`)
- **Archivos**: kebab-case (ej: `product-card.jsx`)
- **Variables**: camelCase
- **Constantes**: UPPER_CASE

### **Estructura de Commits**
```
feat: agregar funcionalidad de cupones
fix: corregir error en carrito de compras
docs: actualizar documentación
style: mejorar estilos del navbar
refactor: optimizar hook useCart
test: agregar tests para ProductCard
```

### **Flujo de Desarrollo**
1. **Feature Branch**: Crear rama desde `main`
2. **Desarrollo**: Implementar funcionalidad
3. **Testing**: Verificar funcionamiento
4. **Linting**: Corregir problemas de código
5. **Pull Request**: Crear PR para revisión
6. **Merge**: Integrar a `main` después de aprobación

## 🚀 Despliegue

### **Plataformas Soportadas**

#### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en dashboard
```

#### **Netlify**
```bash
# Build del proyecto
npm run build

# Subir carpeta dist a Netlify
```

#### **Supabase Hosting**
```bash
# Configurar en Supabase Dashboard
# Subir archivos build automáticamente
```

### **Variables de Entorno de Producción**
```bash
# Supabase (obligatorias)
VITE_SUPABASE_URL=https://tu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima

# Analytics (opcionales)
VITE_GA_TRACKING_ID=GA-XXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

### **Optimizaciones de Producción**
- **Code Splitting**: Carga lazy de componentes
- **Tree Shaking**: Eliminación de código no usado
- **Compression**: Compresión de assets
- **Caching**: Headers de cache optimizados
- **CDN**: Distribución de contenido

## 📊 Métricas y Performance

### **Métricas de Rendimiento**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **Optimizaciones Implementadas**
- **Lazy Loading**: Componentes y rutas
- **Memoización**: useMemo y useCallback
- **Debouncing**: Búsquedas y filtros
- **Caching**: Datos de Supabase
- **Image Optimization**: Formatos modernos (WebP)

### **Bundle Analysis**
- **Total Size**: < 500KB (gzipped)
- **JavaScript**: < 300KB
- **CSS**: < 50KB
- **Images**: < 150KB

### **Monitoreo**
- **Error Tracking**: Captura de errores
- **Performance Monitoring**: Métricas de rendimiento
- **User Analytics**: Comportamiento de usuarios
- **Real-time Monitoring**: Monitoreo en tiempo real

## 🔒 Seguridad

### **Medidas Implementadas**
- **Row Level Security (RLS)**: Seguridad a nivel de base de datos
- **Input Validation**: Validación de todos los inputs
- **XSS Protection**: Escape de datos dinámicos
- **CSRF Protection**: Tokens de seguridad
- **Rate Limiting**: Limitación de requests

### **Autenticación**
- **Supabase Auth**: Sistema robusto de autenticación
- **JWT Tokens**: Tokens seguros y temporales
- **Password Hashing**: Encriptación de contraseñas
- **Session Management**: Gestión segura de sesiones

### **Variables de Entorno**
- **Credenciales Seguras**: Nunca hardcodeadas
- **Separación de Entornos**: Dev, staging, production
- **Validación**: Verificación de variables requeridas

### **Auditoría de Seguridad**
- **Dependencias**: Escaneo regular de vulnerabilidades
- **Código**: Análisis estático de seguridad
- **Penetration Testing**: Tests de penetración regulares

## 🤝 Contribución

### **Cómo Contribuir**
1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea** una rama para tu feature
4. **Desarrolla** tu funcionalidad
5. **Tests** tu código
6. **Commit** con mensajes descriptivos
7. **Push** a tu fork
8. **Crea** un Pull Request

### **Estándares de Código**
- **ESLint**: Configuración estricta
- **Prettier**: Formateo automático
- **TypeScript**: Tipado estático (futuro)
- **Testing**: Cobertura mínima del 80%

### **Documentación**
- **README**: Documentación principal
- **JSDoc**: Comentarios en código
- **Storybook**: Documentación de componentes (futuro)
- **API Docs**: Documentación de APIs

## 📝 Licencia

Este proyecto está bajo la **MIT License**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto y Soporte

- **Desarrollador**: Gianfranco Bordon
- **Email**: gianbordonpresti@gmail.com
- **GitHub**: [[Tu GitHub]](https://github.com/GianBordon)
- **LinkedIn**: [[Tu LinkedIn]](https://www.linkedin.com/in/gianfranco-bordon-947310157/)

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**
