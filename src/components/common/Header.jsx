import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/product/chairs' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check if current path matches product detail pattern: /product/category/productId
  const isProductsPage = location.pathname.split('/').length > 3 && location.pathname.startsWith('/product/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating to a new page
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine background color based on scroll state and route
  const getBackgroundColor = () => {
    if (isScrolled) {
      return 'bg-white shadow-md';
    } else if (isProductsPage) {
      return 'bg-white'; // White background for products pages
    } else {
      return 'bg-transparent'; // Transparent for other pages
    }
  };

  // Mobile menu animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        getBackgroundColor()
      } py-6`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 
              className={`text-xl md:text-2xl font-display font-bold ${
                isScrolled || isProductsPage ? 'text-primary' : 'text-white'
              }`} 
              style={{margin: 0}}
            >
              Eden Outdoor Furniture
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            // Determine text color based on active state, scroll state, and route
            let textColorClass = '';
            if (isActive) {
              textColorClass = 'text-accent border-b-2 border-accent';
            } else if (isScrolled || isProductsPage) {
              textColorClass = 'text-primary hover:text-accent';
            } else {
              textColorClass = 'text-white hover:text-accent';
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm uppercase tracking-wider font-body font-medium transition-colors duration-300 ${textColorClass}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={isScrolled || isProductsPage ? 'currentColor' : 'white'}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        <motion.div
          className="lg:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg"
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-grow py-6">
              <ul className="space-y-4 px-6">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block py-2 text-base uppercase tracking-wider font-body font-medium transition-colors duration-300 ${
                        location.pathname === item.path
                          ? 'text-accent'
                          : 'text-primary hover:text-accent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;