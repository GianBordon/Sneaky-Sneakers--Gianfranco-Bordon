# 🚀 Guía de Configuración de Supabase para Sneaky Sneakers

## 📋 Pasos para configurar Supabase

### **1. Obtener credenciales de Supabase**

1. **Ve a tu dashboard de Supabase:**
   - Abre [supabase.com](https://supabase.com)
   - Inicia sesión con tu cuenta
   - Selecciona tu proyecto `sneaky-sneakers-app`

2. **Obtener Project URL y API Key:**
   - En el menú lateral, ve a **"Settings"**
   - Haz clic en **"API"**
   - Copia estos valores:
     - **Project URL** (ejemplo: `https://abcdefghijklmnop.supabase.co`)
     - **anon public** API Key (empieza con `eyJ...`)

### **2. Configurar variables de entorno**

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env`:**
   ```bash
   # Supabase Configuration
   VITE_SUPABASE_URL=https://tu-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Reemplaza los valores:**
   - `https://tu-project-id.supabase.co` → Tu Project URL real
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` → Tu anon public API Key real

⚠️ **IMPORTANTE:** Nunca subas el archivo `.env` a Git. Ya está incluido en `.gitignore`.

### **3. Crear las tablas en Supabase**

1. **Ve a la sección "Table Editor":**
   - En el menú lateral, haz clic en **"Table Editor"**
   - Haz clic en **"Create a new table"**

2. **Crear tabla `products`:**
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

3. **Crear tabla `players`:**
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

4. **Crear tabla `users` (opcional, se crea automáticamente):**
   - Supabase crea automáticamente la tabla `auth.users`
   - Si necesitas datos adicionales, crea una tabla `profiles`:
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     name TEXT,
     phone TEXT,
     role TEXT DEFAULT 'user',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

### **4. Configurar Row Level Security (RLS)**

1. **Habilitar RLS en las tablas:**
   ```sql
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE players ENABLE ROW LEVEL SECURITY;
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ```

2. **Crear políticas para productos (lectura pública):**
   ```sql
   CREATE POLICY "Products are viewable by everyone" ON products
     FOR SELECT USING (true);
   ```

3. **Crear políticas para jugadores (lectura pública):**
   ```sql
   CREATE POLICY "Players are viewable by everyone" ON players
     FOR SELECT USING (true);
   ```

4. **Crear políticas para perfiles (solo el propio usuario):**
   ```sql
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   
   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);
   ```

### **5. Migrar datos**

1. **Ejecutar el script de migración:**
   ```bash
   node src/scripts/migrateToSupabase.js migrate
   ```

2. **Verificar la migración:**
   ```bash
   node src/scripts/migrateToSupabase.js check
   ```

### **6. Configurar autenticación (opcional)**

1. **Ve a "Authentication" → "Settings":**
   - Configura el dominio de tu aplicación
   - Habilita los proveedores que necesites (Google, Facebook, etc.)

2. **Configurar redirecciones:**
   - Site URL: `http://localhost:5173` (desarrollo)
   - Redirect URLs: `http://localhost:5173/auth/callback`

### **7. Probar la conexión**

1. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```

2. **Verificar en la consola del navegador:**
   - Deberías ver: "Supabase conectado exitosamente"

## 🔧 Comandos útiles

```bash
# Migrar todos los datos
node src/scripts/migrateToSupabase.js migrate

# Migrar solo productos
node src/scripts/migrateToSupabase.js products

# Migrar solo jugadores
node src/scripts/migrateToSupabase.js players

# Verificar datos migrados
node src/scripts/migrateToSupabase.js check

# Limpiar todos los datos
node src/scripts/migrateToSupabase.js clear

# Crear datos de ejemplo
node src/scripts/migrateToSupabase.js sample
```

## 🚨 Solución de problemas

### **Error: "Invalid API key"**
- Verifica que el API Key sea el correcto
- Asegúrate de usar el "anon public" key, no el "service_role" key

### **Error: "Table does not exist"**
- Verifica que las tablas estén creadas en Supabase
- Ejecuta los comandos SQL para crear las tablas

### **Error: "RLS policy violation"**
- Verifica que las políticas RLS estén configuradas correctamente
- Asegúrate de que el usuario tenga permisos para acceder a los datos

### **Error: "Connection failed"**
- Verifica que el Project URL sea correcto
- Asegúrate de que el proyecto esté activo en Supabase

## 📊 Estructura de datos

### **Tabla `products`:**
- `id`: ID único del producto
- `name`: Nombre del producto
- `brand`: Marca del producto
- `category`: Categoría (men, women, kids, etc.)
- `price`: Precio actual
- `original_price`: Precio original (para descuentos)
- `description`: Descripción del producto
- `image`: URL de la imagen
- `rating`: Calificación (1-5)
- `in_stock`: Si está en stock
- `featured`: Si es destacado

### **Tabla `players`:**
- `id`: ID único del jugador
- `name`: Nombre del jugador
- `team`: Equipo del jugador
- `position`: Posición del jugador
- `image`: URL de la imagen
- `description`: Descripción del jugador
- `stats`: Estadísticas en formato JSON
- `featured`: Si es destacado

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación estará conectada a Supabase y podrás:
- ✅ Almacenar productos y jugadores en la base de datos
- ✅ Autenticar usuarios
- ✅ Gestionar carrito y wishlist
- ✅ Escalar fácilmente

¿Necesitas ayuda con algún paso específico? 