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
    this.renderFeedback = this.renderFeedback.bind(this);
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

  renderFeedback(path) {
    const { history } = this.props;
    return history.push(path);
  }

  render() {
    return (
      <div>
        <Header />
        <Questions feedback={ this.renderFeedback } />
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
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
};
