import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { newGame } from '../actions';
import HeaderGame from '../components/HeaderGame';
import fetchAvatar from '../service/requestAvatar';
import { saveRankPlayer } from '../service/handleLocalStorage';

class Feedback extends Component {
  constructor() {
    super();
    this.state = { };
    this.resultQuestions = this.resultQuestions.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
  }

  async componentDidMount() {
    const { email, score, name } = this.props;
    const hashEmail = md5(email).toString();
    const avatarUrl = await fetchAvatar(hashEmail);
    this.setAvatar(avatarUrl);
    const { url } = this.state;
    saveRankPlayer(name, score, url);
  }

  setAvatar(url) {
    this.setState({
      url,
    });
  }

  resultQuestions() {
    const lessThree = 'Podia ser melhor...';
    const moreThree = 'Mandou bem!';
    const numberHits = 3;
    const { questions } = this.props;
    if (questions >= numberHits) {
      return (
        <h1 data-testid="feedback-text">
          {moreThree}
        </h1>);
    }
    return (
      <h1 data-testid="feedback-text">
        {lessThree}
      </h1>);
  }

  render() {
    const { score, questions, prepareNewGame } = this.props;
    return (
      <div>
        <HeaderGame />
        <div>
          {this.resultQuestions()}
        </div>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ questions }</p>
        <Link
          data-testid="btn-play-again"
          to="/"
          onClick={ () => prepareNewGame() }
        >
          Jogar novamente
        </Link>
        <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer, loginReducer }) => ({
  questions: gameReducer.correctAnswers,
  score: gameReducer.score,
  email: loginReducer.email,
  name: loginReducer.name,
});

const mapDispatchToProps = (dispatch) => ({
  prepareNewGame: () => dispatch(newGame()),
});

Feedback.propTypes = ({
  questions: PropTypes.string,
  store: PropTypes.number,
  prepareNewGame: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
