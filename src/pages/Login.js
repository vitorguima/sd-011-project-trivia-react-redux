import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { updateScore } from '../actions/game';
import logo from '../trivia.png';

class Login extends Component {
  componentDidMount() {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <LoginForm />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  score: (questionScore) => dispatch(updateScore(questionScore)),
});

export default connect(null, mapDispatchToProps)(Login);
