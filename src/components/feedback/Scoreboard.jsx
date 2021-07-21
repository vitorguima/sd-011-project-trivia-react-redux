import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Scorebboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateRanking();
  }

  updateRanking() {
    const { user: { nome, score, url } } = this.props;
    const getRanking = localStorage.getItem('ranking');
    if (!getRanking) {
      localStorage.setItem('ranking',
        JSON.stringify([{ name: nome, score, picture: url }]));
    } else {
      const prevRankingString = localStorage.getItem('ranking');
      const prevRanking = JSON.parse(prevRankingString);
      prevRanking.push({ name: nome, score, picture: url });
      localStorage.setItem('ranking', JSON.stringify(prevRanking));
    }
  }

  render() {
    const playerStorageString = localStorage.getItem('state');
    const playerStorage = JSON.parse(playerStorageString);
    return (
      <div className="feedback-scoreboard">
        <h2>
          Você acertou:
          <span data-testid="feedback-total-question">
            { playerStorage.player.assertions }
          </span>
          de 5 perguntas.
        </h2>
        <h2>
          Você fez:
          {' '}
          <span
            data-testid="feedback-total-score"
          >
            { playerStorage.player.score }
          </span>
          {' '}
          pontos.
        </h2>

        <div className="feedback-scoreboard-button">
          <Link to="/">
            <button
              className="feedback-buttons"
              type="button"
              data-testid="btn-play-again"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

Scorebboard.propTypes = {
  user: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
    nome: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Scorebboard);
