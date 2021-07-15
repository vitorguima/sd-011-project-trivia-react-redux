import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail, getName } from '../actions';

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveTokenInLocalStorage = this.saveTokenInLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  componentDidUpdate() {
    this.handleButton();
  }

  async getToken() {
    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    const tokenReceived = await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => data.token);
    this.saveTokenInLocalStorage('token', tokenReceived);
  }

  saveTokenInLocalStorage(key, item) {
    localStorage.clear();
    localStorage.setItem(key, item);
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { email, name } = this.state;
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

  render() {
    const { email, name, disabled } = this.state;
    const { emailInput } = this.props;
    return (
      <div>
        <label
          htmlFor="email"
        >
          <input
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleInput }
            data-testid="input-gravatar-email"
          />
        </label>
        <label
          htmlFor="name"
        >
          <input
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleInput }
            data-testid="input-player-name"
          />
        </label>

        <Link to="./PlayGame">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ () => emailInput(email, name) }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailInput: (email, name) => dispatch(getEmail(email), dispatch(getName(name))),
});

Login.propTypes = {
  emailInput: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
