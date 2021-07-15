import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions';
import logo from '../trivia.png';

class TelaIncial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      button: true,
    };
    this.activeButton = this.activeButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  activeButton() {
    const { email, name } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (regex.test(email) && name.length > 0) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.activeButton());
  }

  render() {
    const { button } = this.state;
    const { getToken } = this.props;
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
              onClick={
                () => getToken()
                  .then(({ state: { token } }) => (
                    localStorage.setItem('token', JSON.stringify(token))))
              }
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
});
export default connect(null, mapDispatchToProps)(TelaIncial);

TelaIncial.propTypes = {
  getToken: PropTypes.func.isRequired,
};
