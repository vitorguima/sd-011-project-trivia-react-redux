import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Feedback from '../components/Feedback';
import logo from '../trivia.png';
import '../App.css';

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
    this.sendRankingToLocalStorage = this.sendRankingToLocalStorage.bind(this); // Req 17
    this.returnHeader = this.returnHeader.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate() { // Req 17 // OK
    this.sendRankingToLocalStorage();
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
    this.setState((prevState) => ({
      score: prevState.score + (TEN + (counter * multiplier)),
      assertions: prevState.assertions + 1,
    }));
  }

  returnHeader() {
    return (
      <header className="App-header-telas">
        <img src={ logo } className="App-logo-telas" alt="logo" />
      </header>
    );
  }

  sendRankingToLocalStorage() {
    const limitOfQuestions = 5;
    const { count } = this.state;
    const { getdata: { emailHash, name } } = this.props;
    const { score } = this.state;
    const gravatarImg = `https://www.gravatar.com/avatar/${emailHash}`;
    const newRankingData = { gravatarImg, name, score };
    if ('ranking' in localStorage && count === limitOfQuestions) { // OK
      const beforeRankingData = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify(
        [...beforeRankingData, newRankingData],
      ));
      this.setState((prevState) => ({ // Precisa disso para parar o loop de renderização
        count: prevState.count + 1,
      }));
    } else if (count === limitOfQuestions) {
      localStorage.setItem('ranking', JSON.stringify([newRankingData]));
      this.setState((prevState) => ({ // Precisa disso para parar o loop de renderização
        count: prevState.count + 1,
      }));
    }
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
    const state = { player }; // Teste Req 17
    localStorage.setItem('state', JSON.stringify(state)); // Teste Req 17

    const limitOfQuestions = 5;
    const gameResults = gameData.results;

    return (
      <div>
        { this.returnHeader() }
        <div>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="" />
          &nbsp;
          <span data-testid="header-player-name">{name}</span>
          &nbsp;
          <span data-testid="header-score">
            { score }
          </span>
        </div>
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
  gameData: PropTypes.objectOf(PropTypes.object),
}).isRequired;

export default connect(mapStateToProps)(TelaJogo);
