import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, addPoint } from '../actions';
import './Play.css';

class Play extends Component {
  constructor() {
    super();

    this.state = {
      qIndex: 0,
      answered: false,
    };

    this.initialFetch = this.initialFetch.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderNxtBtn = this.renderNxtBtn.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  handleCorrect(event) {
    event.preventDefault();
    const { addScore } = this.props;
    const { className } = event.target;
    const btns = document.querySelectorAll('button.correct, button.wrong');
    btns.forEach((btn) => {
      btn.classList.add('revealed');
      btn.disabled = true;
    });
    if (className === 'correct') {
      addScore();
    }
    this.setState(() => ({
      answered: true,
    }));
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { qIndex } = this.state;
    if (qIndex < questions.length - 1) {
      this.setState((state) => ({
        qIndex: state.qIndex + 1,
        answered: false,
      }));
    } else {
      history.push('/Feedback');
    }
  }

  renderNxtBtn() {
    return (
      <button
        type="submit"
        onClick={ this.nextQuestion }
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }

  renderQuestion() {
    const { questions } = this.props;
    const { qIndex } = this.state;
    const currQuestion = questions[qIndex];
    const correctA = currQuestion.correct_answer;
    const posAnswers = [correctA, ...currQuestion.incorrect_answers];
    const initialIndex = -1;
    let index = initialIndex;
    const ran = 0.5;
    posAnswers.sort(() => Math.random() - ran);
    return (
      <div>
        <span data-testid="question-category">{ currQuestion.category }</span>
        <p data-testid="question-text">{ currQuestion.question }</p>
        {posAnswers.map((answer) => {
          if (answer === correctA) {
            return (
              <button
                key={ answer }
                type="submit"
                data-testid="correct-answer"
                className="correct"
                onClick={ this.handleCorrect }
              >
                { answer }
              </button>
            );
          }
          index += 1;
          return (
            <button
              key={ answer }
              type="submit"
              data-testid={ `wrong-answer-${index}` }
              className="wrong"
              onClick={ this.handleCorrect }
            >
              { answer }
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const { questions, score, name } = this.props;
    const { answered } = this.state;
    const carr = <span>Carregando</span>;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic" />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        { questions.length ? this.renderQuestion() : carr }
        { (answered) ? this.renderNxtBtn() : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
  questions: state.questions.questions,
  score: state.questions.score,
  name: state.userReducer.name,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (state) => dispatch(fetchQuestions(state)),
  addScore: () => dispatch(addPoint()) });

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
