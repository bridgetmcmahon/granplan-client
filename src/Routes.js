import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Appointments from './components/appointments/Appointments';
import AppointmentForm from './components/appointments/AppointmentForm';

export const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/appointments" component={ Appointments } />
      <Route exact path="/appointments/new" component={ AppointmentForm } />
    </div>
  </Router>
)

export default Routes;
