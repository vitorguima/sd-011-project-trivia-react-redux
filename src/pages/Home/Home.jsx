import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveToken } from '../../actions';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.renderPlayButton = this.renderPlayButton.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
  }

  handleChange(target) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handlePlayButton() {
    const { playerName, email } = this.state;
    if (playerName.length && email.length) {
      return false;
    }
    return true;
  }

  renderPlayButton() {
    const { dispatchToken } = this.props;

    return (
      <button
        disabled={ this.handlePlayButton() }
        type="button"
        data-testid="btn-play"
        onClick={ () => dispatchToken() }
      >
        Jogar
      </button>
    );
  }

  renderSettingsButton() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
      >
        <Link to="/settings">Configurações</Link>
      </button>
    );
  }

  render() {
    const { email, playerName } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="input-name">
            Nome Jogador
            <input
              name="playerName"
              value={ playerName }
              type="text"
              id="input-name"
              data-testid="input-player-name"
              placeholder="nome"
              onChange={ ({ target }) => { this.handleChange(target); } }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              name="email"
              value={ email }
              type="email"
              id="input-email"
              data-testid="input-gravatar-email"
              placeholder="email"
              onChange={ ({ target }) => { this.handleChange(target); } }
            />
          </label>
        </form>
        {this.renderPlayButton()}
        {this.renderSettingsButton()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: () => dispatch(saveToken()),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  dispatchToken: PropTypes.func,
}.isRequired;
