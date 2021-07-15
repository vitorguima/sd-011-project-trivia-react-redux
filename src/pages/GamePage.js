import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CorrectBtn from '../components/CorrectBtn';
import WrongBtn from '../components/WrongBtn';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      nQuestion: 0,
    };
  }

  render() {
    const { gameData: { results }, isLoading } = this.props;
    const { nQuestion } = this.state;
    return (
      <div>
        {!isLoading && results
          .map((question, iQuestion) => {
            if (iQuestion === nQuestion) {
              return (
                <div key={ iQuestion }>
                  <p data-testid="question-category">{question.category}</p>
                  <p data-testid="question-text">{question.question}</p>
                  {[...question.incorrect_answers, question.correct_answer]
                    .sort()
                    .map((answer, index) => (
                      answer === question.correct_answer
                        ? <CorrectBtn key={ index } answer={ answer } />
                        : <WrongBtn key={ index } answer={ answer } i={ index } />
                    ))}
                </div>
              );
            }
            return '';
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.gameReducer.gameData,
  isLoading: state.gameReducer.isLoading,
});

GamePage.propTypes = {
  gameData: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(GamePage);
