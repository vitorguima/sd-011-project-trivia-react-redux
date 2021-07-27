import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, addPoint } from '../actions';
import './Play.css';

const timerStart = 30;

class Play extends Component {
  constructor() {
    super();

    this.state = {
      count: timerStart,
      qIndex: 0,
      assertions: 0,
      answered: false,
      answers: [],
    };

    this.initialFetch = this.initialFetch.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderNxtBtn = this.renderNxtBtn.bind(this);
    this.setLocal = this.setLocal.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
    const oneSecond = 1000;
    this.myInterval = setInterval(() => {
      const { count, answered } = this.state;
      if (count > 0 && !answered) {
        this.setState((state) => ({
          ...state,
          count: count - 1,
        }));
      } else if (!answered) {
        console.log('click');

        const wrongBtn = document.querySelector('.wrong');
        wrongBtn.click();
      }
    }, oneSecond);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  setLocal() {
    const { name, email, score } = this.props;
    const { assertions } = this.state;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  async initialFetch() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
    const { questions } = this.props;
    const answers = questions.reduce((allAnswers, question) => {
      const currAnswers = [question.correct_answer, ...question.incorrect_answers];
      this.shuffleArray(currAnswers);
      return [...allAnswers, currAnswers];
    }, []);
    await this.setState(() => ({
      answers,
    }));
  }

  async handleCorrect(event) {
    event.preventDefault();
    const { addScore, questions } = this.props;
    const { qIndex, count } = this.state;
    const currQuestion = questions[qIndex];
    const { className } = event.target;
    const btns = document.querySelectorAll('button.correct, button.wrong');
    btns.forEach((btn) => {
      btn.classList.add('revealed');
    });
    const difficulty = () => {
      const three = 3;
      switch (currQuestion.difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return three;
      default:
        return 0;
      }
    };
    if (className === 'correct') {
      const ten = 10;
      const points = ten + (count * difficulty());
      await addScore(points);
      await this.setState((state) => ({
        assertions: state.assertions + 1,
      }));
    }
    this.setState(() => ({
      answered: true,
    }));
    this.setLocal();
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { qIndex } = this.state;
    if (qIndex < questions.length - 1) {
      this.setState((state) => ({
        count: timerStart,
        qIndex: state.qIndex + 1,
        answered: false,
      }));
    } else {
      history.push('/Feedback');
    }
  }

  renderNxtBtn() {
    return (
      <button
        type="submit"
        onClick={ this.nextQuestion }
        data-testid="btn-next"
        className="my-next-btn"
      >
        Next
      </button>
    );
  }

  renderQuestion() {
    const { questions } = this.props;
    const { qIndex, answered, answers } = this.state;
    const currQuestion = questions[qIndex];
    const correctA = currQuestion.correct_answer;
    const initialIndex = -1;
    let index = initialIndex;
    if (answers.length !== 0) {
      return (
        <div className="question-cont">
          <span data-testid="question-category">{ currQuestion.category }</span>
          <p data-testid="question-text">{ currQuestion.question }</p>
          <div className="answers-cont">
            {answers[qIndex].map((answer) => {
              if (answer === correctA) {
                return (
                  <button
                    key={ answer }
                    type="submit"
                    data-testid="correct-answer"
                    className="correct"
                    disabled={ answered }
                    onClick={ this.handleCorrect }
                  >
                    { answer }
                  </button>
                );
              }
              index += 1;
              return (
                <button
                  key={ answer }
                  type="submit"
                  data-testid={ `wrong-answer-${index}` }
                  className="wrong"
                  disabled={ answered }
                  onClick={ this.handleCorrect }
                >
                  { answer }
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  }

  render() {
    const { questions, score, name } = this.props;
    const { answered, count } = this.state;
    const carr = <span>Carregando</span>;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic" />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <div className="play-cont">
          <div className="timer">{count}</div>
          { questions.length ? this.renderQuestion() : carr }
          { (answered) ? this.renderNxtBtn() : '' }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
  questions: state.questions.questions,
  score: state.questions.score,
  name: state.userReducer.name,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (state) => dispatch(fetchQuestions(state)),
  addScore: (state) => dispatch(addPoint(state)) });

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
