import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/home/HeroSection';
import ProductsSection from '../components/home/ProductsSection';
import OutdoorOasisSection from '../components/home/OutdoorOasisSection';

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Eden Outdoor Furniture | Artistry in Outdoor Living</title>
        <meta name="description" content="Elevate your outdoor space with our handcrafted, minimalist furniture designs. Eden Outdoor Furniture offers premium quality and exceptional service." />
      </Helmet>
      
      <main>
        <HeroSection />
        <ProductsSection />
        <OutdoorOasisSection />
      </main>
    </>
  );
};

export default Home;