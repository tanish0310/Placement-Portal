import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Placement Portal</div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-icon">&#9776;</span>
      </button>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link className="nav-link" to="/about" onClick={() => setIsOpen(false)}>
          About Us
        </Link>
        <Link className="nav-link" to="/contact" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>
        <Link className="nav-link" to="/login" onClick={() => setIsOpen(false)}>
          Login
        </Link>
        <Link
          className="nav-link nav-btn"
          to="/signup"
          onClick={() => setIsOpen(false)}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;