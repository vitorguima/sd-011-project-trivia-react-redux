import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

export default class Ranking extends Component {
  getRankingFromStorage() {
    let ranking = [];

    try {
      ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) ranking = [];
    } catch (err) {
      console.error(err);
    }

    return ranking;
  }

  render() {
    const ranking = this.getRankingFromStorage();

    return (
      <Layout title="Ranking">
        <main>
          <header>
            <h1 data-testid="ranking-title">Ranking</h1>
          </header>

          <ol>
            { ranking.map(({ name, picture, score }, index) => (
              <li key={ `${name}-index` }>
                <img src={ picture } alt={ `Avatar de ${name}` } />
                <p data-testid={ `player-name-${index}` }>{ name }</p>
                <p data-testid={ `player-score-${index}` }>{ score }</p>
              </li>
            )) }
          </ol>

          <Link data-testid="btn-go-home" to="/">Voltar para a pagina inicial</Link>
        </main>
      </Layout>
    );
  }
}
