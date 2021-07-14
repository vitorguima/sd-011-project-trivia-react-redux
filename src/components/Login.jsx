import React from 'react';
import PropTypes from 'prop-types';
import getTokenApi from '../services/getTokenApi';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => {
      const { userName, email } = this.state;
      if (userName && email) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  }

  async handleClick() {
    const response = await getTokenApi();
    const { token } = response;
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { userName, email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="userName"
            value={ userName }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ () => this.handleClick() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Login;
