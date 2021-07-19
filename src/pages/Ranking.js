import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.saveRankingOnLocalStore = this.saveRankingOnLocalStore.bind(this);
    this.getRankingOnLocalStorage = this.getRankingOnLocalStorage.bind(this);

    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    this.saveRankingOnLocalStore();
  }

  getGravatarPicture(email) {
    const hash = md5(email).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${hash}`;
    return gravatarPicture;
  }

  getRankingOnLocalStorage(localStorageRanking) {
    if (localStorageRanking) {
      this.setState({
        rankings: localStorageRanking,
      });
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        rankings: ranking,
      });
    }
  }

  saveRankingOnLocalStore() {
    const { name, email, score } = this.props;
    const picture = this.getGravatarPicture(email);

    const localStorageRanking = JSON.parse(localStorage.getItem('ranking'));

    if (!localStorageRanking) {
      const ranking = [{ name, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      this.getRankingOnLocalStorage();
    } else {
      const ranking = { name, score, picture };
      localStorageRanking.push(ranking);
      this.getRankingOnLocalStorage(localStorageRanking);
    }

    const ranking = [{ name, score, picture }];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  // saveLisOnState() {
  //   const { rankings } = this.state;
  //   const Lis = rankings.map(({ name, score, picture }, index) => (
  //     <li key={ index }>
  //       <img src={ picture } alt="Player Avatar" />
  //       <h4 data-testid={ `player-name-${index}` }>
  //         { `Nome: ${name}` }
  //       </h4>
  //       <span data-testid={ `player-score-${index}` }>
  //         { `Pontos: ${score}` }
  //       </span>
  //     </li>
  //   ));
  // }

  render() {
    const { rankings } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {rankings.sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }, index) => (
              <li key={ index }>
                <img src={ picture } alt="Player Avatar" />
                <h4 data-testid={ `player-name-${index}` }>
                  { `Nome: ${name}` }
                </h4>
                <span data-testid={ `player-score-${index}` }>
                  { `Pontos: ${score}` }
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
