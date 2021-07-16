import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Timer from './Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      questionIndex: 0,
    };
    this.handleClickAndTimeOut = this.handleClickAndTimeOut.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleClickAndTimeOut() {
    this.setState({
      answered: true,
    });
  }

  handleNext() {
    const { questions: { allQuestions } } = this.props;
    this.setState((prevState) => ({
      questionIndex: (prevState.questionIndex + 1) % allQuestions.length,
      answered: false,
    }));
  }

  renderQuestions() {
    const { questions: { allQuestions } } = this.props;
    const { answered } = this.state;
    if (allQuestions.length === 0) {
      return null;
    }
    const currentIndex = 0;
    const currentQuestion = allQuestions[currentIndex];
    const correctAnswerClassName = answered ? {
      border: '3px solid rgb(6, 240, 15)',
    } : {};
    const wrongAnswerClassName = answered ? {
      border: '3px solid rgb(255, 0, 0)',
    } : '';
    return (
      <div>
        <p data-testid="question-category">{ currentQuestion.category }</p>
        <p data-testid="question-text">{ currentQuestion.question }</p>
        <button
          disabled={ answered }
          style={ { ...correctAnswerClassName } }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClickAndTimeOut }
        >
          { currentQuestion.correct_answer }
        </button>
        {
          currentQuestion.incorrect_answers.map((item, index) => (
            <button
              disabled={ answered }
              style={ { ...wrongAnswerClassName } }
              type="button"
              key={ index }
              data-testid={ `wrong-answer${index}` }
              onClick={ this.handleClickAndTimeOut }
            >
              { item }
            </button>
          ))
        }
        { answered && (
          <button type="button" data-testid="btn-next" onClick={ this.handleNext }>
            Próxima
          </button>) }
        { !answered && <Timer handleClickAndTimeOut={ this.handleClickAndTimeOut } /> }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderQuestions() }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.player.token,
});

Game.propTypes = {
  questions: PropTypes.shape({
    allQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Game);
