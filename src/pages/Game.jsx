import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';

class Game extends Component {
  render() {
    const { questionArray, currentQuestion } = this.props;
    return (
      <div>
        <HeaderGame />
        <Question question={ questionArray[currentQuestion] } />
        {/* { questionArray.length > 0 && questionArray.map((question, index) => (
          <Question key={ index } question={ question } />
        )) } */}
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  questionArray: gameReducer.questions,
  currentQuestion: gameReducer.currentQuestion,
});

Game.propTypes = ({
  questionArray: PropTypes.arrayOf(PropTypes.object),
  currentQuestion: PropTypes.number,
});

Game.defaultProps = ({
  questionArray: [],
  currentQuestion: 0,
});

export default connect(mapStateToProps)(Game);
