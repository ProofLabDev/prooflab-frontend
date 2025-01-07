import React from 'react';
import Header from './components/Header/Header';
import LeaderboardTable from './components/LeaderboardTable/LeaderboardTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <LeaderboardTable />
      </main>
    </div>
  );
}

export default App; 