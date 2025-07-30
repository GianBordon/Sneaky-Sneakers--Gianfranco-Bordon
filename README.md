# Sneaky Sneakers - React + Vite + Supabase

Una aplicación de comercio electrónico moderna para zapatillas deportivas, construida con React, Vite y Supabase.

## 🚀 Características

- **Frontend Moderno**: React 18 con Vite para desarrollo rápido
- **Base de Datos en la Nube**: Supabase para datos de productos y usuarios
- **Diseño Responsivo**: Tailwind CSS para un diseño moderno y adaptable
- **Autenticación**: Sistema de usuarios integrado con Supabase Auth
- **Carrito de Compras**: Gestión de carrito con localStorage
- **Lista de Deseos**: Funcionalidad de wishlist
- **Filtros y Búsqueda**: Filtrado por categoría, marca y precio

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Estado**: React Hooks, Context API
- **Enrutamiento**: React Router DOM
- **Iconos**: Heroicons

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd Sneaky-Sneakers--Gianfranco-Bordon
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tus credenciales de Supabase:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🗄️ Base de Datos

La aplicación utiliza Supabase como backend:
- **Productos**: 98 productos de zapatillas deportivas
- **Jugadores**: 5 jugadores destacados de la NBA
- **Usuarios**: Sistema de autenticación completo
- **Carrito**: Gestión de carrito de compras

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── services/      # Servicios de API
├── data/          # Datos estáticos (categorías, marcas)
└── assets/        # Imágenes y recursos
```

## 🚀 Despliegue

La aplicación está lista para desplegar en:
- Vercel
- Netlify
- Supabase Hosting

## 📝 Licencia

MIT License
