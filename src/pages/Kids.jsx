import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const kidsShoes = [
  "Nike SB/31.webp", "Nike SB/32.webp", "Nike SB/47.webp", "Nike SB/53.webp", "Nike SB/54.webp", "Nike SB/57.webp", "Nike SB/6.webp", "Nike SB/7.webp",
  "Jordan/230.webp", "Jordan/223.webp", "Jordan/228.webp", "Jordan/232.webp", "Jordan/235.webp", "Jordan/236.webp", "Jordan/26.webp", "Jordan/37.webp",
  "NIKE/196.webp", "NIKE/204.webp", "NIKE/205.webp", "NIKE/209.webp", "NIKE/210.webp", "NIKE/211.webp", "NIKE/214.webp", "NIKE/218.webp"
];

const Kids = () => (
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
        <h2 className="text-2xl font-bold mb-4">Kids</h2>
      </div>
    </section>

    {/* Shoes grid */}
    <section className="py-8">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {kidsShoes.map((img, idx) => (
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

export default Kids; 