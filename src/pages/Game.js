import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getQuestions, getToken } from '../actions';
import HeaderGame from '../components/HeaderGame';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      sucess: false,
      loss: false,
    };
    this.handleSucess = this.handleSucess.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.fetchQuest = this.fetchQuest.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
    this.fetchQuest();
  }

  async fetchQuest() {
    const { fetchQuestions } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const { data } = await axios.get(URL);
    console.log(data.token);
    fetchQuestions(data.token);
  }

  handleSucess() {
    this.setState({ sucess: true });
    this.setState({ loss: true });
  }

  handleLoss() {
    this.setState({ loss: true });
    this.setState({ sucess: true });
  }

  render() {
    const { questions } = this.props;
    const { index, sucess, loss } = this.state;
    if (!questions.length) {
      return <div>Loading...</div>;
    }
    const {
      category,
      question, correct_answer:
      correntAnswer,
      incorrect_answers:
      incorrectAnswer,
    } = questions[index];
    return (
      <section>
        <HeaderGame />
        <div className="container">
          <p data-testid="question-category">
            { category }
          </p>
          <p data-testid="question-text">
            { question }
          </p>
          <button
            className={ `${sucess ? 'sucess' : ''}` }
            onClick={ this.handleSucess }
            type="button"
            data-testid="correct-answer"
          >
            { correntAnswer }
          </button>
          {incorrectAnswer.map((answer, idx) => (
            <button
              className={ `${loss ? 'loss' : ''}` }
              onClick={ this.handleLoss }
              data-testid={ `wrong-answer-${idx}` }
              type="button"
              key={ idx }
            >
              { answer }
            </button>
          ))}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  email: state.login.email,
  questions: state.login.questions,
  loading: state.login.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestions(token)),
  fetchToken: () => dispatch(getToken()),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
