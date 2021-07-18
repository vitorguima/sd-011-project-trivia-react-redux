import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { questionIdIncrease, modifyTimer, InitiateTimer, modifyNextBtn,
  addQuestionsPlayed, resetTriviaQuestionsId,
} from '../redux/actions';

// tentar desevolver uma maneira de quando a pagina de game sofrer um refresh, resetar os scores da store,  numero das questionsPlayed e o triviaId
// e com isso fazer a lógica e chamada da api com as perguntas direto no game ou na parte das Questions para parar de bugar os testes!

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFeedBack: false,
    };
    this.handleClickNextBtn = this.handleClickNextBtn.bind(this);
    this.resetQuestionsBorderColor = this.resetQuestionsBorderColor.bind(this);
  }

  handleClickNextBtn() {
    const {
      increaseId, idTrivia, AddTimeToTimer, resetTimer, stopTimerfunc,
      showNextBtn, allowQuestionsBtn, runningTimer, addQuestion, totalQuestions,
      resetQuestionsId,
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
    addQuestion();
    const questionNumber = 5;
    if (totalQuestions === questionNumber) {
      resetQuestionsId(1);
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
    const { redirectToFeedBack } = this.state;

    if (redirectToFeedBack) return <Redirect to="/feedBack" />;

    return (
      <div>
        <Header />
        <Questions
          id={ idTrivia }
          func={ this.handleClickNextBtn }
        />
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
});

const mapDispatchToProps = (dispatch) => ({
  increaseId: (increase) => dispatch(questionIdIncrease(increase)),
  timerBoolean: (boolean) => dispatch(modifyTimer(boolean)),
  AddTimeToTimer: (startTimer) => dispatch(InitiateTimer(startTimer)),
  showNextBtn: (boolean) => dispatch(modifyNextBtn(boolean)),
  addQuestion: () => dispatch(addQuestionsPlayed()),
  resetQuestionsId: (resetQuestionsPlayedToo) => (
    dispatch(resetTriviaQuestionsId(resetQuestionsPlayedToo))),
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
  addQuestion: PropTypes.func,
  totalQuestions: PropTypes.number.isRequired,
  resetQuestionsId: PropTypes.func,
};

Game.defaultProps = {
  idTrivia: 0,
  stopTimerfunc: PropTypes.func,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  addQuestion: PropTypes.func,
  resetQuestionsId: PropTypes.func,
};
