import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTokenApi } from '../actions/index';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState({ target: { id, value } }) {
    const { name, email } = this.state;
    this.setState({ [id]: value });
    if (name && email) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled, email, name } = this.state;
    const { getToken } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            data-testid="input-player-name"
            type="email"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ this.changeState }
          />
          <input
            data-testid="input-gravatar-email"
            type="text"
            placeholder="Name"
            id="name"
            value={ name }
            onChange={ this.changeState }
          />
          <Link to="/game">
            <button
              disabled={ disabled }
              type="button"
              data-testid="btn-play"
              onClick={ getToken }
            >
              Jogar
            </button>
          </Link>
          <Link data-testid="btn-settings" to="/settings">
            Configurações
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchTokenApi()),
});

export default connect(null, mapDispatchToProps)(Login);
