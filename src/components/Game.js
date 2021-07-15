import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Game extends React.Component {
  renderQuestions() {
    const { questions: { allQuestions } } = this.props;
    if (allQuestions.length === 0) {
      return null;
    }
    const currentIndex = 0;
    const currentQuestion = allQuestions[currentIndex];
    return (
      <div>
        <p data-testid="question-category">{currentQuestion.category}</p>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {currentQuestion.correct_answer}
        </button>
        {
          currentQuestion.incorrect_answers.map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer${index}` }
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Game);
