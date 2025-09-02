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
        <link rel="canonical" href="https://edenoutdoorfurniture.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edenoutdoorfurniture.com/" />
        <meta property="og:title" content="Eden Outdoor Furniture | Artistry in Outdoor Living" />
        <meta property="og:description" content="Elevate your outdoor space with our handcrafted, minimalist furniture designs. Eden Outdoor Furniture offers premium quality and exceptional service." />
        <meta property="og:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
        <meta property="og:site_name" content="Eden Outdoor Furniture" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://edenoutdoorfurniture.com/" />
        <meta name="twitter:title" content="Eden Outdoor Furniture | Artistry in Outdoor Living" />
        <meta name="twitter:description" content="Elevate your outdoor space with our handcrafted, minimalist furniture designs. Eden Outdoor Furniture offers premium quality and exceptional service." />
        <meta name="twitter:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
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