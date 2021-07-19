import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { loginInputs, fetchTriviaApi, fetchTriviaQuestions } from '../actions';

class Login extends Component {
  componentDidMount() {
    const { fetchTriviaDispatch } = this.props;
    fetchTriviaDispatch();
  }

  setPlayerLocalStorage(name, email, token) {
    const { score } = this.props;
    // let result = score;
    // if (score === 0) {
    //   result = '';
    // }
    const playerObj = { player: {
      name,
      assertions: '',
      score,
      gravatarEmail: email,
    },
    };
    localStorage.setItem('state', JSON.stringify(playerObj));
    localStorage.setItem('token', JSON.stringify(token));
  }

  renderInput() {
    const { loginInputsDispatch } = this.props;
    return (
      <div>
        <label htmlFor="nome">
          Usuário:
          <input
            type="text"
            name="nome"
            data-testid="input-player-name"
            onChange={ loginInputsDispatch }
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ loginInputsDispatch }
          />
        </label>
      </div>);
  }

  render() {
    const { nome, email, fetchQstionsDispatch, token } = this.props;
    return (
      <div>
        <Header />
        {this.renderInput()}
        <br />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !nome || !email }
            onClick={ () => {
              fetchQstionsDispatch(token);
              this.setPlayerLocalStorage(nome, email, token);
            } }
          >
            Jogar
          </button>
        </Link>
        <Link
          to="/settings"
        >
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.defaultProps = {
  token: 'loading',
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  fetchQstionsDispatch: PropTypes.func.isRequired,
  fetchTriviaDispatch: PropTypes.func.isRequired,
  loginInputsDispatch: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  token: PropTypes.string,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  email: state.loginReducer.login.email,
  token: state.triviaReducer.token.token,
  score: state.triviaReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  loginInputsDispatch: (state) => dispatch(loginInputs(state)),
  fetchTriviaDispatch: (state) => dispatch(fetchTriviaApi(state)),
  fetchQstionsDispatch: (state) => dispatch(fetchTriviaQuestions(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
