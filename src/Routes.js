import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Appointments from './components/appointments/Appointments';
import AppointmentForm from './components/appointments/AppointmentForm';
import NotFound from './components/pages/NotFound';

export const Routes = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/appointments" component={ Appointments } />
        <Route exact path="/appointments/new" component={ AppointmentForm } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  </Router>
)

export default Routes;
