import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { questionIdIncrease, modifyTimer, InitiateTimer, modifyNextBtn,
  addQuestionsPlayed, resetTriviaQuestionsIdAndPlayedQuestions,
  sendQuestions, recoverNameAndEmailFromRefresh,
} from '../redux/actions';
import { getQuestions } from '../services/TriviaApi';

// tentar desevolver uma maneira de quando a pagina de game sofrer um refresh, resetar os scores da store,  numero das questionsPlayed e o triviaId
// e com isso fazer a lógica e chamada da api com as perguntas direto no game ou na parte das Questions para parar de bugar os testes!
// =]
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
    const { name, gravatarEmail } = JSON.parse(localStorage.state).player;
    const photo = localStorage.img;
    sendRecoveredPlayerInfo(name, gravatarEmail, photo);
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
    questionList.map((item) => {
      const string = item.question;
      if (string.includes('&quot;')
      || string.includes('&#039;')
      || string.includes('&;')) {
        item.question = item.question.replace(/&quot;/gi, '"');
        item.question = item.question.replace(/&#039;/gi, '');
        item.question = item.question.replace(/&;/gi, '');
        return item.question;
      }
      return item;
    });
    sendQuestionList(questionList);
    this.setState({
      componentMounted: true,
    });
  }

  handleClickNextBtn() {
    const {
      increaseId, idTrivia, AddTimeToTimer, resetTimer, stopTimerfunc,
      showNextBtn, allowQuestionsBtn, runningTimer, increasePlayedQuestions,
      totalQuestions, resetQuestionsId,
    } = this.props;
    showNextBtn(false);
    increaseId(idTrivia + 1);
    allowQuestionsBtn();
    if (runningTimer) {
      const TRINTA = 30;
      AddTimeToTimer(TRINTA);
      stopTimerfunc();
      resetTimer();
    }
    this.resetQuestionsBorderColor();
    increasePlayedQuestions();
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

    if (redirectToFeedBack) return <Redirect to="/feedBack" />;

    return (
      <div>
        <Header />
        {
          componentMounted ? <Questions
            id={ idTrivia }
            func={ this.handleClickNextBtn }
          /> : 'Carregando Questões...'
        }
      </div>
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
  sendQuestionList: (questionList) => dispatch(sendQuestions(questionList)),
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
  increasePlayedQuestions: PropTypes.func,
  totalQuestions: PropTypes.number.isRequired,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  token: PropTypes.string.isRequired,
  sendRecoveredPlayerInfo: PropTypes.func,
};

Game.defaultProps = {
  idTrivia: 0,
  stopTimerfunc: PropTypes.func,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  increasePlayedQuestions: PropTypes.func,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  sendRecoveredPlayerInfo: PropTypes.func,
};
