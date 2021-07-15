import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { setEmail, setName, fetchApi } from '../actions/index';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      email: null,
    };
    this.handleChange = this.handleChange.bind(this);
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
    const { requestApi } = this.props;
    const { payload } = await requestApi();
    window.localStorage.setItem('token', JSON.stringify(payload.token));
  }

  render() {
    const { user, email } = this.state;
    const { userName, userEmail } = this.props;
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
            value={ user }
          />
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            valeu={ email }
          />
          <button
            type="button"
            data-testid="btn-play"
            onClick={ () => { userName(user); userEmail(email); this.handleFetch(); } }
            disabled={ this.disableButton() }
          >
            Jogar
          </button>
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
});

Login.propTypes = {
  userName: PropTypes.func.isRequired,
  userEmail: PropTypes.func.isRequired,
  requestApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
