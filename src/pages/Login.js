import React, { Component } from 'react';
import ConfigButton from '../components/ConfigButton';
// import login from '../reducers/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //  name: '',
    //  email: '',
      isValid: false,
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange({ event: { name, value } }) {
  //   this.setState({ [name]: value });
  // }

  render() {
    const { isValid } = this.state;
    return (
      <div>
        <form
          className="login-form"
          onChange={ () => {
            const loginForm = document.querySelector('.login-form');
            this.setState({ isValid: loginForm.checkValidity() });
          } }
        >
          <label htmlFor="player-name">
            Nome
            <input
              id="player-name"
              data-testid="input-player-name"
              type="text"
              name="name"
              required
              // onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="player-email">
            E-mail
            <input
              id="player-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              // onChange={ this.handleChange }
              required
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !isValid }
          >
            Jogar
          </button>
        </form>
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
