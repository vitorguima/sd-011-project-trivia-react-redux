import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { clickButton, requestTime, sendScore } from '../actions';
import ClockComponent from './ClockComponent';

class QuestionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
      buttonClick: false,
      rightAnswerClicked: false,
      index: 0,
      seconds: 30,
      btnDisable: false,
    };
    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.timer(), second);
  }

  componentDidUpdate() {
    const { assertions } = this.state;
    const { score } = this.props;
    score(assertions);
  }

  nextQuestion() {
    const btns = document.querySelectorAll('button');
    this.setState((prevState) => ({
      index: prevState.index + 1,
      buttonClick: false,
      seconds: 30,
    }));
    btns.forEach((element) => {
      element.classList.remove('reveal-color');
    });
  }

  colorSelectCorrect({ target }) {
    const btns = document.querySelectorAll('button');

    if (target.value === 'correct') {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        rightAnswerClicked: true,
      }
      ));
    }
    this.setState(() => ({
      buttonClick: true,
    }));
    btns.forEach((element) => {
      element.classList.add('reveal-color');
    });
  }

  timer() {
    const { seconds } = this.state;
    const limit = 30;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
    if (seconds === 0) {
      this.setState({
        btnDisable: true,
      });
    }
    if (seconds === limit) {
      this.setState({
        btnDisable: false,
      });
    }
  }

  render() {
    const { questions: { results }, updateClickButton, loading } = this.props;
    const { buttonClick, rightAnswerClicked, index, btnDisable, assertions } = this.state;
    updateClickButton({ buttonClick, rightAnswerClicked });
    const renderLink = () => {
      if (index === results.length) {
        return (
          <Redirect
            data-testid="feedback-test"
            to={ { pathname: '/feedback', state: { assertions } } }
          />);
      }
      return (
        <div className="questions">
          <p data-testid="question-category">{ results[index].category }</p>
          <h4
            id="question"
            data-testid="question-text"
            difficulty={ results[index].difficulty }
          >
            { results[index].question }
          </h4>
          <button
            value="correct"
            data-testid="correct-answer"
            type="button"
            className="green-border"
            onClick={ (event) => this.colorSelectCorrect(event) }
            disabled={ btnDisable }
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
              disabled={ btnDisable }
            >
              {incorrect}
            </button>
          ))}
          <ClockComponent nextQuestion={ this.nextQuestion } />
        </div>
      );
    };
    return (<div>{loading ? <p>Carregando...</p> : renderLink()}</div>);
  }
}

QuestionsComponent.propTypes = {
  questions: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
  updateClickButton: PropTypes.func.isRequired,
  score: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  loading: state.trivia.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateClickButton: (state) => dispatch(clickButton(state)),
  timer: (state) => dispatch(requestTime(state)),
  score: (state) => dispatch(sendScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsComponent);
