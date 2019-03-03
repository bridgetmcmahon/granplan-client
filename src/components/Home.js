import React, { Component } from 'react';
import Nav from './layout/Nav';

class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <h1>Welcome to Granplan</h1>
        </div>
      </div>
    );
  }
}

export default Home;
