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

  componentDidUpdate() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { assertions } = this.state;
    player.player.assertions = assertions;
    localStorage.setItem('state', JSON.stringify(player));
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
    const { questions, loading, buttonDisable, updateClickButton, count } = this.props;
    const { results } = questions;
    const { buttonClick, rightBtnClicked } = this.state;
    const updateButtonState = { buttonClick, rightBtnClicked };
    // const numberQuestion = JSON.parse(localStorage.getItem('numberQuestion'));
    // console.log(`Ver numero:${numberQuestion}`);
    updateClickButton(updateButtonState);
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="question-category">{ results[count].category }</p>
              <h4
                id="question"
                data-testid="question-text"
                difficulty={ results[count].difficulty }
              >
                { results[count].question }
              </h4>
              <button
                value="correct"
                data-testid="correct-answer"
                type="button"
                className="green-border"
                onClick={ (event) => this.colorSelectCorrect(event) }
                disabled={ buttonDisable }
              >
                { results[count].correct_answer }
              </button>
              { results[count].incorrect_answers.map((incorrect, indexKey) => (
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
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  loading: state.triviaReducer.isLoading,
  buttonDisable: state.triviaReducer.buttonDisable,
  count: state.triviaReducer.count,
});

const mapDispatchToProps = (dispatch) => ({
  updateClickButton: (state) => dispatch(clickButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
