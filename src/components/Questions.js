import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchQuestions } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      totalScore: 0,
      showNextButton: false,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleCorretAnswer = this.handleCorretAnswer.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.handleErrorAnswer = this.handleErrorAnswer.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  handleNext() {
    const { indexQuestion } = this.state;
    const maxQuestions = 5;
    if (indexQuestion <= maxQuestions) {
      this.setState({
        indexQuestion: indexQuestion + 1,
        showNextButton: false,
      });
    }
  }

  handleCorretAnswer() {
    this.setState((state) => ({
      totalScore: state.totalScore + 1,
      showNextButton: true,
    }));
  }

  handleErrorAnswer() {
    this.setState(() => ({
      showNextButton: true,
    }));
  }

  handleLocalStorage() {
    const { totalScore } = this.state;
    const retrievelocalStorage = JSON.parse(localStorage.getItem('state'));
    retrievelocalStorage.player.score = totalScore;
    localStorage.setItem('state', JSON.stringify(retrievelocalStorage));
    return <Redirect to="/feedback" />;
  }

  render() {
    const { questions } = this.props;
    const { indexQuestion, showNextButton } = this.state;
    const maxIndexQuestion = 4;

    if (indexQuestion > maxIndexQuestion) {
      return this.handleLocalStorage();
    }
    if (questions.length && indexQuestion <= maxIndexQuestion) {
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
                  onClick={ () => this.handleCorretAnswer() }
                >
                  {answer}
                </button>);
            }
            return (
              <button
                key={ index }
                type="button"
                onClick={ () => this.handleErrorAnswer() }
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>);
          })}
          {showNextButton && (
            <button type="button" data-testid="btn-next" onClick={ this.handleNext }>
              Próxima
            </button>)}
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
