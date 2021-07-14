import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      btnDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, () => {
      console.log(value);
      if (this.verifyInput()) {
        this.setState({ btnDisable: false });
      } else {
        this.setState({ btnDisable: true });
      }
    });
  }

  verifyInput() {
    const { email, user } = this.state;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const three = 3;

    return user.length >= three && emailRegex.test(email);
  }

  render() {
    const { email, user, btnDisable } = this.state;

    return (
      <div>
        <input
          value={ email }
          name="email"
          type="email"
          placeholder="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <input
          value={ user }
          name="user"
          type="user"
          data-testid="input-player-name"
          placeholder="nome"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ btnDisable }
          data-testid="btn-play"
        >
          Entrar
        </button>

      </div>

    );
  }
}

export default Login;
