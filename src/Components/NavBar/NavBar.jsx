import React, { useState } from "react";
import "./NavBar.css";
const NavBar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <img src="src/assets/demo_logo.jpg" alt="" className="logo" />
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("check-report")}
          className={menu === "check-report" ? "active" : ""}
        >
          Check Report
        </li>
        <li
          onClick={() => setMenu("settings")}
          className={menu === "settings" ? "active" : ""}
        >
          Settings
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
