import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button data-testid="btn-go-home" type="button">Início</button>
      </main>
    );
  }
}
