import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: true,
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Google Form configuration
  const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdPGV2c4NqBOBa6al8ZCU0pjwLTX2XGf0rl_x3W0qpzFWsdyQ/formResponse";
  const ENTRY_IDS = {
    name: "entry.1094971945",
    email: "entry.324786647",
    contact: "entry.818926445", // For phone number
    subjectOptional: "entry.399041556", // For optional subject
    subjectRequired: "entry.1122105496", // For required field (we'll use this for message)
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numeric input
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate phone - must be exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Submitting your message...'
      });
      
      // Create FormData object for Google Form submission
      const form = new FormData();
      form.append(ENTRY_IDS.name, formData.name);
      form.append(ENTRY_IDS.email, formData.email);
      form.append(ENTRY_IDS.contact, formData.phone);
      form.append(ENTRY_IDS.subjectOptional, formData.subject || ''); // Optional field
      form.append(ENTRY_IDS.subjectRequired, formData.message); // Using message as required subject
      
      // Submit to Google Form
      fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: form,
      })
        .then(() => {
          // Success callback
          setFormStatus({
            submitted: true,
            success: true,
            message: 'Thank you for your message. We will contact you shortly!'
          });
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        })
        .catch((err) => {
          // Error callback
          console.error("Form submission error:", err);
          setFormStatus({
            submitted: true,
            success: false,
            message: 'There was an error submitting your message. Please try again later.'
          });
        });
    }
  };
  
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(130, 189, 237, 0.5)' },
    blur: { scale: 1, boxShadow: 'none' }
  };
  
  return (
    <div className="bg-white p-6 md:p-8 lg:p-10 shadow-lg">
      <h3 className="text-2xl font-display text-primary mb-6">Get In Touch</h3>
      
      {formStatus.submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded mb-6 ${
            formStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {formStatus.message}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                Your Name *
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.name ? 'border-red-500' : 'border-light-bg'
                } focus:outline-none`}
                whileFocus="focus"
                whileTap="focus"
                variants={inputVariants}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                Email Address *
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.email ? 'border-red-500' : 'border-light-bg'
                } focus:outline-none`}
                whileFocus="focus"
                whileTap="focus"
                variants={inputVariants}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1">
                Phone Number *
              </label>
              <motion.input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full p-3 border ${
                  errors.phone ? 'border-red-500' : 'border-light-bg'
                } focus:outline-none`}
                whileFocus="focus"
                whileTap="focus"
                variants={inputVariants}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1">
                Subject
              </label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-light-bg focus:outline-none"
                whileFocus="focus"
                whileTap="focus"
                variants={inputVariants}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">
              Your Message *
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.message ? 'border-red-500' : 'border-light-bg'
              } focus:outline-none`}
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
              required
            ></motion.textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>
          
          <motion.button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-medium hover:bg-secondary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;