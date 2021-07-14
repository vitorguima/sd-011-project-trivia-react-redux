import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import * as actions from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { fetchAPIToken } = this.props;
    fetchAPIToken();
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div className="App-header">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <section>
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            type="email"
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              data-testid="btn-play"
              disabled={ !(name && gravatarEmail) }
              type="button"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  fetchAPIToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchAPIToken: () => dispatch(actions.fetchAPIToken()),
});

export default connect(null, mapDispatchToProps)(Login);
