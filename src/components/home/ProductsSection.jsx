import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductCategories } from '../../data/products';

const ProductCard = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const categoryImages = {
    'chairs': [
      '/assets/images/products/chairs/serena-lounge-chair-1.jpg',
      '/assets/images/products/chairs/marina-deck-chair-1.jpg',
      '/assets/images/products/chairs/coastal-adirondack-chair-1.jpg',
    ],
    'bar-chairs': [
      '/assets/images/products/bar-chairs/horizon-bar-stool-1.jpg',
      '/assets/images/products/bar-chairs/horizon-bar-stool-2.jpg',
      '/assets/images/products/bar-chairs/horizon-bar-stool-3.jpg',
    ],
    'sofas': [
      '/assets/images/products/sofas/breeze-modular-sofa-1.jpg',
      '/assets/images/products/sofas/breeze-modular-sofa-2.jpg',
      '/assets/images/products/sofas/breeze-modular-sofa-3.jpg',
    ],
    'day-beds': [
      '/assets/images/products/day-beds/oasis-round-daybed-1.jpg',
      '/assets/images/products/day-beds/oasis-round-daybed-2.jpg',
      '/assets/images/products/day-beds/oasis-round-daybed-3.jpg',
    ],
    'lamps': [
      '/assets/images/products/lamps/luna-outdoor-lamp-1.jpg',
      '/assets/images/products/lamps/luna-outdoor-lamp-2.jpg',
      '/assets/images/products/lamps/luna-outdoor-lamp-3.jpg',
    ],
    'swings': [
      '/assets/images/products/swings/infinity-hanging-chair-1.jpg',
      '/assets/images/products/swings/infinity-hanging-chair-2.jpg',
      '/assets/images/products/swings/infinity-hanging-chair-3.jpg',
    ]
  };

  const images = categoryImages[category.id] || [];

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/product/${category.id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
      >
        <div className="relative w-full aspect-square overflow-hidden mb-4 bg-gray-100">
          <img
            src={`${process.env.PUBLIC_URL}${images[currentImage]}` || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={`${category.name} showcase`}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{height: "30vw"}}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="w-full">
              <motion.span
                className="inline-block hover:bg-white hover:text-primary relative left-0 bottom-0 text-white bg-primary text-sm uppercase tracking-wider font-medium p-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Explore
              </motion.span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-display text-primary group-hover:text-accent transition-colors duration-300">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
};

const ProductsSection = () => {
  const categories = getProductCategories();

  return (
    <section id="products" className="py-20 bg-light-bg">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">
            Our Products
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-secondary">
            Discover our collection of meticulously crafted outdoor furniture,
            designed to transform your outdoor spaces into elegant retreats.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <ProductCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
