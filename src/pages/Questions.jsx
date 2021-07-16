import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      isCorrect: '',
      isIncorrect: '',
      disable: false,
      questionIndex: 0,
      timer: 30000,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    setTimeout(() => this.handleClick(), timer);
  }

  handleGravatar() {
    const { email } = this.props;
    return md5(email).toString();
  }

  handleClick() {
    this.setState({
      isCorrect: 'correct',
      isIncorrect: 'incorrect',
      disable: true,
    });
  }

  render() {
    const { name, questions } = this.props;
    const { score, isCorrect, isIncorrect, questionIndex, disable } = this.state;
    console.log(isCorrect, isIncorrect);
    return (
      <main>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">
            Usuário:
            { name }
          </h2>
          <p data-testid="header-score">{ score }</p>
        </header>
        <section>
          {questions && questions.map((question, index) => (
            <div key={ index }>
              <h2 data-testid="question-category">{ question.category }</h2>
              <p data-testid="question-text">{ question.question }</p>

              {[...question.incorrect_answers, question.correct_answer]
                .map((ans, i) => (
                  <button
                    data-testid={ ans === question.correct_answer
                      ? 'correct-answer' : `wrong-answer-${i}` }
                    type="button"
                    key={ i }
                    className={ ans === question.correct_answer
                      ? isCorrect : isIncorrect }
                    disabled={ disable }
                    onClick={ this.handleClick }
                  >
                    { ans }
                  </button>))}
            </div>
          ))[questionIndex]}
        </section>
      </main>
    );
  }
}

Questions.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  questions: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

Questions.defaultProps = {
  email: '',
  name: '',
};

const mapDispatchToProps = (dispatch) => ({
  questionsResult: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
