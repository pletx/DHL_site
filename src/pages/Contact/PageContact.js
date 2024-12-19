import React from 'react';
import ContactForm from '../../components/ContactForm';
import './PageContact.css';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page">
      <ContactForm />
      <div className="social-links">
        <h3>Suivez-nous</h3>
        <a href="https://www.facebook.com/CgtDhlExpressIntl" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaFacebook />
          Facebook
        </a>
        <a href="https://chat.whatsapp.com/Bpp6yRJDqyL0ENFxmC23iq" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaWhatsapp />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
