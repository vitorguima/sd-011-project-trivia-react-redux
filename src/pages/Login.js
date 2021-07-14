import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  verifyInputs() {
    const { email, name } = this.state;
    return !(name && email);
  }

  sendInfos() {
    console.log('Foi');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form onSubmit={ this.sendInfos }>
          <input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            name="email"
            type="text"
            placeholder="Digite seu e-mail"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ this.verifyInputs() }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
