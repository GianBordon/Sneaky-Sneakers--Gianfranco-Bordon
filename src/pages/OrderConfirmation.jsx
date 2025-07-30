import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LoadingSpinner
} from '../components';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simular loading inicial muy corto
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Cargando confirmación..." />
      </div>
    );
  }

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Orden No Encontrada</h1>
          <p className="text-neutral-600 mb-8">No se encontró información de la orden.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">
                ¡Orden Confirmada!
              </h1>
              <p className="text-lg text-neutral-600">
                Gracias por tu compra. Tu orden ha sido procesada exitosamente.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Información de la Orden</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-neutral-600">Número de Orden:</span>
                      <p className="font-semibold text-neutral-800">#{order.id}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-neutral-600">Fecha:</span>
                      <p className="font-semibold text-neutral-800">{formatDate(order.createdAt)}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-neutral-600">Estado:</span>
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Confirmada
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-neutral-600">Total:</span>
                      <p className="text-2xl font-bold text-cyan-600">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Información de Envío</h2>
                  
                  <div className="space-y-2">
                    <p className="font-semibold text-neutral-800">
                      {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </p>
                    <p className="text-neutral-600">{order.customerInfo.email}</p>
                    <p className="text-neutral-600">{order.customerInfo.phone}</p>
                    <p className="text-neutral-600">{order.customerInfo.address}</p>
                    <p className="text-neutral-600">
                      {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                    </p>
                    <p className="text-neutral-600">{order.customerInfo.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Productos Ordenados</h2>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-800">{item.product.name}</h3>
                      <p className="text-sm text-neutral-600">
                        Cantidad: {item.quantity}
                        {item.size && ` • Talla: ${item.size}`}
                        {item.color && ` • Color: ${item.color}`}
                      </p>
                    </div>
                    <span className="font-semibold text-neutral-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-neutral-200 mt-6 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal:</span>
                    <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Envío:</span>
                    <span className="font-semibold">
                      {order.shipping === 0 ? 'Gratis' : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">IVA (21%):</span>
                    <span className="font-semibold">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-neutral-800 border-t border-neutral-200 pt-2">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-cyan-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Próximos Pasos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Email de Confirmación</h3>
                  <p className="text-sm text-neutral-600">
                    Recibirás un email con los detalles de tu orden en los próximos minutos.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Preparación</h3>
                  <p className="text-sm text-neutral-600">
                    Tu pedido será preparado y enviado en 1-2 días hábiles.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Seguimiento</h3>
                  <p className="text-sm text-neutral-600">
                    Recibirás actualizaciones sobre el estado de tu envío por email.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/all-products')}
                className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
              >
                Continuar Comprando
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NewsletterSection and FooterLinks are removed as per the edit hint */}
      {/* <NewsletterSection /> */}
      {/* <FooterLinks /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default OrderConfirmation; 