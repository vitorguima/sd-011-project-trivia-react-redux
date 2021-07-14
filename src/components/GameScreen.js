import React from 'react';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      triviaApi: '',
      questionNumber: 0,
    };
  }

  componentDidMount() {
    // const token = 'c22e2d3b964b441ca0149cf174921a4086869e04c0bf7f66c8f030cce6ffb2bd';
    const tokenID = localStorage.getItem(token);
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenID}`)
      .then((response) => response.json()
        .then((triviaApi) => this.setState({
          triviaApi,
        }))).catch((error) => this.setState({
        triviaApi: error,
      }));
  }

  render() {
    const { triviaApi: { results }, questionNumber } = this.state;
    // let answers = [];
    // if (results) {
    //   answers = [...results[questionNumber].incorrect_answers, results[questionNumber].correct_answer];
    // }
    // console.log(answers);
    return results ? (
      <div>
        <h4 data-testid="question-category">{results[questionNumber].category}</h4>
        <p data-testid="question-text">{results[questionNumber].question}</p>
        { results[questionNumber].incorrect_answers.map((answer, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            {answer}
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
        >
          {results[questionNumber].correct_answer}
        </button>
      </div>
    ) : (
      <div>
        <h4 data-testid="question-category">carregando..</h4>
        <p data-testid="question-text">...</p>
      </div>
    );
  }
}

export default GameScreen;
