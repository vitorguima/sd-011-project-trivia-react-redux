import React from 'react';

import '../styles/GameScreen.css';
import Header from './Header';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      triviaApi: '',
      questionNumber: 0,
      styles: ['', ''],
      disabledButton: false,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
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

  handleAnswer() {
    const styles = ['wrong-answer', 'correct-answer'];
    this.setState({
      styles,
      disabledButton: true,
    });
  }

  handleNextButton() {
    this.setState((prevState) => ({
      triviaApi: '',
      questionNumber: prevState.questionNumber + 1,
      styles: ['', ''],
      disabledButton: false,
    }));
  }

  render() {
    const { triviaApi: { results }, questionNumber, styles, disabledButton } = this.state;
    return (
      <>
        <Header />
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
              >
                {answer}
              </button>
            ))}
            <button
              type="button"
              data-testid="correct-answer"
              className={ styles[1] }
              onClick={ () => this.handleAnswer() }
            >
              {results[questionNumber].correct_answer}
            </button>
            {disabledButton ? (
              <div>
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.handleNextButton }
                >
                  Próxima
                </button>
              </div>
            ) : null}
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
