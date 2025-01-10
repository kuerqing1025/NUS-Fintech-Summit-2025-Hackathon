import React, { useState } from 'react';
import './Report.css';

const Report = ({ contractAddress, analysisResults }) => {
  const [expandedCode, setExpandedCode] = useState(null);

  const mockResults = {
    reentrancy: {
      risk: "High",
      details: "Multiple external calls detected without proper reentrancy guards",
      locations: ["function withdraw()", "function transferTokens()"],
      recommendation: "Implement ReentrancyGuard or ensure all state changes occur before external calls",
      codeSnippets: [
        `function withdraw() public {
    uint amount = balances[msg.sender];
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    balances[msg.sender] = 0;  // State change after external call
}`
      ]
    },
    overflow: {
      risk: "Medium",
      details: "Potential integer overflow in token calculations",
      locations: ["function mint()", "function _calculateRewards()"],
      recommendation: "Use SafeMath library or Solidity 0.8+ built-in overflow checks",
      codeSnippets: [
        `function _calculateRewards(uint256 amount) internal returns (uint256) {
    uint256 reward = amount * rewardRate;  // Potential overflow
    return reward;
}`
      ]
    },
    accessControl: {
      risk: "High",
      details: "Critical functions lack proper access controls",
      locations: ["function setAdmin()", "function upgradeTo()"],
      recommendation: "Implement role-based access control (RBAC) using OpenZeppelin's AccessControl",
      codeSnippets: [
        `function upgradeTo(address newImplementation) public {
    implementation = newImplementation;  // Missing access control
}`
      ]
    },
    logic: {
      risk: "Medium",
      details: "Economic vulnerabilities in reward distribution",
      locations: ["function distributeRewards()", "function calculateAPY()"],
      recommendation: "Implement rate limiting and maximum caps on reward distribution",
      codeSnippets: [
        `function distributeRewards() public {
    uint256 reward = calculateRewards();
    _mint(msg.sender, reward);  // No maximum cap
}`
      ]
    },
    flashloan: {
      risk: "High",
      details: "Contract vulnerable to flash loan attacks in price calculations",
      locations: ["function swapTokens()", "function calculatePrice()"],
      recommendation: "Implement time-weighted average prices (TWAP) and proper price manipulation checks",
      codeSnippets: [
        `function calculatePrice(address token) public view returns (uint256) {
    return getInstantaneousPrice(token);  // Vulnerable to manipulation
}`
      ]
    },
    frontRunning: {
      risk: "Medium",
      details: "Transactions susceptible to front-running attacks",
      locations: ["function executeOrder()", "function placeBid()"],
      recommendation: "Implement commit-reveal schemes or use a flash-bots protected RPC endpoint",
      codeSnippets: [
        `function placeBid(uint256 auctionId) public payable {
    require(msg.value > highestBid[auctionId]);  // Can be front-run
    highestBid[auctionId] = msg.value;
}`
      ]
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return '#FF4444';
      case 'medium':
        return '#FFB84D';
      case 'low':
        return '#4CAF50';
      default:
        return '#8B8B8B';
    }
  };

  const toggleCode = (key) => {
    setExpandedCode(expandedCode === key ? null : key);
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Security Analysis Report</h2>
        <p className="contract-address">Contract: {contractAddress}</p>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">High Risk Issues:</span>
            <span className="stat-value" style={{ color: '#FF4444' }}>3</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Medium Risk Issues:</span>
            <span className="stat-value" style={{ color: '#FFB84D' }}>3</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Analysis Time:</span>
            <span className="stat-value">2.3s</span>
          </div>
        </div>
      </div>

      <div className="vulnerabilities-grid">
        {Object.entries(mockResults).map(([key, data]) => (
          <div key={key} className="vulnerability-card">
            <div className="card-header" style={{ borderColor: getRiskColor(data.risk) }}>
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)} Vulnerability</h3>
              <span className="risk-badge" style={{ backgroundColor: getRiskColor(data.risk) }}>
                {data.risk} Risk
              </span>
            </div>
            <div className="card-content">
              <p><strong>Details:</strong> {data.details}</p>
              <div className="locations">
                <strong>Affected Locations:</strong>
                <ul>
                  {data.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>
              <p className="recommendation">
                <strong>Recommendation:</strong> {data.recommendation}
              </p>
              <button 
                className="view-code-button"
                onClick={() => toggleCode(key)}
              >
                {expandedCode === key ? 'Hide Code' : 'View Code'}
              </button>
              {expandedCode === key && (
                <div className="code-snippet">
                  <pre>
                    <code>{data.codeSnippets[0]}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;