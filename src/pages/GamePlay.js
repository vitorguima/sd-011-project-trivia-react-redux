import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionsQuestions from '../actions';
import Header from '../components/Header';
import Questions from '../components/Questions';
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
    console.log(getQuestions(data));
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (data) => dispatch(actionsQuestions.saveQuestionsSuccess(data)),
});

export default connect(null, mapDispatchToProps)(GamePlay);

GamePlay.propTypes = {
  getQuestions: PropTypes.arrayOf().isRequired,
};
