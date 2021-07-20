import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { fetchToken, user, emptyScore } from '../actions';
import logo from '../trivia.png';

class TelaIncial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      button: true,
      img: '',
    };
    this.activeButton = this.activeButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getTokenAndState = this.getTokenAndState.bind(this);
    this.emailGravatar = this.emailGravatar.bind(this);
  }

  getTokenAndState() {
    const { getToken, exportState, resetScore } = this.props;
    const { name, email } = this.state;
    exportState(this.state);
    getToken()
      .then(({ state: { token } }) => (
        localStorage.setItem('token', JSON.stringify(token))));
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    resetScore();
  }

  activeButton() {
    const { email, name } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (regex.test(email) && name.length > 0) {
      this.emailGravatar();
      this.setState({ email: email.trim(), name: name.trim(), button: false });
    } else {
      this.setState({ button: true });
    }
  }

  async emailGravatar() {
    const { email } = this.state;
    const email1 = md5(email).toString();
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${email1}`);
    const { url } = fetchGravatar;
    this.setState({ img: url });
  }

  handleInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.activeButton());
  }

  render() {
    const { button } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            name="email"
            data-testid="input-gravatar-email"
            type="text"
            onChange={ this.handleInput }
            placeholder="email"
          />
          <input
            name="name"
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleInput }
            placeholder="nome"
          />
          <Link
            to="/Play"
          >
            <button
              type="button"
              disabled={ button }
              data-testid="btn-play"
              onClick={ () => this.getTokenAndState() }
            >
              Jogar
            </button>
          </Link>
          <Link
            to="/Settings"
          >
            <button type="button" data-testid="btn-settings">
              configuração
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  exportState: (state) => dispatch(user(state)),
  resetScore: () => dispatch(emptyScore()),
});
export default connect(null, mapDispatchToProps)(TelaIncial);

TelaIncial.propTypes = {
  getToken: PropTypes.func.isRequired,
  exportState: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
};
