import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      assertions: 0,
      isCorrect: '',
      isIncorrect: '',
      disable: false,
      questionIndex: 0,
      timer: 30,
      endTime: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  componentDidMount() {
    const timeout = 1000;
    this.countdown = setInterval(this.handleTimer, timeout);
  }

  setDifficulty() {
    const difficulty = document.querySelector('.difficulty').innerText;
    console.log(difficulty);
    let points = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (difficulty === 'easy') points = easy;
    else if (difficulty === 'medium') points = medium;
    else if (difficulty === 'hard') points = hard;
    return points;
  }

  setScore() {
    const { timer, score, assertions } = this.state;
    const magicNumber = 10;
    let scoreTotal = score;
    let assertionsTotal = assertions;
    const levelQuestion = this.setDifficulty();
    scoreTotal += magicNumber + (timer * levelQuestion);
    assertionsTotal += 1;
    this.setState({
      score: scoreTotal,
      assertions: assertionsTotal,
    }, () => {
      const playerStorage = JSON.parse(localStorage.getItem('state'));
      playerStorage.player.score = scoreTotal;
      playerStorage.player.assertions = assertionsTotal;
      const storeObj = playerStorage;
      localStorage.setItem('state', JSON.stringify(storeObj));
    });
  }

  handleGravatar() {
    const { email } = this.props;
    return md5(email).toString();
  }

  handleClick({ target }) {
    if (target.value === 'correct_answer') {
      this.setScore();
    }
    this.setState({
      isCorrect: 'correct',
      isIncorrect: 'incorrect',
      disable: true,
      endTime: true,
    });
    clearInterval(this.countdown);
  }

  handleTimer() {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({
        isCorrect: 'correct',
        isIncorrect: 'incorrect',
        disable: true,
        endTime: true,
      });
      clearInterval(this.countdown);
    } else {
      this.setState({ timer: timer - 1 });
    }
  }

  handleNextQuestion() {
    let { questionIndex } = this.state;
    const maxQuestions = 5;
    if (questionIndex < maxQuestions) {
      this.setState({
        questionIndex: questionIndex += 1,
        timer: 30,
        endTime: false,
        isCorrect: '',
        isIncorrect: '',
        disable: false,
      }, () => {
        const timeout = 1000;
        this.countdown = setInterval(this.handleTimer, timeout);
      });
    }
  }

  renderHeader() {
    const { name } = this.props;
    const { score } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
          alt="Gravatar"
        />
        <h2 data-testid="header-player-name">
          Usuário:
          { name }
        </h2>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }

  renderNextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        próxima
      </button>
    );
  }

  render() {
    const { questions } = this.props;
    const { isCorrect, isIncorrect,
      questionIndex, disable, timer, endTime } = this.state;
    return (
      <main>
        {this.renderHeader()}
        <section>
          {questions && questions.map((question, index) => (
            <div key={ index }>
              <h2 data-testid="question-category">{ question.category }</h2>
              <p className="difficulty">{question.difficulty}</p>
              <p data-testid="question-text">{ question.question }</p>
              {[...question.incorrect_answers, question.correct_answer]
                .map((ans, i) => (
                  <button
                    data-testid={ ans === question.correct_answer
                      ? 'correct-answer' : `wrong-answer-${i}` }
                    type="button"
                    value={ ans === question.correct_answer
                      ? 'correct_answer' : 'wrong-answer' }
                    key={ i }
                    className={ ans === question.correct_answer
                      ? isCorrect : isIncorrect }
                    disabled={ disable }
                    onClick={ this.handleClick }
                  >
                    { ans }
                  </button>))}
            </div>
          ))[questionIndex]}
        </section>
        {endTime && this.renderNextButton()}
        <p>
          00:
          {timer}
        </p>
      </main>
    );
  }
}

Questions.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  questions: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

Questions.defaultProps = {
  email: '',
  name: '',
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Questions);
