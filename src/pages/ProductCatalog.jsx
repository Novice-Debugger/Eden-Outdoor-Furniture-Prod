import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getProductsByCategory, getProductCategories } from '../data/products';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Start carousel on hover
  useEffect(() => {
    let interval;
    
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <motion.div 
      className="group h-full flex flex-col"
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      <Link to={`/product/${product.category}/${product.id}`} className="block flex-1 flex flex-col">
        {/* Fixed height and width container with strict aspect ratio */}
        <div className="w-full relative overflow-hidden bg-gray-100" style={{ paddingBottom: '100%' }}>
          <img 
            src={`${process.env.PUBLIC_URL}${product.images[currentImage]}`} 
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full">
              <span className="inline-block text-white text-sm uppercase tracking-wider font-medium mb-1">
                View Details
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <h3 className="text-xl font-display text-primary group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};


const ProductCatalog = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // Memoize the categories to prevent re-renders
  const categories = useMemo(() => getProductCategories(), []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      const fetchedProducts = getProductsByCategory(category);
      setProducts(fetchedProducts);
      
      const categoryData = categories.find(cat => cat.id === category);
      setCurrentCategory(categoryData);
      
      setLoading(false);
    }, 500);
  }, [category, categories]); // categories is now memoized so it won't cause re-renders
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Format category name for display
  const getCategoryDisplayName = () => {
    if (!currentCategory) return '';
    return currentCategory.name;
  };
  
  return (
    <>
      <Helmet>
        <title>{`${getCategoryDisplayName()} | Eden Outdoor Furniture`}</title>
        <meta
          name="description"
          content={`Browse our collection of ${getCategoryDisplayName().toLowerCase()} designed with minimalist aesthetics and premium quality materials.`}
        />
      </Helmet>
      
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-20">
          <div className="mx-auto px-4 flex flex-col justify-center" style={{height: "40vh"}}>
            <motion.h1
              className="text-4xl md:text-5xl font-display mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {getCategoryDisplayName()}
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-accent mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-lg text-center max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our collection of {getCategoryDisplayName().toLowerCase()} designed with minimalist aesthetics and premium quality materials.
            </motion.p>
          </div>
        </section>
        
        {/* Category Navigation */}
        <section className="bg-light-bg py-6 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/product/${cat.id}`}
                  className={`px-4 py-2 text-sm md:text-base ${
                    category === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-accent hover:text-primary'
                  } transition-colors duration-300`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-display text-primary mb-4">No Products Found</h3>
                <p className="text-secondary mb-8">
                  We couldn't find any products in this category. Please check back later or browse other categories.
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-primary text-white font-medium hover:bg-secondary transition-colors duration-300"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductCatalog;