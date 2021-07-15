import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions } from '../../actions';
import ComponentTime from './ComponentTime';
// Random questions https://stackoverflow.com/questions/59329807/react-map-function-return-one-item-at-random

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  const [enambe, setEnable] = useState(false);
  const [state, setState] = useState({ correctAnswer: '', wrongAnswer: '' });
  const renderOptionsQuetion = () => {
    const limitedTime = 1000;
    setTimeout(() => {
      dispatch(rquestQuestions());
    }, limitedTime);
  };
  useEffect(() => {
    renderOptionsQuetion();
  }, []);
  const renderLoading = () => <div>Loading...</div>;
  const setClassName = () => {
    setState({ correctAnswer: 'correct-answer', wrongAnswer: 'wrong-answer' });
  };
  const Button = () => (
    <button
      onClick={ () => setClassName() }
      disabled={ enambe }
      className={ state.correctAnswer }
      type="button"
      data-testid="correct-answer"
    >
      { questions[0].correct_answer }
    </button>
  );
  const renderResult = () => (
    <div className="question">
      <ComponentTime stateButtonsEnable={ setEnable } />
      <span data-testid="question-category">{ questions[0].category }</span>
      <span data-testid="question-text">{ questions[0].question }</span>
      { Button() }
      { questions[0].incorrect_answers.map((incorrects, index) => (
        <button
          onClick={ () => setClassName() }
          disabled={ enambe }
          className={ state.wrongAnswer }
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
        >
          { incorrects }
        </button>)) }
    </div>);
  return (questions[0] === undefined ? renderLoading() : renderResult());
};

export default RenderQuestion;
