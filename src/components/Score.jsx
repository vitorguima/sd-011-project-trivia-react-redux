import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Score extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
    this.handleConvert = this.handleConvert.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  // ?Talvez o ideal seja colocar handleConvert e handleScore no pai
  // !Converte string com a dificuldade em numero
  handleConvert(difficulty) {
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
      + (timer * this.handleConvert(difficulty)),
    });
  }

  render() {
    const { difficulty } = this.props;
    const { score } = this.state;
    return (
      <div>
        <p>
          { /* Só pra teste se é passada a dificuldade convertida */ }
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

export default Score;

Score.propTypes = ({
  difficulty: PropTypes.string,
}).isRequired;
