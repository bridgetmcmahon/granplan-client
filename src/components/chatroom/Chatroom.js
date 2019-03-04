import React, { Component } from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';
import firebase from '../../Firebase';

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
    }
  }

  checkForUser() {
    firebase.auth().onAuthStateChanges((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    const messagesData = firebase.database().ref().child('messages');
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
