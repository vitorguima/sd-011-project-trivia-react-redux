import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../../actions';

class Answers extends React.Component {
  verifyAnswer({ target }) {
    const { handleButtons, questionsList, timer, updateUser } = this.props;
    handleButtons(true);
    const isCorrect = target.classList.contains('correct');
    if (isCorrect) {
      const scoreDataBase = { base: 10, hard: 3, medium: 2, easy: 1 };
      const playerStorageString = localStorage.getItem('state');
      const playerStorage = JSON.parse(playerStorageString);
      playerStorage.assertions += 1;
      switch (questionsList.difficulty) {
      case 'hard':
        playerStorage.score += scoreDataBase.base + (timer * scoreDataBase.hard);
        updateUser({ score: playerStorage.score, assertions: playerStorage.assertions });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      case 'medium':
        playerStorage.score += scoreDataBase.base + (timer * scoreDataBase.medium);
        updateUser({ score: playerStorage.score, assertions: playerStorage.assertions });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      case 'easy':
        playerStorage.score += scoreDataBase.base + (timer * scoreDataBase.easy);
        updateUser({ score: playerStorage.score, assertions: playerStorage.assertions });
        return localStorage.setItem('state', JSON.stringify(playerStorage));
      default:
        return 0;
      }
    }
    return 0;
  }

  render() {
    const { questionsList, isDisabled } = this.props;
    return (
      <ul className="list-buttons-quiz">
        <li className="item-list-buttons-quiz">
          <button
            disabled={ isDisabled }
            data-testid="correct-answer"
            className={ isDisabled ? 'li-quiz-button correct-answer'
              : 'li-quiz-button correct' }
            type="button"
            onClick={ (event) => this.verifyAnswer(event) }
          >
            { questionsList.correct_answer }
          </button>
        </li>
        { questionsList.incorrect_answers.map((wrong, index) => (
          <li className="item-list-buttons-quiz" key={ index }>
            <button
              disabled={ isDisabled }
              data-testid={ `wrong-answer-${index}` }
              className={ isDisabled ? 'li-quiz-button wrong-answer' : 'li-quiz-button' }
              type="button"
              onClick={ (event) => this.verifyAnswer(event) }
            >
              { wrong }
            </button>
          </li>
        )) }
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
};

export default connect(null, mapDispatchToProps)(Answers);
