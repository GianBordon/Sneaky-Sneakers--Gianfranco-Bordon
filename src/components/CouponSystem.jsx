import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks';

const CouponSystem = ({ onCouponApplied }) => {
  const { cartSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cupones disponibles (en un caso real vendrían de una API)
  const availableCoupons = [
    {
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      minAmount: 50,
      maxDiscount: 25,
      description: '10% de descuento en tu primera compra',
      validUntil: '2024-12-31',
      usageLimit: 1
    },
    {
      code: 'SAVE20',
      discount: 20,
      type: 'percentage',
      minAmount: 100,
      maxDiscount: 50,
      description: '20% de descuento en compras superiores a $100',
      validUntil: '2024-12-31',
      usageLimit: 3
    },
    {
      code: 'FREESHIP',
      discount: 0,
      type: 'shipping',
      minAmount: 75,
      description: 'Envío gratis en compras superiores a $75',
      validUntil: '2024-12-31',
      usageLimit: 5
    },
    {
      code: 'FLAT15',
      discount: 15,
      type: 'fixed',
      minAmount: 30,
      description: '$15 de descuento en compras superiores a $30',
      validUntil: '2024-12-31',
      usageLimit: 2
    }
  ];

  useEffect(() => {
    // Cargar cupón aplicado desde localStorage
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  const validateCoupon = (code) => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    
    if (!coupon) {
      return { valid: false, error: 'Cupón no válido' };
    }

    const today = new Date();
    const validUntil = new Date(coupon.validUntil);
    
    if (today > validUntil) {
      return { valid: false, error: 'Cupón expirado' };
    }

    const subtotal = cartSubtotal;
    
    if (subtotal < coupon.minAmount) {
      return { 
        valid: false, 
        error: `Mínimo de compra: $${coupon.minAmount}` 
      };
    }

    // Verificar uso previo (simulado)
    const usedCoupons = JSON.parse(localStorage.getItem('usedCoupons') || '[]');
    const usageCount = usedCoupons.filter(c => c.code === coupon.code).length;
    
    if (usageCount >= coupon.usageLimit) {
      return { valid: false, error: 'Cupón agotado' };
    }

    return { valid: true, coupon };
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Ingresa un código de cupón');
      return;
    }

    setIsValidating(true);
    setError('');
    setSuccess('');

    // Simular validación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validation = validateCoupon(couponCode);
    
    if (validation.valid) {
      setAppliedCoupon(validation.coupon);
      setSuccess(`¡Cupón aplicado! ${validation.coupon.description}`);
      setCouponCode('');
      
      // Guardar en localStorage
      localStorage.setItem('appliedCoupon', JSON.stringify(validation.coupon));
      
      // Notificar al componente padre
      if (onCouponApplied) {
        onCouponApplied(validation.coupon);
      }
    } else {
      setError(validation.error);
    }

    setIsValidating(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setSuccess('');
    localStorage.removeItem('appliedCoupon');
    
    if (onCouponApplied) {
      onCouponApplied(null);
    }
  };

  const calculateDiscount = (subtotal) => {
    if (!appliedCoupon) return 0;

    let discount = 0;
    
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.discount) / 100;
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.type === 'fixed') {
      discount = appliedCoupon.discount;
    }

    return discount;
  };

      const subtotal = cartSubtotal;
  const discount = calculateDiscount(subtotal);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Cupones y Descuentos</h3>
      
      {/* Cupón aplicado */}
      {appliedCoupon && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <span className="text-green-800 font-semibold">{appliedCoupon.code}</span>
                <span className="ml-2 text-green-600 text-sm">✓ Aplicado</span>
              </div>
              <p className="text-green-700 text-sm mt-1">{appliedCoupon.description}</p>
              {discount > 0 && (
                <p className="text-green-800 font-semibold mt-1">
                  Descuento: ${discount.toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remover
            </button>
          </div>
        </div>
      )}

      {/* Formulario de cupón */}
      {!appliedCoupon && (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Ingresa tu código de cupón"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              maxLength="20"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isValidating || !couponCode.trim()}
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:opacity-50"
            >
              {isValidating ? 'Validando...' : 'Aplicar'}
            </button>
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
          
          {success && (
            <p className="text-green-600 text-sm mt-2">{success}</p>
          )}
        </div>
      )}

      {/* Cupones disponibles */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Cupones Disponibles</h4>
        <div className="space-y-3">
          {availableCoupons.map((coupon) => (
            <div 
              key={coupon.code}
              className={`p-3 border rounded-lg ${
                appliedCoupon?.code === coupon.code 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-gray-800">
                      {coupon.code}
                    </span>
                    {appliedCoupon?.code === coupon.code && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Aplicado
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Mín: ${coupon.minAmount}</span>
                    {coupon.type === 'percentage' && (
                      <span>{coupon.discount}% descuento</span>
                    )}
                    {coupon.type === 'fixed' && (
                      <span>${coupon.discount} descuento</span>
                    )}
                    {coupon.type === 'shipping' && (
                      <span>Envío gratis</span>
                    )}
                  </div>
                </div>
                {!appliedCoupon && (
                  <button
                    onClick={() => {
                      setCouponCode(coupon.code);
                      handleApplyCoupon();
                    }}
                    className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
                  >
                    Usar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de descuentos */}
      {appliedCoupon && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Resumen de Descuentos</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento ({appliedCoupon.code}):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total con descuento:</span>
              <span>${(subtotal - discount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSystem; 