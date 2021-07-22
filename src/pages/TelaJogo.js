import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Feedback from '../components/Feedback';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const TEN = 10;

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      isGreenBordered: 'withoutBorder',
      isRedBordered: 'withoutBorder',
      isHidden: true,
      isDisabled: false,
      counter: 30,
      assertions: 0,
      score: 0,
      count: 0,
      intervalId: 0,
    };
    this.nextBtn = this.nextBtn.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  setScore(difficulty, counter) {
    let multiplier = 0;
    switch (difficulty) {
    case 'easy':
      multiplier = EASY;
      break;
    case 'medium':
      multiplier = MEDIUM;
      break;
    case 'hard':
      multiplier = HARD;
      break;
    default:
      return multiplier;
    }
    // console.log(multiplier);
    this.setState((prevState) => ({
      score: prevState.score + (TEN + (counter * multiplier)),
      assertions: prevState.assertions + 1,
    }));
  }

  nextBtn() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
      isGreenBordered: 'withoutBorder',
      isRedBordered: 'withoutBorder',
      isHidden: true,
      isDisabled: false,
      counter: 30,
    }));
    this.handleTimer();
  }

  handleAnswer(difficulty) {
    const { intervalId, counter } = this.state;
    this.setScore(difficulty, counter);
    clearInterval(intervalId);
    this.setState({
      isGreenBordered: 'withGreenBorder',
      isRedBordered: 'withRedBorder',
      isHidden: false,
    });
  }

  handleTimer() {
    const second = 1000;

    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));

      const { counter } = this.state;
      if (counter <= 0) {
        clearInterval(intervalId);
        this.setState({
          isGreenBordered: 'withGreenBorder',
          isRedBordered: 'withRedBorder',
          isHidden: false,
          isDisabled: true,
        });
      }
    }, second);

    this.setState({ intervalId });
  }

  playAgain() {
    const { history } = this.props;
    return (
      <div>
        <p>Fim de Jogo</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  render() {
    const {
      score, assertions,
      count,
      isGreenBordered,
      isRedBordered,
      isHidden,
      counter, isDisabled,
    } = this.state;
    const { getdata: { emailHash, name, email }, gameData } = this.props;

    const player = { name, assertions, score, gravatarEmail: email };
    const state = { player };
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('state', JSON.stringify(state));

    const limitOfQuestions = 5;
    const gameResults = gameData.results;

    return (
      <div>
        <header>
          <h1>Tela do jogo</h1>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">
            { score }
          </span>
        </header>
        {gameResults && count < limitOfQuestions ? ( // Renderiza perguntas
          <Questions
            gameResults={ gameResults[count] }
            incorrectAnswer={ Object.values(gameResults[count])[5] }
            correctAnswer={ gameResults[count].correct_answer }
            isGreenBordered={ isGreenBordered }
            isRedBordered={ isRedBordered }
            isHidden={ isHidden }
            counter={ counter }
            nextBtn={ () => this.nextBtn() }
            handleAnswer={ (event) => this.handleAnswer(event) }
            // handleAnswer={ () => this.handleAnswer() }
            isDisabled={ isDisabled }
          />
        ) : (
          <Feedback score={ score } />
        )}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getdata: state.user.userData, // Pega Nome de usuario
  getTokenStatus: state.user.token,
  gameData: state.requestGameAPI.gameData, // Pega as perguntas
});

TelaJogo.propTypes = ({
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }),
  recivedGameData: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps)(TelaJogo);
