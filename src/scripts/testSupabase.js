// Script para verificar la conexión con Supabase
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configurar dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Verificando configuración de Supabase...');
console.log('URL:', supabaseUrl ? '✅ Configurada' : '❌ No configurada');
console.log('Key:', supabaseKey ? '✅ Configurada' : '❌ No configurada');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas');
  console.log('💡 Asegúrate de que el archivo .env existe y contiene:');
  console.log('   VITE_SUPABASE_URL=tu-url-de-supabase');
  console.log('   VITE_SUPABASE_ANON_KEY=tu-anon-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔄 Probando conexión con Supabase...');
    
    // Probar conexión básica
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Tabla "products" no existe (normal si es la primera vez)');
        console.log('✅ Conexión con Supabase exitosa');
      } else {
        console.error('❌ Error de conexión:', error.message);
        process.exit(1);
      }
    } else {
      console.log('✅ Conexión con Supabase exitosa');
      console.log('✅ Tabla "products" accesible');
    }
    
    // Probar autenticación
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('⚠️  Error de autenticación:', authError.message);
    } else {
      console.log('✅ Autenticación configurada correctamente');
    }
    
    console.log('\n🎉 Configuración de Supabase verificada exitosamente!');
    console.log('📝 Variables de entorno:');
    console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
    console.log(`   Key: ${supabaseKey.substring(0, 20)}...`);
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    process.exit(1);
  }
}

testConnection(); 