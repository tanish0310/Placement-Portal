import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Placement Portal</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/about">
          About Us
        </Link>
        <Link className="nav-link" to="/contact">
          Contact Us
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
