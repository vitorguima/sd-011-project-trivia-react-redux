import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail, setName } from '../actions';

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

  render() {
    const { user, email } = this.state;
    const { userName, userEmail } = this.props;
    return (
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
          onClick={ () => { userName(user); userEmail(email); } }
          disabled={ this.disableButton() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userName: () => dispatch(setName()),
  userEmail: () => dispatch(setEmail()),
});

Login.propTypes = {
  userName: PropTypes.func.isRequired,
  userEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
