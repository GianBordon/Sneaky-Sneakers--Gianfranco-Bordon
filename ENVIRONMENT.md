# 🌍 Configuración de Variables de Entorno

Este documento describe la configuración de variables de entorno para el proyecto Sneaky Sneakers.

## 📁 Archivos de Configuración

### `.env.example`
Archivo de ejemplo que muestra la estructura de variables de entorno necesarias.

### `.env`
Archivo con las variables reales (no se incluye en el repositorio por seguridad).

## 🔧 Variables Requeridas

### Supabase Configuration
```bash
# URL de tu proyecto de Supabase
VITE_SUPABASE_URL=https://tu-project-id.supabase.co

# Clave anónima de Supabase
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Entorno de desarrollo
NODE_ENV=development
```

## 🚀 Configuración Inicial

1. **Copiar el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configurar Supabase:**
   - Ve a tu proyecto en [Supabase](https://supabase.com)
   - Copia la URL del proyecto
   - Copia la clave anónima (anon key)

3. **Actualizar el archivo .env:**
   ```bash
   VITE_SUPABASE_URL=https://tu-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

## ✅ Verificación

Ejecuta el script de verificación para confirmar que todo funciona:

```bash
npm run test:supabase
```

Deberías ver:
```
🎉 Configuración de Supabase verificada exitosamente!
✅ Conexión con Supabase exitosa
✅ Autenticación configurada correctamente
```

## 🔒 Seguridad

- **NUNCA** commits el archivo `.env` al repositorio
- El archivo `.env` está incluido en `.gitignore`
- Solo usa la clave anónima (anon key) en el frontend
- Las claves de servicio deben usarse solo en el backend

## 🌐 Entornos

### Desarrollo
```bash
NODE_ENV=development
```

### Producción
```bash
NODE_ENV=production
```

## 📝 Notas Importantes

- Las variables que empiezan con `VITE_` son accesibles en el frontend
- Las variables sin `VITE_` solo están disponibles en el servidor
- Reinicia el servidor de desarrollo después de cambiar variables de entorno

## 🛠️ Troubleshooting

### Error: "Variables de entorno no encontradas"
1. Verifica que el archivo `.env` existe
2. Verifica que las variables están escritas correctamente
3. Reinicia el servidor de desarrollo

### Error: "Conexión con Supabase fallida"
1. Verifica que la URL de Supabase es correcta
2. Verifica que la clave anónima es válida
3. Verifica que tu proyecto de Supabase está activo

### Error: "Tabla no existe"
- Es normal si es la primera vez que configuras el proyecto
- Las tablas se crearán automáticamente cuando se use la aplicación 