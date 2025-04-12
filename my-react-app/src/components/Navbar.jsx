import React from "react";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Placement Portal</h1>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>Jobs</li>
        <li>Companies</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
