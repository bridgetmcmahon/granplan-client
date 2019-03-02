import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import '../../App.css';

class Nav extends Component {
  render() {
    return (
        <nav className="nav-bar">
          <div className="container">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
            </div>
        </nav>
    );
  }
}

export default Nav;
