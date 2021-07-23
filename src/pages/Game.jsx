import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requisitionQuests from '../helpers/RequisitionQuests';
import Header from '../components/Header';
import '../style/index.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      clickedQuest: false,
      seconds: 30,
      timer: true,
      redirectFeedbacks: false,
      player: {
        name: JSON.parse(localStorage.getItem('state')).player.name,
        assertions: 0,
        score: 0,
        gravatarEmail: JSON.parse(localStorage.getItem('state')).player.gravatarEmail,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.timerInterval = this.timerInterval.bind(this);
    this.localStorageTest = this.localStorageTest.bind(this);
  }

  componentDidMount() {
    const { dispatchQuests } = this.props;

    if (localStorage.token) {
      dispatchQuests(localStorage.token);
    }
    this.updateTimer();
  }

  componentDidUpdate() {
    const { seconds, timer, player } = this.state;
    if (seconds <= 0) {
      clearInterval(timer);
    }
    this.localStorageTest({ player });
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
        onClick={ ({ target }) => {
          this.handleClick(target);
          clearInterval(timer);
        } }
      >
        {stateQuests[index].correct_answer}
      </button>
    );
  }

  handleClick(target) {
    const { player, seconds, index } = this.state;
    const { score } = player;
    const { stateQuests } = this.props;
    const { difficulty } = stateQuests[index];
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const dez = 10;
    this.setState(() => ({ clickedQuest: true }));
    if (target) {
      let multiplyFactor = easy;
      switch (difficulty) {
      case 'hard':
        multiplyFactor = hard;
        break;
      case 'medium':
        multiplyFactor = medium;
        break;
      case 'easy':
        multiplyFactor = easy;
        break;
      default:
        break;
      }
      const actualScore = score + dez + (seconds * multiplyFactor);
      this.setState((prev) => ({
        player: {
          name: JSON.parse(localStorage.getItem('state')).player.name,
          assertions: prev.player.assertions + 1,
          score: actualScore,
          gravatarEmail: JSON.parse(localStorage.getItem('state')).player.gravatarEmail,
        },
      }));
    }
  }

  localStorageTest(state) {
    localStorage.setItem('state', (JSON.stringify(state)));
  }

  answers() {
    const { gameLoading, stateQuests } = this.props;
    const { index, clickedQuest, timer } = this.state;
    return (
      <div>
        {gameLoading
          ? 'Loading'
          : (
            <div className="container-answers">
              <p data-testid="question-category">{stateQuests[index].category}</p>
              <p data-testid="question-text">{stateQuests[index].question}</p>
              {[this.buttonCorrect(),
                stateQuests[index].incorrect_answers
                  .map((e, i) => (
                    <button
                      id="btn-response"
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
    const { index, clickedQuest, seconds, redirectFeedbacks, player } = this.state;
    const { score, name } = player;
    const limitIndex = 4;
    return (
      <div className="container-game">
        <Header
          score={ score }
          name={ name || JSON.parse(localStorage.state).player.name }
        />
        {this.answers()}
        { clickedQuest ? (
          <button
            className="btn-next"
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
  playerName: state.login.name,
  playerEmail: state.login.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
