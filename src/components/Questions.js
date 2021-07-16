import React from 'react';
import PropTypes from 'prop-types';
import './styleButton.css';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
    };
    this.answerFunc = this.answerFunc.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  answerFunc() {
    this.setState((state) => ({ answered: !state.answered }));
  }

  nextPage() {
    const { nextFunc } = this.props;
    this.answerFunc();
    nextFunc();
  }

  render() {
    const { answered } = this.state;
    const { newQuestion:
      { question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers,
        category,
      } } = this.props;
    const randomAnswers = [correctAnswer, ...incorrectAnswers]
      .map((a) => ({ s: Math.random(), v: a })).sort((a, b) => a.s - b.s).map((a) => a.v);
    return (
      <div>
        <h1 data-testid="question-text">
          { question }
        </h1>
        <p data-testid="question-category">{ category }</p>
        {randomAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
                onClick={ this.answerFunc }
                className={ answered ? 'right' : 'white' }
              >
                {answer}
              </button>
            );
          }
          return (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              className={ answered ? 'wrong' : 'white' }
              onClick={ this.answerFunc }
            >
              {answer}
            </button>
          );
        })}
        {
          (answered) && (
            <button type="button" onClick={ this.nextPage } data-testid="btn-next">
              Próxima
            </button>
          )
        }
      </div>
    );
  }
}

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
  nextFunc: PropTypes.isRequired,
};

export default Question;
