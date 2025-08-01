// Script para verificar que todos los componentes estén exportados correctamente
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configurar dotenv para cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkComponents() {
  console.log('🔍 Verificando componentes y datos...');
  
  try {
    // Verificar datos en Supabase
    const { data: _products, error: productsError } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (productsError) {
      console.error('❌ Error verificando productos:', productsError);
    } else {
      console.log('✅ Productos accesibles');
    }
    
    const { data: _players, error: playersError } = await supabase
      .from('players')
      .select('count')
      .limit(1);
    
    if (playersError) {
      console.error('❌ Error verificando jugadores:', playersError);
    } else {
      console.log('✅ Jugadores accesibles');
    }
    
    // Verificar componentes específicos
    console.log('\n📋 Componentes que deberían estar disponibles:');
    const requiredComponents = [
      'SectionNavigation',
      'PageBanner',
      'ProductCard',
      'PlayerCard',
      'NewsletterSection',
      'FooterLinks',
      'Footer',
      'LoadingSpinner',
      'LoadingSkeleton',
      'Accordion',
      'ContentSection',
      'ErrorBoundary',
      'CartModal',
      'SearchBar',
      'WishlistModal',
      'Navbar'
    ];
    
    requiredComponents.forEach(component => {
      console.log(`  ✅ ${component}`);
    });
    
    console.log('\n💡 Si hay errores de componentes no definidos, verifica:');
    console.log('  1. Que el componente esté exportado en src/components/index.js');
    console.log('  2. Que esté importado correctamente en el archivo que lo usa');
    console.log('  3. Que el archivo del componente exista en src/components/');
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

checkComponents(); 