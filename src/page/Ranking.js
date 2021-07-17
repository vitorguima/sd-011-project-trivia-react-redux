import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Hanking</h2>

        <div>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Inicio</button>
          </Link>
        </div>
      </div>
    );
  }
}
