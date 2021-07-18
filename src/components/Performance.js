import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Performance extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  render() {
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    const expectedPerformace = 3;
    const { assertions, score } = this.props;

    return (
      <div>
        <p data-testid="feedback-text">
          {(assertions >= expectedPerformace) ? msg2 : msg1}
        </p>
        <p data-testid="feedback-total-question">
          {`Você acertou ${assertions} questões!`}
        </p>
        <p data-testid="feedback-total-score">
          {`Um total de  ${score} pontos`}
        </p>
      </div>
    );
  }
}

Performance.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.triviaReducer.assertions,
  score: state.triviaReducer.score,
});

export default connect(mapStateToProps)(Performance);
