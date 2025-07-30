// Exportar todos los datos centralizados
export * from './brands';
export * from './categories';
export * from './carousel';

// Importar funciones específicas para uso interno
import { 
  getAllBrands, 
  getBrandById 
} from './brands';
import { 
  getCategoryById 
} from './categories';

// Exportar funciones utilitarias para datos
export const getDataByType = (type, identifier) => {
  switch (type) {
    case 'brand':
      return getBrandById(identifier);
    case 'category':
      return getCategoryById(identifier);
    default:
      return null;
  }
};

export const searchData = (query, type = 'all') => {
  const searchTerm = query.toLowerCase();
  
  switch (type) {
    case 'brands':
      return getAllBrands().filter(brand => 
        brand.name.toLowerCase().includes(searchTerm) ||
        brand.description.toLowerCase().includes(searchTerm)
      );
    case 'all':
    default:
      return {
        brands: getAllBrands().filter(brand => 
          brand.name.toLowerCase().includes(searchTerm)
        )
      };
  }
}; 