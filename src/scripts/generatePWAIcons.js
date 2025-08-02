// Script para generar iconos de PWA
// Este script crea iconos básicos para la PWA usando Canvas API

const fs = require('fs');
const path = require('path');

// Función para crear un icono básico usando Canvas
function createIcon(size, text = 'SS') {
  const canvas = require('canvas');
  const c = canvas.createCanvas(size, size);
  const ctx = c.getContext('2d');

  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0891b2'); // Cyan
  gradient.addColorStop(1, '#0ea5e9'); // Blue
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Texto
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);

  return c.toBuffer('image/png');
}

// Función para crear icono con logo de zapatilla
function createSneakerIcon(size) {
  const canvas = require('canvas');
  const c = canvas.createCanvas(size, size);
  const ctx = c.getContext('2d');

  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0891b2');
  gradient.addColorStop(1, '#0ea5e9');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Dibujar zapatilla simple
  ctx.fillStyle = 'white';
  
  // Suela
  ctx.fillRect(size * 0.2, size * 0.7, size * 0.6, size * 0.15);
  
  // Cuerpo de la zapatilla
  ctx.beginPath();
  ctx.moveTo(size * 0.25, size * 0.7);
  ctx.lineTo(size * 0.3, size * 0.4);
  ctx.lineTo(size * 0.7, size * 0.4);
  ctx.lineTo(size * 0.75, size * 0.7);
  ctx.closePath();
  ctx.fill();

  // Agujeros
  ctx.fillStyle = '#0891b2';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(size * (0.35 + i * 0.1), size * 0.5, size * 0.03, 0, 2 * Math.PI);
    ctx.fill();
  }

  return c.toBuffer('image/png');
}

// Crear directorio public si no existe
const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generar iconos
const icons = [
  { name: 'logo192.png', size: 192, type: 'sneaker' },
  { name: 'logo512.png', size: 512, type: 'sneaker' },
  { name: 'favicon-16x16.png', size: 16, type: 'text' },
  { name: 'favicon-32x32.png', size: 32, type: 'text' },
  { name: 'apple-touch-icon.png', size: 180, type: 'sneaker' }
];

console.log('🎨 Generando iconos de PWA...');

icons.forEach(icon => {
  try {
    const iconData = icon.type === 'sneaker' 
      ? createSneakerIcon(icon.size)
      : createIcon(icon.size);
    
    const iconPath = path.join(publicDir, icon.name);
    fs.writeFileSync(iconPath, iconData);
    console.log(`✅ ${icon.name} (${icon.size}x${icon.size})`);
  } catch (error) {
    console.error(`❌ Error generando ${icon.name}:`, error.message);
  }
});

console.log('🎯 Iconos de PWA generados correctamente!');
console.log('📁 Ubicación: /public/');
console.log('💡 Nota: Para iconos profesionales, considera usar herramientas como Figma o Photoshop'); 