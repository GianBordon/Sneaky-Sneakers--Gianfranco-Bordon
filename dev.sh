#!/bin/bash

# Script para manejar el servidor de desarrollo de Sneaky Sneakers
# Evita conflictos de puertos y múltiples instancias

echo "🚀 Iniciando servidor de desarrollo Sneaky Sneakers..."

# Verificar si ya hay un proceso en el puerto 5173
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Puerto 5173 ya está en uso. Deteniendo proceso anterior..."
    lsof -ti:5173 | xargs kill -9
    sleep 2
fi

# Limpiar cache de Vite si existe
if [ -d "node_modules/.vite" ]; then
    echo "🧹 Limpiando cache de Vite..."
    rm -rf node_modules/.vite
fi

# Iniciar servidor de desarrollo
echo "✅ Iniciando servidor en http://localhost:5173"
npm run dev 