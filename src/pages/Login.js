import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

// const recevedEmail = new RegExp('^[^s@]+@[^s@]+$');
const recevedEmail = new RegExp('\\S+@\\S+\\.\\S+');

class Login extends Component {
  constructor() {
    super();
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangeButton() {
    const { email, name } = this.state;

    if (recevedEmail.test(email) && name.length !== 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    const { fetch } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              value={ name }
              onChange={ this.handleChangeName }
              data-testid="input-player-name"
              onKeyUp={ this.handleChangeButton }
            />
          </label>
          <label htmlFor="name">
            Email:
            <input
              type="Email"
              id="email"
              value={ email }
              onChange={ this.handleChangeEmail }
              data-testid="input-gravatar-email"
              onKeyUp={ this.handleChangeButton }
            />
          </label>
        </form>
        <Link to="/jogo">
          <button
            disabled={ isDisabled }
            data-testid="btn-play"
            type="button"
            onClick={ () => fetch() }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: (state) => dispatch(fetchApi(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fetch: PropTypes.func,
}.isRequired;
