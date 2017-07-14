import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{textAlign:"center"}}>Country Borders</h1>
        <Chart />
      </div>
    );
  }
}

export default App;
