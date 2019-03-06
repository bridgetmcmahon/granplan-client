import React, { Component } from 'react';
import firebase from '../../Firebase';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }

    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user.displayName,
        });
      }
    });
  }

  render() {
    const messages = this.props.messages;

    return (
      <div className="messages">
        { Object.keys(messages).map((key) => (
          <div className={ this.state.currentUser === messages[key].sender ? "message user-message" : "message" }>
            <p className="sender-text">{ messages[key].sender }</p>
            <p key={ key }>{ messages[key].message }</p>
          </div> )
        ) }
      </div>
    );
  }
}

export default Messages;
