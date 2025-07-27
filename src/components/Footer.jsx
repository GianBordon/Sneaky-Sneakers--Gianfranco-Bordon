import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
	<footer className="bg-black text-white py-8">
		<div className="container mx-auto px-4">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* Información de la empresa */}
				<div>
					<h3 className="text-lg font-bold mb-4">Sneaky Sneakers</h3>
					<p className="text-gray-300 text-sm">
						Tu tienda de confianza para las mejores zapatillas deportivas.
					</p>
				</div>
				
				{/* Enlaces rápidos */}
				<div>
					<h4 className="text-md font-semibold mb-4">Enlaces Rápidos</h4>
					<ul className="space-y-2 text-sm">
						<li><Link to="/about-us" className="text-gray-300 hover:text-white">Sobre Nosotros</Link></li>
						<li><Link to="/all-products" className="text-gray-300 hover:text-white">Todos los Productos</Link></li>
						<li><Link to="/new-arrivals" className="text-gray-300 hover:text-white">Nuevos Lanzamientos</Link></li>
						<li><Link to="/sale" className="text-gray-300 hover:text-white">Ofertas</Link></li>
					</ul>
				</div>
				
				{/* Información de contacto */}
				<div>
					<h4 className="text-md font-semibold mb-4">Contacto</h4>
					<ul className="space-y-2 text-sm text-gray-300">
						<li>📧 info@sneakysneakers.com</li>
						<li>📞 +1 (555) 123-4567</li>
						<li>📍 123 Sneaker Street, NY</li>
					</ul>
				</div>
				
				{/* Políticas */}
				<div>
					<h4 className="text-md font-semibold mb-4">Políticas</h4>
					<ul className="space-y-2 text-sm">
						<li><Link to="/shipping-policy" className="text-gray-300 hover:text-white">Política de Envío</Link></li>
						<li><Link to="/exchange-policy" className="text-gray-300 hover:text-white">Política de Cambio</Link></li>
						<li><Link to="/payment-methods" className="text-gray-300 hover:text-white">Métodos de Pago</Link></li>
						<li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
					</ul>
				</div>
			</div>
			
			<div className="border-t border-gray-700 mt-8 pt-8 text-center">
				<p className="text-gray-300 text-sm">&copy; 2024 Sneaky Sneakers. Todos los derechos reservados.</p>
			</div>
		</div>
	</footer>
);

export default Footer; 