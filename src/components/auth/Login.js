import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  }

  isFormValid = ({ email, password }) => email && password;

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    if (this.isFormValid(this.state)) {
      this.setState({
        errors: '',
        loading: true,
      });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( (signedInUser) => {
          console.log(signedInUser);
        }).catch( (err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          })
        })
      this.props.history.push('/appointments');
    }
  }

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div className="small-container">
        <h2>Login:</h2>
          <form onSubmit={ this._handleSubmit } className="form">
            <input
              name="email"
              placeholder="Email"
              onChange={ this._handleChange }
              value={ email }
              type="email"
            />

            <input
              name="password"
              placeholder="Password"
              onChange={ this._handleChange }
              value={ password }
              type="password"
            />

            <button
              disabled={ loading }
              className={ loading ? 'loading submit' : 'submit' }
            >
              Submit
            </button>
          </form>

          { errors.length > 0 && (
            <p className="error">
              <h3>Error</h3>
              <p>{ errors }</p>
            </p>
          ) }

          <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    );
  }
}

export default Login;
