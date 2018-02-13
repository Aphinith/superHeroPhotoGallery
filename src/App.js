import React, { Component } from 'react';
import SuperHeroesList from './SuperHeroesList';
import logo from './logo.svg';
import marvelLogo from './marvel-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Super Hero Photo Gallery</h1>
          <img src={marvelLogo} className="marvel-logo" alt="logo" />
        </header>
        <SuperHeroesList />
      </div>
    );
  }
}

export default App;
