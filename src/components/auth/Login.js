import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false,
    };
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
    }
  }

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div className="container">
      <h2>Login:</h2>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon textAlign="center">
            </Header>
            <Form onSubmit={ this._handleSubmit }>
              <Segment stacked>

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

            <Message>Don't have an account? <Link to="/register">Register here</Link></Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
