import React from "react";
import {
  SectionNavigation,
  PageBanner,
  PlayerCard,
  ImageCarousel,
  BrandCard,
  Navbar,
  Footer
} from "../components";
import { 
  getCarouselImages, 
  getCarouselConfig, 
  getFeaturedBrands, 
  getAllPlayers 
} from "../data";

const Home = () => {
  // Obtener datos desde los archivos centralizados
  const carouselImages = getCarouselImages('featured');
  const carouselConfig = getCarouselConfig('featured');
  const brands = getFeaturedBrands();
  const players = getAllPlayers();

  return (
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Brands section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Brands</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {brands.map((brand) => (
              <BrandCard
                key={brand.id}
                {...brand}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carousel section */}
      <ImageCarousel
        images={carouselImages}
        title={carouselConfig.title}
        autoPlay={carouselConfig.autoPlay}
        interval={carouselConfig.interval}
      />

      {/* Featured players section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Featured Players</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                {...player}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home; 