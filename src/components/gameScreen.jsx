import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class gameScreen extends Component {
  constructor() {
    super();

    this.state = {
      question: 0,
      disabledButton: false,
    };
    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  colorSelectCorrect() {
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      element.classList.add('revel-color');
  }

  nextQuestion() {
    const { results } = this.props;
    const { question } = this.state;
    if (question < results.length - 1) {
      this.setState({
        question: question + 1,
        disabledButton: true,
      });
    }
  }

  render() {
    const { results } = this.props;
    const { question, disabledButton } = this.state;
    console.log(results);
    return (
      <div>
        {results.length > 0 ? (
          <div>
            <p data-testid="question-category">{results[question].category}</p>
            <p data-testid="question-text">{results[question].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              className="green-border"
              onClick={ () => this.colorSelectCorrect() }
            >
              {results[question].correct_answer}
            </button>
            {results[0].incorrect_answers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                >
                  {answer}
                </button>
              ))}
            </div>
          ) : (
            <p>Baixando Questões</p>
          )}
        </div>
        <div>
          {disabledButton ? (
            <div>
              <button
                data-testid="btn-next"
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className="red-border"
                onClick={ () => this.colorSelectCorrect() }
              >
                Próxima
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

gameScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
};
