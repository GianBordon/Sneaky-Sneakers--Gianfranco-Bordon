import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const carouselImages = [
  "/src/assets/img/Nike SB/102.webp",
  "/src/assets/img/Nike SB/186.webp",
  "/src/assets/img/Nike SB/189.webp",
  "/src/assets/img/Nike SB/22.webp",
  "/src/assets/img/Nike SB/57.webp",
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
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

      {/* Brands section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Brands</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {['Jordan', 'Nike', 'Adidas', 'Nike SB'].map((brand) => (
              <div key={brand} className="bg-gray-100 rounded-lg shadow p-6 w-40 text-center">
                <a href="/all-products"><h3 className="text-lg font-semibold">{brand}</h3></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel section */}
      <section className="py-8">
        <div className="container mx-auto max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Featured Sneakers</h2>
          <div className="relative flex items-center justify-center">
            <button onClick={prevSlide} className="absolute left-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"><span className="text-2xl">&#8592;</span></button>
            <img
              src={carouselImages[current]}
              alt={`Featured ${current}`}
              className="rounded-lg w-full h-64 object-cover shadow-lg"
            />
            <button onClick={nextSlide} className="absolute right-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"><span className="text-2xl">&#8594;</span></button>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-black' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured players section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Featured Players</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { name: 'LeBron James', path: '/lebron' },
              { name: 'Kevin Durant', path: '/kevin-durant' },
              { name: 'Giannis Antetokounmpo', path: '/giannis' },
              { name: 'Paul George', path: '/paul-george' },
              { name: 'James Harden', path: '/james-harden' },
            ].map((player) => (
              <div key={player.name} className="bg-gray-100 rounded-lg shadow p-6 w-56 text-center">
                <a href={player.path}><h3 className="text-lg font-semibold">{player.name}</h3></a>
                <form action={player.path} className="mt-2">
                  <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">+ Info</button>
                </form>
              </div>
            ))}
          </div>
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
};

export default Home; 