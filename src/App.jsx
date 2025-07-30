import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Importar páginas
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import AllProducts from './pages/AllProducts';
import NewArrivals from './pages/NewArrivals';
import Sale from './pages/Sale';

// Importar páginas de jugadores
import GiannisAntetokounmpo from './pages/GiannisAntetokounmpo';
import LeBronJames from './pages/LeBronJames';
import KevinDurant from './pages/KevinDurant';
import PaulGeorge from './pages/PaulGeorge';
import JamesHarden from './pages/JamesHarden';

// Importar páginas de políticas y otras
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ExchangePolicy from './pages/ExchangePolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import PaymentMethods from './pages/PaymentMethods';
import LoginPage from './pages/LoginPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';

import Navbar from './components/Navbar';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Routes>
            {/* Página principal */}
            <Route path="/" element={<Home />} />
            
            {/* Páginas de categorías */}
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/sale" element={<Sale />} />
            
            {/* Páginas de jugadores */}
            <Route path="/giannis-antetokounmpo" element={<GiannisAntetokounmpo />} />
            <Route path="/lebron-james" element={<LeBronJames />} />
            <Route path="/kevin-durant" element={<KevinDurant />} />
            <Route path="/paul-george" element={<PaulGeorge />} />
            <Route path="/james-harden" element={<JamesHarden />} />
            
            {/* Páginas de políticas y información */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/exchange-policy" element={<ExchangePolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            
            {/* Páginas de autenticación y compras */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            
            {/* Panel de administración */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Ruta por defecto - redirige a Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
