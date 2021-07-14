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
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const isDisabled = name.length === 0 || email.length === 0;
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
<<<<<<< HEAD
          <button data-testid="btn-play" type="button" disabled={ isDisabled }>
=======
          <button data-testid="btn-play" type="button" disabled={isDisabled}>
>>>>>>> 314c39cc27738bcc3ff082ec63c96dbf05f85810
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
