import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './GamePage.style.css';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      score: 0,
      click: false,
    };
    this.btnHandle = this.btnHandle.bind(this);
    this.clickAnswer = this.clickAnswer.bind(this);
  }

  btnHandle() {
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

  renderHeader() {
    const { email, nome } = this.props;
    const hash = md5(email).toString();
    const { score } = this.state;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="avatar" data-testid="header-profile-picture" />
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

  renderBtn() {
    const { click, questionIndex } = this.state;
    const { results } = this.props;
    return (
      <button
        key="correct-answer"
        className={ click ? 'rightAnswer' : null }
        onClick={ this.clickAnswer }
        type="button"
        data-testid="correct-answer"
      >
        {results[questionIndex].correct_answer}
      </button>
    );
  }

  render() {
    const { results } = this.props;
    const { questionIndex, click } = this.state;
    const indexLimit = 4;
    const randomNumber = 0.5;
    return (
      <div>
        {this.renderHeader()}
        {results && (
          <div>
            <p data-testid="question-category">{results[questionIndex].category}</p>
            Question:
            <p data-testid="question-text">{results[questionIndex].question}</p>
            {[...results[questionIndex].incorrect_answers
              .map((wrngAnsw, index) => (
                <button
                  key={ index }
                  onClick={ this.clickAnswer }
                  className={ click ? 'wrongAnswer' : null }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                >
                  {wrngAnsw}
                </button>)), this.renderBtn()].sort(() => Math.random() - randomNumber)}
          </div>) }
        <button
          type="button"
          onClick={ this.btnHandle }
          disabled={ questionIndex === indexLimit }
        >
          Próximo
        </button>
      </div>
    );
  }
}

GamePage.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.triviaReducer.login.nome,
  email: state.triviaReducer.login.email,
  results: state.triviaReducer.questions.results,
});

export default connect(mapStateToProps)(GamePage);
