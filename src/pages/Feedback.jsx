import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';

class Feedback extends Component {
  constructor() {
    super();
    this.resultQuestions = this.resultQuestions.bind(this);
  }

  resultQuestions() {
    const lessThree = 'Podia ser melhor...';
    const moreThree = 'Mandou bem';
    const numberHits = 3;
    const { questions } = this.props;
    if (questions.value > numberHits) {
      return (
        <h1 data-testid="feedback-text">
          {lessThree}
        </h1>);
    }
    return (
      <h1 data-testid="feedback-text">
        {moreThree}
      </h1>);
  }

  render() {
    return (
      <div>
        <HeaderGame />
        <div>
          {this.resultQuestions()}
        </div>
      </div>
    );
  }
}

// verificar caminho
const mapStateToProps = (state) => ({
  questions: state.gameReducer.correntAsnwers,
});

Feedback.propTypes = ({
  questions: PropTypes.string,
}).isRequired;

export default connect(null, mapStateToProps)(Feedback);
