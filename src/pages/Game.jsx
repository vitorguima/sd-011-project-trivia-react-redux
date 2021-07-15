import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requisitionQuests from '../helpers/RequisitionQuests';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { dispatchQuests } = this.props;
    if (localStorage.token) {
      dispatchQuests(localStorage.token);
    }
  }

  render() {
    const { gameLoading, stateQuests } = this.props;
    const { index } = this.state;
    const limitIndex = 4;
    return (
      <div>
        <Header />
        {gameLoading
          ? 'Loading'
          : (
            <div>
              <p data-testid="question-category">{stateQuests[index].category}</p>
              <p data-testid="question-text">{stateQuests[index].question}</p>
              {[
                <button
                  type="button"
                  data-testid="correct-answer"
                  key="correct"
                  onClick={ () => this.setState((prev) => ({ index: prev.index + 1 })) }
                >
                  {stateQuests[index].correct_answer}
                </button>, stateQuests[index].incorrect_answers.map((e, i) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ i }
                    onClick={ () => this.setState((prev) => ({ index: prev.index + 1 })) }
                  >
                    {e}
                  </button>)),
              ]}
            </div>
          )}
        <button
          type="button"
          onClick={ () => this.setState((prev) => ({ index: prev.index + 1 })) }
          disabled={ index === limitIndex }
        >
          Próximo
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  dispatchQuests: PropTypes.func.isRequired,
  gameLoading: PropTypes.bool.isRequired,
  stateQuests: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchQuests: (state) => dispatch(requisitionQuests(state)),
});

const mapStateToProps = (state) => ({
  stateToken: state.game.apiQuests,
  stateLoading: state.login.loading,
  gameLoading: state.game.loading,
  stateQuests: state.game.apiQuests,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
