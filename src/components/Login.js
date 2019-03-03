import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import fire from '../Firebase';
import Nav from './layout/Nav';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="form">
        <Nav />
        <div className="container">
          <h2>Log In:</h2>
          <form onSubmit={ this.login }>
              <input
                value={ this.state.email }
                type="email"
                name="email"
                placeholder="Email"
                onChange={ this._handleChange }
              />
              <input
                value={ this.state.password }
                type="password"
                name="password"
                placeholder="Password"
                onChange={ this._handleChange }
              />
            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
