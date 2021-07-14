import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchTokenAPI } from '../actions/login';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      enableButton: false,
      user: '',
      email: '',
    };
    this.inputValidation = this.inputValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  inputValidation() {
    const { user, email } = this.state;
    if (user.length !== 0 && email.length !== 0) {
      this.setState({ enableButton: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.inputValidation());
  }

  handleButtonClick() {
    const { user, email } = this.state;
    const { userInfos } = this.props;
    userInfos({ user, email });
  }

  render() {
    const { enableButton } = this.state;
    return (
      <form>
        <label htmlFor="user">
          <input
            name="user"
            type="text"
            id="user"
            data-testid="input-player-name"
            placeholder="Digite o nome do usuário"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            type="text"
            id="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/play">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !enableButton }
            onClick={ this.handleButtonClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenData: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  userInfos: (infos) => dispatch(login(infos)),
  fetchToken: () => dispatch(fetchTokenAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  userInfos: PropTypes.objectOf().isRequired,
};
