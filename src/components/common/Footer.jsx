import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const productCategories = [
    { name: 'Chairs', path: '/product/chairs' },
    { name: 'Bar Chairs & Stools', path: '/product/bar-chairs' },
    { name: 'Sofas', path: '/product/sofas' },
    { name: 'Day Beds', path: '/product/day-beds' },
    { name: 'Lamps', path: '/product/lamps' },
    { name: 'Swings', path: '/product/swings' },
    { name: 'Custom Furniture', path: '/product/custom' },
  ];

  const contactInfo = {
    address: '123 Garden Avenue, Suite 101, Miami, FL 33101',
    phone: '+91 9510100618',
    email: 'edenoutdoorf@gmail.com',
    hours: 'Monday - Friday: 9am - 6pm | Saturday: 10am - 4pm',
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-4 text-accent">Eden Outdoor Furniture</h3>
            <p className="text-light-bg mb-4 text-sm">
              Crafting artistic, modern, and aesthetic outdoor furniture to transform your spaces into serene retreats.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-5 h-5 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.8,0H5.2C2.3,0,0,2.3,0,5.2v13.7C0,21.7,2.3,24,5.2,24h13.7c2.9,0,5.2-2.3,5.2-5.2V5.2C24,2.3,21.7,0,18.8,0z M16,7h-1.9c-0.7,0-0.9,0.3-0.9,1v2h2.8l-0.4,2h-2.4v7h-3V12h-2V9h2V7.5C8.2,5.3,9.4,4,12,4c2.2,0,4,0.5,4,0.5V7z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/edenoutdoorfurniture?igsh=MXFzNHQ5dWVnMjBtMg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="w-5 h-5 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.2c3.2,0,3.6,0,4.8,0.1c3.3,0.1,4.8,1.7,4.9,4.9c0.1,1.3,0.1,1.6,0.1,4.8c0,3.2,0,3.6-0.1,4.8c-0.1,3.2-1.7,4.8-4.9,4.9c-1.3,0.1-1.6,0.1-4.8,0.1c-3.2,0-3.6,0-4.8-0.1c-3.3-0.1-4.8-1.7-4.9-4.9c-0.1-1.3-0.1-1.6-0.1-4.8c0-3.2,0-3.6,0.1-4.8c0.1-3.2,1.7-4.8,4.9-4.9C8.4,2.3,8.8,2.2,12,2.2z M12,0C8.7,0,8.3,0,7.1,0.1c-4.4,0.2-6.8,2.6-7,7C0,8.3,0,8.7,0,12c0,3.3,0,3.7,0.1,4.9c0.2,4.4,2.6,6.8,7,7C8.3,24,8.7,24,12,24c3.3,0,3.7,0,4.9-0.1c4.4-0.2,6.8-2.6,7-7C24,15.7,24,15.3,24,12c0-3.3,0-3.7-0.1-4.9c-0.2-4.4-2.6-6.8-7-7C15.7,0,15.3,0,12,0z M12,5.8c-3.4,0-6.2,2.8-6.2,6.2c0,3.4,2.8,6.2,6.2,6.2c3.4,0,6.2-2.8,6.2-6.2C18.2,8.6,15.4,5.8,12,5.8z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C16,14.2,14.2,16,12,16z M19.8,5.6c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4C19.2,4.2,19.8,4.8,19.8,5.6z" />
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <svg className="w-5 h-5 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,0C5.4,0,0,5.4,0,12c0,5.1,3.2,9.4,7.6,11.2c-0.1-0.9-0.2-2.4,0-3.4c0.2-0.9,1.4-6,1.4-6s-0.3-0.8-0.3-1.8c0-1.7,1-2.9,2.2-2.9c1,0,1.5,0.8,1.5,1.7c0,1-0.7,2.6-1,4c-0.3,1.2,0.6,2.2,1.8,2.2c2.1,0,3.8-2.2,3.8-5.5c0-2.9-2.1-4.9-5-4.9c-3.4,0-5.4,2.6-5.4,5.2c0,1,0.4,2.1,0.9,2.7c0.1,0.1,0.1,0.2,0.1,0.3c-0.1,0.4-0.3,1.2-0.3,1.4c-0.1,0.2-0.2,0.3-0.4,0.2c-1.5-0.7-2.4-2.9-2.4-4.6c0-3.8,2.8-7.3,7.9-7.3c4.2,0,7.4,3,7.4,6.9c0,4.1-2.6,7.5-6.2,7.5c-1.2,0-2.4-0.6-2.8-1.4c0,0-0.6,2.3-0.7,2.9c-0.3,1-1,2.3-1.5,3c1.1,0.3,2.3,0.5,3.5,0.5c6.6,0,12-5.4,12-12C24,5.4,18.6,0,12,0z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="w-5 h-5 text-white hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.6,4.9c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.5,4.1,6.6,1.7,3.8C1.2,4.5,1,5.4,1,6.3c0,1.7,0.9,3.2,2.1,4.1c-0.8,0-1.5-0.2-2.2-0.6v0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6C22.1,6.7,22.9,5.9,23.6,4.9z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-4 text-accent">Products</h3>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.path}>
                  <Link 
                    to={category.path}
                    className="text-light-bg hover:text-accent transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-4 text-accent">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-light-bg">{contactInfo.address}</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-light-bg">{contactInfo.phone}</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-light-bg">{contactInfo.email}</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-light-bg">{contactInfo.hours}</span>
              </p>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="font-display text-xl mb-4 text-accent">Stay Updated</h3>
            <p className="text-light-bg text-sm mb-4">
              Subscribe to our newsletter for exclusive offers, design inspirations, and new product launches.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-2 bg-secondary text-white placeholder-light-bg/50 border border-light-bg/20 focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-primary font-medium hover:bg-white transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-light-bg mb-4 md:mb-0">
            © {currentYear} Eden Outdoor Furniture. All rights reserved.
          </div>
          <div className="flex space-x-4 text-xs text-light-bg">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;