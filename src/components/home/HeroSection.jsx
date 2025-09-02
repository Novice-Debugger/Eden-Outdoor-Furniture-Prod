import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    `${process.env.PUBLIC_URL}/assets/images/hero/hero-1.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/hero/hero-2.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/hero/hero-3.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/hero/hero-4.PNG`,
    `${process.env.PUBLIC_URL}/assets/images/hero/hero-5.jpg`,
  ];
  
  const headlines = {
    title: "Artistry in Outdoor Living",
    subtitle: "Elevate your outdoor space with our handcrafted, minimalist furniture designs"
  };
  
  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds delay
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Variants for animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };
  
  const imageVariants = {
    enter: { opacity: 0 },
    center: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroImages[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: "brightness(0.7)"
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-primary bg-opacity-30"></div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 leading-tight"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {headlines.title}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl font-body text-light-bg mb-8"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            {headlines.subtitle}
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/product/chairs"
              className="inline-block px-6 py-3 bg-accent border-2 border-accent text-primary font-body font-medium text-lg hover:bg-transparent hover:text-white hover:border-white transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;