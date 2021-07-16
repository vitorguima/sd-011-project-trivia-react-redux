import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      status: true,
      statusAnswer: false,
      sec: 30,
      setTime: true,
      questionIndex: 0,
    };
    this.answers = this.answers.bind(this);
    this.wasClicked = this.wasClicked.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentDidMount() {
    this.updateTimer();
  }

  componentDidUpdate() {
    const { setTime, sec, statusAnswer } = this.state;
    if (sec <= 0 && !statusAnswer) {
      clearInterval(setTime);
      this.changeStatusAnswer();
    }
  }

  componentWillUnmount() {
    const { setTime } = this.state;
    clearInterval(setTime);
  }

  changeStatusAnswer() {
    this.setState({
      statusAnswer: true,
    });
  }

  updateTimer() {
    const interval = 1000;
    const setTime = setInterval(this.timer, interval);
    this.setState({
      setTime,
    });
  }

  timer() {
    const interval = 1000;
    setTimeout(() => {
      this.setState((previous) => ({
        sec: previous.sec - 1,
      }));
    }, interval);
    console.log('Estou executando ainda');
  }

  wasClicked() {
    const { setTime } = this.state;
    clearInterval(setTime);
    this.setState({
      statusAnswer: true,
      clicked: true,
      status: false,
    });
  }

  answers() {
    const { question } = this.props;
    const { clicked, statusAnswer, questionIndex } = this.state;
    const buttonClass1 = (clicked ? 'correctButton' : 'button');
    const buttonClass2 = (clicked ? 'wrongButton' : 'button');
    const correct = question[questionIndex].correct_answer;
    const incorrects = question[questionIndex].incorrect_answers;
    return [
      <button
        onClick={ () => this.wasClicked() }
        className={ buttonClass1 }
        type="button"
        data-testid="correct-answer"
        key="correct-answer"
        disabled={ statusAnswer }
      >
        {correct}
      </button>,
      incorrects.map((element, index) => (
        <button
          onClick={ () => this.wasClicked() }
          className={ buttonClass2 }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          disabled={ statusAnswer }
        >
          {element}
        </button>
      )),
    ].sort(console.log(Math.floor(Math.random() * incorrects.length)));
  }

  handleClickNext() {
    this.setState((previous) => ({
      sec: 30,
      setTime: true,
      statusAnswer: false,
      clicked: false,
      questionIndex: previous.questionIndex + 1,
    }), () => this.updateTimer());
  }

  render() {
    const { question } = this.props;
    const { status, sec, questionIndex } = this.state;
    return (
      <div>
        Pergunta
        <h2 data-testid="question-category">{ question[questionIndex].category }</h2>
        <h3 data-testid="question-text">{ question[questionIndex].question }</h3>
        { this.answers() }
        <br />
        <button
          type="button"
          disabled={ status }
          onClick={ this.handleClickNext }
        >
          Próxima Pergunta
        </button>
        <p>{ `00:${sec}` }</p>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
