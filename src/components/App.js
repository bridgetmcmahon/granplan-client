import React, { Component } from 'react';
import Nav from './layout/Nav';
import Appointments from './appointments/Appointments';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="container">
          <h1>Granplan</h1>
          <Appointments />
        </div>
      </div>
    );
  }
}

export default App;
