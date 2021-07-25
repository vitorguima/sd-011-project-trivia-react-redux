/* eslint-disable max-statements */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';
import { questionIdIncrease, modifyTimer, InitiateTimer, modifyNextBtn,
  addQuestionsPlayed, resetTriviaQuestionsIdAndPlayedQuestions,
  sendQuestions, recoverNameAndEmailFromRefresh,
} from '../redux/actions';
import { getQuestions } from '../services/TriviaApi';
import '../App.css';
import Header from '../components/Header';
import { FormatQuestions, FormatCorrectQuestion,
  FormatIncorrectQuestions } from '../helpers/FormatQuestions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFeedBack: false,
      componentMounted: false,
    };
    this.handleClickNextBtn = this.handleClickNextBtn.bind(this);
    this.resetQuestionsBorderColor = this.resetQuestionsBorderColor.bind(this);
    this.getQuestionList = this.getQuestionList.bind(this);
  }

  componentDidMount() {
    const { sendRecoveredPlayerInfo } = this.props;
    const { name, gravatarEmail, photo: img } = JSON.parse(localStorage.state).player;
    const photo = img;
    sendRecoveredPlayerInfo(name, gravatarEmail, photo);
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
        photo: img,
      },
    };
    localStorage.state = JSON.stringify(player);
    this.getQuestionList();
  }

  async getQuestionList() {
    const { sendQuestionList } = this.props;
    const { token } = this.props;
    const receiveQuestions = await getQuestions(token);

    const questionList = [];
    receiveQuestions.forEach((item) => {
      questionList.push(item);
    });

    const incorrectList = [];
    receiveQuestions.forEach((item) => {
      incorrectList.push(item.incorrect_answers);
    });

    const correctList = [];
    receiveQuestions.forEach((item) => {
      correctList.push(item.correct_answer);
    });

    const questions = FormatQuestions(questionList);
    const incorrectQuestions = FormatIncorrectQuestions(incorrectList);
    const correctQuestions = FormatCorrectQuestion(correctList);

    sendQuestionList(questions, incorrectQuestions, correctQuestions);
    this.setState({
      componentMounted: true,
    });
  }

  handleClickNextBtn() {
    const {
      increaseId, idTrivia, AddTimeToTimer, resetTimer, stopTimerfunc,
      showNextBtn, allowQuestionsBtn, runningTimer,
      totalQuestions, resetQuestionsId, increasePlayedQuestions,
    } = this.props;
    showNextBtn(false);
    increaseId(idTrivia + 1);
    allowQuestionsBtn();
    increasePlayedQuestions();
    if (runningTimer) {
      const TRINTA = 30;
      AddTimeToTimer(TRINTA);
      stopTimerfunc();
      resetTimer();
    }
    this.resetQuestionsBorderColor();
    const questionNumber = 5;
    if (totalQuestions === questionNumber) {
      resetQuestionsId();
      return (
        this.setState({
          redirectToFeedBack: true,
        })
      );
    }
  }

  resetQuestionsBorderColor() {
    const wrong = document.querySelectorAll('#incorrect-answear');
    const correct = document.querySelector('#correct-answear');
    wrong.forEach((element) => {
      element.style.border = '';
    });
    correct.style.border = '';
  }

  render() {
    const { idTrivia } = this.props;
    const { redirectToFeedBack, componentMounted } = this.state;
    if (redirectToFeedBack) return <Redirect to="/feedback" />;

    return (
      <>
        <Header />
        <div className="game-container">
          {
            componentMounted ? <Questions
              id={ idTrivia }
              func={ this.handleClickNextBtn }
            /> : <h4 className="loading-questions">Carregando Questões...</h4>
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  idTrivia: state.questions.idTrivia,
  resetTimer: state.gameMechanics.resetTimerFunc,
  stopTimerfunc: state.gameMechanics.stopTimerFunc,
  allowQuestionsBtn: state.gameMechanics.allowQuestionsBtns,
  runningTimer: state.gameMechanics.timerRunning,
  totalQuestions: state.player.questionsPlayed,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  increaseId: (increase) => dispatch(questionIdIncrease(increase)),
  timerBoolean: (boolean) => dispatch(modifyTimer(boolean)),
  AddTimeToTimer: (startTimer) => dispatch(InitiateTimer(startTimer)),
  showNextBtn: (boolean) => dispatch(modifyNextBtn(boolean)),
  increasePlayedQuestions: () => dispatch(addQuestionsPlayed()),
  resetQuestionsId: () => (dispatch(resetTriviaQuestionsIdAndPlayedQuestions())),
  sendQuestionList: (quest, inc, corre) => dispatch(sendQuestions(quest, inc, corre)),
  sendRecoveredPlayerInfo: (name, email, img) => (
    dispatch(recoverNameAndEmailFromRefresh(name, email, img))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  idTrivia: PropTypes.number,
  increaseId: PropTypes.func.isRequired,
  stopTimerfunc: PropTypes.func,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  runningTimer: PropTypes.bool.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  token: PropTypes.string.isRequired,
  sendRecoveredPlayerInfo: PropTypes.func,
  increasePlayedQuestions: PropTypes.func,
};

Game.defaultProps = {
  idTrivia: 0,
  stopTimerfunc: PropTypes.func,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  sendRecoveredPlayerInfo: PropTypes.func,
  increasePlayedQuestions: PropTypes.func,
};
