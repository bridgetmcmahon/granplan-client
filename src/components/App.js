import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './layout/Nav';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Appointments from './appointments/Appointments';
import AppointmentForm from './appointments/AppointmentForm';
import NotFound from './pages/NotFound';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
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
