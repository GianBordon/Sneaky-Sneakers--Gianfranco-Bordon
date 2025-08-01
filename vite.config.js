import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - librerías externas
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // Feature chunks - agrupar por funcionalidad
          'pages-main': [
            './src/pages/Home.jsx',
            './src/pages/AllProducts.jsx',
            './src/pages/Men.jsx',
            './src/pages/Women.jsx',
            './src/pages/Kids.jsx'
          ],
          'pages-players': [
            './src/pages/LeBronJames.jsx',
            './src/pages/KevinDurant.jsx',
            './src/pages/GiannisAntetokounmpo.jsx',
            './src/pages/PlayerDetail.jsx'
          ],
          'pages-shop': [
            './src/pages/ProductDetail.jsx',
            './src/pages/Checkout.jsx',
            './src/pages/OrderConfirmation.jsx'
          ],
          'pages-policies': [
            './src/pages/AboutUs.jsx',
            './src/pages/FAQ.jsx',
            './src/pages/ExchangePolicy.jsx',
            './src/pages/ShippingPolicy.jsx',
            './src/pages/PaymentMethods.jsx'
          ],
          'pages-auth': [
            './src/pages/LoginPage.jsx',
            './src/pages/AdminDashboard.jsx'
          ],
          'components-ui': [
            './src/components/Navbar.jsx',
            './src/components/Footer.jsx',
            './src/components/ProductCard.jsx',
            './src/components/PlayerCard.jsx',
            './src/components/LoadingSpinner.jsx',
            './src/components/LoadingSkeleton.jsx'
          ],
          'components-modals': [
            './src/components/CartModal.jsx',
            './src/components/WishlistModal.jsx',
            './src/components/SearchBar.jsx'
          ],
          'services': [
            './src/services/supabaseService.js',
            './src/services/authService.js',
            './src/services/cartService.js',
            './src/services/productService.js'
          ],
          'hooks': [
            './src/hooks/useAuth.js',
            './src/hooks/useCart.js',
            './src/hooks/useProducts.js',
            './src/hooks/useWishlist.js',
            './src/hooks/useSupabase.js'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Aumentar límite a 1MB
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en producción
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js']
  }
})
