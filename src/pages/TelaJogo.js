import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WrongAnswer from '../components/WrongAnswer';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      count: 0,
    };
    this.alternativesAnswers = this.alternativesAnswers.bind(this);
    this.nextBtn = this.nextBtn.bind(this);
  }

  nextBtn() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  alternativesAnswers(count, gameData) {
    const FIVE = 5;
    const array = gameData.results;
    return (
      <div>
        {array && count < FIVE ? ( // Renderiza perguntas
          <>
            <p data-testid="question-category" key={ array[count].category }>
              {array[count].category}
            </p>
            <p data-testid="question-text" key={ array[count].question }>
              {array[count].question}
            </p>
            {/* <button
              data-testid="correct-answer"
              type="button"
              key={ array[count].correct_answer }
            >
              {array[count].correct_answer}
            </button> */}
            {/* {console.log(array[count])} */}
            <WrongAnswer
              difficulty={ array[count].difficulty }
              array={ Object.values(array[count])[5] }
              correctAnswer={ array[count].correct_answer }
            />
          </>
        ) : (
          <p> Fim do jogo </p>
        )}
      </div>
    );
  }

  render() {
    const { score, count } = this.state;
    const { getdata: { emailHash, name, email }, gameData } = this.props;
    const player = { name, assertions: 0, score, gravatarEmail: email };
    localStorage.setItem('player', JSON.stringify(player));
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
        { this.alternativesAnswers(count, gameData) }
        <button
          id="btn-next"
          type="button"
          // onClick={ () => {
          //   this.setState((prevState) => ({
          //     count: prevState.count + 1,
          //   }));
          // } }
          onClick={ () => this.nextBtn() }
        >
          botão
        </button>
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
