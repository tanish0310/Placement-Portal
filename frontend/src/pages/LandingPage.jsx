import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="landing-overlay">
        <div className="content-box">
          <h1 className="heading">Welcome to Placement Portal</h1>
          <p className="subheading">Your gateway to career opportunities</p>
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;