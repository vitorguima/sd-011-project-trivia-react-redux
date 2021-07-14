import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions } from '../actions';

class Play extends Component {
  render() {
    const { getToken, getQuestions, token } = this.props;
    return (
      <div>
        <button onClick={ getToken }>Token</button>
        <button onClick={ () => getQuestions(token) } >Questions</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (state) => dispatch(fetchQuestions(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Play);
