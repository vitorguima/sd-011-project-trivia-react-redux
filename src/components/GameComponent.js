import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameComponent extends Component {
  render() {
    const { questions, loading } = this.props;
    const { results } = questions;
    console.log(results);
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="question-category">{ results[0].category }</p>
              <h4 data-testid="question-text">{ results[0].question }</h4>
              <button
                data-testid="correct-answer"
                type="button"
              >
                { results[0].correct_answer }
              </button>
              { results[0].incorrect_answers.map((incorrect, indexKey) => (
                <button
                  data-testid={ `wrong-answer-${indexKey}` }
                  type="button"
                  key={ indexKey }
                >
                  {incorrect}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
});

export default connect(mapStateToProps)(GameComponent);
