# 🔒 Guía de Seguridad - Sneaky Sneakers

## 📋 Información Sensible

### **Archivos que NO se suben a Git:**

- ✅ `.env` - Variables de entorno con credenciales reales
- ✅ `node_modules/` - Dependencias de Node.js
- ✅ `dist/` - Archivos de build
- ✅ `.DS_Store` - Archivos del sistema macOS
- ✅ `.vscode/`, `.idea/` - Configuraciones de editores

### **Archivos que SÍ se suben a Git:**

- ✅ `package.json` - Dependencias del proyecto
- ✅ `src/` - Código fuente
- ✅ `public/` - Archivos públicos
- ✅ `README.md` - Documentación del proyecto
- ✅ `SUPABASE_SETUP.md` - Guía de configuración (solo ejemplos)

## 🛡️ Credenciales de Supabase

### **Variables de Entorno Requeridas:**

```bash
# .env (NO subir a Git)
VITE_SUPABASE_URL=https://tu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Configuración Segura:**

1. **Nunca hardcodear credenciales** en el código
2. **Usar variables de entorno** para todas las credenciales
3. **Mantener .env fuera de Git** (ya configurado)
4. **Usar .env.example** para documentar variables requeridas

## 🔐 Políticas de Seguridad

### **Row Level Security (RLS):**
- ✅ Habilitado en todas las tablas de Supabase
- ✅ Políticas de acceso configuradas
- ✅ Autenticación requerida para datos sensibles

### **API Keys:**
- ✅ Solo se usa la clave anónima pública
- ✅ No se usan claves de servicio en el frontend
- ✅ Las claves están en variables de entorno

## 🚨 En caso de compromiso:

1. **Rotar credenciales** en Supabase Dashboard
2. **Actualizar variables de entorno** en producción
3. **Revisar logs** de acceso en Supabase
4. **Notificar a usuarios** si es necesario

## 📞 Contacto de Seguridad:

Para reportar vulnerabilidades de seguridad, contacta al equipo de desarrollo. 