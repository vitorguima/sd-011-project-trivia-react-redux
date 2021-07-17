import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AnswerButtons extends Component {
  // Não adicionar estado e nem funções nesse componente, pois ele vai randomizar as respostas novamente toda vez que atualizar o componente
  render() {
    const { seconds, key, answer, correctAnswer, onClick } = this.props;
    return (
      <button
        id="answer"
        type="button"
        disabled={ (seconds === 0 || false) }
        key={ key }
        data-testid={ correctAnswer === answer
          ? 'correct-answer'
          : 'wrong-answer' }
        onClick={ () => { onClick(); } }
        className="answer"
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.getSeconds.seconds,
});

export default connect(mapStateToProps)(AnswerButtons);

AnswerButtons.propTypes = {
  seconds: PropTypes.number,
  key: PropTypes.string,
  answer: PropTypes.string,
  correctAnswer: PropTypes.number,
  onClick: PropTypes.number,
}.isRequired;
