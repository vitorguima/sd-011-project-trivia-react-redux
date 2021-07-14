import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => { this.checkInputs(); });
  }

  checkInputs() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            <input
              type="text"
              id="input-name"
              name="name"
              onChange={ (e) => this.handleChange(e) }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            <input
              type="text"
              id="input-email"
              onChange={ (e) => this.handleChange(e) }
              name="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}
