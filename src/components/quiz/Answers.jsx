import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../../actions';

class Answers extends React.Component {
  verifyIfIsCorrect(target) {
    const { questionsList } = this.props;
    if (questionsList.correct_answer === target.innerHTML) {
      return true;
    }
    return false;
  }

  verifyAnswer({ target }) {
    const { handleButtons, questionsList, timer, updateUser } = this.props;
    handleButtons(true);
    const isCorrect = this.verifyIfIsCorrect(target);
    if (isCorrect) {
      const scoreDataBase = { base: 10, hard: 3, medium: 2, easy: 1 };
      const playerStorageString = localStorage.getItem('state');
      const playerStorage = JSON.parse(playerStorageString);
      playerStorage.player.assertions += 1;
      switch (questionsList.difficulty) {
      case 'hard':
        playerStorage.player.score += scoreDataBase.base + (timer * scoreDataBase.hard);
        updateUser({
          score: playerStorage.player.score, assertions: playerStorage.player.assertions,
        });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      case 'medium':
        playerStorage.player.score += scoreDataBase.base + (timer * scoreDataBase.medium);
        updateUser({
          score: playerStorage.player.score, assertions: playerStorage.player.assertions,
        });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      case 'easy':
        playerStorage.player.score += scoreDataBase.base + (timer * scoreDataBase.easy);
        updateUser({
          score: playerStorage.player.score, assertions: playerStorage.player.assertions,
        });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      default:
        return 0;
      }
    }
    return 0;
  }

  createOptionsAnswers() {
    const { questionsList, isDisabled, shuffledAnswers } = this.props;
    return shuffledAnswers.map((answer, index) => {
      if (questionsList.correct_answer === answer) {
        return (
          <li className="item-list-buttons-quiz" key={ index }>
            <button
              disabled={ isDisabled }
              data-testid="correct-answer"
              className={ isDisabled ? 'li-quiz-button correct-answer correct'
                : 'li-quiz-button correct' }
              type="button"
              onClick={ (event) => this.verifyAnswer(event) }
            >
              { answer.replace(/&amp;/g, ' ').replace(/&quot;/g, ' ')
                .replace(/&#039;/g, ' ') }
            </button>
          </li>
        );
      }
      return (
        <li className="item-list-buttons-quiz" key={ index }>
          <button
            disabled={ isDisabled }
            data-testid={ `wrong-answer-${index}` }
            className={ isDisabled ? 'li-quiz-button wrong-answer' : 'li-quiz-button' }
            type="button"
            onClick={ (event) => this.verifyAnswer(event) }
          >
            { answer.replace(/&amp;/g, ' ').replace(/&quot;/g, ' ')
              .replace(/&#039;/g, ' ') }
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-buttons-quiz">
        { this.createOptionsAnswers() }
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateScore(payload)),
});

Answers.propTypes = {
  questionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleButtons: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  updateUser: PropTypes.func.isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(null, mapDispatchToProps)(Answers);
