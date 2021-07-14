import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../actions/index';

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

  isAuthenticated() {
    const { email, name } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  // Guardar resposta token no localStorage
  submit() {
    const { tokenFetch } = this.props;
    tokenFetch();
    const { tokenAPI } = this.props;
    localStorage.setItem('token', tokenAPI);
  }

  render() {
    return (
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          type="text"
          placeholder="Escreva seu nome"
          onChange={ (e) => this.handler(e) }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="email"
          onChange={ (e) => this.handler(e) }
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenAPI: state.user.results,
});

const mapDispatchToProps = (dispatch) => ({
  tokenFetch: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
