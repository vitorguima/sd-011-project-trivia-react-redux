import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
    };
    this.handleAnsweredQuestion = this.handleAnsweredQuestion.bind(this);
  }

  handleAnsweredQuestion() {
    this.setState({
      answered: true,
    });
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
        <p data-testid="question-category">{currentQuestion.category}</p>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <button
          style={ { ...correctAnswerClassName } }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleAnsweredQuestion }
        >
          {currentQuestion.correct_answer}
        </button>
        {
          currentQuestion.incorrect_answers.map((item, index) => (
            <button
              style={ { ...wrongAnswerClassName } }
              type="button"
              key={ index }
              data-testid={ `wrong-answer${index}` }
              onClick={ this.handleAnsweredQuestion }
            >
              {item}
            </button>
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
  token: state.player.token,
});

Game.propTypes = {
  questions: PropTypes.shape({
    allQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Game);
