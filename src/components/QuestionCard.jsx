import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import BooleanAnswers from './BooleanAnswers';
import MultipleAnswers from './MultipleAnswers';
import Timer from './Timer';

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      disableButtons: false,
    };

    this.toggleDisableButtons = this.toggleDisableButtons.bind(this);
  }

  toggleDisableButtons() {
    this.setState((previousState) => ({
      disableButtons: !previousState.disableButtons,
    }));
  }

  render() {
    const { questions, isLoading, error } = this.props;
    const { questionIndex, disableButtons } = this.state;
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
              ? <BooleanAnswers question={ question } disabled={ disableButtons } />
              : <MultipleAnswers question={ question } disabled={ disableButtons } />
          }
        </section>
        <Timer toggleDisableButtons={ this.toggleDisableButtons } />
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
