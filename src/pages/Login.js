import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { updateScore } from '../actions/game';

class Login extends Component {
  componentDidMount() {
    const { score } = this.props;
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    score(0);
  }

  render() {
    return (
      <LoginForm />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  score: (questionScore) => dispatch(updateScore(questionScore)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  score: PropTypes.func.isRequired,
};
