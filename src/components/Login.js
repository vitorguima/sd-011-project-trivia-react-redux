import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      status: true,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.ableButton = this.ableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    }, () => this.ableButton());
  }

  handleChangeEmail({ target }) {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.ableButton());
  }

  ableButton() {
    const { name, email } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (name !== '' && regex.test(email)) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  }

  handleClick() {
    const { fetchApiToken, token } = this.props;
    fetchApiToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <input
          type="name"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handleChangeName }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChangeEmail }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ status }
          onClick={ () => this.handleClick() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  fetchApiToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchApiToken: () => dispatch(getApi()),
});

export default connect(null, mapDispatchToProps)(Login);
