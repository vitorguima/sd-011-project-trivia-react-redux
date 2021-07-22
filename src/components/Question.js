import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import AnswerButtons from './AnswerButtons';

class Question extends Component {
  constructor(props) {
    super(props);
    this.getAnswers = this.getAnswers.bind(this);
    this.randomAnswers = this.randomAnswers.bind(this);
    this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
    this.colorizeAnswers = this.colorizeAnswers.bind(this);
  }

  getAnswers() {
    const { eachResult } = this.props;
    const answers = [];
    if (eachResult) {
      eachResult.incorrect_answers.forEach((inc) => answers.push(inc));
      const cor = eachResult.correct_answer;
      answers.push(cor);
    }
    return answers;
  }

  getCorrectAnswer() {
    const { eachResult } = this.props;
    const correctAnswer = eachResult ? eachResult.correct_answer : null;
    return correctAnswer;
  }

  randomAnswers() {
    const answers = this.getAnswers();
    if (answers.length > 0) {
      const arrayReceived = answers;
      const newArray = [];
      while (arrayReceived.length > 0) {
        const indexLength = arrayReceived.length;
        const randomIndex = Math.ceil(Math.random() * indexLength);
        const elementSelected = arrayReceived[randomIndex - 1];
        const indexOfElementSelected = arrayReceived.indexOf(elementSelected);
        newArray.push(elementSelected);
        arrayReceived.splice(indexOfElementSelected, 1);
      }
      return newArray;
    }
  }

  colorizeAnswers() {
    const answers = document.getElementsByClassName('answer');
    const answersArray = Object.values(answers);
    const correctAnswer = this.getCorrectAnswer();
    answersArray.forEach((answer) => {
      if (answer.innerHTML === correctAnswer) {
        answer.className = 'correct-answer';
      } else {
        answer.className = 'wrong-answer';
      }
    });
  }

  render() {
    const { eachResult } = this.props;
    const correctAnswer = this.getCorrectAnswer();
    const randomAnswers = this.randomAnswers();
    return (
      <section>
        { eachResult
          ? <h3 data-testid="question text">{ eachResult.question }</h3>
          : null }
        { eachResult ? randomAnswers.map((answer, index) => (
          <AnswerButtons
            difficulty={ eachResult.difficulty }
            answer={ answer }
            key={ `chave ${index}` }
            correctAnswer={ correctAnswer }
            colorizeAnswers={ this.colorizeAnswers }
          />
        ))
          : null }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
  questionIndex: state.questionHandlers.questionIndex,
});

export default connect(mapStateToProps)(Question);

Question.propTypes = {
  questions: PropTypes.array,
}.isRequired;
