import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Eden Outdoor Furniture</title>
        <meta name="description" content="Learn about our commitment to craftsmanship, sustainability, and luxury outdoor living at Eden Outdoor Furniture." />
        <link rel="canonical" href="https://edenoutdoorfurniture.com/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edenoutdoorfurniture.com/about" />
        <meta property="og:title" content="About Us | Eden Outdoor Furniture" />
        <meta property="og:description" content="Learn about our commitment to craftsmanship, sustainability, and luxury outdoor living at Eden Outdoor Furniture." />
        <meta property="og:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://edenoutdoorfurniture.com/about" />
        <meta name="twitter:title" content="About Us | Eden Outdoor Furniture" />
        <meta name="twitter:description" content="Learn about our commitment to craftsmanship, sustainability, and luxury outdoor living at Eden Outdoor Furniture." />
        <meta name="twitter:image" content="https://edenoutdoorfurniture.com/assets/images/og-image.jpg" />
      </Helmet>

      <main>
        <HeroSection />
        <BrandStorySection />
        <CraftsmanshipSection />
        <SustainabilitySection />
        <QuotesSection />
      </main>
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  const sectionRef = useRef(null);

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

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute w-full h-full bg-cover"
        style={{ 
          backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/about/hero.jpg')`,
          backgroundPosition: 'center center',
          height: "100vh",
          filter: 'brightness(0.7)'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary bg-opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Eden Outdoor Furniture
        </motion.h1>
        
        <motion.div
          className="w-24 h-1 bg-accent mx-auto mb-8"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 96 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        ></motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-light-bg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{color: "rgb(256, 256, 256, 0.7)"}}
        >
          Where luxury meets comfort in the art of outdoor living
        </motion.p>
      </div>
    </section>
  );
};

// Brand Story Section Component
const BrandStorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Text */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.h2 
              className="text-3xl md:text-4xl font-display text-primary mb-6"
              custom={0}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Indulge in Elegant Outdoor Furniture
            </motion.h2>
            
            <motion.div
              className="w-24 h-1 bg-accent mb-8"
              custom={1}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, width: 0 },
                visible: { opacity: 1, width: 96, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
              }}
            ></motion.div>
            
            <motion.p
              className="text-lg text-secondary mb-6"
              custom={2}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              The profound artistry, minimal perfection and impeccable luxury is all that is needed to transform any open-air space into a retreat which you'd want to return to repeatedly. Eden Outdoor Furniture is a one-stop solution for durable luxurious furniture.
            </motion.p>
            
            <motion.p
              className="text-lg text-secondary mb-6"
              custom={3}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Step into an oasis where luxury calls you endlessly. Our pieces are inspired by the echoes of Coco Chanel's quote: "Luxury must be comfortable, otherwise it isn't luxury." The premium outdoor furniture offered, blends durable luxury with uncompromised comfort, creating any space into comforting nooks.
            </motion.p>
            
            <motion.p
              className="text-lg text-secondary"
              custom={4}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Savor premiumness, wrapped in design that feels like home—even when you've just arrived.
            </motion.p>
          </div>
          
          {/* Right column - Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              className="relative aspect-square lg:aspect-[4/5] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/assets/images/about/about-2.png`}
                alt="Elegant outdoor furniture setting"
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute inset-0 border-2 border-accent transform translate-x-4 translate-y-4 pointer-events-none"></div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Craftsmanship Section Component
const CraftsmanshipSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // GSAP animation for image reveal
  useEffect(() => {
    const section = sectionRef.current;
    
    if (section && isInView) {
      const images = section.querySelectorAll('.craft-image');
      
      gsap.fromTo(
        images,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-bg"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">
            Crafted for the Outdoors, Designed for the Soul
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-secondary">
            Our commitment to excellence shines through in every piece we create, combining timeless design with uncompromising quality.
          </p>
        </motion.div>

        {/* Craftsmanship Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative overflow-hidden">
              <div className="aspect-square bg-primary" style={{filter: "brightness(0.62)"}}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/about/about-3-${item}.jpg`}
                  alt={`Craftsmanship detail ${item}`}
                  className="w-full h-64 object-cover overflow-hidden"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (item * 0.2), ease: "easeOut" }}
              >
                <h3 className="text-xl font-display text-white">
                  {item === 1 ? "Premium Materials" : item === 2 ? "Meticulous Design" : "Handcrafted Details"}
                </h3>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sustainability Section Component
const SustainabilitySection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Split text animation with GSAP
  useEffect(() => {
    const section = sectionRef.current;
    const textContainer = textRef.current;
    
    if (section && textContainer && isInView) {
      const textLines = textContainer.querySelectorAll('.text-line');
      
      gsap.fromTo(
        textLines,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-primary text-white"
    >
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Image */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/assets/images/about/hero.jpg`}
                alt="Sustainable materials and practices"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          {/* Right column - Text */}
          <div className="w-full lg:w-1/2" ref={textRef}>
            <motion.h2 
              className="text-3xl md:text-4xl font-display text-accent mb-6 text-line"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              Commitment to Sustainability
            </motion.h2>
            
            <motion.div
              className="w-24 h-1 bg-accent mb-8 text-line"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, width: 0 },
                visible: { opacity: 1, width: 96, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
              }}
            ></motion.div>
            
            <p className="text-lg mb-6 text-line">
              Beauty shouldn't come at the cost of nature; this is the reason and the commitment on which we thrive. At Eden Outdoor Furniture, we promote sustainability through:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-line">
                <span className="text-accent mr-2 text-xl">✓</span>
                <span>Responsibly sourced materials from renewable forests</span>
              </li>
              <li className="flex items-start text-line">
                <span className="text-accent mr-2 text-xl">✓</span>
                <span>Low-impact production methods to minimize our carbon footprint</span>
              </li>
              <li className="flex items-start text-line">
                <span className="text-accent mr-2 text-xl">✓</span>
                <span>Durable designs that reduce waste and stand the test of time</span>
              </li>
              <li className="flex items-start text-line">
                <span className="text-accent mr-2 text-xl">✓</span>
                <span>Environmentally-friendly finishes and treatments</span>
              </li>
            </ul>
            
            <p className="text-lg text-line">
              Whether it's a quiet morning or an evening under the stars, discover elegance that invites you to stay—and return, always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Quotes Section Component
const QuotesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const quotes = [
    "Crafted for the outdoors, designed for the souls.",
    "Elevate every moment outdoors!",
    "Not just furniture, but a way of living!",
    "Where the outside feels like home.",
    "Linger for the luxury",
    "While the scenery pulls you in, comfort makes you stay!",
    "The sky called you closer. The cushions asked you to stay.",
    "Eyes on the view, seat so good you forgot to blink.",
    "View is the bait. Comfort's the hook.",
    "Instagram got you here. The seat made you cancel plans.",
    "Leisure meets luxury"
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">
            Our Philosophy
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-secondary">
            The essence of Eden captured in words
          </p>
        </motion.div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="bg-light-bg p-6 flex items-center justify-center aspect-square"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <p className="text-xl md:text-2xl font-display text-primary text-center">
                "{quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;