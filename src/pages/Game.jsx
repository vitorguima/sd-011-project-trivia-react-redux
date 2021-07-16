import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';
import { actionClicked, actionTimer } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
      index: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  nextQuestion() {
    const { index } = this.state;
    const timer = 30;
    const numberOfQuestions = 5;
    const limit = 4;
    const { setClicked, setTimer, history: { push } } = this.props;
    if (index < numberOfQuestions) {
      this.setState({
        index: index + 1,
      });
      setClicked(false);
      setTimer(timer);
    }
    if (index === limit) {
      push('/feedback');
    }
  }

  render() {
    const { loading, index } = this.state;
    const { hiddenBtn } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <Question questions={ questions[index] } />
        <button
          type="button"
          data-testid="btn-next"
          hidden={ hiddenBtn }
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  hiddenBtn: state.game.hidden,
});

const mapDispatchToProps = (dispatch) => ({
  setClicked: (clicked) => dispatch(actionClicked(clicked)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
});

Game.propTypes = {
  hiddenBtn: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Game);
