import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const time = 30000;
    const interval = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, interval);
    setTimeout(() => {
      this.validateAnswer();
    }, time);
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
