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
    // const ranking = JSON.parse(localStorage.getItem('ranking'));
    // function compare(a, b) {
    //   const menor = -1;
    //   const maior = 1;
    //   if (a.score < b.score) return maior;
    //   if (a.score > b.score) return menor;
    //   return 0;
    // }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* <ul>
          {ranking.sort(compare).map((user, index) => (
            <li key={ index }>
              <h3 data-testid={ `player-name-${index}` }>{user.name}</h3>
              <h5 data-testid={ `player-score-${index}` }>{`score: ${user.score}`}</h5>
              <div>
                <img src={ user.img } alt={ `foto do jogador ${user.name}` } />
              </div>
            </li>))}
        </ul> */}
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
