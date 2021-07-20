import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { ranking } from '../actions';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToRaning: false,
    };

    this.toRankingReducer = this.toRankingReducer.bind(this);
  }

  getEmailWithHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  toRankingReducer() {
    const { player: { name, score, gravatarEmail }, toRanking } = this.props;
    const picture = this.getEmailWithHash(gravatarEmail);
    const data = { name, score, picture };
    toRanking(data);
    this.setState({
      redirectToRaning: true,
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

  render() {
    const { player: { score, assertions } } = this.props;
    const { redirectToRaning } = this.state;
    if (redirectToRaning) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.assertionsAnswer() }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ this.toRankingReducer }
        >
          Jogar novamente
        </button>
        <Link data-testid="btn-ranking" to="/ranking">Ver ranking</Link>
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
  toRanking: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }).isRequired,
};

export default connect(mapDispatchToProps, mapStateToProps)(Feedback);
