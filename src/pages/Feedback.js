import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { ranking } from '../actions';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToRanking: false,
      redirectToLogin: false,
    };

    this.toRankingReducer = this.toRankingReducer.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  getEmailWithHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  toRankingReducer(event) {
    event.preventDefault();
    const { player: { name, score, gravatarEmail }, toRanking } = this.props;
    const picture = this.getEmailWithHash(gravatarEmail);
    const data = { name, score, picture };
    console.log(data);
    toRanking(data);
    this.setState({
      redirectToRanking: true,
    });
  }

  assertionsAnswer() {
    const { player: { assertions } } = this.props;
    const n = 3;
    if (assertions >= n) {
      return 'Mandou bem!';
    }
    if (assertions < n) {
      return 'Podia ser melhor...';
    }
  }

  playAgain(event) {
    event.preventDefault();
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    const { player: { score, assertions } } = this.props;
    console.log(score);
    const { redirectToRanking, redirectToLogin } = this.state;
    if (redirectToRanking) return <Redirect to="/ranking" />;
    if (redirectToLogin) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        <div className="Feedback">
          <p data-testid="feedback-text">{ this.assertionsAnswer() }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
          <button
            type="submit"
            data-testid="btn-ranking"
            onClick={ this.toRankingReducer }
          >
            Ver Ranking
          </button>
          <button
            type="submit"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.playerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  toRanking: (payload) => dispatch(ranking(payload)),
});

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  toRanking: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
