# ⚙️ Configuración de la Aplicación

Esta carpeta contiene todas las configuraciones y archivos de configuración de la aplicación Sneaky Sneakers. Los archivos de configuración definen parámetros, conexiones y ajustes que determinan el comportamiento de la aplicación.

## 🔧 Archivos de Configuración

### `supabase.js` (2.3KB, 88 líneas)
**Propósito:** Configuración principal de Supabase
**Funcionalidades:**
- Inicialización del cliente de Supabase
- Configuración de credenciales
- Configuración de opciones de conexión
- Manejo de variables de entorno
- Configuración de autenticación
- Configuración de real-time
- Configuración de storage
- Validación de configuración

**Estructura de configuración:**
```javascript
// Configuración de Supabase
const supabaseConfig = {
  // URL del proyecto
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  
  // Clave anónima pública
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Opciones de configuración
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    },
    global: {
      headers: {
        'X-Client-Info': 'sneaky-sneakers-web'
      }
    }
  }
};

// Validación de configuración
const validateConfig = () => {
  if (!supabaseConfig.supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL is required');
  }
  if (!supabaseConfig.supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is required');
  }
};
```

**Variables de entorno requeridas:**
- `VITE_SUPABASE_URL` - URL del proyecto Supabase
- `VITE_SUPABASE_ANON_KEY` - Clave anónima pública

**Funciones principales:**
```javascript
// Inicialización
createSupabaseClient()   // Crear cliente de Supabase
validateConfig()         // Validar configuración
getSupabaseConfig()      // Obtener configuración

// Utilidades
isDevelopment()          // Verificar si es desarrollo
isProduction()           // Verificar si es producción
getEnvironment()         // Obtener entorno actual
```

**Dependencias:** `@supabase/supabase-js`
**Uso:** Servicios de base de datos, hooks de autenticación

## 🎯 Características de Configuración

### Gestión de Entornos:
- **Desarrollo** - Configuración local
- **Staging** - Configuración de pruebas
- **Producción** - Configuración de producción

### Variables de Entorno:
```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Analytics (opcional)
VITE_GA_TRACKING_ID=GA-XXXXXXXXX

# Features (opcional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

### Validación de Configuración:
- **Campos requeridos** verificados al inicio
- **Formato de URLs** validado
- **Tipos de datos** verificados
- **Dependencias** validadas

## 🔒 Seguridad

### Manejo de Credenciales:
- **Variables de entorno** para credenciales
- **No hardcodeadas** en el código
- **Validación** de credenciales
- **Logging** de errores de configuración

### Buenas Prácticas:
- **Separación** de configuraciones por entorno
- **Validación** de configuración al inicio
- **Fallbacks** para configuraciones opcionales
- **Documentación** de variables requeridas

## 🚀 Performance

### Optimizaciones:
- **Lazy Loading** de configuraciones pesadas
- **Caching** de configuraciones
- **Minificación** en producción
- **Tree Shaking** para configuraciones no utilizadas

### Métricas:
- **Tiempo de carga** < 50ms
- **Uso de memoria** < 5MB
- **Bundle size** < 10KB

## 🔧 Mantenimiento

### Agregar Nuevas Configuraciones:
1. **Definir** variable de entorno
2. **Agregar** validación
3. **Documentar** en este archivo
4. **Probar** en diferentes entornos
5. **Actualizar** documentación

### Actualizar Configuraciones:
1. **Backup** de configuración actual
2. **Validar** nueva configuración
3. **Probar** en entorno de desarrollo
4. **Desplegar** gradualmente
5. **Monitorear** cambios

## 📋 Convenciones

### Nomenclatura:
- **VITE_** - Prefijo para variables de entorno de Vite
- **camelCase** - Para nombres de funciones
- **UPPER_CASE** - Para constantes
- **kebab-case** - Para archivos

### Estructura:
```
config/
├── supabase.js         # Configuración de Supabase
├── analytics.js        # Configuración de analytics (futuro)
├── features.js         # Configuración de features (futuro)
└── index.js           # Exportaciones centralizadas
```

## 🧪 Testing

### Estrategias:
1. **Unit Tests** - Para funciones de configuración
2. **Integration Tests** - Para validación de configuraciones
3. **Environment Tests** - Para diferentes entornos
4. **Error Tests** - Para manejo de errores

### Herramientas:
- **Jest** - Para testing unitario
- **Dotenv** - Para testing de variables de entorno
- **MSW** - Para mocking de servicios

## 🔄 Ciclo de Vida

### Inicialización:
1. **Carga** de variables de entorno
2. **Validación** de configuración
3. **Inicialización** de servicios
4. **Verificación** de conectividad

### Operación:
1. **Acceso** a configuraciones
2. **Validación** de cambios
3. **Aplicación** de configuraciones
4. **Logging** de eventos

### Limpieza:
1. **Cierre** de conexiones
2. **Limpieza** de caches
3. **Reset** de configuraciones
4. **Logging** de métricas

## 📊 Monitoreo

### Métricas Rastreadas:
- **Tiempo de inicialización** de configuraciones
- **Errores** de configuración
- **Uso** de diferentes entornos
- **Performance** de validaciones

### Alertas:
- **Configuración faltante** en producción
- **Errores** de validación
- **Timeouts** de conexión
- **Cambios** de configuración

---

**Total de Archivos:** 1
**Líneas de Código:** ~3KB
**Cobertura:** 100% de configuraciones de Supabase
**Integración:** Completa con servicios y hooks 