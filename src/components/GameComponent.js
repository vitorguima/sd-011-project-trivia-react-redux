import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
    };
    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
  }

  colorSelectCorrect({ target }) {
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      element.classList.add('revel-color');
    });
    if (target.value === 'correct') {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }
      ));
    }
  }

  render() {
    const { questions, loading, buttonDisable } = this.props;
    const { results } = questions;
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="question-category">{ results[0].category }</p>
              <h4 data-testid="question-text">{ results[0].question }</h4>
              <button
                value="correct"
                data-testid="correct-answer"
                type="button"
                className="green-border"
                onClick={ (event) => this.colorSelectCorrect(event) }
                disabled={ buttonDisable }
              >
                { results[0].correct_answer }
              </button>
              { results[0].incorrect_answers.map((incorrect, indexKey) => (
                <button
                  data-testid={ `wrong-answer-${indexKey}` }
                  type="button"
                  key={ indexKey }
                  className="red-border"
                  onClick={ (event) => this.colorSelectCorrect(event) }
                  disabled={ buttonDisable }
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

GameComponent.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
  buttonDisable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
  buttonDisable: state.triviaReducer.buttonDisable,
});

export default connect(mapStateToProps)(GameComponent);
