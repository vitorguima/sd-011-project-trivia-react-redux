import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { questionsApi, createScore } from '../actions';
import { getQuestionApi } from '../services/getApi';
import Feedback from './Feedback';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      questionIndex: 0,
      timer: 30,
      nextBtn: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrivia();
    this.answerTimer();
  }

  async fetchTrivia() {
    const { questionsGame, token } = this.props;

    const questions = await getQuestionApi(token);
    questionsGame(questions);
  }

  answerTimer() {
    // para fazer essa função consultamos https://www.tabnine.com/code/javascript/functions/react-native/setInterval
    const { timer } = this.state;
    const time1000 = 1000;
    const time30000 = 30000;
    setInterval(() => {
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, time1000);
    setTimeout(() => {
      this.validateAnswer();
    }, time30000);
  }

  createGameDifficulty() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    const { difficulty } = questionsApiGames[questionIndex];
    let level = 0;
    const answerHard = 3;
    switch (difficulty) {
    case 'easy':
      level = 1;
      return level;
    case 'medium':
      level = 2;
      return level;
    case 'hard':
      level = answerHard;
      return level;
    default:
      return level;
    }
  }

  scorePoint() {
    const { timer } = this.state;
    const { addDispatchScore, score: totalScore, assertions } = this.props;
    const correctValue = 10;
    const valueDifficulty = this.createGameDifficulty();
    const score = totalScore + (correctValue + (timer * valueDifficulty));
    const totalAssertions = assertions + 1;
    addDispatchScore({ score, totalAssertions });
    localStorage.setItem('state', JSON.stringify({
      player: { score },
    }));
    this.validateAnswer();
  }

  addNextBtn() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const lastQuestion = 4;

    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          if (questionIndex >= lastQuestion) {
            history.push('/feedback');
          } else {
            this.setState({ questionIndex: questionIndex + 1, nextBtn: false });
            this.createQuestion();
            this.answerTimer();
            this.validateAnswer();
          }
        } }
      >
        Next
      </button>
    );
  }

  validateAnswer() {
    // para fazer essa função consultamos o link https://www.tabnine.com/academy/javascript/how-to-change-css-javascript/
    // e esse outro https://www.tabnine.com/academy/javascript/how-to-use-setattribute/
    const correctAlternativeButton = document.querySelector('.correct-answer');
    const wrongAlternativeButtons = document.querySelectorAll('.wrong-answer');

    const { nextBtn } = this.state;

    if (!nextBtn) {
      correctAlternativeButton.style.border = '3px solid rgb(6, 240, 15)';
      correctAlternativeButton.setAttribute('disabled', 'disabled');

      wrongAlternativeButtons.forEach((btn) => {
        btn.style.border = '3px solid rgb(255, 0, 0)';
        btn.setAttribute('disabled', 'disabled');
      });
      this.setState({
        nextBtn: true,
      });
    } else {
      correctAlternativeButton.style.border = '';
      correctAlternativeButton.removeAttribute('disabled');
      wrongAlternativeButtons.forEach((btn) => {
        btn.style.border = '';
        btn.removeAttribute('disabled');
      });
      this.setState({
        nextBtn: false,
      });
    }
  }

  createQuestion() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    if (questionsApiGames === undefined) {
      return <div>Carregando...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <h3 data-testid="question-text">{ question }</h3>
        <div>
          { this.createAlternatives(questionsApiGames[questionIndex]) }
        </div>
      </div>
    );
  }

  createAlternatives(question) {
    const answers = [question.correct_answer]
      .concat(question.incorrect_answers);

    console.log(answers);

    return answers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        value={ answer }
        data-testid={ question.correct_answer === answer
          ? 'correct-answer' : `wrong-answer-${index}` }
        className={ index === 0 ? 'correct-answer' : 'wrong-answer' }
        onClick={ question.correct_answer === answer
          ? this.scorePoint : this.validateAnswer }
      >
        { answer }
      </button>
    ));
  }

  render() {
    const { questionIndex, nextBtn } = this.state;
    const { questionsApiGames } = this.props;
    const indexCheck = 5;

    if (questionsApiGames === undefined) {
      return <div>Carregando...</div>;
    }

    return (
      <>
        <Feedback />
        <Link to="/feedback">
          <button
            type="button"
          >
            Feedback
          </button>
        </Link>
        { questionIndex < indexCheck ? this.createQuestion() : '' }
        {nextBtn ? this.addNextBtn() : '' }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsApiGames: state.questionsApi.questions.results,
  token: state.user.token,
  score: state.user.score,
  assertions: state.user.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  questionsGame: (payload) => dispatch(questionsApi(payload)),
  addDispatchScore: (payload) => dispatch(createScore(payload)),
});

GameScreen.propTypes = {
  questionsApi: PropTypes.object,
  createScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
