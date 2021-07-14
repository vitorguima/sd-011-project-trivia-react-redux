import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* import { getTokenAction } from '../action'; */
import getToken from '../service/getToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyLogin() {
    const { nome, email } = this.state;
    const si = /\S+@\S+\.\S+/;
    const no = /\S/;
    if (si.test(email) && no.test(nome)) {
      return false;
    }
    return true;
  }

  handleClick() {
    const tok = getToken();
    tok.then(({ token }) => localStorage.setItem('token', token));
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div>
        <label htmlFor="nome">
          Nome:
          <input
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.verifyLogin() }
            onClick={ this.handleClick() }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => ({
  getToken: (payload) => dispatch(getTokenAction(payload)),
}); */

/* export default connect(null, mapDispatchToProps)(Login); */
export default Login;
