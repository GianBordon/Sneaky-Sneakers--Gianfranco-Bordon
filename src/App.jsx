import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar todas las páginas
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import NewArrivals from './pages/NewArrivals';
import Sale from './pages/Sale';
import AllProducts from './pages/AllProducts';
import AboutUs from './pages/AboutUs';
import PaymentMethods from './pages/PaymentMethods';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import ExchangePolicy from './pages/ExchangePolicy';
import LoginPage from './pages/LoginPage';

// Importar páginas de jugadores
import PaulGeorge from './pages/PaulGeorge';
import LeBronJames from './pages/LeBronJames';
import KevinDurant from './pages/KevinDurant';
import GiannisAntetokounmpo from './pages/GiannisAntetokounmpo';
import JamesHarden from './pages/JamesHarden';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Páginas de categorías */}
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/all-products" element={<AllProducts />} />
          
          {/* Páginas informativas */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/exchange-policy" element={<ExchangePolicy />} />
          
          {/* Página de autenticación */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Páginas de jugadores */}
          <Route path="/paul-george" element={<PaulGeorge />} />
          <Route path="/lebron-james" element={<LeBronJames />} />
          <Route path="/kevin-durant" element={<KevinDurant />} />
          <Route path="/giannis-antetokounmpo" element={<GiannisAntetokounmpo />} />
          <Route path="/james-harden" element={<JamesHarden />} />
          
          {/* Ruta por defecto - redirige a Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
