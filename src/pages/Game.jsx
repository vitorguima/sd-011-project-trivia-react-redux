import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';
import { getQuestions } from '../redux/actions';

import createStopwatch from '../utils/stopwatch';

import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      loading: true,
      alternatives: [],
      hasPicked: false,
      remainingTime: null,
      stopwatch: null,
      currentQuestionIndex: 0,
    };
    this.initializeState = this.initializeState.bind(this);
    this.handlePickOption = this.handlePickOption.bind(this);
    this.handleStopwatchEnd = this.handleStopwatchEnd.bind(this);
    this.handleStopwatchTick = this.handleStopwatchTick.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleStopwatchReset = this.handleStopwatchReset.bind(this);
  }

  async componentDidMount() {
    const { token, handleQuestions } = this.props;
    await handleQuestions(token);
    this.initializeState();
  }

  componentWillUnmount() {
    const { stopwatch } = this.state;
    stopwatch.stop();
  }

  handleStopwatchEnd() {
    this.setState({
      hasPicked: true,
    });
  }

  handleStopwatchTick(remainingTime) {
    this.setState({
      remainingTime,
    });
  }

  handleStopwatchReset(initialTime) {
    this.setState({
      remainingTime: initialTime,
    });
  }

  handleNextQuestion() {
    const { stopwatch, currentQuestionIndex, questions } = this.state;
    if (currentQuestionIndex > questions.length - 2) return;
    this.setState(({ currentQuestionIndex: index }) => ({
      currentQuestionIndex: index + 1,
      hasPicked: false,
    }));
    stopwatch.reset().start();
  }

  initializeState() {
    const { quest } = this.props;

    const TIME_TO_CHOOSE = 30;

    const callbacks = {
      tick: this.handleStopwatchTick,
      end: this.handleStopwatchEnd,
      reset: this.handleStopwatchReset,
    };

    this.setState({
      questions: quest,
      loading: false,
      alternatives: quest.map((alt) => (
        this.shuffle([...alt.incorrect_answers, alt.correct_answer]))),
      remainingTime: TIME_TO_CHOOSE,
      stopwatch: createStopwatch(TIME_TO_CHOOSE, callbacks).start(),
    });
  }

  // shuffle(originalArray) {
  //   const array = [...originalArray];
  //   let backPileFrontier = array.length - 1;

  //   while (backPileFrontier) {
  //     const randomIndex = Math.floor(Math.random() * backPileFrontier);
  //     const swap = array[backPileFrontier];
  //     array[backPileFrontier] = array[randomIndex];
  //     array[randomIndex] = swap;

  //     backPileFrontier -= 1;
  //   }

  //   return array;
  // } fisher-yates (inacio)

  handlePickOption({ target }) {
    const { stopwatch } = this.state;
    stopwatch.stop();

    if (target.dataset.testid === 'correct-answer') {
      console.log('acertou');
    } else {
      console.log('errou');
    }

    this.setState({
      hasPicked: true,
    });
  }

  shuffle(original) {
    let newArray = [];
    const stopAt = -1;
    if (original.length > 2) {
      const arrayLength = 3;
      for (let index = arrayLength, clone = [...original];
        index > stopAt;
        index -= 1) {
        const random = Math.round(Math.random() * index);
        newArray = [...newArray, clone[random]];
        clone = clone.filter((option) => option !== clone[random]);
      }
      return newArray;
    }
    const clone = [...original];
    const random = Math.round(Math.random());
    newArray[0] = clone[random];
    newArray[1] = clone[1 - random];
    return newArray;
  }

  renderButtons(answer, index) {
    const { questions, hasPicked, currentQuestionIndex } = this.state;
    if (answer === questions[currentQuestionIndex].correct_answer) {
      return (
        <button
          onClick={ this.handlePickOption }
          key={ index }
          type="button"
          data-testid="correct-answer"
          className={ `choices--correct${hasPicked ? '--picked' : ''}` }
          disabled={ hasPicked }
        >
          {answer}
        </button>);
    }
    return (
      <button
        onClick={ this.handlePickOption }
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        className={ `choices--wrong${hasPicked ? '--picked' : ''}` }
        disabled={ hasPicked }
      >
        { answer }
      </button>);
  }

  render() {
    const { email, name, score } = this.props;
    const { questions, loading, alternatives, remainingTime, hasPicked, currentQuestionIndex } = this.state;
    return (
      <Layout title="Game">
        <main>
          <header>
            <img
              src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
              alt="avatar"
              data-testid="header-profile-picture"
            />
            <h1 data-testid="header-player-name">{name}</h1>
            <p>
              Pontuação atual:&nbsp;
              <span data-testid="header-score">
                { score }
              </span>
            </p>
          </header>
          <div>
            <p>
              { loading ? <span>Carregando...</span>
                : <span data-testid="question-category">{questions[currentQuestionIndex].category}</span> }
            </p>
            <p>
              { loading ? <span>Carregando...</span>
                : <span data-testid="question-text">{questions[currentQuestionIndex].question}</span> }
            </p>
            <div>
              { loading ? <span>Carregando...</span>
                : alternatives[currentQuestionIndex]
                  .map((answer, index) => this.renderButtons(answer, index)) }
            </div>
          </div>
          <p>
            Tempo restante:&nbsp;
            { remainingTime }
          </p>
          {hasPicked && <button type="button" data-testid="btn-next" onClick={ this.handleNextQuestion }>Próxima pergunta</button>}
        </main>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
  token: state.user.token,
  quest: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  handleQuestions: (userToken) => dispatch(getQuestions(userToken)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
