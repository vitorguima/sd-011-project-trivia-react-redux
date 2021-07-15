import React from 'react';
import '../Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import * as actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      statusName: false,
      statusEmail: false,
    };

    this.readForm = this.readForm.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.validName = this.validName.bind(this);
  }

  readForm(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value,
    }, () => this.validationAll());
  }

  // lógica adaptada de https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  validEmail() {
    const { email } = this.state;
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm)) {
      this.setState({
        statusEmail: false,
      });
    } else {
      this.setState({
        statusEmail: true,
      });
    }
  }

  validName() {
    const { name } = this.state;
    const number = 1;
    if (name.length < number) {
      this.setState({
        statusName: false,
      });
    } else {
      this.setState({
        statusName: true,
      });
    }
  }

  validationAll() {
    this.validEmail();
    this.validName();
  }

  render() {
    const { statusName, statusEmail, email, name } = this.state;
    const { saveLogin } = this.props;
    return (
      <section className="login">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p> SUA VEZ </p>
        </header>
        <div className="input">
          <p>
            <input
              type="input"
              name="name"
              placeholder="Digite seu nome"
              data-testid="input-player-name"
              onChange={ this.readForm }
              required
            />
          </p>
        </div>
        <div className="input">
          <p>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              data-testid="input-gravatar-email"
              onChange={ this.readForm }
              required
            />
          </p>
        </div>
        <div className="input">
          <p>
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ !statusEmail || !statusName }
                onClick={ () => saveLogin(email, name) }
              >
                Jogar
              </button>
            </Link>
          </p>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email, name) => dispatch(actions.saveLogin(email, name)),
});

Login.propTypes = {
  saveLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
