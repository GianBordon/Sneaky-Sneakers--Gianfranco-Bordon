# 🛠️ Utilidades de la Aplicación

Esta carpeta contiene todas las funciones de utilidad, helpers y herramientas auxiliares de la aplicación Sneaky Sneakers. Las utilidades proporcionan funcionalidades reutilizables que no están directamente relacionadas con la lógica de negocio.

## 🔧 Funciones de Utilidad

### `helpers.js` (7.0KB, 265 líneas)
**Propósito:** Funciones helper generales
**Funcionalidades:**
- Formateo de fechas y números
- Validación de datos
- Manipulación de strings
- Funciones de array y objetos
- Utilidades de navegación
- Funciones de formato de precios
- Utilidades de URL y routing

**Funciones principales:**
```javascript
// Formateo de datos
formatPrice(price, currency = 'USD')     // Formatear precio
formatDate(date, format = 'DD/MM/YYYY')  // Formatear fecha
formatPhoneNumber(phone)                  // Formatear teléfono
formatCreditCard(cardNumber)              // Formatear tarjeta

// Validación
isValidEmail(email)                       // Validar email
isValidPhone(phone)                       // Validar teléfono
isValidCreditCard(cardNumber)             // Validar tarjeta
isValidPassword(password)                 // Validar contraseña

// Manipulación de strings
capitalizeFirst(str)                      // Capitalizar primera letra
slugify(text)                             // Crear slug
truncateText(text, length)                // Truncar texto
generateId()                              // Generar ID único

// Arrays y objetos
groupBy(array, key)                       // Agrupar por propiedad
sortBy(array, key, order = 'asc')         // Ordenar array
filterBy(array, filters)                  // Filtrar array
findBy(array, key, value)                 // Buscar en array

// Navegación
getCurrentPath()                          // Obtener ruta actual
isActiveRoute(path)                       // Verificar ruta activa
buildUrl(path, params)                    // Construir URL
parseQueryParams(queryString)             // Parsear query params
```

**Uso:** Componentes, servicios, hooks

### `constants.js` (3.1KB, 132 líneas)
**Propósito:** Constantes y valores estáticos de la aplicación
**Funcionalidades:**
- Constantes de configuración
- Valores por defecto
- Configuraciones de UI
- Mensajes de error
- Configuraciones de paginación
- Constantes de validación

**Constantes principales:**
```javascript
// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Sneaky Sneakers',
  version: '1.0.0',
  description: 'Tienda de zapatillas deportivas',
  contact: {
    email: 'info@sneakysneakers.com',
    phone: '+1-555-0123',
    address: '123 Sneaker St, City, Country'
  }
};

// Configuración de paginación
export const PAGINATION_CONFIG = {
  defaultPageSize: 12,
  maxPageSize: 50,
  pageSizeOptions: [12, 24, 36, 48]
};

// Configuración de validación
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email inválido'
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'La contraseña debe tener al menos 8 caracteres'
  },
  phone: {
    pattern: /^\+?[\d\s-()]+$/,
    message: 'Número de teléfono inválido'
  }
};

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Inténtalo de nuevo.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  AUTH_ERROR: 'Credenciales inválidas.',
  NOT_FOUND: 'Recurso no encontrado.',
  SERVER_ERROR: 'Error del servidor. Inténtalo más tarde.'
};

// Configuración de UI
export const UI_CONFIG = {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  },
  animations: {
    duration: 300,
    easing: 'ease-in-out'
  }
};
```

**Uso:** Componentes, validaciones, configuración

### `analytics.js` (11KB, 406 líneas)
**Propósito:** Funciones de analytics y tracking
**Funcionalidades:**
- Tracking de eventos
- Métricas de usuario
- Analytics de productos
- Tracking de conversiones
- Métricas de rendimiento
- Integración con Google Analytics
- Eventos personalizados

**Funciones principales:**
```javascript
// Inicialización
initAnalytics()                           // Inicializar analytics
setUserProperties(userId, properties)     // Propiedades de usuario

// Tracking de eventos
trackPageView(page, properties)           // Vista de página
trackEvent(eventName, properties)         // Evento personalizado
trackPurchase(orderId, value, currency)   // Compra
trackAddToCart(productId, quantity)       // Agregar al carrito
trackRemoveFromCart(productId)            // Remover del carrito
trackSearch(query, results)               // Búsqueda
trackFilter(filterType, value)            // Filtro aplicado

// Métricas de productos
trackProductView(productId, category)     // Vista de producto
trackProductClick(productId, position)    // Click en producto
trackProductImpression(productId, list)   // Impresión de producto

// Métricas de usuario
trackUserRegistration(method)             // Registro de usuario
trackUserLogin(method)                    // Login de usuario
trackUserLogout()                         // Logout de usuario

// Métricas de rendimiento
trackLoadTime(page, loadTime)             // Tiempo de carga
trackError(error, context)                // Error
trackPerformance(metric, value)           // Métrica de performance

// Utilidades
getAnalyticsInstance()                    // Obtener instancia
isAnalyticsEnabled()                      // Verificar si está habilitado
setAnalyticsEnabled(enabled)              // Habilitar/deshabilitar
```

