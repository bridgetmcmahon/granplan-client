import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user.displayName,
        })
      }
    })
  }

  render() {
    const { currentUser } = this.state;

    return (
        <div className="home-component">
          <div>
            <h1>Welcome to Granplan</h1>
            <h2>The app that helps family with rostering elderly and parental care.</h2>
          </div>
          { currentUser ? (
            <div>
              <div className="home-buttons hero hero-appointments">
                <Link to={'/appointments'}>View Appointments</Link>
              </div>
              <div className="home-buttons hero hero-chatroom">
                <Link to={'/chatroom'}>View Messages</Link>
              </div>
            </div>
          ) : (
            <div className=" hero home-buttons">
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </div>
          ) }
        </div>
    );
  }
}

export default Home;
