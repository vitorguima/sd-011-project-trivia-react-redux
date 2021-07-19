import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services';
import { login } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      indexQuestion: 0,
      showCorrect: false,
      timer: 30,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setShowCorrect = this.setShowCorrect.bind(this);
    this.finalQuestion = this.finalQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const response = await getQuestions(token);
    this.setState({
      questions: response.results,
    });
  }

  setShowCorrect() {
    this.setState({
      showCorrect: true,
    });
  }

  nextQuestion() {
    this.setState((old) => ({
      indexQuestion: old.indexQuestion + 1,
      showCorrect: false,
    }));
  }

  finalQuestion(assertions, score) {
    const { player: { name, gravatarEmail }, loginDispatch } = this.props;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail,
    };
    loginDispatch(name, gravatarEmail, assertions, score);
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  render() {
    const { questions, indexQuestion, showCorrect, timer } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.length > 0
          && <Question
            question={ questions[indexQuestion] }
            index={ indexQuestion }
            nextQuestion={ this.nextQuestion }
            showCorrect={ showCorrect }
            setShowCorrect={ this.setShowCorrect }
            finalQuestion={ this.finalQuestion }
            timer={ timer }
          /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.playerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (name, email, assertions, score) => {
    dispatch(login(name, email, assertions, score));
  },
});

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  loginDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
