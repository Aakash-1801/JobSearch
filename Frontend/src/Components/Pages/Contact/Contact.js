import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        We'd love to hear from you! Whether you're a job seeker or recruiter, feel free to reach out.
      </p>

      <div className="contact-content">
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> support@jobconnect.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Bangalore, India</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
