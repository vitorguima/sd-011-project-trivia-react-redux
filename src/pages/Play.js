import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions, addPoint} from '../actions'
import './Play.css';

export class Play extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      qIndex: 0,
    }

    this.initialFetch = this.initialFetch.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
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

  handleCorrect(event) {
    event.preventDefault();
    const { addScore } = this.props;
    const { className } = event.target;
    const btns = document.querySelectorAll('button.correct, button.wrong');
    btns.forEach((btn) => {
      btn.classList.add('revealed')
      btn.disabled = true;
    })
    if(className === 'correct') {
      addScore();
    }
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
            return <button 
              key={ answer }
              data-testid="correct-answer"
              className="correct"
              onClick={ this.handleCorrect }
            >
              { answer }
            </button>
          }
          index += 1;
          return <button
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            className="wrong"
            onClick={ this.handleCorrect }
          >
            { answer }
          </button>
        })}
      </div>
    )
  }

  render() {
    const { questions, score } = this.props;
    const carr = <span>Carregando</span>
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic"></img>
          <span data-testid="header-player-name">Jorginho</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        { questions.length ? this.renderQuestion() : carr }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
  questions: state.questions.questions,
  score: state.questions.score,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (state) => dispatch(fetchQuestions(state)),
  addScore: () => dispatch(addPoint()) });

export default connect(mapStateToProps, mapDispatchToProps)(Play);
