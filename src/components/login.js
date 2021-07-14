import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handler(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  changeHandle(e) {
    this.handler(e);
    const { nameAction } = this.props;
    const { name } = this.state;
    nameAction(name);
  }

  isAuthenticated() {
    const { email, name } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  submit() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => localStorage.setItem('token', data.token));
  }

  render() {
    return (
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          type="text"
          placeholder="Escreva seu nome"
          onChange={ (e) => this.changeHandle(e) }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="email"
          onChange={ (e) => this.changeHandle(e) }
        />
        <Link to="/player">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.isAuthenticated() }
            onClick={ () => this.submit() }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenAPI: state.user.results,
});

const mapDispatchToProps = (dispatch) => ({
  nameAction: (state) => dispatch(userAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
