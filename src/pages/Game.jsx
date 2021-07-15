import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requisitionQuests from '../helpers/RequisitionQuests';
import Header from '../components/Header';
import './Game.css';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);
    const { playerName, playerEmail } = this.props;
    this.state = {
      index: 0,
      clickedQuest: false,
      seconds: 30,
      timer: true,
      player: {
        name: playerName,
        assertions: 0,
        score: 0,
        gravatarEmail: playerEmail,
      },
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
    JSON.parse(localStorage.state);
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
      this.setState((prev) => ({
        player: {
          name: prev.player.name,
          gravatarEmail: prev.player.gravatarEmail,
          assertions: prev.player.assertions + 1,
          score: prev.player.score + dez + (seconds * multiplyFactor),
        },
      }));
      localStorage.setItem('state', JSON.stringify({ player }));
    }
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
    const { index, clickedQuest, seconds, player } = this.state;
    const { score, name } = player;
    const limitIndex = 4;
    return (
      <div>
        <Header
          score={ score }
          name={ name || JSON.parse(localStorage.state).player.name }
        />
        {this.answers()}
        { clickedQuest ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.setState((prev) => ({
                index: prev.index + 1,
                clickedQuest: false,
                seconds: 30,
              }));
              this.updateTimer();
            } }
            disabled={ index === limitIndex }
          >
            Próxima
          </button>
        ) : null }
        <Timer sec={ seconds } />
      </div>
    );
  }
}

Game.propTypes = {
  dispatchQuests: PropTypes.func.isRequired,
  gameLoading: PropTypes.bool.isRequired,
  stateQuests: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
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
