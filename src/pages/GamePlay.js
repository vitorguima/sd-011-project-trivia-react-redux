import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveQuestions } from '../actions';
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

  async callQuestions() {
    const tokenLocalStorage = JSON.parse(localStorage.getItem('token'));
    const { getQuestions } = this.props;
    const data = await fetchQuestions(tokenLocalStorage);
    getQuestions(data);
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
  getQuestions: (questions) => dispatch(saveQuestions(questions)),
});

export default connect(null, mapDispatchToProps)(GamePlay);
