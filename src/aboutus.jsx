import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import "./aboutUs.css";
import roadmapImg from "../RoadMap.png";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FscGVzaHBhbGl3YWwxOCIsImEiOiJjbWN5N2ZmdzYwbGN5MmpxeG14dGN4cTU0In0.oDnD8HayIN6-31rOcPmGbg';

export default function AboutUs() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: [76.3869, 30.3398], // Longitude, Latitude of your address
      zoom: 15,
    });

    new mapboxgl.Marker()
      .setLngLat([77.7192, 12.9352])
      .addTo(map);

    return () => map.remove();
  }, []);

  // Framer Motion variants for the continuous scroll
  const scrollVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Adjust duration to change scroll speed
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="aboutus-container">

      {/* Full-width YouTube Video */}
<section className="video-section">
  <div className="video-container">
    <iframe
      width="100%"
      height="500"
      src="https://www.youtube.com/embed/MBIRHQZ2E2k"
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</section>

      {/* Quotes Section */}
      <section className="quotes-section">
        <div className="quotes-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="quotes-content"
          >
            <span className="quote-mark-start">“</span>
            <p className="quotes-text-main">
             From training modules to real-time alerts, our platform bridges knowledge and action, helping smallholders implement biosecurity measures effectively and sustainably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Scrolling Banner */}
<section className="scroll">
        <div className="scrolling-banner-container">
        <motion.div
          className="scrolling-banner"
          variants={scrollVariants}
          animate="animate"
        >
          <div className="banner-item">
            <img src="../hen.webp" alt="egg icon" className="banner-icon" />
            <span className="banner-text">FARM FORTRESS</span>
          </div>
          <div className="banner-item">
            <img src="../egg.png" alt="egg icon" className="banner-icon" />
            <span className="banner-text bold">FARM FORTRESS</span>
          </div>
          <div className="banner-item">
            <img src="../hen.webp" alt="egg icon" className="banner-icon" />
            <span className="banner-text">FARM FORTRESS</span>
          </div>
          <div className="banner-item">
            <img src="../egg.png" alt="egg icon" className="banner-icon" />
            <span className="banner-text bold">FARM FORTRESS</span>
          </div>
          {/* Duplicate the content to create a seamless loop */}
          <div className="banner-item">
            <img src="../hen.webp" alt="egg icon" className="banner-icon" />
            <span className="banner-text">FARM FORTRESS</span>
          </div>
          <div className="banner-item">
            <img src="../egg.png" alt="egg icon" className="banner-icon" />
            <span className="banner-text bold">FARM FORTRESS</span>
          </div>
        </motion.div>
      </div>
</section>

    {/* Project Journey Map */}
<section className="journey-section">
  <div className="journey-container">
    {/* Left side - elegant heading */}
   <div className="journey-left">
  <h2 className="journey-title">
    THE <span className="highlight">FARM FORTRESS</span> JOURNEY
  </h2>
  <p className="journey-text">
    Stronger <span className="highlight">farms</span>, healthier <span className="highlight">animals</span>, and safer <span className="highlight">food</span>. By making biosecurity accessible and actionable, we build resilience from the farm level to national preparedness.
    To protect our national food security, we need timely, reliable data from the ground up. This portal provides an unprecedented, real-time view into farm-level biosecurity, enabling us to create data-driven policies, manage disease surveillance effectively, and build a truly resilient livestock economy.
    <br></br><br></br> <h3>Smart <span className="highlight">Biosecurity</span>. Healthy <span className="highlight">farms</span>. Secure <span className="highlight">Future</span>.</h3>
  </p>
</div>


    {/* Right side - image */}
    <div className="journey-right">
      <img src={roadmapImg} alt="Our Method" className="journey-image" />
    </div>
  </div>
</section>


{/* Changing the Game */}
<section className="game-section">
  <div className="game-container">
    {/* Left side */}
    <div className="game-left">
      <h2 className="section-heading">Changing the Game</h2>
      <p className="game-text">
        We are not just another poultry farm. We are redefining the way people
      consume food — focusing on sustainability, transparency, and
      technology-driven farming. <br /><br />
      With our <strong>digital software platform</strong>, we integrate smart feed 
      monitoring, automated health tracking of poultry, and data-driven farm 
      management. This software-first approach is transforming poultry farming 
      into a modern, efficient, and scalable ecosystem — ensuring healthier produce 
      and greater trust for our consumers.Our vision is to build a fully connected poultry ecosystem where every 
      process — from feed to farm management — is digitally empowered.
      </p>
    </div>

    {/* Right side - stats boxes */}
    <div className="game-right">
      <div className="stat-box">
        <h3>150+</h3>
        <p>Local Poultry Partners</p>
      </div>
      <div className="stat-box">
        <h3>2000+</h3>
        <p>Happy Farmers</p>
      </div>
      <div className="stat-box">
        <h3>10000+</h3>
        <p>Healthy Chickens</p>
      </div>
      <div className="stat-box">
        <h3>50+</h3>
        <p>Sustainable Farming Units</p>
      </div>
    </div>
  </div>
</section>


      {/* Get In Touch Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Info */}
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="contact-heading">Get In Touch</h2>
            <p className="contact-subheading">Head Office</p>

            <div className="contact-item">
              <p className="contact-address-text">
                <b>Farm Fortress</b><br />
                No. 55 Sy No 8 to 14 I & J Block - Ground Floor, Embassy Tech Village<br />
                Outer Ring Road,Bahadur Road,Patiala,147004.
              </p>
            </div>

            <div className="contact-link">
              <i className="bi bi-whatsapp contact-icon-link"></i>
              <a href="#" className="get-location-link">Get Location</a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="contact-map"
            ref={mapContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Poultry Farm. All Rights Reserved.</p>
        <div className="footer-icons">
          <a href="#"><Facebook size={22} /></a>
          <a href="#"><Twitter size={22} /></a>
          <a href="#"><Instagram size={22} /></a>
          <a href="#"><Mail size={22} /></a>
        </div>
      </footer>
    </div>
  );
}