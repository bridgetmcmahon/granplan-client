import React, { Component } from 'react';

class Messages extends Component {
  render() {
    const messages = this.props.messages;

    return (
      <div className="messages">
        { Object.keys(messages).map((key) => (
          <div className="message">
            <p className="sender-text">{ messages[key].sender }</p>
            <p key={ key }>{ messages[key].message }</p>
          </div> )
        ) }
      </div>
    );
  }
}

export default Messages;
