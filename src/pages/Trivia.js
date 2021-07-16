import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      gameQuestions: [],
    };
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
  }

  handleQuestions() {
    fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`)
      .then((response) => response.json())
      .then((resolve) => this.setState({ gameQuestions: resolve.results }));
  }

  render() {
    const { gameQuestions } = this.state;
    return (
      <>
        <header>
          <img data-testid="header-profile-picture" alt="profile " />
          <h2 data-testid="header-player-name">{ localStorage.getItem('state') }</h2>
          <h2 data-testid="header-score">0</h2>
        </header>
        <section>
          { gameQuestions.map((question, index) => (
            <div key={ index }>
              <h3 data-testid="question-category">{question.category}</h3>
              <h3 data-testid="question-text">{question.question}</h3>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {question.correct_answer}
              </button>
              { question.incorrect_answers.map((incorrect, key) => (
                <button
                  type="button"
                  key={ key }
                  data-testid={ `wrong-answer-${index}` }
                >
                  { incorrect }
                </button>
              ))}
            </div>
          ))}
        </section>
      </>
    );
  }
}

export default connect()(Trivia);
