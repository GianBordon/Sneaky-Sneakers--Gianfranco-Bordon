// Utilidades de Testing y Optimización para Sneaky Sneakers

// Test utilities
export const testUtils = {
  // Mock de localStorage
  mockLocalStorage: () => {
    const store = {};
    return {
      getItem: jest.fn((key) => store[key]),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      })
    };
  },

  // Mock de fetch
  mockFetch: (response) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      })
    );
  },

  // Mock de window.location
  mockLocation: (pathname = '/') => {
    delete window.location;
    window.location = {
      pathname,
      href: `http://localhost:3000${pathname}`,
      search: '',
      hash: '',
      reload: jest.fn(),
    };
  },

  // Mock de IntersectionObserver
  mockIntersectionObserver: () => {
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  },

  // Mock de ResizeObserver
  mockResizeObserver: () => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  },

  // Mock de matchMedia
  mockMatchMedia: (matches = true) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },

  // Mock de scrollTo
  mockScrollTo: () => {
    window.scrollTo = jest.fn();
  },

  // Mock de setTimeout y setInterval
  mockTimers: () => {
    jest.useFakeTimers();
  },

  // Restaurar timers reales
  restoreTimers: () => {
    jest.useRealTimers();
  },

  // Mock de console methods
  mockConsole: () => {
    const originalConsole = { ...console };
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
    console.info = jest.fn();
    
    return {
      restore: () => {
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.info = originalConsole.info;
      }
    };
  },

  // Mock de performance
  mockPerformance: () => {
    Object.defineProperty(window, 'performance', {
      writable: true,
      value: {
        getEntriesByType: jest.fn(() => [{
          loadEventEnd: 1000,
          loadEventStart: 500,
          domContentLoadedEventEnd: 800,
          domContentLoadedEventStart: 600
        }]),
        getEntriesByName: jest.fn(() => [{
          startTime: 300
        }])
      }
    });
  }
};

// Performance testing utilities
export const performanceUtils = {
  // Medir tiempo de renderizado
  measureRenderTime: (component, props = {}) => {
    const start = performance.now();
    const result = component(props);
    const end = performance.now();
    return {
      renderTime: end - start,
      component: result
    };
  },

  // Medir tiempo de carga de imagen
  measureImageLoadTime: (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      const start = performance.now();
      
      img.onload = () => {
        const end = performance.now();
        resolve({
          loadTime: end - start,
          success: true
        });
      };
      
      img.onerror = () => {
        const end = performance.now();
        resolve({
          loadTime: end - start,
          success: false
        });
      };
      
      img.src = imageUrl;
    });
  },

  // Medir tiempo de API call
  measureApiCall: async (apiCall) => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const end = performance.now();
      return {
        success: true,
        responseTime: end - start,
        result
      };
    } catch (error) {
      const end = performance.now();
      return {
        success: false,
        responseTime: end - start,
        error
      };
    }
  },

  // Medir memoria utilizada
  measureMemoryUsage: () => {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  },

  // Medir FPS
  measureFPS: (duration = 1000) => {
    return new Promise((resolve) => {
      let frameCount = 0;
      const startTime = performance.now();
      
      const countFrame = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(countFrame);
        } else {
          const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
          resolve(fps);
        }
      };
      
      requestAnimationFrame(countFrame);
    });
  }
};

// Accessibility testing utilities
export const accessibilityUtils = {
  // Verificar si un elemento es focusable
  isFocusable: (element) => {
    if (!element) return false;
    
    const tag = element.tagName.toLowerCase();
    const type = element.type?.toLowerCase();
    
    // Elementos naturalmente focusables
    const focusableTags = ['a', 'button', 'input', 'select', 'textarea'];
    const focusableTypes = ['text', 'password', 'email', 'number', 'search', 'tel', 'url'];
    
    if (focusableTags.includes(tag)) {
      if (tag === 'input') {
        return focusableTypes.includes(type);
      }
      return true;
    }
    
    // Verificar tabindex
    const tabIndex = element.getAttribute('tabindex');
    return tabIndex !== null && tabIndex !== '-1';
  },

  // Verificar contraste de colores
  checkColorContrast: (foreground, background) => {
    // Función simplificada para calcular contraste
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const getLuminance = (r, g, b) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);
    
    if (!fg || !bg) return 0;
    
    const l1 = getLuminance(fg.r, fg.g, fg.b);
    const l2 = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Verificar si un elemento tiene texto alternativo
  hasAltText: (element) => {
    if (element.tagName.toLowerCase() === 'img') {
      return element.hasAttribute('alt') && element.getAttribute('alt').trim() !== '';
    }
    return true;
  },

  // Verificar si un elemento tiene label
  hasLabel: (element) => {
    if (element.tagName.toLowerCase() === 'input') {
      const id = element.getAttribute('id');
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        return label !== null;
      }
    }
    return true;
  }
};

