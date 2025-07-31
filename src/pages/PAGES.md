# 📄 Páginas de la Aplicación

Esta carpeta contiene todas las páginas principales de la aplicación Sneaky Sneakers. Cada página representa una ruta específica y maneja su propia lógica de estado, datos y navegación.

## 🏠 Páginas Principales

### `Home.jsx` (11KB, 255 líneas)
**Ruta:** `/`
**Propósito:** Página de inicio principal
**Funcionalidades:**
- Hero section con carrusel de imágenes
- Jugadores destacados
- Productos en oferta
- Categorías principales
- Newsletter signup
- Integración con Supabase para datos dinámicos
- Loading states y error handling

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ImageCarousel`, `PlayerCard`, `ProductCard`, `NewsletterSection`

### `AllProducts.jsx` (20KB, 478 líneas)
**Ruta:** `/products`
**Propósito:** Catálogo completo de productos
**Funcionalidades:**
- Grid de productos con paginación
- Filtros avanzados (categoría, marca, precio, talla)
- Ordenamiento (precio, popularidad, fecha)
- Búsqueda integrada
- Vista de lista/grid
- Filtros de precio con slider
- Integración completa con Supabase
- Loading skeletons

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`, `useMemo`
**Componentes utilizados:** `ProductCard`, `LoadingSkeleton`, `SearchBar`

## 👕 Páginas de Categorías

### `Men.jsx` (12KB, 304 líneas)
**Ruta:** `/men`
**Propósito:** Productos para hombres
**Funcionalidades:**
- Productos filtrados por género masculino
- Subcategorías (zapatillas, ropa, accesorios)
- Filtros específicos para hombres
- Banner personalizado
- Integración con Supabase
- Responsive design

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `PageBanner`, `LoadingSkeleton`

### `Women.jsx` (12KB, 298 líneas)
**Ruta:** `/women`
**Propósito:** Productos para mujeres
**Funcionalidades:**
- Productos filtrados por género femenino
- Subcategorías específicas
- Filtros adaptados
- Banner personalizado
- Misma estructura que Men.jsx

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `PageBanner`, `LoadingSkeleton`

### `Kids.jsx` (14KB, 334 líneas)
**Ruta:** `/kids`
**Propósito:** Productos para niños
**Funcionalidades:**
- Productos para niños y adolescentes
- Filtros por edad
- Tallas específicas para niños
- Productos seguros para menores
- Banner adaptado

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `PageBanner`, `LoadingSkeleton`

## 🆕 Páginas Especiales

### `NewArrivals.jsx` (16KB, 362 líneas)
**Ruta:** `/new-arrivals`
**Propósito:** Productos recién llegados
**Funcionalidades:**
- Productos ordenados por fecha de llegada
- Indicador de "Nuevo"
- Filtros por categoría
- Banner promocional
- Integración con Supabase

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `PageBanner`, `LoadingSkeleton`

### `Sale.jsx` (17KB, 402 líneas)
**Ruta:** `/sale`
**Propósito:** Productos en oferta
**Funcionalidades:**
- Productos con descuento
- Porcentaje de descuento visible
- Filtros por rango de descuento
- Ordenamiento por mayor descuento
- Banner de ofertas
- Contador de ofertas

**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `PageBanner`, `LoadingSkeleton`

## 🏀 Páginas de Jugadores

### `PlayerDetail.jsx` (5.6KB, 153 líneas)
**Ruta:** `/player/:id`
**Propósito:** Página de detalles de jugador
**Funcionalidades:**
- Información detallada del jugador
- Estadísticas completas
- Productos relacionados
- Galería de imágenes
- Información del equipo
- Navegación dinámica
- Integración con Supabase

**Hooks utilizados:** `useSupabase`, `useParams`, `useState`, `useEffect`
**Componentes utilizados:** `PlayerCard`, `ProductCard`, `ImageGrid`

## 🛍️ Páginas de Compras

### `ProductDetail.jsx` (14KB, 342 líneas)
**Ruta:** `/product/:id`
**Propósito:** Página de detalles de producto
**Funcionalidades:**
- Información completa del producto
- Galería de imágenes
- Selección de talla
- Agregar al carrito/wishlist
- Reseñas de usuarios
- Productos relacionados
- Información de envío
- Integración con Supabase

**Hooks utilizados:** `useSupabase`, `useCart`, `useWishlist`, `useParams`
**Componentes utilizados:** `ImageCarousel`, `ReviewSystem`, `ProductCard`

### `Checkout.jsx` (22KB, 548 líneas)
**Ruta:** `/checkout`
**Propósito:** Proceso de compra
**Funcionalidades:**
- Formulario de datos personales
- Selección de método de envío
- Selección de método de pago
- Resumen del pedido
- Aplicación de cupones
- Cálculo de impuestos y envío
- Validación de formularios
- Integración con pasarela de pagos

