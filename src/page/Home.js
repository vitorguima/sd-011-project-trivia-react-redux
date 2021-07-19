import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, getMailName } from '../redux/actions';
import logo from '../trivia.png';

import './Home.css';

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

  /* Indiferente */
  /* Linha 44 <p className="default-paragraph">
            SUA VEZ
          </p> */

  /* Tirei Id name e email para colocar placehold pois o render atingiria acima de 50 linhas */

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name" className="label-home">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              placeholder="Nome"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <label htmlFor="email" className="label-home">
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              placeholder="E-mail"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <Link to="/jogar">
            <button
              type="button"
              className="buttons"
              data-testid="btn-play"
              onClick={ this.clickSubmit }
              disabled={ !(name && email) }
            >
              Jogar
            </button>
          </Link>
          <Link to="/configuração">
            <button
              className="buttons"
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

// Redundante
// const mapStateToProps = (state) => ({
//   token: state.homeReducer.token,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCurrent: () => dispatch(fetchToken()),
  sendEmailName: (email, name) => dispatch(getMailName(email, name)),
});

Home.propTypes = ({
  fetchCurrent: PropTypes.func,
  sendEmailName: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(Home);
