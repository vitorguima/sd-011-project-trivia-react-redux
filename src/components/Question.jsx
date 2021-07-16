import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionHeader from './QuestionHeader';
import BooleanQuestion from './BooleanQuestion';
import MultipleChoice from './MultipleChoice';
import Loading from './Loading';

class Question extends React.Component {
  render() {
    const { questions, disabled } = this.props;

    return (
      <section>
        {(questions[0])
          ? (
            <>
              <QuestionHeader question={ questions[0] } />
              <div className="answer-options">
                { (questions[0].type === 'boolean')
                  ? <BooleanQuestion disabled={ disabled } question={ questions[0] } />
                  : <MultipleChoice disabled={ disabled } question={ questions[0] } /> }
              </div>
            </>
          )
          : <Loading /> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.results,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
};

Question.defaultProps = {
  questions: [{}],
};

Question.propTypes = {
  disabled: (PropTypes.bool).isRequired,
};

export default connect(mapStateToProps)(Question);
