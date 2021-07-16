import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeToNextQuestion } from '../actions';
import QuestionHeader from './QuestionHeader';
import BooleanQuestion from './BooleanQuestion';
import MultipleChoice from './MultipleChoice';
import Loading from './Loading';

class Question extends React.Component {
  render() {
    const { questions, showBtn, currentQuestion, nextQuestion, disabled } = this.props;
    return (
      <section>
        {(questions[currentQuestion])
          ? (
            <>
              <QuestionHeader question={ questions[currentQuestion] } />
              <div className="answer-options">
                { (questions[currentQuestion].type === 'boolean')
                  ? (
                    <BooleanQuestion
                      disabled={ disabled }
                      question={ questions[currentQuestion] }
                    />
                  )
                  : (
                    <MultipleChoice
                      disabled={ disabled }
                      question={ questions[currentQuestion] }
                    />
                  )}
              </div>
              <button
                data-testid="btn-next"
                type="button"
                className={ (showBtn) ? 'show-btn' : 'hide-btn' }
                onClick={ () => nextQuestion() }
              >
                Próxima pergunta
              </button>
            </>
          )
          : <Loading /> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.results,
  showBtn: state.questionsReducer.showBtn,
  currentQuestion: state.questionsReducer.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(changeToNextQuestion()),
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  showBtn: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  disabled: (PropTypes.bool).isRequired,
};

Question.defaultProps = {
  questions: [{}],
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
