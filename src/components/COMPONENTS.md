# 📦 Componentes de la Aplicación

Esta carpeta contiene todos los componentes reutilizables de la aplicación Sneaky Sneakers. Cada componente está diseñado para ser modular, reutilizable y mantener una separación clara de responsabilidades.

## 🎯 Componentes de Navegación

### `Navbar.jsx` (12KB, 325 líneas)
**Propósito:** Barra de navegación principal de la aplicación
**Funcionalidades:**
- Navegación entre páginas principales
- Búsqueda de productos integrada
- Carrito de compras (contador y modal)
- Wishlist (contador y modal)
- Autenticación de usuario
- Menú responsive para móviles
- Integración con Supabase para datos dinámicos

**Props:** No requiere props (usa hooks internos)
**Hooks utilizados:** `useCart`, `useWishlist`, `useAuth`, `useSupabase`

### `Footer.jsx` (2.2KB, 56 líneas)
**Propósito:** Pie de página con enlaces y información
**Funcionalidades:**
- Enlaces a páginas de políticas
- Información de contacto
- Redes sociales
- Newsletter signup
- Información legal

**Props:** No requiere props

### `FooterLinks.jsx` (1.0KB, 19 líneas)
**Propósito:** Componente auxiliar para enlaces del footer
**Funcionalidades:**
- Renderiza lista de enlaces
- Manejo de navegación

**Props:** `links` (array de objetos con `to` y `text`)

### `ScrollToTop.jsx` (636B, 25 líneas)
**Propósito:** Botón para volver al inicio de la página
**Funcionalidades:**
- Aparece cuando el usuario hace scroll
- Scroll suave al inicio
- Animación de aparición/desaparición

**Props:** No requiere props

## 🛒 Componentes de Compras

### `CartModal.jsx` (7.1KB, 165 líneas)
**Propósito:** Modal del carrito de compras
**Funcionalidades:**
- Muestra productos en el carrito
- Actualizar cantidades
- Eliminar productos
- Calcular subtotales
- Vaciar carrito
- Navegar al checkout
- Integración con Supabase para datos de productos

**Props:** `isOpen`, `onClose`
**Hooks utilizados:** `useCart`, `useNavigate`

### `WishlistModal.jsx` (7.5KB, 189 líneas)
**Propósito:** Modal de lista de deseos
**Funcionalidades:**
- Muestra productos en wishlist
- Eliminar productos
- Agregar al carrito
- Vaciar wishlist
- Navegar a detalles del producto
- Carga asíncrona de datos desde Supabase

**Props:** `isOpen`, `onClose`
**Hooks utilizados:** `useWishlist`, `useCart`, `useSupabase`

### `CouponSystem.jsx` (9.5KB, 303 líneas)
**Propósito:** Sistema de cupones de descuento
**Funcionalidades:**
- Validación de códigos de cupón
- Cálculo de descuentos
- Diferentes tipos de descuento (% y fijo)
- Aplicación automática al carrito
- Persistencia de cupones aplicados
- Integración con el sistema de carrito

**Props:** `onCouponApplied` (callback)
**Hooks utilizados:** `useCart`

### `ProductCard.jsx` (2.6KB, 71 líneas)
**Propósito:** Tarjeta de producto reutilizable
**Funcionalidades:**
- Mostrar imagen, nombre, precio
- Indicador de descuento
- Botones de acción (carrito, wishlist)
- Navegación a detalles
- Estado de stock
- Animaciones hover

**Props:** `product` (objeto con datos del producto)
**Hooks utilizados:** `useCart`, `useWishlist`

## 🔍 Componentes de Búsqueda y Filtros

### `SearchBar.jsx` (12KB, 345 líneas)
**Propósito:** Barra de búsqueda avanzada
**Funcionalidades:**
- Búsqueda en tiempo real
- Filtros por categoría, marca, precio
- Autocompletado
- Historial de búsquedas
- Búsqueda por voz (futuro)
- Integración con Supabase
- Resultados en dropdown

**Props:** `onSearch` (callback), `placeholder`
**Hooks utilizados:** `useSupabase`, `useState`, `useEffect`

## 🏀 Componentes de Jugadores

### `PlayerCard.jsx` (1.3KB, 36 líneas)
**Propósito:** Tarjeta de jugador de baloncesto
**Funcionalidades:**
- Mostrar foto del jugador
- Nombre y equipo
- Estadísticas básicas
- Navegación a página de detalles
- Diseño responsive

**Props:** `player` (objeto con datos del jugador)

### `PlayerPage.jsx` (19KB, 420 líneas)
**Propósito:** Página completa de jugador
**Funcionalidades:**
- Información detallada del jugador
- Estadísticas completas
- Productos relacionados
- Galería de imágenes
- Información del equipo
- Integración con Supabase

**Props:** `playerId` (ID del jugador)
**Hooks utilizados:** `useSupabase`, `useParams`

## 🖼️ Componentes de Imágenes y Multimedia

### `ImageCarousel.jsx` (2.7KB, 72 líneas)
**Propósito:** Carrusel de imágenes
**Funcionalidades:**
- Navegación automática
- Controles manuales
- Indicadores de posición
- Transiciones suaves
- Responsive design

**Props:** `images` (array de URLs), `autoPlay`, `interval`

### `ImageGrid.jsx` (901B, 33 líneas)
**Propósito:** Grid de imágenes
**Funcionalidades:**
- Layout responsive
- Diferentes tamaños
- Lazy loading
- Hover effects

