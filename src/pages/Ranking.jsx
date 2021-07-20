import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { restartGame } from '../actions';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    const { userName, gravatarImage } = props;

    const state = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    const newRankingPosition = {
      name: userName,
      score: state.player.score,
      picture: gravatarImage,
    };

    if (ranking) {
      const newRanking = [
        ...ranking,
        newRankingPosition,
      ];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([newRankingPosition]));
    }
  }

  render() {
    const { playAgain } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <main>
          { (ranking)
            ? (
              <ul>
                { ranking.sort((a, b) => b.score - a.score).map((user, index) => (
                  <li key={ index }>
                    <img src={ user.picture } alt={ `${user.name} gravatar` } />
                    <p data-testid={ `player-name-${index}` }>{ user.name }</p>
                    <p data-testid={ `player-score-${index}` }>{ user.score }</p>
                  </li>
                ))}
              </ul>
            )
            : (
              <div>Loading...</div>
            )}
          <Link
            data-testid="btn-go-home"
            to="/"
            onClick={ () => playAgain() }
          >
            Home
          </Link>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(restartGame()),
});

Ranking.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  playAgain: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
