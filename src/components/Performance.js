import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Performance extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  playAgain(history) {
    history.push('/');
  }

  rankinPage(history) {
    history.push('/ranking');
  }

  render() {
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    const expectedPerformace = 3;
    const { assertions, score, history } = this.props;

    return (
      <div>
        <p data-testid="feedback-text">
          {(assertions >= expectedPerformace) ? msg2 : msg1}
        </p>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{assertions}</span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">{score}</span>
          pontos
        </p>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => this.rankinPage(history) }
        >
          VER RANKING
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => this.playAgain(history) }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

Performance.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.triviaReducer.assertions,
  score: state.triviaReducer.score,
});

export default withRouter(connect(mapStateToProps)(Performance));
