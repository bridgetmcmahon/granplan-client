import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';

export const Routes = {
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
    </div>
  </Router>
}

export default Routes;
