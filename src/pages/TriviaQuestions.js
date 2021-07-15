import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Headerlogin from '../components/header';
import { requestApiThunk } from '../actions';
import Answer from '../components/Answer';

class TriviaQuestions extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const { setStateGame } = this.props;
    setStateGame(token);
  }

  render() {
    // const { questions } = this.props;
    // const category = 'multiple';
    return (
      <div>
        <Headerlogin />
        <h1 data-testid="question-category">Categoria</h1>
        <h2 data-testid="question-text">Questão:</h2>
        <Answer />
      </div>);
  }
}
// export default TriviaQuestions;
const mapDispatchToProps = (dispatch) => ({
  setStateGame: (payload) => dispatch(requestApiThunk(payload)),
});

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);

TriviaQuestions.propTypes = {
  questions: PropTypes.array,
  setStateGame: propTypes.func,
}.isRequired;
