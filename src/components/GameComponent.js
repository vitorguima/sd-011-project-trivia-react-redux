import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { questions, loading } = this.props;
    const { results } = questions;

    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div className="container-questions">
              <p data-testid="question-category">{ results[0].category }</p>
              <h4 data-testid="question-text">{ results[0].question }</h4>
              <div className="buttonContainer">
                <button
                  className="button"
                  data-testid="correct-answer"
                  type="button"
                  onClick={ (event) => this.colorSelectCorrect(event) }
                >
                  { results[0].correct_answer }
                </button>
                { results[0].incorrect_answers.map((incorrect, indexKey) => (

                  <button
                    className="button"
                    key={ indexKey }
                    data-testid={ `wrong-answer-${indexKey}` }
                    type="button"
                    onClick={ (event) => this.colorSelectIncorrect(event) }
                  >
                    {incorrect}
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

GameComponent.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
});

export default connect(mapStateToProps)(GameComponent);
