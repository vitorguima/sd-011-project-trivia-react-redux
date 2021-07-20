import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  componentDidMount() {
    const { name, img, score } = this.props;
    const player = { name, score: score + 1, img };
    if (name.length > 0) {
      if (!localStorage.ranking) {
        localStorage.setItem('ranking', JSON.stringify([player]));
      } else {
        const received = JSON.parse(localStorage.getItem('ranking'));
        localStorage.setItem('ranking', JSON.stringify([...received, player]));
      }
    }
  }

  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = getRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((user, index) => (
            <li key={ index }>
              <div>
                <img src={ user.img } alt={ `foto do jogador ${user.name}` } />
              </div>
              <h5 data-testid={ `player-score-${index}` }>{`score: ${user.score}`}</h5>
              <h3 data-testid={ `player-name-${index}` }>{user.name}</h3>
            </li>))}
        </ol>
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          <button type="button">
            Tela Inicial
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ questions: { score }, userReducer: { name, img } }) => ({
  name,
  img,
  score,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
