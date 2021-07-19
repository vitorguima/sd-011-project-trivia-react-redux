import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { user, apiQuestion, token } from '../actions';
import { tokenApi } from '../services/getApi';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: '',
      name: '',
      btnDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handClick = this.handClick.bind(this);
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, () => {
      console.log(value);
      if (this.verifyInput()) {
        this.setState({ btnDisable: false });
      } else {
        this.setState({ btnDisable: true });
      }
    });
  }

  verifyInput() {
    const { email, name } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userVerify = '';

    return name !== userVerify && emailRegex.test(email);
  }

  async fetchApi() {
    const { userToken } = this.props;
    const tokenValue = await tokenApi();
    localStorage.setItem('token', tokenValue);
    console.log(tokenValue)
    userToken(tokenValue)

  }

  async handClick() {
    const { name, email } = this.state;
    const { login, history } = this.props;
    history.push('/game');

    login({ name, email });
    await this.fetchApi();
  }

  render() {
    const { email, name, btnDisable } = this.state;

    return (

      <div className="App0">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <form>
            <input
              value={ email }
              name="email"
              type="email"
              placeholder="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <input
              value={ name }
              name="name"
              type="name"
              data-testid="input-player-name"
              placeholder="nome"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              onClick={ this.handClick }
              disabled={ btnDisable }
              data-testid="btn-play"
            >
              Jogar
            </button>
          </form>

          <Link to="/settings">
          <button type="button" data-testid="btn-settings">  Configurações</button>  
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(user(payload)),
  gameQuestion: (payload) => dispatch(apiQuestion(payload)),
  userToken: (payload) => dispatch(token(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
