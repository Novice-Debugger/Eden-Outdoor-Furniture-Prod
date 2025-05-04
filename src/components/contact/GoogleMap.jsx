import React from 'react';

const GoogleMap = () => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-light-bg">
      {/* 
        In a production environment, you would use your own Google Maps API key.
        For demonstration purposes, we're embedding a simple iframe map.
        
        In a real application, you might use:
        - @react-google-maps/api
        - google-map-react
        - Or similar libraries
      */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.84494910413!2d73.138588!3d22.283862499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc721c5104857%3A0x5963ecbe33f6abd4!2sEden%20outdoor%20furniture!5e0!3m2!1sen!2sin!4v1746337475329!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 'inherit' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Eden Outdoor Furniture Location"
      ></iframe>
    </div>
  );
};

export default GoogleMap;