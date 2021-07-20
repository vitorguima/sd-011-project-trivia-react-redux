import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class NextQuestionBtn extends Component {
  constructor(props) {
    super(props);
    this.setTimerTo30 = this.setTimerTo30.bind(this);
    this.removeColors = this.removeColors.bind(this);
  }

  setTimerTo30() {
    const { newQuestionTime } = this.props;
    newQuestionTime();
  }

  removeColors() {
    const buttons = document.getElementsByName('answer');
    const buttonsArray = Object.values(buttons);
    buttonsArray.forEach((button) => {
      button.className = 'answer';
    });
  }

  render() {
    const { toTheNextQuestion } = this.props;
    return (
      <div>
        <button
          type="button"
          value="Próxima"
          data-testid="btn-next"
          onClick={ () => {
            toTheNextQuestion();
            this.setTimerTo30();
            this.removeColors();
          } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newQuestionTime: () => dispatch(userActions.newQuestionTime()),
});

export default connect(null, mapDispatchToProps)(NextQuestionBtn);

NextQuestionBtn.propTypes = {
  sumQuestionIndex: PropTypes.func,
}.isRequired;
