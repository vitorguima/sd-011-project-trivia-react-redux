import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.handleSum = this.handleSum.bind(this);
    this.renderScore = this.renderScore.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.testId = this.testId.bind(this);
  }

  handleSum() {
    this.setState((state) => ({ count: state.count + 1 }));
  }

  testId() {
    const { questions } = this.props;
    const { results } = questions;
    this.renderQuestions(results);
  }

  renderScore() {
    return <Redirect to="/ranking" />;
  }

  renderQuestions() {
    const { questions } = this.props;
    const { results } = questions;
    const { count } = this.state;
    const arrayOfResults = Object.values({ ...results });
    return (
      results
        ? <>
          <div>Preparado?</div>
          { arrayOfResults.map((incAnswer, index) => (
            <div key={ `chave ${index}` }>
              <h4
                data-testid="question-category"
              >
                {' '}
                Categoria:
                { incAnswer.category }
              </h4>
              <h2 data-testid="question-text">{ incAnswer.question }</h2>
              { results.map((e, i) => (
                <button
                  data-testid="correct-answer"
                  onClick={ this.handleSum }
                  type="button"
                  key={ `chave${i}` }
                >
                  { e.correct_answer }
                </button>))[count] }
              { results
                .map((elem) => elem.incorrect_answers)[count].map((call, index3) => (
                  <button
                    data-testid={ `wrong-answer-${index3}` }
                    onClick={ this.handleSum }
                    type="button"
                    key={ `chave${index3}` }
                  >
                    {call}
                  </button>)) }
            </div>
          ))[count]}
        </>
        : 'Carregando'
    );
  }

  render() {
    const { count } = this.state;
    const num = 4;
    return (
      <div>
        { count > num ? this.renderScore() : this.renderQuestions() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
});

// const mapDispatchToProps = {
// }

export default connect(mapStateToProps)(Answer);

Answer.propTypes = {
  questions: PropTypes.array,
}.isRequired;
