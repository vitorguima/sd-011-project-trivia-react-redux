import React, { Component, history } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
    };
    this.handleNext = this.handleNext.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  handleNext() {
    const { indexQuestion } = this.state;
    const maxQuestions = 4;
    if (indexQuestion >= maxQuestions) {
      history.push('/feedback');
    } else {
      this.setState({
        indexQuestion: indexQuestion + 1,
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { indexQuestion } = this.state;
    console.log(indexQuestion);
    if (questions.length) {
      const correctAnswer = questions[indexQuestion].correct_answer;
      const incorrectAnswers = questions[indexQuestion].incorrect_answers;
      const answers = [correctAnswer, ...incorrectAnswers].sort();
      const { category, question } = questions[indexQuestion];
      return (
        <section>
          <div data-testid="question-category">{ category }</div>

          <div data-testid="question-text">{ question }</div>

          {answers.map((answer, index) => {
            if (answer === correctAnswer) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                >
                  {answer}
                </button>);
            }
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>);
          })}
          <button type="button" data-testid="btn-next" onClick={ this.handleNext }>
            Próxima
          </button>
        </section>
      );
    }
    return <section>carregando...</section>;
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.homeReducer.token,
  questions: state.homeReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
