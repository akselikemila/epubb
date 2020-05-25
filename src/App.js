import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World!
        </a>
      </header>
      <div className="App-sidebar">
        <ul>
          <li><a href="https://yle.fi/">Hello</a></li>
          <li><a href="file:///c:/WINDOWS/clock.avi">World</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
