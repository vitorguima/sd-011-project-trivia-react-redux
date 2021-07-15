import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions } from '../../actions';

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const renderOptionsQuetion = () => {
    const limitedTime = 1000;

    setTimeout(() => {
      dispatch(rquestQuestions());
    }, limitedTime);
  };

  const [state, setState] = useState({ correctAnswer: '', wrongAnswer: '' });

  useEffect(() => {
    renderOptionsQuetion();
  }, []);

  const { questions } = useSelector(({ questionsArray }) => questionsArray);

  const renderLoading = () => <div>Loading...</div>;

  const setClassName = () => {
    setState({ correctAnswer: 'correct-answer', wrongAnswer: 'wrong-answer' });
  };
  
  const renderResult = () => (
    <div className="question">
      <span data-testid="question-category">{ questions[0].category }</span>
      <span data-testid="question-text">{ questions[0].question }</span>
      <button
        onClick={ () => setClassName() }
        className={ state.correctAnswer }
        type="button"
        data-testid="correct-answer"
      >
        { questions[0].correct_answer }
      </button>
      { questions[0].incorrect_answers.map((incorrects, index) => (
        <button
          onClick={ () => setClassName() }
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
