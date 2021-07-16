import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Headerlogin from '../components/header';
import { requestApiThunk } from '../actions';
import Answer from '../components/Answer';

class TriviaQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: 1,
    };
    const { question } = this.state;
    console.log(question);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { setStateGame } = this.props;
    setStateGame(token);
  }

  render() {
    return (
      <div>
        <Headerlogin />
        <Answer />
      </div>);
  }
}
// export default TriviaQuestions;
const mapDispatchToProps = (dispatch) => ({
  setStateGame: (questions) => dispatch(requestApiThunk(questions)),
});

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);

TriviaQuestions.propTypes = {
  questions: PropTypes.array,
  setStateGame: PropTypes.func,
}.isRequired;
