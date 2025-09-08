import React, { useState } from 'react';
import './Navbar.css';
import myLogo from '../logo.png'; // 👈 UPDATE THIS PATH

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('About Us');
  const navLinks = ['Home', 'Modules', 'Contact Us', 'About Us', 'Register Farm', 'Sign In'];

  return (
    <nav className="navbar-sticky">
      <div className="navbar-container">
        {/* --- CHANGE THIS SECTION --- */}
        {/* 2. Use the imported logo in an <img> tag. */}
        <a href="/" className="navbar-logo">
           <img src={myLogo} alt="Company Logo" /> {/* 👈 USE YOUR LOGO HERE */}
        </a>

        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li 
              key={link} 
              className="nav-item"
              onClick={() => setActiveLink(link)}
            >
              <a 
                href={`#${link.toLowerCase().replace(' ', '-')}`} 
                className={activeLink === link ? 'nav-link active' : 'nav-link'}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;