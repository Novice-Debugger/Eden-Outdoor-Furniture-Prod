import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OutdoorOasisSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // GSAP animation for parallax effect
  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      gsap.fromTo(
        section.querySelector('.bg-image'),
        {
          y: 0,
        },
        {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }, []);
  
  // Framer Motion animations
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="bg-image absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/outdoor-oasis.jpg')`,
          backgroundPosition: 'center bottom' 
        }}
      ></div>
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl" ref={textRef}>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6 leading-tight"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            Elevate Your Outdoor Oasis
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-accent mb-8"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, width: 0 },
              visible: { 
                opacity: 1, 
                width: 96,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }
            }}
          ></motion.div>
          
          <motion.div
            className="prose prose-lg text-light-bg"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
              }
            }}
          >
            <p className="text-lg md:text-xl mb-6">
              At Eden Outdoor Furniture, we believe that your outdoor space is an extension of your home—a canvas waiting to be transformed into a personal sanctuary that reflects your unique style and vision.
            </p>
            
            <p className="text-lg md:text-xl mb-8">
              Each piece we create is a harmonious blend of artistry and functionality, meticulously crafted to withstand the elements while elevating your outdoor living experience. From intimate balconies to expansive gardens, our furniture becomes the cornerstone of memories made under open skies.
            </p>
            
            <motion.a
              href="/product/chairs"
              className="inline-block px-6 py-3 bg-accent border-2 border-accent text-primary hover:bg-transparent hover:text-white hover:border-white font-medium transition-colors duration-300"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
                }
              }}
            >
              Discover Our Collections
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OutdoorOasisSection;