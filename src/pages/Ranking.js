import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h4 data-testid="ranking-title">Página de Ranking</h4>
        <Link exact to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}
