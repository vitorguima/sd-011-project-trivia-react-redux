/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
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

    console.log(name.value);

    // if (email.length <= 0 || name.length <= zero || !email.checkValidity()) {
    //   return button.disabled;
    // }
    // { return button.disabled = false; }

    if (email.checkValidity() && name.value !== '' && email.value !== '') {
      button.disabled = false;
      // console.log(button);
    } else if (!email.checkValidity() || name.value === '' || email.value === '') {
      button.disabled = true;
    }
  }

  playHandle() {

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
                  data-testid="input-player-email"
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
