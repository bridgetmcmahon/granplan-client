import React, { Component } from 'react';

class Messages extends Component {
  render() {
    const messages = this.props.messages;

    return (
      <div className="messages">
        { Object.keys(messages).map((key) => <p key={ key }>{ messages[key].sender }: { messages[key].message }</p>) }
      </div>
    );
  }
}

export default Messages;
