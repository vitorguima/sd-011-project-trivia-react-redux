import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchTokenApi } from '../actions/index';

class Game extends Component {
  componentDidMount() {
    const { fetchToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchToken(token);
  }

  render() {
    const { questions } = this.props;
    const { results } = questions.questions;

    if (!results) return <h3>Loading...</h3>;

    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{results[0].category}</p>
          <p data-testid="question-text">{results[0].question}</p>
          <button type="button" data-testid="correct-answer">
            {results[0].correct_answer}
          </button>
          {results[0].incorrect_answers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(fetchTokenApi(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  questions: PropTypes.oneOfType([
    PropTypes.PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.string),
    }),
    PropTypes.string,
  ]).isRequired,
};
