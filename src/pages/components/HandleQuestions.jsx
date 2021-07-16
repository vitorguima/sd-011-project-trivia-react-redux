import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class HandleQuestions extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const { token, fetchAPIQuestions } = this.props;
    fetchAPIQuestions(token);
    this.timerAnswer();
  }

  handleClick() {
    const { clickedHandle } = this.props;
    clickedHandle(true);
  }

  timerAnswer() {
    const time = 30000;
    const interval = 1000;
    const IntervalTimer = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, interval);
    setTimeout(() => clearInterval(IntervalTimer), time);
    setTimeout(() => this.handleClick(), time);
  }

  handleQuestions({ results }) {
    const { clicked } = this.props;
    const { timer } = this.state;
    if (results) {
      return (
        <section>
          <h3 data-testid="question-category">{results[0].category}</h3>
          <h3 data-testid="question-text">{results[0].question}</h3>
          <button
            onClick={ (event) => this.handleClick(event.target) }
            data-testid="correct-answer"
            type="button"
            disabled={ clicked }
            style={ clicked ? { border: '3px solid rgb(6, 240, 15)' } : null }
          >
            {results[0].correct_answer}
          </button>
          {results[0].incorrect_answers.map((answer, index) => (
            <button
              onClick={ () => this.handleClick() }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              disabled={ clicked }
              type="button"
              style={ clicked ? { border: '3px solid rgb(255, 0, 0)' } : null }
            >
              {answer}
            </button>
          ))}
          <button type="button" disabled={ !clicked }>Proximo</button>
          <span>{timer}</span>
        </section>
      );
    }
  }

  render() {
    const { questionsData } = this.props;
    return (
      <>
        {this.handleQuestions(questionsData)}
      </>
    );
  }
}

HandleQuestions.propTypes = {
  fetchAPIQuestions: PropTypes.func.isRequired,
  clickedHandle: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  token: PropTypes.bool.isRequired,
  questionsData: PropTypes.shape({
    results: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questionsData: state.gameReducer.questionsData,
  clicked: state.gameReducer.clicked,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
  clickedHandle: (bool) => dispatch(actions.clickedHandle(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleQuestions);
