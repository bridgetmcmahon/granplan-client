import React, { Component } from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';
import firebase from '../../Firebase';

class Chatroom extends Component {
  state = {
    messages: [],
    user: null,
  }

  checkForUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.displayName })
      } else {
        this.setState({ user: null })
        this.props.history.push('/login');
      }
    });
  }

  componentDidMount() {
    this.fetchMessages();
    this.checkForUser();
  }

  fetchMessages = () => {
    let loadNumber = 20
    // TO DO = LOAD EARLIER MESSAGES FUNCTION

    const messagesData = firebase.database().ref().child('messages').limitToLast(loadNumber);
    messagesData.on('value', (snapshot) => {
      this.setState({
        messages: snapshot.val(),
      });
    });
  }

  sendMessage = (text) => {
    const messagesData = firebase.database().ref().child('messages');
    messagesData.push({
      message: text,
      sender: this.state.user
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Chatroom</h1>
        <div className="chatroom">
          <Messages messages={ this.state.messages } />
          <MessageForm sendMessage={ this.sendMessage }/>
        </div>
      </div>
    );
  }
}

export default Chatroom;
