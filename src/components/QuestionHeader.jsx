import React from 'react';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/9244824/how-to-remove-quot-from-my-json-in-javascript/39619252
function decodeHtml(html) {
  const areaElement = document.createElement('textarea');
  areaElement.innerHTML = html;

  return areaElement.value;
}

class QuestionHeader extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <header>
        <div data-testid="question-category">
          { question.category }
        </div>
        <div data-testid="question-text">
          { decodeHtml(question.question) }
        </div>
      </header>
    );
  }
}

QuestionHeader.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default QuestionHeader;
