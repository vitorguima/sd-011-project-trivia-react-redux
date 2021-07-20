import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
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

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form clasName="login-form">
            <label htmlFor="name">
              <input
                className="login-input"
                placeholder="Nome"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                type="text"
                id="name"
              />
            </label>
            <label htmlFor="email">
              <input
                className="login-input"
                placeholder="Email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                type="email"
                id="email"
              />
            </label>
          </form>
          <button
            className="btn-login btn-play"
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleBtn }
          >
            Jogar
          </button>
          <button
            className="btn-login btn-config"
            type="button"
            data-testid="btn-settings"
            onClick={ this.sendToConfigurations }
          >
            Configurações
          </button>
        </header>
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
