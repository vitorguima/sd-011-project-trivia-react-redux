import React from 'react';
import { Redirect } from 'react-router-dom';
import ClockComponent from './ClockComponent';

const renderLink = () => {
  const { questions, loading, buttonDisable, updateClickButton } = this.props;
  const { results } = questions;
  const { buttonClick, rightAnswerClicked, index } = this.state;
  const updateButtonState = { buttonClick, rightAnswerClicked };
  updateClickButton(updateButtonState);
  if (index === results.length) {
    return (<Redirect to="/feedback" />);
  }
  return (
    <div>
      <p data-testid="question-category">{ results[index].category }</p>
      <h4
        id="question"
        data-testid="question-text"
        difficulty={ results[index].difficulty }
      >
        { results[index].question }
        {console.log(this.props)}
      </h4>
      <button
        value="correct"
        data-testid="correct-answer"
        type="button"
        className="green-border"
        onClick={ (event) => this.colorSelectCorrect(event) }
        disabled={ buttonDisable }
      >
        { results[index].correct_answer }
      </button>
      { results[index].incorrect_answers.map((incorrect, indexKey) => (
        <button
          data-testid={ `wrong-answer-${indexKey}` }
          type="button"
          key={ indexKey }
          className="red-border"
          onClick={ (event) => { this.colorSelectCorrect(event); } }
          disabled={ buttonDisable }
        >
          {incorrect}
        </button>
      ))}
      <ClockComponent nextQuestion={ this.nextQuestion } />
    </div>
  );
};
export default renderLink();
