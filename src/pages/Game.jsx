import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';
import { actionClicked, actionTimer, actionBtn, actionDisabled } from '../actions';
import Logo from '../components/Logo';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
      index: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.countDown = this.countDown.bind(this);
    this.refreshTimer = this.refreshTimer.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { category } = this.props;
    const data = await fetchQuestions(category);
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  refreshTimer() {
    const { setHidden, timer, setTimer, setDisabled } = this.props;
    if (timer > 0) {
      const newTimer = timer - 1;
      setTimer(newTimer);
    } else {
      clearInterval(this.myInterval);
      setHidden(false);
      setDisabled(true);
    }
  }

  countDown() {
    const second = 1000;
    this.myInterval = setInterval(this.refreshTimer, second);
  }

  nextQuestion() {
    const { index } = this.state;
    const timer = 30;
    const numberOfQuestions = 5;
    const limit = 4;
    const {
      setClicked, setTimer, history: { push }, setDisabled, setHidden } = this.props;
    clearInterval(this.myInterval);
    if (index < numberOfQuestions) {
      this.setState({
        index: index + 1,
      });
      setDisabled(false);
      setClicked(false);
      setTimer(timer);
      setHidden(true);
    }
    if (index === limit) {
      push('/feedback');
    }
  }

  render() {
    const { loading, index } = this.state;
    const { hiddenBtn } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    const { questions } = this.state;
    return (
      <div className="game">
        <Logo />
        <Header />
        <Question
          questions={ questions[index] }
          countDown={ this.countDown }
          myInterval={ this.myInterval }
        />
        <button
          type="button"
          data-testid="btn-next"
          hidden={ hiddenBtn }
          onClick={ () => { this.nextQuestion(); this.countDown(); } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  hiddenBtn: state.game.hidden,
  timer: state.game.timer,
  category: state.game.category,
});

const mapDispatchToProps = (dispatch) => ({
  setClicked: (clicked) => dispatch(actionClicked(clicked)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
  setHidden: (button) => dispatch(actionBtn(button)),
  setDisabled: (bool) => dispatch(actionDisabled(bool)),
});

Game.propTypes = {
  hiddenBtn: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setHidden: PropTypes.func.isRequired,
  setDisabled: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Game);
