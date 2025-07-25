import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const accordionData = [
	{
		title: "Tarjetas de crédito",
		content: "Tarjeta Naranja, Cabal, y NO bancarias: cuotas FIJAS con intereses (dependiendo del tipo de tarjeta y la cantidad de cuotas)."
	},
	{
		title: "GO CUOTAS",
		content: "Podes abonar en cuotas con TARJETA DE DÉBITO. En el momento pagarás solo la primera cuota. Luego en 30, 60 y 90 días las cuotas restantes. Las cuotas se debitarán en forma automática de tu tarjeta de DÉBITO."
	},
	{
		title: "MODO",
		content: "Con la aplicación de MODO o desde tu Homebanking, podes escanear el QR y abonar con la forma de pago que prefieras. Podes acceder a descuentos exclusivos y beneficios que ofrece MODO."
	},
	{
		title: "MERCADOPAGO",
		content: "Podes abonar con tarjeta de crédito, débito, efectivo o MercadoCrédito, según prefieras. Cuotas y promociones vigentes establecidas por MercadoPago"
	}
];

const PaymentMethods = () => {
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<>
			<Navbar />
			<section className="bg-gray-100 py-2">
				<div className="container mx-auto flex justify-center">
					<nav className="flex gap-6">
						<a href="/men" className="text-lg font-semibold hover:text-blue-600">Men</a>
						<a href="/women" className="text-lg font-semibold hover:text-pink-600">Women</a>
						<a href="/kids" className="text-lg font-semibold hover:text-green-600">Kids</a>
						<a href="/new" className="text-lg font-semibold hover:text-yellow-600">New Arrivals</a>
						<a href="/sale" className="text-lg font-semibold hover:text-red-600">SALE</a>
					</nav>
				</div>
			</section>
			<section className="banner bg-black text-white py-8 text-center">
				<h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
			</section>
			<section className="py-8">
				<h2 className="text-2xl font-bold text-center mb-6">PAYMENT METHODS</h2>
				<div className="max-w-2xl mx-auto">
					{accordionData.map((item, idx) => (
						<div key={idx} className="border-b">
							<button
								onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
								className={`w-full text-left px-4 py-3 font-semibold flex justify-between items-center focus:outline-none ${openIndex === idx ? 'bg-gray-200' : 'bg-white'}`}
							>
								{item.title}
								<span>{openIndex === idx ? '-' : '+'}</span>
							</button>
							{openIndex === idx && (
								<div className="px-4 py-2 text-gray-700 bg-gray-50">
									{item.content}
								</div>
							)}
						</div>
					))}
				</div>
			</section>
			<section className="bg-gray-100 py-8">
				<div className="container mx-auto max-w-md text-center">
					<h3 className="text-xl font-semibold mb-4">SUBSCRIBE TO THE NEWSLETTER</h3>
					<form className="flex flex-col gap-4 items-center">
						<input type="text" placeholder="Enter your E-mail" className="border rounded px-4 py-2 w-full" />
						<input type="submit" value="Subscribe" className="bg-black text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-800" />
					</form>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default PaymentMethods; 