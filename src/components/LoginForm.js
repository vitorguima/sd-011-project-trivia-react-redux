import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchTokenAPI } from '../actions/login';
import './LoginForm.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      enablePlayButton: false,
      user: '',
      email: '',
    };
    this.inputValidation = this.inputValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
  }

  inputValidation() {
    const { user, email } = this.state;
    const format = /\S+@\S+\.\S+/;
    if (user.length !== 0 && email.match(format)) {
      this.setState({ enablePlayButton: true });
    } else {
      this.setState({ enablePlayButton: false });
    }
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.inputValidation());
  }

  handlePlayButtonClick() {
    const { user, email } = this.state;
    const { sendUserInfos } = this.props;
    sendUserInfos({ user, email });
  }

  renderUserInput() {
    return (
      <label htmlFor="user">
        <input
          name="user"
          type="text"
          id="user"
          data-testid="input-player-name"
          placeholder="User"
          onChange={ this.handleInputChange }
          className="form-input"
        />
      </label>
    );
  }

  renderEmailInput() {
    return (
      <label htmlFor="email">
        <input
          name="email"
          type="text"
          id="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleInputChange }
          className="form-input"
        />
      </label>
    );
  }

  renderPlayButton() {
    const { enablePlayButton } = this.state;
    return (
      <Link to="/play">
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !enablePlayButton }
          onClick={ this.handlePlayButtonClick }
          className={ (enablePlayButton)
            ? 'form-play-button-enabled'
            : 'form-play-button' }
        >
          Play
        </button>
      </Link>
    );
  }

  renderSettingsButton() {
    return (
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
          className="form-setting-button"
        >
          Settings
        </button>
      </Link>
    );
  }

  render() {
    return (
      <form className="login-form">
        <h2>User login</h2>
        { this.renderUserInput() }
        { this.renderEmailInput() }
        <span className="login-form-buttons">
          { this.renderPlayButton() }
          { this.renderSettingsButton() }
        </span>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserInfos: (infos) => dispatch(login(infos)),
  fetchToken: () => dispatch(fetchTokenAPI()),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  sendUserInfos: PropTypes.func.isRequired,
};