**Props:** `images` (array de URLs), `columns`

## 📊 Componentes de Dashboard y Analytics

### `AnalyticsDashboard.jsx` (7.9KB, 212 líneas)
**Propósito:** Dashboard de analytics para administradores
**Funcionalidades:**
- Métricas de ventas
- Gráficos de rendimiento
- Estadísticas de usuarios
- Productos más vendidos
- Integración con Supabase
- Exportación de datos

**Props:** No requiere props (solo para admins)
**Hooks utilizados:** `useSupabase`, `useAuth`

### `ReviewSystem.jsx` (11KB, 287 líneas)
**Propósito:** Sistema de reseñas de productos
**Funcionalidades:**
- Calificación con estrellas
- Comentarios de usuarios
- Filtros por calificación
- Paginación
- Integración con Supabase
- Moderación de comentarios

**Props:** `productId`
**Hooks utilizados:** `useSupabase`, `useAuth`

## 🎨 Componentes de UI/UX

### `LoadingSpinner.jsx` (1.0KB, 44 líneas)
**Propósito:** Spinner de carga
**Funcionalidades:**
- Animación de rotación
- Diferentes tamaños
- Colores personalizables
- Mensaje opcional

**Props:** `size`, `color`, `message`

### `LoadingSkeleton.jsx` (1.7KB, 57 líneas)
**Propósito:** Esqueleto de carga para contenido
**Funcionalidades:**
- Animación de pulso
- Diferentes tipos de skeleton
- Simula estructura de contenido
- Mejora UX durante carga

**Props:** `type` (product, player, etc.)

### `Accordion.jsx` (1.6KB, 49 líneas)
**Propósito:** Componente acordeón colapsable
**Funcionalidades:**
- Múltiples secciones
- Animación suave
- Estado persistente
- Diseño responsive

**Props:** `items` (array de objetos con title y content)

### `BrandCard.jsx` (754B, 24 líneas)
**Propósito:** Tarjeta de marca
**Funcionalidades:**
- Logo de marca
- Navegación a productos
- Hover effects
- Diseño consistente

**Props:** `brand` (objeto con datos de marca)

## 📄 Componentes de Contenido

### `ContentSection.jsx` (411B, 18 líneas)
**Propósito:** Sección de contenido reutilizable
**Funcionalidades:**
- Título y contenido
- Estilos consistentes
- Responsive design

**Props:** `title`, `children`

### `PageBanner.jsx` (353B, 10 líneas)
**Propósito:** Banner de página
**Funcionalidades:**
- Título de página
- Breadcrumbs opcionales
- Fondo personalizable

**Props:** `title`, `breadcrumbs`

### `NewsletterSection.jsx` (1.3KB, 46 líneas)
**Propósito:** Sección de newsletter
**Funcionalidades:**
- Formulario de suscripción
- Validación de email
- Integración con Supabase
- Mensajes de confirmación

**Props:** No requiere props
**Hooks utilizados:** `useSupabase`

### `SectionNavigation.jsx` (167B, 9 líneas)
**Propósito:** Navegación entre secciones
**Funcionalidades:**
- Enlaces a secciones
- Scroll suave
- Indicador activo

**Props:** `sections` (array de objetos)

## 🛡️ Componentes de Seguridad y Manejo de Errores

### `ErrorBoundary.jsx` (1.7KB, 56 líneas)
**Propósito:** Manejo de errores de React
**Funcionalidades:**
- Captura errores de componentes
- Muestra fallback UI
- Logging de errores
- Recuperación automática

**Props:** `children`, `fallback`

### `FormInput.jsx` (815B, 37 líneas)
**Propósito:** Input de formulario reutilizable
**Funcionalidades:**
- Validación integrada
- Mensajes de error
- Diferentes tipos de input
- Estilos consistentes

**Props:** `type`, `label`, `error`, `...inputProps`

## 📁 Archivos de Configuración

### `index.js` (1.4KB, 28 líneas)
**Propósito:** Exportaciones centralizadas de componentes
**Funcionalidades:**
- Exporta todos los componentes
- Facilita imports
- Mantiene organización

### `README.md` (6.0KB, 274 líneas)
**Propósito:** Documentación de componentes
**Contenido:**
- Guía de uso
- Ejemplos de implementación
- Mejores prácticas
- Convenciones de nomenclatura

## 🎯 Convenciones y Mejores Prácticas

### Estructura de Componentes:
1. **Props validation** con PropTypes o TypeScript
2. **Hooks personalizados** para lógica compleja
3. **Componentes funcionales** con hooks
4. **Nombres descriptivos** y en PascalCase
5. **Documentación** en JSDoc

### Organización:
- **Componentes relacionados** agrupados
- **Archivos de configuración** al final
- **Documentación** incluida
- **Tests** en archivos separados

### Rendimiento:
- **React.memo** para componentes pesados
- **useCallback** para funciones pasadas como props
- **useMemo** para cálculos costosos
- **Lazy loading** para componentes grandes

## 🔧 Mantenimiento

### Agregar Nuevos Componentes:
1. Crear archivo en carpeta apropiada
2. Agregar export en `index.js`
3. Documentar en este archivo
4. Crear tests si es necesario

### Actualizar Componentes:
1. Mantener compatibilidad hacia atrás
2. Actualizar documentación
3. Probar en diferentes contextos
4. Verificar rendimiento

---

**Total de Componentes:** 25
**Líneas de Código:** ~150KB
**Cobertura de Funcionalidades:** 100% de la UI de la aplicación 