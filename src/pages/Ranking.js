import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <section>
        <h2 data-testid="ranking-title">Tela de Ranking</h2>
        <Link to="/">
          <button type="button" data-test-id="btn-go-home">Início</button>
        </Link>
      </section>
    );
  }
}

export default connect()(Ranking);
