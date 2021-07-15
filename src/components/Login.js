import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { fetchToken } = this.props;
    const isDisabled = name.length === 0 || email.length === 0;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              id="name"
              required
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              required
              onChange={ this.handleOnChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ fetchToken }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(actions.fetchToken()),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
