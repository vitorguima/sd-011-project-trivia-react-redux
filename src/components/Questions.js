import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Timer from './Timer';
import { getStorage } from '../services/API';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: props,
      next: false,
      index: 0,
      isValid: false,
      value: false,
      restart: true,
      isToggleOn: false };

    this.randAnswers = this.randAnswers.bind(this);
    this.listenerChange = this.listenerChange.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.changeState = this.changeState.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  randAnswers(correct, incorrect) {
    const incorrectAnsers = [...incorrect];
    const random = Math.floor(Math.random() * ((incorrectAnsers.length - 1) + 1));
    const swap = incorrectAnsers[random];
    incorrectAnsers.splice(random, 0);
    incorrectAnsers[random] = correct;
    return [...incorrectAnsers, swap];
  }

  listenerChange() {
    this.setState({ isValid: true, isToggleOn: true });
  }

  changeState(state) {
    this.setState({ value: false });
    const { difficulty, answer } = this.state;
    const timer = state;
    const result = 0;
    this.calcScore(result, timer, difficulty, answer);
  }

  nextQuestion() {
    const { index } = this.state;
    const prev = index;
    this.setState({ index: prev + 1,
      next: false,
      isValid: false,
      isToggleOn: false,
      restart: true });
  }

  calcScore(result, timer, difficulty, answer) {
    const exactAnswer = 10;
    const magicNumber3 = 3;
    const { player: { gravatarEmail, name,
      score: prev, assertions } } = getStorage();
    let assert = assertions;
    if (answer['data-testid'] === 'correct-answer') {
      if (difficulty === 'easy') {
        result = exactAnswer + (timer * 1) + prev;
      } else if (difficulty === 'medium') {
        result = exactAnswer + (timer * 2) + prev;
      } else if (difficulty === 'hard') {
        result = exactAnswer + (timer * magicNumber3) + prev;
      }
      assert += 1;
    } else {
      result = prev;
    }
    const { scoreValue } = this.props;
    scoreValue(result);
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: assert,
        score: result,
        gravatarEmail },
    }));
  }

  sumScore(answer, difficulty) {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    this.setState({ value: true, next: true, difficulty, answer, restart: false });
  }

  render() {
    const { array, index, next, restart,
      isValid, value, isToggleOn } = this.state;
    const limit = 5;
    if (index === limit) return <Redirect to="/feedback" />;
    return (
      <div>
        <h3 data-testid="question-category">{array[index].category}</h3>
        <h3 data-testid="question-text">{array[index].question}</h3>
        {this.randAnswers(array[index].correct_answer,
          array[index].incorrect_answers).map((answer, idx) => {
          const checkColor = answer === array[index].correct_answer
            ? '3px solid rgb(6, 240, 15)'
            : '3px solid rgb(255, 0, 0)';
          const test = answer === array[index].correct_answer
            ? 'correct-answer' : `wrong-answer-${idx}`;
          const dataTestId = { 'data-testid': test };
          return (
            <button
              style={ { border: `${next ? checkColor : ''}` } }
              key={ answer }
              type="button"
              { ...dataTestId }
              disabled={ isValid }
              onClick={ () => this.sumScore(dataTestId, array[index].difficulty) }
            >
              {answer}
            </button>
          );
        })}
        <Timer
          scoreValue={ this.listenerChange }
          stopTimer={ this.changeState }
          stop={ value }
          restart={ restart }
        />
        { isToggleOn ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>) : null }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default Questions;
