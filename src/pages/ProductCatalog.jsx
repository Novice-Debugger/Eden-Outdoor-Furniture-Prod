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

  const subheading = {
    "chairs" : `Lounge in the language of luxury! Our clientele expects three things: Comfort, Luxury and 
Sophistication; and we deliver all these in one thing. With its compact shape, these handmade 
chairs complement the spaces beautifully in the balconies, patios or the gardens. Offers 
maximum relaxation and negligible upkeep. Though light-weight, they very well handle large 
weights and long hour sittings. And remember For every season every sky-your place with us 
never fades! 
`,
    "lamps": `Switch on style and illuminate the luxe! 
Celebration of warm ambiance and thoughtful sculptures. These pieces are ideal to decorate 
the interiors as well as outdoor spaces. So turn down the lights and let the magic begin. This 
collection is just perfect for lighting up cozy seatings, sunset celebrations and adds elegance to 
the indoors.  
Subtle, Stylish and Charming`,
    "day-beds": `The classic deybed line is the end result of meticulous craftsmanship and creative thinking. As 
perfectly quoted, “Details make perfection, and perfection is not a detail” the collection thrives in 
elements requiring a low maintenance with plush cushions and performance-grade protection. 
Makeover your outside area into a Resort-style outdoor space with minimal efforts.  
From sleek, woven curves to generously upholstered canopies, each design strikes a balance of 
style and longevity in equal measure. Our daybeds whisper rest-whether beside the pool, in the 
garden, or tucked away on a quiet terrace; inviting you to stretch out, slow down and stay 
awhile! 
Built for sun, rain and everything in between!`,
    "sofas": `Our premium sofa sets are ideal for any weather and are an impeccable specimen of our 
unique artistry. These sofas aren't merely just furniture but lets you elevate your outdoor 
living. Discover our wide range of weather-proof luxurious sofas which are an excellent 
combination of sophistication and enduring materials. From plush, chic and seamless curves, 
every detail invites you to extend at ease. 
The materials used are hand-picked with utmost care-premium woods, excellent performance 
fabrics, corrosion-free metals which offer both resilience and durability.`,
    "bar-chairs": `Crafted for those who crave and appreciate finer things in life! Live our finest lavish and elegant 
line of Bar Chairs. These chairs bring with them organic charm along with contemporary 
weavings, meticulous lines and sleek durability. Enjoy the ergonomically designed backrests 
and precise-angled legs for sturdy framework without compromising in class. The mesh details, 
hand weaving and climate-conscious cushions add on to architectural details.  
Perfect for exclusive outdoor furniture, outdoor bar lounges, patio counters; Don’t forget 
it's not just a seat but a Statement. 
Pull up, lean back and drink up! `,
    "swings": `Your perfect sway awaits! 
Rediscover the stillness-artistically suspended in the air and surrounded by mindful designs. 
Decorate any outdoor space into comfort of soft motion and surreal luxury. 
Each swing is crafted for serving the purpose of personal aesthetics and extraordinary 
relaxation. Every element including the cushions, handwoven ropes and the fade-resistant 
fabrics, are strong enough to endure the weather gracefully.  Ideal example of luxury balcony 
furniture and premium outdoor designs.  
Let the hours slip by, cradled in quiet motion.`
  }
  
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
        <link rel="canonical" href={`https://edenoutdoorfurniture.com/product/${category}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://edenoutdoorfurniture.com/product/${category}`} />
        <meta property="og:title" content={`${getCategoryDisplayName()} | Eden Outdoor Furniture`} />
        <meta property="og:description" content={`Browse our collection of ${getCategoryDisplayName().toLowerCase()} designed with minimalist aesthetics and premium quality materials.`} />
        <meta property="og:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://edenoutdoorfurniture.com/product/${category}`} />
        <meta name="twitter:title" content={`${getCategoryDisplayName()} | Eden Outdoor Furniture`} />
        <meta name="twitter:description" content={`Browse our collection of ${getCategoryDisplayName().toLowerCase()} designed with minimalist aesthetics and premium quality materials.`} />
        <meta name="twitter:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
      </Helmet>
      
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-20">
          <div className="mx-auto px-4 flex flex-col justify-center" style={{minHeight: "40vh", paddingTop: "10vh"}}>
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
              className="text-lg text-center mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{maxWidth: "70vw"}}
            >
              {subheading[currentCategory?.id]}
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