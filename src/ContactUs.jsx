import React, { useState, useRef } from "react";
import "./ContactUs.css";
export default function ContactUs() {
  const initialState = { name: "", email: "", phone: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  const validators = {
    name: (val) => val.trim() !== "",
    email: (val) => /\S+@\S+\.\S+/.test(val.trim()),
    message: (val) => val.trim() !== "",
  };

  function validate() {
    const newErrors = {};
    if (!validators.name(formData.name)) newErrors.name = "Name is required.";
    if (!validators.email(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!validators.message(formData.message)) newErrors.message = "Message is required.";
    return newErrors;
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Real-time error clearing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid input
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
    } else {
      alert("Thank you! Your message has been sent successfully.");
      setFormData(initialState);
      setErrors({});
      if (nameRef.current) nameRef.current.focus();
    }
  }

  return (
    <section className="contact-section" aria-label="Contact Us Section">
      <div className="contact-container">
        {/* Left: Form */}
        <div className="contact-form-side">
          <h2 className="form-title">Ask Us Anything Here</h2>
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            noValidate
            aria-describedby="formInstructions"
          >
            <p id="formInstructions" className="sr-only">
              Please fill in the form with your name, email, phone (optional), and message.
            </p>

            {/* Name */}
            <div className={`form-group ${errors.name ? "invalid" : ""}`} id="group-name">
              <label htmlFor="name" className="form-label">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="e.g. Robert Smith"
                aria-required="true"
                aria-describedby="error-name"
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
              />
              {errors.name && (
                <div className="invalid-feedback" id="error-name" role="alert">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className={`form-group ${errors.email ? "invalid" : ""}`} id="group-email">
              <label htmlFor="email" className="form-label">
                Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="e.g. example@mail.com"
                aria-required="true"
                aria-describedby="error-email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback" id="error-email" role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone (optional) */}
            <div className="form-group" id="group-phone">
              <label htmlFor="phone" className="form-label">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="+91 9876543210"
                aria-required="false"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className={`form-group ${errors.message ? "invalid" : ""}`} id="group-message">
              <label htmlFor="message" className="form-label">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="5"
                placeholder="Leave your message here"
                aria-required="true"
                aria-describedby="error-message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <div className="invalid-feedback" id="error-message" role="alert">
                  {errors.message}
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn" aria-label="Send Message">
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div
          className="contact-info-side"
          role="complementary"
          aria-label="Contact Information"
        >
          <div className="contact-info">
            <h3>Contact Info</h3>
            <p>
              <strong>Farm Fortress HQ</strong>
            </p>
            <p>Poultry Farm, Village Road, Rajasthan - 313001</p>
            <hr className="contact-divider" />
            <h5>Call Us</h5>
            <p>+91 98765 43210</p>
            <p>+91 91234 56789</p>
            <hr className="contact-divider" />
            <h5>Mail Us</h5>
            <p>info@farmfortress.com</p>
            <p>support@farmfortress.com</p>
            <hr className="contact-divider" />
            <h5>Social Networks</h5>
            <div className="social-icons">
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <i className="bi bi-facebook social1" />
              </a>
              <a className="social2"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Twitter"
              >
                <i className="bi bi-twitter" />
              </a>
              <a className="social3"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a className="social4"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
              >
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}