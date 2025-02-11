import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:jujitsu.stephane@live.fr?subject=${encodeURIComponent('Contact Form Submission')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-form-container">
      <h2>Contactez-Nous</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ContactForm;
