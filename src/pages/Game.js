import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Results from '../components/Results';
import { fetchApiToken, answerReset, resetTimer } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      timer: 30,
    };
    this.renderTimer = this.renderTimer.bind(this);
    this.nextQuestionBtn = this.nextQuestionBtn.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    fetchTrivia();
  }

  nextQuestionBtn() {
    const { answerButtonReset, resetTimerProp } = this.props;

    this.setState((prevState) => ({
      position: prevState.position + 1, timer: 30,
    }));

    answerButtonReset();
    resetTimerProp();
  }

  renderTimer() {
    const { answerClicked } = this.props;
    const { timer } = this.state;

    const seconds = 1000;
    const timeout = setTimeout(() => this.setState((prevState) => ({
      timer: prevState.timer - 1,
    })), seconds);

    if (timer === 0 || answerClicked) clearTimeout(timeout);
  }

  renderNextButton() {
    const { answerClicked } = this.props;
    const { timer } = this.state;
    if (answerClicked || timer === 0) return true;
    return false;
  }

  render() {
    const { results } = this.props;
    const { timer, position } = this.state;
    if (!results) return (<h2>Carregando...</h2>);

    return (
      <div>
        <Header />
        <p
          data-testid="question-category"
        >
          {results[position].category}
        </p>
        <p
          data-testid="question-text"
          onLoad={ this.renderTimer() }
        >
          {results[position].question}
        </p>
        <h3>{ timer }</h3>
        <Results results={ results[position] } timer={ timer } />
        { this.renderNextButton() && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestionBtn }
            style={ { padding: '10px' } }
          >
            Próxima pergunta
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.triviaReducer.trivia.results,
  answerClicked: state.gameReducer.answerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: () => dispatch(fetchApiToken()),
  answerButtonReset: () => dispatch(answerReset()),
  resetTimerProp: () => dispatch(resetTimer()),
});

Game.propTypes = {
  results: PropTypes.object,
  answerClicked: PropTypes.bool,
  fetchTrivia: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
