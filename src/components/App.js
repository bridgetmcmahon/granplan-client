import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from '../Firebase';

import Nav from './layout/Nav';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Appointments from './appointments/Appointments';
import AppointmentForm from './appointments/AppointmentForm';
import NotFound from './pages/NotFound';
import Footer from './layout/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userLoggedIn: true,
        });

        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav userLoggedIn={ this.state.userLoggedIn } />
          <div className="container">
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/appointments" component={ Appointments } />
              <Route exact path="/appointments/new" component={ AppointmentForm } />
              <Route component={ NotFound } />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
