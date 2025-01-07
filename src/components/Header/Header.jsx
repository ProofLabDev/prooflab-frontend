import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>ProofLab</h1>
      <nav>
        <ul>
          <li>Leaderboard</li>
          <li>Compare</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 