**Hooks utilizados:** `useCart`, `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `CouponSystem`, `FormInput`

### `OrderConfirmation.jsx` (11KB, 252 líneas)
**Ruta:** `/order-confirmation`
**Propósito:** Confirmación de pedido
**Funcionalidades:**
- Resumen del pedido completado
- Número de seguimiento
- Detalles de envío
- Productos comprados
- Información de facturación
- Botones de acción (seguir comprando, ver pedidos)

**Hooks utilizados:** `useCart`, `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `ProductCard`, `ContentSection`

## 🔐 Páginas de Autenticación

### `LoginPage.jsx` (9.6KB, 224 líneas)
**Ruta:** `/login`
**Propósito:** Página de inicio de sesión
**Funcionalidades:**
- Formulario de login
- Registro de usuario
- Recuperación de contraseña
- Integración con Supabase Auth
- Validación de formularios
- Redirección post-login
- Manejo de errores

**Hooks utilizados:** `useAuth`, `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `FormInput`, `ErrorBoundary`

## 📋 Páginas de Políticas

### `AboutUs.jsx` (7.9KB, 172 líneas)
**Ruta:** `/about-us`
**Propósito:** Información sobre la empresa
**Funcionalidades:**
- Historia de la empresa
- Misión y valores
- Equipo de trabajo
- Información de contacto
- Ubicación
- Redes sociales

**Componentes utilizados:** `ContentSection`, `PageBanner`

### `FAQ.jsx` (12KB, 221 líneas)
**Ruta:** `/faq`
**Propósito:** Preguntas frecuentes
**Funcionalidades:**
- Categorías de preguntas
- Búsqueda en FAQ
- Acordeón expandible
- Preguntas más populares
- Formulario de contacto

**Componentes utilizados:** `Accordion`, `SearchBar`, `ContentSection`

### `ShippingPolicy.jsx` (9.5KB, 210 líneas)
**Ruta:** `/shipping-policy`
**Propósito:** Política de envíos
**Funcionalidades:**
- Métodos de envío disponibles
- Tiempos de entrega
- Costos de envío
- Restricciones geográficas
- Seguimiento de pedidos
- Devoluciones

**Componentes utilizados:** `Accordion`, `ContentSection`

### `ExchangePolicy.jsx` (9.1KB, 191 líneas)
**Ruta:** `/exchange-policy`
**Propósito:** Política de cambios y devoluciones
**Funcionalidades:**
- Condiciones de devolución
- Proceso de cambio
- Plazos de devolución
- Productos no devolubles
- Formulario de devolución

**Componentes utilizados:** `Accordion`, `ContentSection`

### `PaymentMethods.jsx` (9.1KB, 205 líneas)
**Ruta:** `/payment-methods`
**Propósito:** Métodos de pago aceptados
**Funcionalidades:**
- Tarjetas de crédito/débito
- PayPal
- Transferencias bancarias
- Pago en efectivo
- Seguridad de pagos
- Información de facturación

**Componentes utilizados:** `Accordion`, `ContentSection`

## 👨‍💼 Páginas de Administración

### `AdminDashboard.jsx` (10.0KB, 237 líneas)
**Ruta:** `/admin`
**Propósito:** Panel de administración
**Funcionalidades:**
- Métricas de ventas
- Gestión de productos
- Gestión de usuarios
- Gestión de pedidos
- Analytics básicos
- Acceso restringido
- Integración con Supabase

**Hooks utilizados:** `useAuth`, `useSupabase`, `useState`, `useEffect`
**Componentes utilizados:** `AnalyticsDashboard`, `ErrorBoundary`

## 🎯 Características Comunes

### Estructura de Páginas:
1. **Imports** de hooks y componentes necesarios
2. **Estado local** con useState
3. **Efectos** para carga de datos
4. **Renderizado condicional** para loading/error
5. **Componentes reutilizables**
6. **Manejo de errores**

### Patrones de Diseño:
- **Container/Presentational** pattern
- **Custom hooks** para lógica compleja
- **Error boundaries** para manejo de errores
- **Loading states** consistentes
- **Responsive design**

### Integración con Supabase:
- **Autenticación** en páginas protegidas
- **Datos dinámicos** desde la base de datos
- **Real-time updates** donde sea necesario
- **Optimistic updates** para mejor UX

### SEO y Performance:
- **Meta tags** dinámicos
- **Lazy loading** de imágenes
- **Code splitting** por rutas
- **Preloading** de datos críticos

## 🔧 Mantenimiento

### Agregar Nuevas Páginas:
1. Crear archivo en carpeta apropiada
2. Agregar ruta en `App.jsx`
3. Implementar loading states
4. Agregar manejo de errores
5. Documentar en este archivo

### Actualizar Páginas:
1. Mantener compatibilidad con rutas
2. Actualizar documentación
3. Probar en diferentes dispositivos
4. Verificar performance

---

**Total de Páginas:** 18
**Líneas de Código:** ~200KB
**Cobertura de Rutas:** 100% de la aplicación
**Integración:** Completa con Supabase y React Router 