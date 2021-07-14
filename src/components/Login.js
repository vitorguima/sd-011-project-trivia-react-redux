import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      status: true,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.ableButton = this.ableButton.bind(this);
  }

  handleChangeName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    }, () => this.ableButton());
  }

  handleChangeEmail({ target }) {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.ableButton());
  }

  ableButton() {
    const { name, email } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (name !== '' && regex.test(email)) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <input
          type="name"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handleChangeName }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChangeEmail }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ status }
        >
          Jogar
        </button>
      </div>
    );
  }
}
