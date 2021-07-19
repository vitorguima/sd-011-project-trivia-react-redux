import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import * as Timer from '../components/Timer';
import Answers from '../components/Answers';
import { fetchApiTrivia } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: 0,
    };
    this.nextQuestionButtonClicked = this.nextQuestionButtonClicked.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchTrivia(token);
  }

  nextQuestionButtonClicked() {
    this.setState((prevState) => ({ position: prevState.position + 1 }));
  }

  renderNextButton() {
    const { answerClicked } = this.props;
    if (answerClicked) {
      return true;
    }
    return false;
  }

  render() {
    const { results } = this.props;
    const { position } = this.state;
    const maxQuestion = 5;
    if (!results) return <h2>Carregando...</h2>;
    if (position === maxQuestion) {
      return <Redirect to="/feedback" />;
    }
    return (
      <>
        <Header />
        <p data-testid="question-category">{results[position].category}</p>
        <p data-testid="question-text">
          {results[position].question}
        </p>
        <Timer />
        <Answers
          correctAnswer={ results.correct_answer }
          incorrectAnswers={ results.incorrect_answers }
        />
        {this.renderNextButton() && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestionButtonClicked }
          >
            Próxima pergunta
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.triviaReducer.trivia.results,
  answerClicked: state.gameReducer.answerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: (token) => dispatch(fetchApiTrivia(token)),
});

Game.propTypes = {
  results: PropTypes.object,
  answerClicked: PropTypes.bool,
  fetchTrivia: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
