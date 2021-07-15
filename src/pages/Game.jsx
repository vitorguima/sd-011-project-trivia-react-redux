import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
      index: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  nextQuestion() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  render() {
    const { loading, index } = this.state;
    const { hiddenBtn } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <Question questions={ questions[index] } />
        <button
          type="button"
          data-testid="btn-next"
          hidden={ hiddenBtn }
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  hiddenBtn: state.game.hidden,
});

Game.propTypes = {
  hiddenBtn: PropTypes.bool.isRequired,
};

export default connect(mapStatetoProps)(Game);
