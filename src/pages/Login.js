import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './css/Login.css';
import { fetchToken, actionLogin, actionScore } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
    this.sendToConfigurations = this.sendToConfigurations.bind(this);
    this.redirectRouter = this.redirectRouter.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      score: 0,
    };
  }

  componentDidMount() {
    const { addingScore } = this.props;
    const { score } = this.state;
    addingScore(score);
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

  handleBtn() {
    const { getLogin } = this.props;
    const { name, email } = this.state;
    getLogin(name, email);
    this.redirectRouter();
  }

  redirectRouter() {
    const { history } = this.props;

    history.push('/game');
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });

    this.checkLogin();
  }

  sendToConfigurations() {
    const { history } = this.props;

    history.push('/configurations');
  }

  renderButtonsPlayAndConfig() {
    const { disabled } = this.state;

    return (
      <div className="buttons-container">
        <button
          className="btn btn-play"
          disabled={ disabled }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleBtn }
        >
          Jogar
        </button>
        <button
          className="btn btn-config"
          type="button"
          data-testid="btn-settings"
          onClick={ this.sendToConfigurations }
        >
          <FontAwesomeIcon className="Gear-icon" icon={ faCog } />
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-box-top" />
        <header className="App-header">
          <div className="App-logo">TRIVIA</div>
        </header>
        <form className="form">
          <label htmlFor="name">
            <span className="icon-credentials">
              <FontAwesomeIcon icon={ faUser } />
            </span>
            <input
              placeholder="Digite seu nome..."
              className="input input-name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
              type="text"
              id="name"
            />
          </label>
          <label htmlFor="email">
            <span className="icon-credentials">
              <FontAwesomeIcon icon={ faEnvelope } />
            </span>
            <input
              placeholder="Digite seu email..."
              className="input input-email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              type="email"
              id="email"
            />
          </label>
        </form>
        { this.renderButtonsPlayAndConfig() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getLogin: (name, gravatarEmail) => dispatch(actionLogin(name, gravatarEmail)),
  addingScore: (score) => dispatch(actionScore(score)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
