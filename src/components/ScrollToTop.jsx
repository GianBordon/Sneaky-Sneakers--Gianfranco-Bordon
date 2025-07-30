import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Solo hacer scroll si el pathname realmente cambió
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      
      // Hacer scroll al inicio de la página cuando cambie la ruta
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  return null; // Este componente no renderiza nada
}

export default ScrollToTop; 