
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import React from 'react';
import { connect } from 'react-redux';
import { apiQuestion } from '../actions';
import { takeQuestionsApi } from '../services/getApi';

import Header from '../components/Header';
import { questionsApi } from '../actions';
import { getQuestionApi } from '../services/getApi';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      questionIndex: 0,
      timer: 30,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
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

  validateAnswer() {
    // para fazer essa função consultamos o link https://www.tabnine.com/academy/javascript/how-to-change-css-javascript/
    // e esse outro https://www.tabnine.com/academy/javascript/how-to-use-setattribute/
    const correctAlternativeButton = document.querySelector('.correct-answer');
    const wrongAlternativeButtons = document.querySelectorAll('.wrong-answer');

    correctAlternativeButton.style.border = '3px solid rgb(6, 240, 15)';
    correctAlternativeButton.setAttribute('disabled', 'disabled');

    wrongAlternativeButtons.forEach((btn) => {
      btn.style.border = '3px solid rgb(255, 0, 0)';
      btn.setAttribute('disabled', 'disabled');
    });
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
        onClick={ this.validateAnswer }
      >
        { answer }
      </button>
    ));
  }


  render() {
    const { questionsApiGames } = this.props;
    const { questionIndex } = this.state;

    if (questionsApiGames === undefined) {
      return <div>Carregando...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];

    return (
      <>
        <Header />
        <div>
          <p data-testid="question-category">{ category }</p>
          <h3 data-testid="question-text">{ question }</h3>
          <div>
            { this.createAlternatives(questionsApiGames[questionIndex]) }
          </div>
        </div>
      </>
    );

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  async componentDidMount() {
    await this.fetchQuestion();
  }

  async fetchQuestion() {
    const { gameQuestion, token } = this.props
    const questions = await takeQuestionsApi(token);
    gameQuestion(questions); 
  }

  getAnswers(question) {
    const answers = question.incorrect_answers
      .concat(question.correct_aswers);
      return answers.map((answer, indexAnswer) => (
        <button
        type="button"
        key={ indexAnswer }
        value={ answer}
        data-testid={ question.correct_answers === answer
        ? 'corret-answer' : `wrong-answer-${indexAnswer}`}
        >
          { answer }
      </button>
      ));
  }

  render() {
    const { gameQuestionApi } = this.props;

    console.log(gameQuestionApi)

    return (
      <>
      <Header />
      { gameQuestionApi.map((question, index) => (
        <div key ={ index }>
          <span data-testid="question-category">{ question.category}</span>
          <p data-testid="question-text"> { question.question }</p>
          <div>
            { this.getAnswers(question) }
          </div>
        </div>
    )) }
    </>
    )

  }
}

const mapStateToProps = (state) => ({

  questionsApiGames: state.questionsApi.questions.results,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  questionsGame: (payload) => dispatch(questionsApi(payload)),
});

GameScreen.propTypes = {
  questionsApi: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

  gameQuestionApi: state.apiQuestion.questions.results,
  token: state.user.token,
})

const mapDispachToProps =( dispatch ) => ({
  gameQuestion: (payload) => dispatch(apiQuestion(payload)),
});



export default connect(mapStateToProps, mapDispachToProps)(GameScreen);
