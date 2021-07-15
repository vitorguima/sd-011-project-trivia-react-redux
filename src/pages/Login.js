import React, { Component } from 'react';

// const recevedEmail = new RegExp('^[^\s@]+@[^\s@]+$');
const recevedEmail = new RegExp('^[^s@]+@[^s@]+$');

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangeButton() {
    const { email, name } = this.state;

    if (recevedEmail.test(email) && name.length !== 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div>
        <form>
          {/* Input para o nome */}
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              value={ name }
              onChange={ this.handleChangeName }
              data-testid="input-player-name"
              onKeyUp={ this.handleChangeButton }
            />
          </label>

          {/* Input para o email */}
          <label htmlFor="name">
            Email:
            <input
              type="Email"
              id="email"
              value={ email }
              onChange={ this.handleChangeEmail }
              data-testid="input-gravatar-email"
              onKeyUp={ this.handleChangeButton }
            />
          </label>
        </form>
        <button
          disabled={ isDisabled }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
