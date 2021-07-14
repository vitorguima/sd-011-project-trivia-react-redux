import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const { target: {name, value }} = event
    this.setState({
      [name]: value,
    });
  }

  render() {
    const isDisabled = this.state.name.length === 0 || this.state.email.length === 0
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              id="name"
              required
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              required
              onChange={ this.handleOnChange }
            />
          </label>
          <button data-testid="btn-play" type="button" disabled={isDisabled}>
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
