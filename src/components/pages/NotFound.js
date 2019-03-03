import React from 'react';
import Nav from '../layout/Nav';

export default () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <h1>404 Page Not Found</h1>
        <p>Sorry! That pages does not exist</p>
      </div>
    </div>
  );
}
