import React from 'react';
import PropTypes from 'prop-types';

class Score extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      currentIndex: 0,
    }
  }

    finalScore() {
      const { timer, currentIndex } = this.state;
      const { questions: { allQuestions } } = this.props;
      const currentQuestion = allQuestions[currentIndex];
      const initPoint = 10;
      const storage = JSON.parse(localStorage.getItem('state'));
    
      if (currentQuestion.difficulty === 'hard') {
        const hardPoint = 3;
        storage.player.score += (initPoint + (timer * hardPoint));
      }
      if (currentQuestion.difficulty === 'medium') {
        const medPoint = 2;
        storage.player.score += (initPoint + (timer * medPoint));
      } else {
        const easyPoint = 1;
        storage.player.score += (initPoint + (timer * easyPoint));
      }
      localStorage.setItem('state', JSON.stringify(storage));
    }  
  }

Score.propTypes = {
  questions: PropTypes.shape({
    allQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Score;