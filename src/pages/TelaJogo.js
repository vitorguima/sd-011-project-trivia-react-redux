import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      isGreenBordered: 'withoutBorder',
      isRedBordered: 'withoutBorder',
      isHidden: true,
      isDisabled: false,
      counter: 30,
      score: 0,
      count: 0,
      intervalId: 0,
    };
    this.nextBtn = this.nextBtn.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
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

  handleAnswer(/* { target: { name } } */) {
    const { intervalId } = this.state;
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
      score,
      count,
      isGreenBordered,
      isRedBordered,
      isHidden,
      counter,
      isDisabled,
    } = this.state;
    const { getdata: { emailHash, name, email }, gameData } = this.props;

    const player = { name, assertions: 0, score, gravatarEmail: email };
    localStorage.setItem('player', JSON.stringify(player));

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
            isDisabled={ isDisabled }
          />
        ) : (
          this.playAgain()
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
