import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Game extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { questionsGame } = this.props;
    questionsGame();
  }
  renderQuestions(){
    const { questions: { allQuestions } } = this.props;
    if (allQuestions.length === 0) {
      return null
    }
    const currentIndex = 0;
    const currentQuestion = allQuestions[currentIndex];
    return (
      <div>
        <p data-testid="question-category">{currentQuestion.category}</p>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <button data-testid="correct-answer">{currentQuestion.correct_answer}</button>
        {
          currentQuestion.incorrect_answers.map((item, index) => (
            <button data-testid={`wrong-answer${index}`}>{item}</button>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  questionsGame: () => dispatch(actions.questionsGame()),
});

Game.propTypes = {
  questionsGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
