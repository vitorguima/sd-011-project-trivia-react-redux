import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserScore } from '../actions/user';

class Score extends Component {
  constructor() {
    super();
    this.state = {
      totalScore: 0,
    };
    this.handleConvertDifficulty = this.handleConvertDifficulty.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleScoreCanBeUpdated = this.handleScoreCanBeUpdated.bind(this);
  }

  componentDidUpdate() {
    this.handleScoreCanBeUpdated();
  }

  // componentWillUnmount() {
  //   let { click } = this.props;
  //   click = false;
  //   clearInterval(click);
  // }

  // &Talvez o ideal seja colocar handleConvertDifficulty e handleScore no parent, depende de como o Timer foi feito
  // *Converte string com a dificuldade em numero
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
    const diffficultPoints = this.handleConvertDifficulty(difficulty);
    const { timer, submitScore } = this.props;
    const { totalScore } = this.state;
    this.setState((old) => ({
      totalScore: old.totalScore + number
      + (timer * diffficultPoints),
    }), submitScore(totalScore));
  }

  handleScoreCanBeUpdated() {
    const { count, Result, click } = this.props;
    const magicNumber = 4;
    if (count > magicNumber && !click) {
      console.log(count);
      return this.handleScore(Result.difficulty);
    }
  }

  render() {
    const { click } = this.props;
    const { totalScore } = this.state;
    return (
      <div>
        <p>
          {this.handleScoreCanBeUpdated()}
          Score:
          {click && console.log(totalScore)}
        </p>
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  submitScore: (state) => dispatch(getUserScore(state)),
});

export default connect(null, mapDispachToProps)(Score);

Score.propTypes = ({
  difficulty: PropTypes.string,
}).isRequired;
