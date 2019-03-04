import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
      loading: false,
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
          });
        })
        .then(() => {
          this.setState({
            loading: false
          });
        }).catch((err) => {
          console.error(err);
          this.setState({
            errors: err,
            loading: false,
          });
        })
    }
  }

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;

    return (
      <div className="container">
      <h2>Register:</h2>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon textAlign="center">
            </Header>
            <Form onSubmit={ this._handleSubmit }>
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={ this._handleChange }
                  value={ username }
                  type="text"
                />

                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  onChange={ this._handleChange }
                  value={ email }
                  type="email"
                />

                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={ this._handleChange }
                  value={ password }
                  type="password"
                />

                <Form.Input
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  onChange={ this._handleChange }
                  value={ passwordConfirmation }
                  type="password"
                />

                <Button
                  disabled={ loading }
                  className={ loading? 'loading' : '' }
                  fluid
                  size="large"
                >
                  Submit
                </Button>
              </Segment>
            </Form>

            { errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                <p>{ errors }</p>
              </Message>
            ) }

            <Message>Already a User? <Link to="/login">Login</Link></Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
