import React, { useState } from "react";
import "./Home.css";
import Report from "../Report/Report";

const Home = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleDecompile = () => {
    if (contractAddress.trim()) {
      setShowReport(true);
    }
  };

  if (showReport) {
    return <Report contractAddress={contractAddress} />;
  }

  return (
    <div className="main-container">
      <h1>Welcome to ScanGuard</h1>
      <p>
        Experience the future of smart contract security. Our advanced Scanning
        technology ensures your contracts are safe and secure.
      </p>
      <img src="src/assets/logo.png" alt="ScanGuard Logo" />
      <div className="upload">
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Enter Network Address or Bytecode"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </div>
        <button className="decompile-button" onClick={handleDecompile}>
          Decompile
        </button>
        <p>
          Input your smart contract address to start the analysis process and
          ensure its security.
        </p>
      </div>
    </div>
  );
};

export default Home;
