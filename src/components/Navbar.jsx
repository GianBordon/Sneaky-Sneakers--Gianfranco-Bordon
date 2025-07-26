import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
	<header className="bg-white shadow">
		<div className="container mx-auto flex justify-between items-center py-4">
			<Link to="/" className="text-2xl font-bold text-gray-800">Sneaky Sneakers</Link>
			<nav className="flex gap-4">
				<Link to="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-heart-fill"></i></Link>
				<Link to="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-person-fill"></i></Link>
			</nav>
		</div>
	</header>
);

export default Navbar; 