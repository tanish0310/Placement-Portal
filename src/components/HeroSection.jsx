import React from "react";
import "../styles.css";

const HeroSection = () => {
  return (
    <section className="hero bg-blue-500 text-white text-center py-20">
      <h1 className="text-4xl font-bold">Welcome to Placement Portal</h1>
      <p className="mt-4 text-lg">Find your dream job with ease</p>
      <button className="mt-6 bg-white text-blue-500 px-6 py-2 rounded-full font-semibold">
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
