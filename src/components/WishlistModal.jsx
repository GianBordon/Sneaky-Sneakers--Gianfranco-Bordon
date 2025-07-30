import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist, useCart } from '../hooks';
import { getProductById } from '../data/products';

const WishlistModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId);
  };

  const handleViewProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (productId) => {
    try {
      const result = await addToCart(productId, 1);
      if (result.success) {
        // Remover de la wishlist después de agregar al carrito
        removeFromWishlist(productId);
        console.log('Producto agregado al carrito y removido de la wishlist');
      } else {
        console.error('Error al agregar al carrito:', result.error);
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Obtener productos completos de la wishlist
  const wishlistProducts = wishlist.map(productId => {
    const product = getProductById(productId);
    return product ? { ...product, wishlistId: productId } : null;
  }).filter(Boolean);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-800">
              Lista de Deseos ({wishlistProducts.length} items)
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto max-h-96">
            {wishlistProducts.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Tu lista de deseos está vacía</h3>
                <p className="text-neutral-600">Agrega algunos productos para guardarlos</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {wishlistProducts.map((product) => (
                  <div key={product.wishlistId} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {product.brand} • {product.category}
                      </p>
                      <p className="text-sm font-semibold text-cyan-600">
                        ${product.price}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProduct(product.id)}
                        className="px-3 py-1 text-xs bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Agregar
                      </button>
                      <button
                        onClick={() => handleRemoveItem(product.wishlistId)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="border-t border-neutral-200 p-6">
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={clearWishlist}
                  className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Limpiar Lista
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal; 