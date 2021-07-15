import React from 'react';

import '../styles/GameScreen.css';
import Header from './Header';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.time = 0;
    this.state = {
      triviaApi: '',
      questionNumber: 0,
      styles: ['', ''],
      timer: 30,
      disabledButton: false,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
  }

  componentDidMount() {
    const tokenID = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenID}`)
      .then((response) => response.json()
        .then((triviaApi) => this.setState({
          triviaApi,
        }))).catch((error) => this.setState({
        triviaApi: error,
      }));
  }

  componentDidUpdate() {
    const oneSecond = 1000;
    const { timer, disabledButton } = this.state;
    if (!disabledButton && timer > 0) {
      this.time = setTimeout(() => {
        this.setState((lastState) => ({
          timer: lastState.timer - 1,
        }));
      }, oneSecond);
    }
  }

  handleAnswer() {
    const styles = ['wrong-answer', 'correct-answer'];
    this.setState({
      styles,
      disabledButton: true,
    });
    clearTimeout(this.time);
  }

  checkTimer() {
    const { timer, disabledButton } = this.state;
    if (timer === 0 && !disabledButton) {
      this.handleAnswer();
    }
  }

  render() {
    const { triviaApi: { results },
      questionNumber,
      styles,
      timer,
      disabledButton } = this.state;
    this.checkTimer();
    return (
      <>
        <Header />
        <span>{`Timer: ${timer}`}</span>
        {results ? (
          <div>
            <h4 data-testid="question-category">{results[questionNumber].category}</h4>
            <p data-testid="question-text">{results[questionNumber].question}</p>
            { results[questionNumber].incorrect_answers.map((answer, index) => (
              <button
                type="button"
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                className={ styles[0] }
                onClick={ () => this.handleAnswer() }
                disabled={ disabledButton }
              >
                {answer}
              </button>
            ))}
            <button
              type="button"
              data-testid="correct-answer"
              className={ styles[1] }
              onClick={ () => this.handleAnswer() }
              disabled={ disabledButton }
            >
              {results[questionNumber].correct_answer}
            </button>
          </div>
        ) : (
          <div>
            <h4 data-testid="question-category">carregando..</h4>
            <p data-testid="question-text">...</p>
          </div>
        )}
      </>
    );
  }
}

export default GameScreen;
