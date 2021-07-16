import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clickButton } from '../actions';

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
      buttonClick: false,
      rightBtnClicked: false,
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
        rightBtnClicked: true,
      }
      ));
    }
    this.setState(() => ({
      buttonClick: true,
    }));
  }

  render() {
    const { questions, loading, buttonDisable, updateClickButton } = this.props;
    const { results } = questions;
    const { buttonClick, rightBtnClicked } = this.state;
    const updateButtonState = { buttonClick, rightBtnClicked };
    updateClickButton(updateButtonState);
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="question-category">{ results[0].category }</p>
              <h4
                id="question"
                data-testid="question-text"
                difficulty={ results[0].difficulty }
              >
                { results[0].question }
              </h4>
              {/* <p className="difficulty">{ results[0].difficulty }</p> */}
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
  updateClickButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
  buttonDisable: state.triviaReducer.buttonDisable,
});

const mapDispatchToProps = (dispatch) => ({
  updateClickButton: (state) => dispatch(clickButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
