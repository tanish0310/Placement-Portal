import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LandingPage from "./LandingPage";
const Home = () => {
  return (
    <div>
      <LandingPage />
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
