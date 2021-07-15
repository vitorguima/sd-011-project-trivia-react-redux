import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../services/Api';

class GamePlay extends Component {
  constructor() {
    super();

    this.callQuestions = this.callQuestions.bind(this);
  }

  componentDidMount() {
    this.callQuestions();
  }

  callQuestions() {
    const tokenLocalStorage = JSON.parse(localStorage.getItem('token'));
    const { getQuestions } = this.props;
    getQuestions(tokenLocalStorage);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (userToken) => dispatch(fetchQuestions(userToken)),
});

export default connect(null, mapDispatchToProps)(GamePlay);
