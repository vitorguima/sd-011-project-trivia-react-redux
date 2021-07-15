import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requisitionQuests from '../helpers/RequisitionQuests';
import Header from '../components/Header';
import './Game.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      clickedQuest: false,
      seconds: 30,
      timer: true,
      redirectFeedbacks: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.timerInterval = this.timerInterval.bind(this);
  }

  componentDidMount() {
    const { dispatchQuests } = this.props;

    if (localStorage.token) {
      dispatchQuests(localStorage.token);
    }
    this.updateTimer();
  }

  componentDidUpdate() {
    const { seconds, timer } = this.state;
    if (seconds <= 0) {
      clearInterval(timer);
    }
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  updateTimer() {
    const oneSecInterval = 1000;
    const timer = setInterval(this.timerInterval, oneSecInterval);
    this.setState({ timer });
  }

  timerInterval() {
    const oneSecInterval = 1000;
    setTimeout(() => {
      this.setState((prev) => ({
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 0,
        clickedQuest: prev.seconds <= 0 || prev.clickedQuest === true }));
    }, oneSecInterval);
  }

  buttonCorrect() {
    const { stateQuests } = this.props;
    const { index, clickedQuest, timer } = this.state;

    return (
      <button
        type="button"
        data-testid="correct-answer"
        key="correct"
        className={ clickedQuest ? 'correctAnswer' : null }
        disabled={ !!clickedQuest }
        onClick={ () => {
          this.handleClick();
          clearInterval(timer);
        } }
      >
        {stateQuests[index].correct_answer}
      </button>
    );
  }

  handleClick() {
    this.setState(() => ({ clickedQuest: true }));
  }

  answers() {
    const { gameLoading, stateQuests } = this.props;
    const { index, clickedQuest, timer } = this.state;
    return (
      <div>
        {gameLoading
          ? 'Loading'
          : (
            <div>
              <p data-testid="question-category">{stateQuests[index].category}</p>
              <p data-testid="question-text">{stateQuests[index].question}</p>
              {[this.buttonCorrect(),
                stateQuests[index].incorrect_answers
                  .map((e, i) => (
                    <button
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                      key={ i }
                      className={ clickedQuest ? 'incorrectAnswers' : null }
                      disabled={ !!clickedQuest }
                      onClick={ () => {
                        this.handleClick();
                        clearInterval(timer);
                      } }
                    >
                      {e}
                    </button>)),
              ]}
            </div>)}
      </div>
    );
  }

  render() {
    const { index, clickedQuest, seconds, redirectFeedbacks } = this.state;
    const limitIndex = 4;
    return (
      <div>
        <Header />
        {this.answers()}
        { clickedQuest ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              if (index === limitIndex) {
                this.setState({ redirectFeedbacks: true });
              } else {
                this.setState((prev) => ({
                  index: prev.index + 1,
                  clickedQuest: false,
                  seconds: 30,
                }));
                this.updateTimer();
              }
            } }
          >
            Próxima
          </button>
        ) : null }
        <Timer sec={ seconds } />
        {redirectFeedbacks ? <Redirect to="/feedbacks" /> : null}
      </div>
    );
  }
}

Game.propTypes = {
  dispatchQuests: PropTypes.func.isRequired,
  gameLoading: PropTypes.bool.isRequired,
  stateQuests: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchQuests: (state) => dispatch(requisitionQuests(state)),
});

const mapStateToProps = (state) => ({
  stateToken: state.game.apiQuests,
  stateLoading: state.login.loading,
  gameLoading: state.game.loading,
  stateQuests: state.game.apiQuests,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
