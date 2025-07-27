import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
	<header className="bg-white shadow">
		<div className="container mx-auto flex justify-between items-center py-4 px-4">
			<Link to="/" className="text-2xl font-bold text-gray-800">Sneaky Sneakers</Link>
			<nav className="flex gap-4 items-center">
				<Link to="/all-products" className="text-gray-600 hover:text-gray-900 font-medium">Productos</Link>
				<Link to="/test" className="text-blue-600 hover:text-blue-800 font-medium">Test</Link>
				<Link to="/men-simple" className="text-green-600 hover:text-green-800 font-medium">Men Simple</Link>
				<Link to="/men-with-cart" className="text-purple-600 hover:text-purple-800 font-medium">Men Cart</Link>
				<Link to="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-heart-fill"></i></Link>
				<Link to="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-person-fill"></i></Link>
			</nav>
		</div>
	</header>
);

export default Navbar; 