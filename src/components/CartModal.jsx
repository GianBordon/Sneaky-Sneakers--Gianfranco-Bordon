import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks';


const CartModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItemsWithProducts, removeFromCart, updateQuantity, clearCart, cartSubtotal } = useCart();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const itemCount = cartItemsWithProducts.length;

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
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800">
              Carrito de Compras ({itemCount} items)
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto max-h-80">
            {cartItemsWithProducts.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Tu carrito está vacío</h3>
                <p className="text-neutral-600">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItemsWithProducts.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image || '/src/assets/img/default-product.webp'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/src/assets/img/default-product.webp';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-800 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {item.size && `Talla: ${item.size}`} {item.color && `• Color: ${item.color}`}
                      </p>
                      <p className="text-sm font-semibold text-cyan-600">
                        ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItemsWithProducts.length > 0 && (
            <div className="border-t border-neutral-200 p-6">
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-neutral-800">Subtotal:</span>
                <span className="text-xl font-bold text-neutral-800">${cartSubtotal.toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal; 