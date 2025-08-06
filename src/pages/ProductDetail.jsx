import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks';
import { useSupabase } from '../hooks/useSupabase';
import {
  Footer,
  NewsletterSection,
  FooterLinks,
  LoadingSpinner,
  ProductRecommendations
} from '../components';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, isLoading: supabaseLoading, error: supabaseError } = useSupabase();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cargar producto desde Supabase
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error cargando producto:", error);
        setError("Error cargando el producto");
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, getProductById]);

  // Simular loading inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || supabaseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Error</h1>
          <p className="text-neutral-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/all-products')}
            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Ver Todos los Productos
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">Producto No Encontrado</h1>
          <p className="text-neutral-600 mb-8">El producto que buscas no existe en la base de datos.</p>
          <button
            onClick={() => navigate('/all-products')}
            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Ver Todos los Productos
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    // Solo verificar talla si el producto tiene tallas definidas
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    setIsAddingToCart(true);
    try {
      const result = await addToCart(product.id, quantity, selectedSize, selectedColor);
      if (result.success) {
        alert('Producto agregado al carrito');
      } else {
        alert('Error al agregar al carrito');
      }
    } catch {
      alert('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const discount = product.originalPrice - product.price;
  const discountPercentage = Math.round((discount / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">

      {/* Product Detail Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-neutral-600">
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-cyan-600">
                    Inicio
                  </button>
                </li>
                <li>/</li>
                <li>
                  <button onClick={() => navigate(`/${product.category}`)} className="hover:text-cyan-600 capitalize">
                    {product.category}
                  </button>
                </li>
                <li>/</li>
                <li className="text-neutral-800 font-medium">{product.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 lg:h-[500px] object-cover object-center"
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}%
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Brand & Name */}
                <div>
                  <p className="text-cyan-600 font-semibold mb-2">{product.brand}</p>
                  <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-800 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-neutral-600 text-lg">{product.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-neutral-800">
                    ${product.price}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-xl text-neutral-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                        Ahorras ${discount}
                      </span>
                    </>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-neutral-600">({product.reviews} reviews)</span>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Talla</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {(product.sizes && product.sizes.length > 0 ? product.sizes : ['7', '8', '9', '10', '11', '12']).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 border-2 rounded-lg font-semibold transition-colors ${
                          selectedSize === size
                            ? 'border-cyan-600 bg-cyan-50 text-cyan-600'
                            : 'border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">Color</h3>
                    <div className="flex space-x-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full border-2 transition-colors ${
                            selectedColor === color
                              ? 'border-cyan-600 ring-2 ring-cyan-200'
                              : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Cantidad</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !product.inStock}
                    className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                        : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {isAddingToCart ? 'Agregando...' : product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
                  </button>
                  
                  {!product.inStock && (
                    <p className="text-red-600 text-sm text-center">
                      Este producto no está disponible actualmente
                    </p>
                  )}
                </div>

                {/* Product Features */}
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Características</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Envío gratuito en pedidos superiores a $50</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>30 días de garantía de devolución</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Producto 100% auténtico</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <ProductRecommendations currentProduct={product} />
        </div>
      </section>

      <NewsletterSection />
      <FooterLinks />
      <Footer />
    </div>
  );
};

export default ProductDetail; 