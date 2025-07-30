// Exportar todos los datos centralizados
export * from './products';
export * from './players';
export * from './brands';
export * from './categories';
export * from './carousel';

// Importar funciones específicas para uso interno
import { 
  getAllProducts, 
  getProductById 
} from './products';
import { 
  getAllPlayers, 
  getPlayerById 
} from './players';
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
    case 'product':
      return getProductById(identifier);
    case 'player':
      return getPlayerById(identifier);
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
    case 'products':
      return getAllProducts().filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    case 'players':
      return getAllPlayers().filter(player => 
        player.name.toLowerCase().includes(searchTerm)
      );
    case 'brands':
      return getAllBrands().filter(brand => 
        brand.name.toLowerCase().includes(searchTerm) ||
        brand.description.toLowerCase().includes(searchTerm)
      );
    case 'all':
    default:
      return {
        products: getAllProducts().filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        ),
        players: getAllPlayers().filter(player => 
          player.name.toLowerCase().includes(searchTerm)
        ),
        brands: getAllBrands().filter(brand => 
          brand.name.toLowerCase().includes(searchTerm)
        )
      };
  }
}; 