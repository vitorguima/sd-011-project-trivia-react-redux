import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions } from '../../actions';

const RenderQuestion = () => {
  const dispatch = useDispatch();
  // Random questions https://stackoverflow.com/questions/59329807/react-map-function-return-one-item-at-random
  useEffect(() => {
    renderOptionsQuetion();
  }, []);

  const { questions } = useSelector(({ questionsArray }) => questionsArray);

  const renderOptionsQuetion = () => {
    setTimeout(() => {
      dispatch(rquestQuestions());
    }, 1000);   
  };

  const renderLoading = () => {
    return <div>Loading...</div>
  };

  const renderResult = () => {
    return <div className="question">
    <span data-testid="question-category">{ questions[0].category }</span>
    <span data-testid="question-text">{ questions[0].question }</span>
    <button type="button" data-testid="correct-answer">{ questions[0].correct_answer }</button>
    { questions[0].incorrect_answers.map((incorrects, index) =>
    <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
    { incorrects }</button>) }
  </div>;
  }

  return ( questions[0] === undefined ? renderLoading() : renderResult());
};

export default RenderQuestion;
