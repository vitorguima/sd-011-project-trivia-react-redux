import React from 'react';
import PropTypes from 'prop-types';

const QuestionDesc = ({ descQuestion }) => {
  const { category, question } = descQuestion;
  return (
    <>
      <span data-testid="question-category">{ category }</span>
      <span data-testid="question-text">{ question }</span>
    </>
  );
};

export default QuestionDesc;
QuestionDesc.propTypes = {
  descQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};
