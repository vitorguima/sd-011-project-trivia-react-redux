import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreAction } from '../actions';
import './styleButton.css';
import Answers from './Answers';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      stopTimer: false,
      answered: false,
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addScore = this.addScore.bind(this);
    this.addToRanking = this.addToRanking.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  startTimer() {
    const { timer, stopTimer, answered } = this.state;
    const oneSecond = 1000;

    if (!answered) {
      if (timer > 0) {
        setTimeout(() => this.setState({ timer: timer - 1 }), oneSecond);
      }
      if (timer === 0 && !stopTimer) {
        this.setState({ stopTimer: true, answered: true });
      }
    }
  }

  handleClick(correct = false) {
    this.setState({
      answered: true,
      stopTimer: true,
    });
    if (correct) this.addScore();
  }

  nextPage() {
    const { nextFunc } = this.props;
    this.setState({ timer: 30, answered: false });
    this.startTimer();
    nextFunc();
  }

  addScore() {
    const { timer } = this.state;
    const { newQuestion: { difficulty }, score } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const ten = 10;
    let newScore = 0;

    if (difficulty === 'easy') {
      newScore = (timer * easy) + ten;
    } else if (difficulty === 'medium') {
      newScore = (timer * medium) + ten;
    } else if (difficulty === 'hard') {
      newScore = (timer * hard) + ten;
    }
    const finalScore = score + newScore;
    this.saveScore(finalScore);
  }

  saveScore(finalScore) {
    const { updateScore } = this.props;
    const dataStorage = { ...JSON.parse(localStorage.getItem('state')) };
    dataStorage.player.score += finalScore;
    dataStorage.player.assertions += 1;
    updateScore(dataStorage.player.score);
    localStorage.setItem('state', JSON.stringify({ ...dataStorage }));
  }

  addToRanking() {
    const { ranking } = localStorage;
    const { username, score, avatar } = this.props;
    const player = { username, score, avatar };
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else {
      const sortRanking = [...JSON.parse(ranking), player]
        .sort((element, element2) => element2.score - element.score);
      localStorage.setItem('ranking', JSON.stringify(sortRanking));
    }
  }

  renderCondition() {
    const { index } = this.props;
    const { answered } = this.state;
    const four = 4;
    if (answered) {
      if (index >= four) {
        return (
          <Link to="/feedback" data-testid="btn-next" onClick={ this.addToRanking }>
            Próxima
          </Link>
        );
      }
      return (
        <button
          type="button"
          onClick={ this.nextPage }
          data-testid="btn-next"
        >
          Próxima
        </button>);
    }
  }

  render() {
    const { timer, answered } = this.state;
    const { newQuestion: { question, answers, category } } = this.props;
    return (
      <div>
        <span>{ timer }</span>
        <h1 data-testid="question-text">
          { question }
        </h1>
        <p data-testid="question-category">{ category }</p>
        <Answers answered={ answered } answers={ answers } onClick={ this.handleClick } />
        { this.renderCondition() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  score: state.user.score,
  avatar: state.user.avatar,
  assertions: state.user.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(scoreAction(score)),
});

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
  nextFunc: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  avatar: PropTypes.isRequired,
  username: PropTypes.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
