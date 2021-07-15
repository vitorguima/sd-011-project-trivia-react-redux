import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Configuracoes extends Component {
  render() {
    return (
      <div>
        <Link to="/">Voltar</Link>
        <h1 data-testid="settings-title">Configurações</h1>
        {/* <header>

        </header> */}
      </div>
    );
  }
}

export default Configuracoes;
