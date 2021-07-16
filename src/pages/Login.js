import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import triviaApi from '../services/triviaApi';
import { saveTrivia } from '../redux/actions';
import tokenApi from '../services/tokenApi';
import { setPlayer } from '../redux/actions/playerActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
    this.handleOnChangeInputValidate = this.handleOnChangeInputValidate.bind(this);
    this.playHandle = this.playHandle.bind(this);
  }

  componentDidMount() {
    const button = document.querySelector('#play-btn');
    button.disabled = true;
  }

  validateEmail() {
    const email = document.querySelector('#input-email');
    const error = document.querySelector('#error-email');
    if (!email.checkValidity()) {
      error.style.color = 'red';
      error.innerHTML = 'Inválido';
    } else if (email.checkValidity()) {
      error.style.color = 'green';
      error.innerHTML = 'Email válido';
    }
  }

  handleOnChangeInputValidate() {
    const name = document.querySelector('#input-name');
    const button = document.querySelector('#play-btn');
    const email = document.querySelector('#input-email');

    if (email.checkValidity() && email.value.length >= 1 && name.value.length >= 1) {
      button.disabled = false;
      // email.value.length estava com o length escrito errado!
    } else if (
      !email.checkValidity()
      || name.value.length < 1
      || email.value.length < 1) {
      button.disabled = true;
    }
  }

  async playHandle() {
    const { token } = await tokenApi();
    const { email, name } = this.state;
    const { setPlayerAction, saveTriviaAction } = this.props;
    const five = 5;
    const { results } = await triviaApi(token, five);
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify({ player }));

    saveTriviaAction(results);
    setPlayerAction(player);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <section className="login-container">
            <form className="login-form">
              <label htmlFor="input-name">
                Nome
                <input
                  type="text"
                  name="name"
                  id="input-name"
                  placeholder="Name"
                  data-testid="input-player-name"
                  onChange={ this.handleOnChangeInputValidate }
                />
              </label>
              <label htmlFor="input-email">
                Email
                <input
                  type="email"
                  name="email"
                  id="input-email"
                  placeholder="Email"
                  data-testid="input-gravatar-email" // <<<<< estava com o data-testid errado!
                  onChange={ this.handleOnChangeInputValidate }
                  onBlur={ this.validateEmail }
                />
                <span id="error-email" />
              </label>
              <button
                type="button"
                data-testid="btn-play"
                id="play-btn"
                onClick={ this.playHandle }
              >
                Jogar
              </button>
            </form>
          </section>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerAction: (player) => dispatch(setPlayer(player)),
  saveTriviaAction: (trivia) => dispatch(saveTrivia(trivia)),
});

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;
export default connect(null, mapDispatchToProps)(Login);
