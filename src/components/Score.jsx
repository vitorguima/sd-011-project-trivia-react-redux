import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserScore } from '../actions/user';

class Score extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
    this.handleConvertDifficulty = this.handleConvertDifficulty.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  // ?Talvez o ideal seja colocar handleConvertDifficulty e handleScore no parent, depende de como o Timer foi feito
  // !Converte string com a dificuldade em numero
  handleConvertDifficulty(difficulty) {
    const numbers = { one: 1, two: 2, three: 3 }; // Uma forma para salvar os números dentro de uma constante
    const { one, two, three } = numbers;
    if (difficulty === 'easy') return one;
    if (difficulty === 'medium') return two;
    if (difficulty === 'hard') return three;
  }

  // !Calcula a quantidade total de pontos
  handleScore(difficulty) {
    const number = 10; // Não é recomendado que use o numero direto, mas sim dentro de uma constante
    const { score } = this.state;
    const { timer } = this.props;
    this.setState({
      score: score + number
      + (timer * this.handleConvertDifficulty(difficulty)),
    });
    this.handleLocalStorageUpdate(score);
  }

  render() {
    const { difficulty, getScore } = this.props;
    const { score } = this.state;
    getScore(score);
    return (
      <div>
        <p>
          Score:
          {score}
        </p>
        <button
          type="button"
          onMouseDown={ () => this.handleScore(difficulty) }
        >
          oi
        </button>
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  getScore: (state) => dispatch(getUserScore(state)),
});

export default connect(null, mapDispachToProps)(Score);

Score.propTypes = ({
  difficulty: PropTypes.string,
}).isRequired;
