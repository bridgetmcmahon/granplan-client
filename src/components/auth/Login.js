import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import fire from '../../Firebase';

class Login extends Component {
  constructor(props) {
    super(props);
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
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u)
      }).catch((error) => {
        this.setState({
          message: error.message,
        });
      });

    this.props.history.push('/appointments');
  }

  render() {
    return (
      <div className="form">
        <div className="container">
          <h2>Log In:</h2>
          <form onSubmit={ this.login }>
            <p>{ this.state.message }</p>
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
