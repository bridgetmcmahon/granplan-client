import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users'),
    };
  }

  isFormValid = () => {
    if (this.isFormEmpty(this.state)) {
      this.setState({
        errors: 'Fill in all fields'
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      this.setState({
        errors: 'Password is not valid'
      });
      return false;
    } else {
      return true; // form is valid
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (!username.length || !email.length || !password.length || !passwordConfirmation.length);
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    if (this.isFormValid()) {
      this.setState({
        errors: '',
        loading: true,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user.updateProfile({
            displayName: this.state.username,
          })
          .then(() => {
            this.saveUser(createdUser).then(() => {
              console.log('user saved');
            })
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              errors: this.state.errors.concat(err),
              loading: false,
            })
          })
        }).catch((err) => {
          console.error(err);
          this.setState({
            errors: err,
            loading: false,
          });
        })
    }
  }

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName
    })
  }

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;

    return (
      <div className="container">
      <h2>Register:</h2>
            <form onSubmit={ this._handleSubmit } className="form">
                <input
                  name="username"
                  placeholder="Username"
                  onChange={ this._handleChange }
                  value={ username }
                  type="text"
                />

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

                <input
                  name="passwordConfirmation"
                  placeholder="Password Confirmation"
                  onChange={ this._handleChange }
                  value={ passwordConfirmation }
                  type="password"
                />

                <button
                  disabled={ loading }
                  className={ loading ? 'loading' : '' }
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

            <p>Already a User? <Link to="/login">Login here</Link></p>
      </div>
    );
  }
}

export default Register;
