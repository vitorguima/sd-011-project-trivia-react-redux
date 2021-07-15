import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requisitionQuests from '../helpers/RequisitionQuests';
import Header from '../components/Header';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      clickedQuest: false,
    };
    this.passQuestion = this.passQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatchQuests } = this.props;
    if (localStorage.token) {
      dispatchQuests(localStorage.token);
    }
  }

  buttonCorrect() {
    const { stateQuests } = this.props;
    const { index, clickedQuest } = this.state;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        key="correct"
        className={ clickedQuest ? 'correctAnswer' : null }
        onClick={ this.handleClick }
      >
        {stateQuests[index].correct_answer}
      </button>
    );
  }

  passQuestion() {
    this.setState(() => ({ clickedQuest: true }));
  }

  handleClick() {
    this.passQuestion();
  }

  render() {
    const { gameLoading, stateQuests } = this.props;
    const { index, clickedQuest } = this.state;
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
              {[this.buttonCorrect(),
                stateQuests[index].incorrect_answers.map((e, i) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ i }
                    className={ clickedQuest ? 'incorrectAnswers' : null }
                    onClick={ this.handleClick }
                  >
                    {e}
                  </button>)),
              ]}
            </div>
          )}
        { clickedQuest ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.setState((prev) => ({
                index: prev.index + 1,
                clickedQuest: false,
              }));
            } }
            disabled={ index === limitIndex }
          >
            Próxima
          </button>
        ) : null }
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
