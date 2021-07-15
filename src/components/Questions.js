import React from 'react';

class Question extends React.Component {
  render() {
    const { newQuestion } = this.props;
    const { question, correct_answer, incorrect_answers } = newQuestion;
    const randonAnswer = [ correct_answer, ...incorrect_answers ];
    return (
      <h1>
        { question }
        
      </h1>
    );
  }
}

export default Question;
