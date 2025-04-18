import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">
          We're here to help you with any questions or inquiries. Reach out to us
          via the form below or through our contact details.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>
              <span className="highlight">Email:</span>{" "}
              support@placementpulse.com
            </p>
            <p>
              <span className="highlight">Phone:</span> +91 9876543210
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="button" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;