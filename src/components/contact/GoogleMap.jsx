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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.6866879208393!2d-80.19149492392734!3d25.783898077777578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6823bb65e03%3A0x83e8b78bf34f69e1!2sMiami%20Design%20District!5e0!3m2!1sen!2sus!4v1706706010000!5m2!1sen!2sus"
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