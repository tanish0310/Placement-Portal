import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/IIIT_allh.jpg";

function LandingPage() {
  return (
    <div
      className="landing-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <nav className="navbar">
        <div className="logo">Placement Pulse</div>
        <div className="nav-links">
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
      <div className="landing-overlay">
        <div className="content-box">
          <h1 className="heading">Welcome to the Placement Portal</h1>
          <p className="subheading">Your gateway to career opportunities</p>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;