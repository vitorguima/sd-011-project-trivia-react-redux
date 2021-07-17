import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { requestApiThunk } from '../actions';
import Question from '../components/Question';
import CountdownTimer from '../components/CountDownTimer';

class TriviaQuestions extends Component {
  constructor(props) {
    super(props);
    this.wasSelectedAnswer = this.wasSelectedAnswer.bind(this);
    this.state = {
      answerSeleceted: false,
      questionCounter: 1,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { setStateGame } = this.props;
    setStateGame(token);
  }

  wasSelectedAnswer() {
    const { seconds } = this.props;
    const { questionCounter, answerSeleceted } = this.state;
    const answerSel = document.getElementsByClassName('correct-answer');
    console.log(answerSel);
    if (seconds === 0 || answerSeleceted) {
      console.log('passou');
      return true;
      // return (
      //   <label htmlFor="btn">
      //     <input
      //       id="btn-next"
      //       type="button"
      //       data-testid="btn-next"
      //       value="Próxima"
      //       onClick={ this.setState({ questionCounter: questionCounter + 1 }) }
      //     />
      //   </label>
      // );
    }
    return null;
  }

  // renderNextQuestionBtn() {
  //   const { seconds } = this.props;
  //   const { questionCounter } = this.state;
  //   const correctAnswer = document.getElementsByClassName('correct-answer')[0];
  //   if (seconds === 0 || correctAnswer) {
  //     console.log('passou');
  //     // return (
  //     //   <label htmlFor="btn">
  //     //     <input
  //     //       id="btn-next"
  //     //       type="button"
  //     //       data-testid="btn-next"
  //     //       value="Próxima"
  //     //       onClick={ this.setState({ questionCounter: questionCounter + 1 }) }
  //     //     />
  //     //   </label>
  //     // );
  //   }
  //   return null;
  // }

  render() {
    const { questions } = this.props;
    const { results } = questions;
    const eachResult = Object.values({ ...results });
    const { questionCounter } = this.state;
    return (
      <div>
        <Header />
        <CountdownTimer />
        <h1 data-testid="question-category">Categoria</h1>
        <h2 data-testid="question-text">Questão:</h2>
        { eachResult ? <Question eachResult={ eachResult[questionCounter] } /> : null }
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStateGame: (payload) => dispatch(requestApiThunk(payload)),
});

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
  seconds: state.getSeconds.seconds,
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);

TriviaQuestions.propTypes = {
  questions: PropTypes.array,
  setStateGame: PropTypes.func,
}.isRequired;
