import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNewApi } from '../actions/requestAPI';
import WrongAnswer from '../components/WrongAnswer';

class TelaJogo extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      count: 0,
    };
    this.alternativesAnswers = this.alternativesAnswers.bind(this);
  }

  componentDidMount() {
    const { recivedGameData } = this.props;
    recivedGameData();
    // console.log(gameData.results);
  }

  alternativesAnswers(count, gameData) {
    const FIVE = 5;
    const array = gameData.results;
    return (
      <div>
        {array && count < FIVE ? (
          <>
            <p data-testid="question-category" key={ array[count].category }>
              {array[count].category}
            </p>
            <p data-testid="question-text" key={ array[count].question }>
              {array[count].question}
            </p>
            <button
              data-testid="correct-answer"
              type="button"
              key={ array[count].correct_answer }
            >
              {array[count].correct_answer}
            </button>
            <WrongAnswer array={ Object.values(array[count])[5] } />
            {/* { console.log(Object.values(array[count])[5])} */}
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
          type="button"
          onClick={ () => {
            this.setState({
              count: count + 1,
            });
          } }
        >
          botão
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getdata: state.user.userData,
  gameData: state.requestGameAPI.gameData,
});

const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchNewApi(state)),
});

TelaJogo.propTypes = ({
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }),
  recivedGameData: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TelaJogo);
