import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <section className="player">
        <h2 data-testid="ranking-title">Tela de Ranking</h2>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </section>
    );
  }
}

export default connect()(Ranking);
