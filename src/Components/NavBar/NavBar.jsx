import React from "react";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="navbar">
      <img src="src/assets/demo_logo.jpg" alt="" className="logo" />

      <ul>
        <li>Home</li>
        <li>Check Report</li>
        <li>Settings</li>
        <li>Contact Us</li>
      </ul>
    </div>
  );
};

export default NavBar;
