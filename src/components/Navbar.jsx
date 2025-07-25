import React from "react";

const Navbar = () => (
	<header className="bg-white shadow">
		<div className="container mx-auto flex justify-between items-center py-4">
			<a href="/" className="text-2xl font-bold text-gray-800">Sneaky Sneakers</a>
			<nav className="flex gap-4">
				<a href="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-heart-fill"></i></a>
				<a href="/login" className="text-gray-600 hover:text-gray-900"><i className="bi bi-person-fill"></i></a>
			</nav>
		</div>
	</header>
);

export default Navbar; 