import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions} from '../actions'

export class Play extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      qIndex: 0,
    }

    this.initialFetch = this.initialFetch.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const { getToken, getQuestions, token, questions } = this.props;
    await getToken();
    await getQuestions(token);
    this.setState(() => ({
      questions,
    }))
  }

  renderQuestion() {
    const { questions } = this.props;
    const { qIndex } = this.state;
    const currQuestion = questions[qIndex];
    const correctA = currQuestion.correct_answer;
    const posAnswers = [correctA, ...currQuestion.incorrect_answers];
    let index = -1;
    posAnswers.sort(() => Math.random() - 0.5);
    return (
      <div>
        <span data-testid="question-category">{ currQuestion.category }</span>
        <p data-testid="question-text">{ currQuestion.question }</p>
        {posAnswers.map(( answer ) => {
          if (answer === correctA) {
            return <button key={ answer } data-testid="correct-answer">{ answer }</button>
          }
          index += 1;
          return <button key={ answer } data-testid={ `wrong-answer-${index}` }>{ answer }</button>
        })}
      </div>
    )
  }

  render() {
    const { questions } = this.props;
    const carr = <span>Carregando</span>
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic"></img>
          <span data-testid="header-player-name">Jorginho</span>
          <span data-testid="header-score">0</span>
        </header>
        { questions.length ? this.renderQuestion() : carr }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (state) => dispatch(fetchQuestions(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Play);