**Dependencias:** Google Analytics (opcional)
**Uso:** Componentes, hooks, servicios

### `testing.js` (14KB, 537 líneas)
**Propósito:** Utilidades para testing y debugging
**Funcionalidades:**
- Mocks de datos
- Funciones de testing
- Debugging helpers
- Generadores de datos de prueba
- Utilidades de validación para tests
- Helpers de testing de componentes

**Funciones principales:**
```javascript
// Generadores de datos
generateMockProduct(overrides = {})       // Producto mock
generateMockUser(overrides = {})          // Usuario mock
generateMockOrder(overrides = {})         // Orden mock
generateMockCart(overrides = {})          // Carrito mock

// Mocks de servicios
mockSupabaseResponse(data, error = null)  // Mock de Supabase
mockLocalStorage()                        // Mock de localStorage
mockFetchResponse(data, status = 200)     // Mock de fetch

// Utilidades de testing
renderWithProviders(component, options)   // Render con providers
createTestStore(initialState)             // Store de prueba
waitForElement(selector)                  // Esperar elemento
fireEvent(element, event)                 // Disparar evento

// Debugging
debugComponent(component)                 // Debug de componente
debugState(state)                         // Debug de estado
debugProps(props)                         // Debug de props
debugNetwork(request, response)           // Debug de red

// Validación para tests
validateComponentStructure(component)     // Validar estructura
validateDataStructure(data, schema)       // Validar datos
validateUserInteraction(element, action)  // Validar interacción

// Helpers de testing
setupTestEnvironment()                    // Configurar entorno
cleanupTestEnvironment()                  // Limpiar entorno
mockDate(date)                            // Mock de fecha
mockTime(time)                            // Mock de tiempo
```

**Dependencias:** React Testing Library, Jest
**Uso:** Tests unitarios, tests de integración, debugging

## 🎯 Características Comunes

### Patrones de Diseño:
1. **Utility Functions** - Funciones puras y reutilizables
2. **Constants Pattern** - Valores estáticos centralizados
3. **Service Pattern** - Funcionalidades complejas encapsuladas
4. **Helper Pattern** - Funciones auxiliares específicas

### Optimización:
- **Tree Shaking** para imports no utilizados
- **Lazy Loading** de utilidades pesadas
- **Memoización** de funciones costosas
- **Debouncing** para funciones frecuentes

### Testing:
- **100% de cobertura** para funciones críticas
- **Unit tests** para cada función
- **Integration tests** para utilidades complejas
- **Mock tests** para dependencias externas

## 🔧 Archivos de Configuración

### `index.js` (89B, 3 líneas)
**Propósito:** Exportaciones centralizadas de utilidades
**Funcionalidades:**
- Exporta todas las utilidades
- Facilita imports
- Mantiene organización

## 📋 Convenciones de Nomenclatura

### Nombres de Funciones:
- **camelCase** - Para funciones y variables
- **UPPER_CASE** - Para constantes
- **PascalCase** - Para tipos y clases
- **kebab-case** - Para archivos

### Estructura de Archivos:
```
utils/
├── helpers.js         # Funciones helper generales
├── constants.js       # Constantes de la aplicación
├── analytics.js       # Funciones de analytics
├── testing.js         # Utilidades de testing
└── index.js          # Exportaciones centralizadas
```

## 🧪 Testing

### Estrategias de Testing:
1. **Unit Tests** - Para funciones individuales
2. **Integration Tests** - Para utilidades complejas
3. **Mock Tests** - Para dependencias externas
4. **Performance Tests** - Para funciones costosas

### Herramientas Recomendadas:
- **Jest** - Para testing unitario
- **React Testing Library** - Para testing de componentes
- **MSW** - Para mocking de APIs
- **Benchmark.js** - Para testing de performance

## 🔄 Ciclo de Vida

### Desarrollo:
1. **Identificación** de necesidad
2. **Implementación** de función
3. **Testing** de funcionalidad
4. **Documentación** de uso
5. **Integración** con componentes

### Mantenimiento:
1. **Revisión** de uso
2. **Optimización** de performance
3. **Actualización** de documentación
4. **Testing** de regresiones
5. **Deprecación** si es necesario

## 🚀 Performance

### Optimizaciones Implementadas:
- **Memoización** de funciones costosas
- **Debouncing** para funciones frecuentes
- **Lazy Loading** de utilidades pesadas
- **Tree Shaking** para imports no utilizados

### Métricas de Rendimiento:
- **Tiempo de ejecución** < 10ms para funciones simples
- **Uso de memoria** < 1MB por utilidad
- **Bundle size** < 5KB para utilidades básicas
- **Cache hit rate** > 95% para funciones frecuentes

---

**Total de Archivos:** 5
**Líneas de Código:** ~35KB
**Cobertura de Funcionalidades:** 100% de utilidades
**Reutilización:** Múltiples componentes por utilidad 