import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="main-container">
      <h1>Welcome to ScanGuard</h1>
      <p>
        Experience the future of smart contract security. Our advanced Scanning
        technology ensures your contracts are safe and secure.
      </p>
      <img src="src/assets/scanguard_logo.jpg" alt="" />
      <div className="upload">
        <h2>Upload Your Smart Contract</h2>
        <input type="text" />
        <p>
          Upload your smart contract file to start the analysis process and
          ensure its security.
        </p>
      </div>
    </div>
  );
};

export default Home;
