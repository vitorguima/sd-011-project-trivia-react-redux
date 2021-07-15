import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.redirectRouter = this.redirectRouter.bind(this);
    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  checkLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  storeTokenOnLocalStorage(tokenObj) {
    localStorage.setItem('token', JSON.stringify(tokenObj));
  }

  async fetchTriviaApi() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();

    this.storeTokenOnLocalStorage(token);
    this.redirectRouter();
  }

  redirectRouter() {
    const { history } = this.props;
    console.log(history);

    history.push('/play');
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });

    this.checkLogin();
  }

  render() {
    const { name, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="name">
              Nome:
              <input
                onChange={ this.handleChange }
                data-testid="input-player-name"
                type="text"
                id="name"
                value={ name }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                type="email"
                id="email"
                value={ email }
              />
            </label>
          </form>
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.fetchTriviaApi }
          >
            Jogar
          </button>
        </header>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: {
    push: PropTypes.func,
  }.isRequired,
};
