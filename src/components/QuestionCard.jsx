import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import BooleanAnswers from './BooleanAnswers';
import MultipleAnswers from './MultipleAnswers';

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questions, isLoading, error } = this.props;
    const { questionIndex } = this.state;
    const question = questions[questionIndex];
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;
    return (
      <section>
        <section>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </section>
        <section>
          {
            question.type === 'boolean'
              ? <BooleanAnswers question={ question } />
              : <MultipleAnswers question={ question } />
          }
        </section>
      </section>
    );
  }
}

const mapStateToProps = ({ gameReducer: { questions, isLoading, error } }) => ({
  questions,
  isLoading,
  error,
});

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(QuestionCard);
