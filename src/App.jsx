import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';

// Lazy loading para todas las páginas
const Home = lazy(() => import('./pages/Home'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const Men = lazy(() => import('./pages/Men'));
const Women = lazy(() => import('./pages/Women'));
const Kids = lazy(() => import('./pages/Kids'));
const NewArrivals = lazy(() => import('./pages/NewArrivals'));
const Sale = lazy(() => import('./pages/Sale'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const ExchangePolicy = lazy(() => import('./pages/ExchangePolicy'));
const PaymentMethods = lazy(() => import('./pages/PaymentMethods'));
const LeBronJames = lazy(() => import('./pages/LeBronJames'));
const KevinDurant = lazy(() => import('./pages/KevinDurant'));
const GiannisAntetokounmpo = lazy(() => import('./pages/GiannisAntetokounmpo'));

// Componente de carga para páginas
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Navbar />
        
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/exchange-policy" element={<ExchangePolicy />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/lebron-james" element={<LeBronJames />} />
              <Route path="/kevin-durant" element={<KevinDurant />} />
              <Route path="/giannis-antetokounmpo" element={<GiannisAntetokounmpo />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
