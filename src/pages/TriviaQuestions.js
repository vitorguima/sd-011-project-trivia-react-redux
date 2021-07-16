import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { requestApiThunk } from '../actions';
import Question from '../components/Question';

class TriviaQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCounter: 1,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { setStateGame } = this.props;
    setStateGame(token);
  }

  render() {
    const { questions } = this.props;
    const { results } = questions;
    const eachResult = Object.values({ ...results });
    const { questionCounter } = this.state;
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">Categoria</h1>
        <h2 data-testid="question-text">Questão:</h2>
        { eachResult ? <Question eachResult={ eachResult[questionCounter] } /> : null }
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStateGame: (payload) => dispatch(requestApiThunk(payload)),
});

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);

TriviaQuestions.propTypes = {
  questions: PropTypes.array,
  setStateGame: PropTypes.func,
}.isRequired;
