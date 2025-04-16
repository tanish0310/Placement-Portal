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