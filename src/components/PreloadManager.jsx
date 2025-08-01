import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para preloading inteligente
const PreloadManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload páginas relacionadas basado en la página actual
    const preloadRelatedPages = () => {
      const currentPath = location.pathname;

      // Preload páginas de categorías si estamos en una categoría
      if (currentPath === '/men' || currentPath === '/women' || currentPath === '/kids') {
        import('./../pages/AllProducts');
        import('./../pages/ProductDetail');
      }

      // Preload páginas de jugadores si estamos en una página de jugador
      if (currentPath.includes('/player') || currentPath.includes('lebron') || 
          currentPath.includes('kevin') || currentPath.includes('giannis')) {
        import('./../pages/AllProducts');
        import('./../pages/ProductDetail');
      }

      // Preload páginas de compra si estamos en productos
      if (currentPath === '/all-products' || currentPath === '/new-arrivals' || currentPath === '/sale') {
        import('./../pages/ProductDetail');
        import('./../pages/Checkout');
      }

      // Preload checkout si estamos en detalles de producto
      if (currentPath.includes('/product/')) {
        import('./../pages/Checkout');
        import('./../pages/OrderConfirmation');
      }

      // Preload páginas de políticas si estamos en información
      if (currentPath === '/about-us' || currentPath === '/faq') {
        import('./../pages/ExchangePolicy');
        import('./../pages/ShippingPolicy');
        import('./../pages/PaymentMethods');
      }
    };

    // Ejecutar preloading con un pequeño delay para no bloquear la navegación
    const timeoutId = setTimeout(preloadRelatedPages, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return null; // Este componente no renderiza nada
};

export default PreloadManager; 