import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import setup from '../images/gear.png';
import back from '../images/back_4.png';
import '../App.css';
// import '../css/btnSetupScreen.css';

class Setup extends Component {
  render() {
    return (
      <>
        <div className="header-setup">
          <img src={ setup } alt="Ranking" className="setup-img-gear" />
          <h2 data-testid="settings-title" className="title-setup">Configurações</h2>
        </div>
        <Link to="/" style={ { textDecoration: 'none' } }>
          <div className="setup-back-home">
            <img src={ back } alt="Voltar" className="back-img-home" />
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-neon-blue back-home"
            >
              Voltar ao login
            </button>
          </div>
        </Link>
      </>
    );
  }
}

export default Setup;
