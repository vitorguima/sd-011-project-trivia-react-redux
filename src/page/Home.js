import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, getMailName } from '../redux/actions';
import logo from '../trivia.png';

import '../CSS/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleData = this.handleData.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  handleData({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickSubmit() {
    const { name, email } = this.state;
    const { fetchCurrent, sendEmailName } = this.props;
    sendEmailName(name, email);
    fetchCurrent();
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="background-home">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Nome"
              data-testid="input-player-name"
              name="name"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="E-mail"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <Link to="/jogar">
            <button
              type="button"
              data-testid="btn-play"
              className="buttons"
              onClick={ this.clickSubmit }
              disabled={ !(name && email) }
            >
              Jogar
            </button>
          </Link>
          <Link to="/configuração">
            <button
              type="button"
              data-testid="btn-settings"
              className="buttons"
            >
              Configuração
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.homeReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrent: () => dispatch(fetchToken()),
  sendEmailName: (email, name) => dispatch(getMailName(email, name)),
});

Home.propTypes = ({
  fetchCurrent: PropTypes.func,
  sendEmailName: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