// SEO testing utilities
export const seoUtils = {
  // Verificar meta tags
  checkMetaTags: () => {
    const metaTags = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      keywords: document.querySelector('meta[name="keywords"]')?.content,
      viewport: document.querySelector('meta[name="viewport"]')?.content,
      robots: document.querySelector('meta[name="robots"]')?.content
    };

    const ogTags = {
      title: document.querySelector('meta[property="og:title"]')?.content,
      description: document.querySelector('meta[property="og:description"]')?.content,
      image: document.querySelector('meta[property="og:image"]')?.content,
      url: document.querySelector('meta[property="og:url"]')?.content,
      type: document.querySelector('meta[property="og:type"]')?.content
    };

    const twitterTags = {
      card: document.querySelector('meta[name="twitter:card"]')?.content,
      title: document.querySelector('meta[name="twitter:title"]')?.content,
      description: document.querySelector('meta[name="twitter:description"]')?.content,
      image: document.querySelector('meta[name="twitter:image"]')?.content
    };

    return {
      metaTags,
      ogTags,
      twitterTags,
      hasTitle: !!metaTags.title,
      hasDescription: !!metaTags.description,
      hasOgTags: Object.values(ogTags).some(value => !!value),
      hasTwitterTags: Object.values(twitterTags).some(value => !!value)
    };
  },

  // Verificar structured data
  checkStructuredData: () => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const structuredData = [];
    
    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent);
        structuredData.push(data);
      } catch (error) {
        console.error('Error parsing structured data:', error);
      }
    });

    return {
      count: structuredData.length,
      data: structuredData,
      hasProduct: structuredData.some(data => data['@type'] === 'Product'),
      hasOrganization: structuredData.some(data => data['@type'] === 'Organization'),
      hasBreadcrumb: structuredData.some(data => data['@type'] === 'BreadcrumbList')
    };
  },

  // Verificar headings
  checkHeadings: () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingStructure = [];
    
    headings.forEach(heading => {
      headingStructure.push({
        level: parseInt(heading.tagName.charAt(1)),
        text: heading.textContent.trim(),
        id: heading.id
      });
    });

    return {
      count: headingStructure.length,
      structure: headingStructure,
      hasH1: headingStructure.some(h => h.level === 1),
      hasMultipleH1: headingStructure.filter(h => h.level === 1).length > 1,
      isHierarchical: checkHeadingHierarchy(headingStructure)
    };
  },

  // Verificar imágenes
  checkImages: () => {
    const images = document.querySelectorAll('img');
    const imageData = [];
    
    images.forEach(img => {
      imageData.push({
        src: img.src,
        alt: img.alt,
        hasAlt: !!img.alt && img.alt.trim() !== '',
        width: img.width,
        height: img.height,
        loading: img.loading
      });
    });

    return {
      count: imageData.length,
      images: imageData,
      withAlt: imageData.filter(img => img.hasAlt).length,
      withoutAlt: imageData.filter(img => !img.hasAlt).length,
      withLazyLoading: imageData.filter(img => img.loading === 'lazy').length
    };
  }
};

// Helper function para verificar jerarquía de headings
const checkHeadingHierarchy = (headings) => {
  let currentLevel = 0;
  
  for (const heading of headings) {
    if (heading.level > currentLevel + 1) {
      return false; // Salto de nivel no permitido
    }
    currentLevel = heading.level;
  }
  
  return true;
};

// Error boundary testing
export const errorBoundaryUtils = {
  // Simular error
  simulateError: (component) => {
    const originalRender = component.prototype.render;
    component.prototype.render = function() {
      throw new Error('Test error');
    };
    
    return {
      restore: () => {
        component.prototype.render = originalRender;
      }
    };
  },

  // Verificar si error boundary captura errores
  testErrorBoundary: (ErrorBoundaryComponent, ComponentWithError) => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    try {
      render(
        <ErrorBoundaryComponent>
          <ComponentWithError />
        </ErrorBoundaryComponent>
      );
      
      return {
        errorCaught: true,
        consoleError: consoleSpy
      };
    } catch (error) {
      return {
        errorCaught: false,
        error
      };
    }
  }
};

// Performance monitoring
export const performanceMonitoring = {
  // Monitorear tiempo de carga de componentes
  monitorComponentLoad: (componentName) => {
    const start = performance.now();
    
    return {
      end: () => {
        const end = performance.now();
        const loadTime = end - start;
        
        // Enviar métrica a analytics
        if (window.gtag) {
          window.gtag('event', 'component_load', {
            component_name: componentName,
            load_time: loadTime
          });
        }
        
        return loadTime;
      }
    };
  },

  // Monitorear tiempo de respuesta de API
  monitorApiResponse: (apiName) => {
    const start = performance.now();
    
    return {
      end: (success = true) => {
        const end = performance.now();
        const responseTime = end - start;
        
        // Enviar métrica a analytics
        if (window.gtag) {
          window.gtag('event', 'api_response', {
            api_name: apiName,
            response_time: responseTime,
            success: success
          });
        }
        
        return responseTime;
      }
    };
  },

  // Monitorear interacciones del usuario
  monitorUserInteraction: (interactionType) => {
    const start = performance.now();
    
    return {
      end: () => {
        const end = performance.now();
        const interactionTime = end - start;
        
        // Enviar métrica a analytics
        if (window.gtag) {
          window.gtag('event', 'user_interaction', {
            interaction_type: interactionType,
            interaction_time: interactionTime
          });
        }
        
        return interactionTime;
      }
    };
  }
}; 