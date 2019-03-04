import React, { Component } from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: {},
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Chatroom</h1>
        <div className="chatroom">
          <Messages messages={ this.state.messages } />
          <MessageForm />
        </div>
      </div>
    );
  }
}

export default Chatroom;
