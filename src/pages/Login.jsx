import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { setEmail, setName, fetchApi, fetchQuestions } from '../actions/index';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      email: null,
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  disableButton() {
    const { user, email } = this.state;
    if (user && email) {
      return false;
    }
    return true;
  }

  async handleFetch() {
    const { requestApi, questionsResult } = this.props;
    const { payload } = await requestApi();
    window.localStorage.setItem('token', payload.token);
    questionsResult(payload.token);
  }

  handleClick() {
    const { user, email } = this.state;
    const { userName, userEmail } = this.props;
    userName(user);
    userEmail(email);
  }

  render() {
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <input
            type="text"
            id="name"
            name="user"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

          <Link to="/questions">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ this.disableButton() }
            >
              Jogar
            </button>
          </Link>

        </form>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userName: (user) => dispatch(setName(user)),
  userEmail: (email) => dispatch(setEmail(email)),
  requestApi: () => dispatch(fetchApi()),
  questionsResult: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = {
  userName: PropTypes.func.isRequired,
  userEmail: PropTypes.func.isRequired,
  requestApi: PropTypes.func.isRequired,
  questionsResult: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
