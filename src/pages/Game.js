import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { fetchQuestions } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      getQuestions(token);
    } else {
      getQuestions('');
    }
  }

  render() {
    const { loading } = this.props;
    if (loading) return <h3>Loading</h3>;
    return (
      <Question />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.questions.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  getQuestions: PropTypes.func,
  loading: PropTypes.bool,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
