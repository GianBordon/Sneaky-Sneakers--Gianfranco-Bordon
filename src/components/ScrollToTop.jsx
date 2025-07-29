import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll al inicio de la página cuando cambie la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente no renderiza nada
}

export default ScrollToTop; 