import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getProductById, getProductsByCategory } from '../data/products';
import gsap from 'gsap';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const mainImageRef = useRef(null);
  const thumbnailsRef = useRef([]);
  
  // Fetch product data
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const fetchedProduct = getProductById(productId);
      
      if (!fetchedProduct || fetchedProduct.category !== category) {
        navigate('/not-found');
        return;
      }
      
      setProduct(fetchedProduct);
      setSelectedColor(fetchedProduct.colors ? fetchedProduct.colors[0] : null);
      
      // Get related products (same category but not the current product)
      const allCategoryProducts = getProductsByCategory(category);
      const filtered = allCategoryProducts.filter(p => p.id !== productId).slice(0, 4);
      setRelatedProducts(filtered);
      
      setLoading(false);
    }, 500);
  }, [category, productId, navigate]);
  
  // Image animation on thumbnail click
  const handleThumbnailClick = (index) => {
    if (selectedImage === index) return;
    
    const mainImage = mainImageRef.current;
    
    gsap.to(mainImage, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setSelectedImage(index);
        gsap.to(mainImage, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    });
  };
  
  // Quantity controls
  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If product not found
  if (!product) {
    return null; // Navigate will redirect
  }
  
  return (
    <>
      <Helmet>
        <title>{`${product.name} | Eden Outdoor Furniture`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <main className="py-16">
        {/* Breadcrumbs */}
        <div className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-secondary hover:text-accent transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to={`/product/${category}`} className="text-secondary hover:text-accent transition-colors">
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product Section */}
        <section className="pt-10 md:pt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Images */}
              <motion.div 
                className="space-y-4"
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                {/* Main Image - using aspect-square for consistent 1:1 aspect ratio */}
                <div className="aspect-square bg-white relative" ref={mainImageRef}>
                  <motion.img
                    src={`${process.env.PUBLIC_URL}${product.images[selectedImage]}`}
                    alt={product.name}
                    className="w-full object-contain object-center"
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{height: "33vw"}}
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      ref={el => thumbnailsRef.current[index] = el}
                      className={`w-20 h-20 flex-shrink-0 cursor-pointer overflow-hidden border-2 ${
                        selectedImage === index ? 'border-accent' : 'border-transparent'
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}${image}`}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-cover object-center hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Product Info */}
              <motion.div
                className="space-y-6"
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                <h1 className="text-3xl md:text-4xl font-display text-primary">{product.name}</h1>
                
                <div className="text-secondary">
                  <p>{product.description}</p>
                </div>
                
                {/* Product Features */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-display text-primary mb-4">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-secondary">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Product Details */}
                {product.dimensions && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-display text-primary mb-4">Dimensions</h3>
                    <div className="grid grid-cols-2 gap-4 text-secondary">
                      {Object.entries(product.dimensions).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Materials */}
                {product.materials && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-display text-primary mb-4">Materials</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-light-bg text-secondary text-sm rounded-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-display text-primary mb-8">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link to={`/product/${relatedProduct.category}/${relatedProduct.id}`} className="block">
                      {/* Using aspect-square for consistent 1:1 aspect ratio */}
                      <div className="relative overflow-hidden aspect-square mb-4">
                        <img
                          src={`${process.env.PUBLIC_URL}${relatedProduct.images[0]}`}
                          alt={relatedProduct.name}
                          className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      <h3 className="text-lg font-display text-primary group-hover:text-accent transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductDetail;