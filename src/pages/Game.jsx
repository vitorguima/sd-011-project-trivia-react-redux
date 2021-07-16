import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';
import { getQuestions } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
      alternatives: [],
    };
    this.updateState = this.updateState.bind(this);
    // this.teste = this.teste.bind(this);
  }

  async componentDidMount() {
    const { token, handleQuestions } = this.props;
    await handleQuestions(token);
    this.updateState();
  }

  updateState() {
    const { quest } = this.props;
    this.setState({
      questions: quest,
      loading: false,
      alternatives: quest.map((alt) => [...alt.incorrect_answers, alt.correct_answer]),
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

  shuffle() {
    const { alternatives } = this.state;
    let newArray = [];
    const stopAt = -1;
    if (alternatives[0].length > 2) {
      const arrayLength = 3;
      for (let index = arrayLength, original = [...alternatives[0]];
        index > stopAt;
        index -= 1) {
        const random = Math.round(Math.random() * index);
        newArray = [...newArray, original[random]];
        original = original.filter((option) => option !== original[random]);
      }
      return newArray;
    }
    const original = [...alternatives[0]];
    const random = Math.round(Math.random());
    newArray[0] = original[random];
    newArray[1] = original[1 - random];
    return newArray;
  }

  renderButtons(answer, index) {
    const { questions } = this.state;
    if (answer === questions[0].correct_answer) {
      return (
        <button type="button" data-testid="correct-answer">
          {answer}
        </button>);
    }
    return (
      <button
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        type="button"
      >
        { answer }
      </button>);
  }

  render() {
    const { email, name, score } = this.props;
    const { questions, loading } = this.state;
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
                : <span data-testid="question-category">{questions[0].category}</span> }
            </p>
            <p>
              { loading ? <span>Carregando...</span>
                : <span data-testid="question-text">{questions[0].question}</span> }
            </p>
            <div>
              { loading ? <span>Carregando...</span>
                : this.shuffle()
                  .map((answer, index) => this.renderButtons(answer, index)) }
            </div>
          </div>
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
