import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styleButton.css';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      stopTimer: false,
      answered: false,
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  startTimer() {
    const { timer, stopTimer, answered } = this.state;
    const oneSecond = 1000;

    if (!answered) {
      if (timer > 0) {
        setTimeout(() => this.setState({ timer: timer - 1 }), oneSecond);
      }
      if (timer === 0 && !stopTimer) {
        this.setState({ stopTimer: true, answered: true });
      }
    }
  }

  handleClick() {
    this.setState({
      answered: true,
      stopTimer: true,
    });
  }

  nextPage() {
    const { nextFunc } = this.props;
    this.setState({ timer: 30, answered: false });
    this.startTimer();
    nextFunc();
  }

  render() {
    const { timer, answered } = this.state;
    const { newQuestion: { question, answers, category } } = this.props;
    return (
      <div>
        <span>{ timer }</span>
        <h1 data-testid="question-text">
          { question }
        </h1>
        <p data-testid="question-category">{ category }</p>
        { answers.map(({ answer, correct }, index) => {
          if (correct) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
                disabled={ answered }
                onClick={ this.handleClick }
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
              disabled={ answered }
              className={ answered ? 'wrong' : 'white' }
              onClick={ this.handleClick }
            >
              {answer}
            </button>
          );
        }) }
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
