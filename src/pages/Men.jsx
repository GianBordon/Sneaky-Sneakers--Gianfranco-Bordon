import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const menShoes = [
  "Nike SB/102.webp", "Nike SB/186.webp", "Nike SB/189.webp", "Nike SB/19.webp", "Nike SB/190.webp", "Nike SB/197.webp", "Nike SB/198.webp", "Nike SB/22.webp",
  "Jordan/116.webp", "Jordan/149.webp", "Jordan/15.webp", "Jordan/150.webp", "Jordan/156.webp", "Jordan/164.webp", "Jordan/168.webp", "Jordan/183.webp",
  "NIKE/11.webp", "NIKE/118.webp", "NIKE/122.webp", "NIKE/125.webp", "NIKE/132.webp", "NIKE/140.webp", "NIKE/145.webp"
];

const Men = () => (
  <>
    <Navbar />

    {/* Section navigation */}
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

    {/* Banner */}
    <section className="banner bg-black text-white py-8 text-center">
      <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
    </section>

    {/* Section title */}
    <section className="py-8">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Men</h2>
      </div>
    </section>

    {/* Shoes grid */}
    <section className="py-8">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {menShoes.map((img, idx) => (
          <img
            key={idx}
            src={`/src/assets/img/${img}`}
            alt={img.split("/")[1]}
            className="rounded-lg shadow object-cover w-full h-32 sm:h-40 md:h-48 lg:h-56"
          />
        ))}
      </div>
    </section>

    {/* Newsletter form */}
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

export default Men; 