import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  setLocalStorage() {
    const { name, img, score } = this.props;
    const player = { name, score, img };
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
    this.setLocalStorage();
    const getRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const ranking = getRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.map((user, index) => (
            <li key={ index }>
              <h3 data-testid={ `player-name-${index}` }>{user.name}</h3>
              <h5 data-testid={ `player-score-${index}` }>{`score: ${user.score}`}</h5>
              <div>
                <img src={ user.img } alt={ `foto do jogador ${user.name}` } />
              </div>
            </li>))}
        </ul>
        <Link
          to="/"
        >
          <button type="button" data-testid="btn-go-home">
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
