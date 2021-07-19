import React from 'react';
import { connect } from 'react-redux';
import { apiQuestion } from '../actions';
import { takeQuestionsApi } from '../services/getApi';
import Header from '../components/Header';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  async componentDidMount() {
    await this.fetchQuestion();
  }

  async fetchQuestion() {
    const { gameQuestion, token } = this.props
    const questions = await takeQuestionsApi(token);
    gameQuestion(questions); 
  }

  getAnswers(question) {
    const answers = question.incorrect_answers
      .concat(question.correct_aswers);
      return answers.map((answer, indexAnswer) => (
        <button
        type="button"
        key={ indexAnswer }
        value={ answer}
        data-testid={ question.correct_answers === answer
        ? 'corret-answer' : `wrong-answer-${indexAnswer}`}
        >
          { answer }
      </button>
      ));
  }

  render() {
    const { gameQuestionApi } = this.props;

    console.log(gameQuestionApi)

    return (
      <>
      <Header />
      { gameQuestionApi.map((question, index) => (
        <div key ={ index }>
          <span data-testid="question-category">{ question.category}</span>
          <p data-testid="question-text"> { question.question }</p>
          <div>
            { this.getAnswers(question) }
          </div>
        </div>
    )) }
    </>
    )
  }
}

const mapStateToProps = (state) => ({
  gameQuestionApi: state.apiQuestion.questions.results,
  token: state.user.token,
})

const mapDispachToProps =( dispatch ) => ({
  gameQuestion: (payload) => dispatch(apiQuestion(payload)),
});



export default connect(mapStateToProps, mapDispachToProps)(GameScreen);
