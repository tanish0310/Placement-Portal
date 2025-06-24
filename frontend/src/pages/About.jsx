import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <h1 className="title">About Placement Portal</h1>
      <p className="description">
        Welcome to <span className="highlight">Placement Portal</span>, your
        ultimate solution for seamless placement management. Our platform
        combines <span className="highlight">cutting-edge technology</span> with
        an intuitive interface to empower students, recruiters, and
        administrators alike. Whether you're a student preparing for your dream
        job or an administrator organizing placements,{" "}
        <span className="highlight">Placement Portal</span> is here to simplify
        the process.
      </p>
      <button className="btn">Learn More</button>
    </section>
  );
};

export default About;
