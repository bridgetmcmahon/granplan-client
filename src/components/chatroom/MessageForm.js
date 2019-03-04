import React, { Component } from 'react';

class MessageForm extends Component {
  render() {
    return (
      <form>
        <input type="text" />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default MessageForm;
