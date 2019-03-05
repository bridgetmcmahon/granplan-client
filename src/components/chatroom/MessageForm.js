import React, { Component } from 'react';

class MessageForm extends Component {
  state = {
    message: '',
  }

  _handleInput = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    this.props.sendMessage(this.state.message);

    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit } className=" message-form">
        <input
          type="text"
          onChange={ this._handleInput }
          placeholder="Send a message..."
          value={ this.state.message }
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default MessageForm;
