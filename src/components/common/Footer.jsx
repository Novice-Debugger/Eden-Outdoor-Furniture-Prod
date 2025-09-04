import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  const handleContactClick = (e) => {
    if (location.pathname === '/contact') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const productCategories = [
    { name: 'Chairs', path: '/product/chairs' },
    { name: 'Bar Chairs & Stools', path: '/product/bar-chairs' },
    { name: 'Sofas', path: '/product/sofas' },
    { name: 'Day Beds', path: '/product/day-beds' },
    { name: 'Lamps', path: '/product/lamps' },
    { name: 'Swings', path: '/product/swings' },
    { name: 'Custom Furniture', path: '/contact' },
  ];

  const contactInfo = {
    address: 'Eden outdoor furniture, kali talavadi road, near ekta nagar, Pratham Upvan, Vadodara, Gujarat 390012',
    phone: '+91 9510100618',
    email: 'edenoutdoorf@gmail.com',
    hours: 'Monday - Saturday: 9am - 6pm',
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200 }
    },
    hover: { 
      scale: 1.15,
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Company Info - Takes more space on larger screens */}
          <motion.div 
            className="lg:col-span-5"
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-2xl mb-6 text-accent">Eden Outdoor Furniture</h3>
            <p className="text-light-bg mb-6 max-w-md">
              Crafting artistic, modern, and aesthetic outdoor furniture to transform your spaces into serene retreats.
            </p>
            <motion.div 
              className="flex space-x-5 mt-8"
              variants={staggerContainer}
            >
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61575752289142&sk=grid" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-6 h-6 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.8,0H5.2C2.3,0,0,2.3,0,5.2v13.7C0,21.7,2.3,24,5.2,24h13.7c2.9,0,5.2-2.3,5.2-5.2V5.2C24,2.3,21.7,0,18.8,0z M16,7h-1.9c-0.7,0-0.9,0.3-0.9,1v2h2.8l-0.4,2h-2.4v7h-3V12h-2V9h2V7.5C8.2,5.3,9.4,4,12,4c2.2,0,4,0.5,4,0.5V7z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/edenoutdoorfurniture?igsh=MXFzNHQ5dWVnMjBtMg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-6 h-6 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.2c3.2,0,3.6,0,4.8,0.1c3.3,0.1,4.8,1.7,4.9,4.9c0.1,1.3,0.1,1.6,0.1,4.8c0,3.2,0,3.6-0.1,4.8c-0.1,3.2-1.7,4.8-4.9,4.9c-1.3,0.1-1.6,0.1-4.8,0.1c-3.2,0-3.6,0-4.8-0.1c-3.3-0.1-4.8-1.7-4.9-4.9c-0.1-1.3-0.1-1.6-0.1-4.8c0-3.2,0-3.6,0.1-4.8c0.1-3.2,1.7-4.8,4.9-4.9C8.4,2.3,8.8,2.2,12,2.2z M12,0C8.7,0,8.3,0,7.1,0.1c-4.4,0.2-6.8,2.6-7,7C0,8.3,0,8.7,0,12c0,3.3,0,3.7,0.1,4.9c0.2,4.4,2.6,6.8,7,7C8.3,24,8.7,24,12,24c3.3,0,3.7,0,4.9-0.1c4.4-0.2,6.8-2.6,7-7C24,15.7,24,15.3,24,12c0-3.3,0-3.7-0.1-4.9c-0.2-4.4-2.6-6.8-7-7C15.7,0,15.3,0,12,0z M12,5.8c-3.4,0-6.2,2.8-6.2,6.2c0,3.4,2.8,6.2,6.2,6.2c3.4,0,6.2-2.8,6.2-6.2C18.2,8.6,15.4,5.8,12,5.8z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C16,14.2,14.2,16,12,16z M19.8,5.6c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4C19.2,4.2,19.8,4.8,19.8,5.6z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://in.pinterest.com/edenoutdoorf/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Pinterest"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-6 h-6 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,0C5.4,0,0,5.4,0,12c0,5.1,3.2,9.4,7.6,11.2c-0.1-0.9-0.2-2.4,0-3.4c0.2-0.9,1.4-6,1.4-6s-0.3-0.8-0.3-1.8c0-1.7,1-2.9,2.2-2.9c1,0,1.5,0.8,1.5,1.7c0,1-0.7,2.6-1,4c-0.3,1.2,0.6,2.2,1.8,2.2c2.1,0,3.8-2.2,3.8-5.5c0-2.9-2.1-4.9-5-4.9c-3.4,0-5.4,2.6-5.4,5.2c0,1,0.4,2.1,0.9,2.7c0.1,0.1,0.1,0.2,0.1,0.3c-0.1,0.4-0.3,1.2-0.3,1.4c-0.1,0.2-0.2,0.3-0.4,0.2c-1.5-0.7-2.4-2.9-2.4-4.6c0-3.8,2.8-7.3,7.9-7.3c4.2,0,7.4,3,7.4,6.9c0,4.1-2.6,7.5-6.2,7.5c-1.2,0-2.4-0.6-2.8-1.4c0,0-0.6,2.3-0.7,2.9c-0.3,1-1,2.3-1.5,3c1.1,0.3,2.3,0.5,3.5,0.5c6.6,0,12-5.4,12-12C24,5.4,18.6,0,12,0z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://wa.me/9510100618" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-6 h-6 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Products - Takes less space on larger screens */}
          <motion.div 
            className="lg:col-span-3 sm:col-span-1"
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-6 text-accent">Products</h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {productCategories.map((category) => (
                <motion.li 
                  key={category.path}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={category.path}
                    className="text-light-bg hover:text-accent transition-colors text-sm inline-block"
                  >
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Takes less space on larger screens */}
          <motion.div 
            className="lg:col-span-4 sm:col-span-1"
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-6 text-accent">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <motion.p 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a href="https://maps.app.goo.gl/doze4bgPT8zEB6XL9" target="_blank" rel="noopener noreferrer" className="text-light-bg hover:text-accent transition-colors">{contactInfo.address}</a>
              </motion.p>
              <motion.p 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contactInfo.phone}`} className="text-light-bg hover:text-accent transition-colors">{contactInfo.phone}</a>
              </motion.p>
              <motion.p 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contactInfo.email}`} className="text-light-bg hover:text-accent transition-colors">{contactInfo.email}</a>
              </motion.p>
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  to="/contact" 
                  onClick={handleContactClick}
                  className="flex items-start hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-light-bg hover:text-accent transition-colors">{contactInfo.hours}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar with improved divider */}
        <motion.div 
          className="mt-16 pt-6 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.5 } }}
          viewport={{ once: true }}
        >
          {/* Fancy divider */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-accent"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-secondary opacity-50"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-light-bg mb-6 md:mb-0">
              © {currentYear} Eden Outdoor Furniture. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-xs text-light-bg">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;