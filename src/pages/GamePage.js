import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './GamePage.style.css';
import Timer from '../compoments/Timer';
import { enablebtns } from '../actions';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      score: 0,
      click: false,
      // disableBtn: true,
    };
    this.btnHandle = this.btnHandle.bind(this);
    this.clickAnswer = this.clickAnswer.bind(this);
    // this.disableBtns = this.disableBtns.bind(this);
  }

  componentDidUpdate() {
    const { timer } = this.props;
    if (timer <= 0) {
      clearInterval(this.setTimer);
    }
  }

  // disableBtns() {
  //   this.setState({ disableBtn: true });
  // }

  btnHandle() {
    const { enableBtns } = this.props;
    enableBtns();
    this.setState((ps) => ({
      questionIndex: ps.questionIndex + 1,
      click: false,
    }));
  }

  clickAnswer() {
    this.setState({
      click: true,
    });
  }

  questionSection(results, questionIndex) {
    return (
      <section>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        Question:
        <p data-testid="question-text">{results[questionIndex].question}</p>
      </section>
    );
  }

  answBtnCreator(results, questionIndex, click, disableBtn) {
    const result = results[questionIndex];
    const btnCorrectAnsw = (
      <button
        key="correct-answer"
        className={ click ? 'rightAnswer' : null }
        onClick={ this.clickAnswer }
        type="button"
        data-testid="correct-answer"
        disabled={ disableBtn }
      >
        {result.correct_answer}
      </button>);

    const btnWrngAnsw = [...result.incorrect_answers.map((wrngAnsw, index) => (
      <button
        key={ index }
        onClick={ this.clickAnswer }
        className={ click ? 'wrongAnswer' : null }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ disableBtn }
      >
        {wrngAnsw}
      </button>))];
    const randomNb = 0.5;
    const allBtns = [...btnWrngAnsw, btnCorrectAnsw].sort(() => Math.random() - randomNb);
    return allBtns;
  }

  renderHeader() {
    const { email, nome } = this.props;
    const hash = md5(email).toString();
    const { score } = this.state;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{nome}</h2>
        <h2
          data-testid="header-score"
        >
          Placar:
          { score }
        </h2>
      </header>
    );
  }

  render() {
    const { results, disableBtn } = this.props;
    const { questionIndex, click } = this.state;
    const indexLimit = 4;
    // if (timer <= 0) this.disableBtns();

    return (
      <div>
        {this.renderHeader()}
        <Timer />
        {results && this.questionSection(results, questionIndex)}
        {results && this.answBtnCreator(results, questionIndex, click, disableBtn)}
        <br />
        <button
          type="button"
          onClick={ () => this.btnHandle() }
          disabled={ questionIndex === indexLimit }
        >
          Próximo
        </button>
      </div>
    );
  }
}

// colocar um valor default para results proptypes
GamePage.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  disableBtn: PropTypes.bool.isRequired,
  enableBtns: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enableBtns: () => dispatch(enablebtns()),
});

const mapStateToProps = (state) => ({
  nome: state.triviaReducer.login.nome,
  email: state.triviaReducer.login.email,
  results: state.triviaReducer.questions.results,
  timer: state.triviaReducer.timer,
  disableBtn: state.triviaReducer.isDisable,

});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
