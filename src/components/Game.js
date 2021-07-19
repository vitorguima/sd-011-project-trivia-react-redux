import React, { Component } from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cronometer from './Cronometer';
import GameQuestion from './GameQuestion';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, error } = this.props;
    const errorTrue = 'Token expirado, por favor faça o login novamente';
    return (
      <div className="gameContainer">
        <h1 className="questionTitle">Pergunta:</h1>
        <Cronometer />
        <span className="loadingBar" />
        { error ? errorTrue : <GameQuestion question={ questions[questionIndex] } /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions,
  error: state.playerReducer.error,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
