import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestionsThunk } from '../actions';
import QuestionList from '../components/QuestionList';

class GamePage extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (<h1>Carregando</h1>);
    }
    return (<QuestionList />);
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  isLoading: state.questionsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestionsThunk()),
});

GamePage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
