import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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
        <InteractiveFeatureSection />
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
            
            
            <motion.p
              className="text-lg text-secondary mb-6"
              custom={2}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Bring timeless luxury to your open spaces with premium outdoor furniture in Vadodara. At Eden, we design pieces that combine comfort, durability, and style, turning patios, gardens, and poolside areas into elegant retreats.
            </motion.p>
            
            <motion.p
              className="text-lg text-secondary"
              custom={3}
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Crafted with care and inspired by minimal design, our collections ensure that every moment outdoors feels like home—beautiful, lasting, and truly luxurious.
            </motion.p>
          </div>
          
          {/* Right column - Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 hidden lg:block">
            <motion.div
              className="relative overflow-hidden"
              style={{ height: '80vh', minHeight: '400px' }}
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

// Interactive Feature Section Component
const InteractiveFeatureSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Hotspot data
  const hotspots = [
    {
      id: 'teak-wood',
      x: '25%',
      y: '30%',
      title: 'Premium Teak Wood',
      content: `
        <div class="feature-tooltip">
          <h4>Premium Teak Wood</h4>
          <p>Sourced from sustainable forests, our teak wood is naturally resistant to weather, insects, and decay. The natural oils provide built-in protection that lasts for decades.</p>
          <ul>
            <li>Natural weather resistance</li>
            <li>Self-maintaining oils</li>
            <li>Sustainable sourcing</li>
          </ul>
        </div>
      `
    },
    {
      id: 'weather-finish',
      x: '70%',
      y: '25%',
      title: 'Weather-Resistant Finish',
      content: `
        <div class="feature-tooltip">
          <h4>Weather-Resistant Finish</h4>
          <p>Our specialized finish system provides UV protection and water resistance, ensuring your furniture maintains its beauty through all seasons.</p>
          <ul>
            <li>UV protection coating</li>
            <li>Water-resistant seal</li>
            <li>Long-lasting durability</li>
          </ul>
        </div>
      `
    },
    {
      id: 'ergonomic-design',
      x: '45%',
      y: '55%',
      title: 'Ergonomic Design',
      content: `
        <div class="feature-tooltip">
          <h4>Ergonomic Design</h4>
          <p>Every curve and angle is crafted with comfort in mind. Our ergonomic approach ensures proper support for extended outdoor relaxation.</p>
          <ul>
            <li>Optimal back support</li>
            <li>Comfortable arm height</li>
            <li>Perfect seating angle</li>
          </ul>
        </div>
      `
    },
    {
      id: 'precision-joinery',
      x: '15%',
      y: '70%',
      title: 'Precision Joinery',
      content: `
        <div class="feature-tooltip">
          <h4>Precision Joinery</h4>
          <p>Traditional joinery techniques combined with modern precision ensure structural integrity and longevity without compromising aesthetics.</p>
          <ul>
            <li>Mortise and tenon joints</li>
            <li>No visible hardware</li>
            <li>Maximum durability</li>
          </ul>
        </div>
      `
    },
    {
      id: 'cushion-tech',
      x: '80%',
      y: '65%',
      title: 'Premium Cushions',
      content: `
        <div class="feature-tooltip">
          <h4>Premium Cushions</h4>
          <p>Quick-dry foam core with weather-resistant fabric covers. Designed for comfort and easy maintenance in outdoor environments.</p>
          <ul>
            <li>Quick-dry foam technology</li>
            <li>UV-resistant fabric</li>
            <li>Removable covers</li>
          </ul>
        </div>
      `
    }
  ];

  // Initialize Tippy.js tooltips
  useEffect(() => {
    if (isInView && imageRef.current) {
      const hotspotElements = imageRef.current.querySelectorAll('.hotspot');
      
      hotspotElements.forEach((element) => {
        const hotspotId = element.getAttribute('data-hotspot');
        const hotspotData = hotspots.find(h => h.id === hotspotId);
        
        if (hotspotData) {
          tippy(element, {
            content: hotspotData.content,
            allowHTML: true,
            interactive: true,
            theme: 'eden',
            placement: 'auto',
            trigger: 'click',
            maxWidth: 420,
            animation: 'scale',
            offset: [0, 15],
            duration: [200, 150],
            hideOnClick: true,
            onMount(instance) {
              // Apply styles immediately when tooltip is mounted
              const applyStyles = () => {
                const tippyBox = instance.popper.querySelector('.tippy-box');
                if (tippyBox) {
                  tippyBox.style.backgroundColor = '#001a23';
                  tippyBox.style.background = '#001a23';
                  tippyBox.style.borderRadius = '30px';
                  tippyBox.style.padding = '24px';
                  tippyBox.style.boxShadow = '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(130, 189, 237, 0.3), inset 0 1px 0 rgba(130, 189, 237, 0.1)';
                  tippyBox.style.zIndex = '30';
                  
                  const content = tippyBox.querySelector('.tippy-content');
                  if (content) {
                    content.style.backgroundColor = '#001a23';
                    content.style.background = '#001a23';
                    content.style.borderRadius = '30px';
                  }
                }
              };
              applyStyles();
            },
            onShow(instance) {
              // Close other tooltips when opening a new one
              hotspotElements.forEach(el => {
                if (el !== element && el._tippy) {
                  el._tippy.hide();
                }
              });
              
              // Force background color and rounded borders with JavaScript immediately
              const applyStyles = () => {
                const tippyBox = instance.popper.querySelector('.tippy-box');
                if (tippyBox) {
                  tippyBox.style.backgroundColor = '#001a23';
                  tippyBox.style.background = '#001a23';
                  tippyBox.style.borderRadius = '30px';
                  tippyBox.style.padding = '24px';
                  tippyBox.style.boxShadow = '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(130, 189, 237, 0.3), inset 0 1px 0 rgba(130, 189, 237, 0.1)';
                  tippyBox.style.zIndex = '30';
                  
                  // Also set on the content wrapper
                  const content = tippyBox.querySelector('.tippy-content');
                  if (content) {
                    content.style.backgroundColor = '#001a23';
                    content.style.background = '#001a23';
                    content.style.borderRadius = '30px';
                  }
                  
                  // And on the feature tooltip
                  const featureTooltip = tippyBox.querySelector('.feature-tooltip');
                  if (featureTooltip) {
                    featureTooltip.style.backgroundColor = '#001a23';
                    featureTooltip.style.background = '#001a23';
                    featureTooltip.style.color = '#fcfffd';
                  }
                  
                  // Style the list container
                  const listContainer = tippyBox.querySelector('.feature-tooltip ul');
                  if (listContainer) {
                    listContainer.style.background = 'rgba(39, 71, 83, 0.3)';
                    listContainer.style.borderRadius = '20px';
                    listContainer.style.border = '1px solid rgba(130, 189, 237, 0.3)';
                    listContainer.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.2)';
                    listContainer.style.padding = '24px';
                    listContainer.style.margin = '16px 0';
                  }
                  
                  // Style heading and text colors
                  const heading = tippyBox.querySelector('.feature-tooltip h4');
                  if (heading) {
                    heading.style.color = '#fcfffd';
                    heading.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
                  }
                  
                  const paragraph = tippyBox.querySelector('.feature-tooltip p');
                  if (paragraph) {
                    paragraph.style.color = '#e8f1f2';
                  }
                  
                  // Style list items
                  const listItems = tippyBox.querySelectorAll('.feature-tooltip li');
                  listItems.forEach(item => {
                    item.style.color = '#e8f1f2';
                    item.style.padding = '0';
                    item.style.fontSize = '14px';
                    item.style.fontWeight = '400';
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    
                    // Add tick mark
                    if (!item.querySelector('.tick-mark')) {
                      const tickMark = document.createElement('span');
                      tickMark.className = 'tick-mark';
                      tickMark.innerHTML = '✓';
                      tickMark.style.color = '#059669';
                      tickMark.style.fontSize = '16px';
                      tickMark.style.fontWeight = '700';
                      tickMark.style.marginRight = '12px';
                      tickMark.style.flexShrink = '0';
                      item.insertBefore(tickMark, item.firstChild);
                    }
                  });
                }
              };
              
              // Apply styles immediately and also after a tiny delay to ensure DOM is ready
              applyStyles();
              setTimeout(applyStyles, 0);
            }
          });
        }
      });

      // Cleanup function
      return () => {
        hotspotElements.forEach(element => {
          if (element._tippy) {
            element._tippy.destroy();
          }
        });
      };
    }
  }, [isInView, hotspots]);

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
            Discover Our Craftsmanship
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-secondary">
            Explore the details that make Eden furniture exceptional. Click on the highlighted features to learn more.
          </p>
        </motion.div>

        {/* Interactive Feature Image */}
        <motion.div
          ref={imageRef}
          className="relative flex justify-center w-full max-w-4xl mx-auto px-4"
          style={{ minHeight: '300px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/products/data/Sofa/ED-601/2.webp`}
              alt="Eden outdoor furniture showcasing premium features"
              className="rounded-lg object-contain"
              style={{ maxHeight: 'max(50vh, 400px)', width: 'auto', height: 'auto' }}
            />
            
            {/* Hotspots */}
            {hotspots.map((hotspot, index) => (
            <motion.button
              key={hotspot.id}
              className="hotspot absolute w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center text-white font-bold text-sm z-10"
              style={{ left: hotspot.x, top: hotspot.y, transform: 'translate(-50%, -50%)' }}
              data-hotspot={hotspot.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
              
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-accent opacity-20 animate-ping"></div>
            </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default About;