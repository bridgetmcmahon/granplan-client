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

  isFormValid = ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      this.setState({
        errors: 'Please fill in both fields',
      });
    }
  }

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
          this.props.history.push('/appointments');

        }).catch( (err) => {
          console.log(err.message);
          this.setState({
            email: '',
            password: '',
            errors: '' + err.message,
            loading: false,
          });
        })
    }
  }

  render() {
    const { email, password, errors, loading } = this.state;
    console.log('render');

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
            <div className="error">
              <h3>Error</h3>
              <p>{ errors }</p>
            </div>
          ) }

          <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    );
  }
}

export default Login;
