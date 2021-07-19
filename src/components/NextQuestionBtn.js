import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class NextQuestionBtn extends Component {
  constructor(props) {
    super(props);
    this.setTimerTo30 = this.setTimerTo30.bind(this);
  }

  setTimerTo30() {
    const { newQuestionTime } = this.props;
    console.log(newQuestionTime);
    newQuestionTime();
  }

  render() {
    const { toTheNextQuestion } = this.props;
    return (
      <div>
        <button
          type="button"
          value="Próxima"
          data-testid="btn-next"
          onClick={ () => { toTheNextQuestion(); this.setTimerTo30(); } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

// Verificar porque neste componente o Store não funciona
// const mapStateToProps = (state) => ({
//   wasAsnwered: state.question.wasAsnwered,
// });

const mapDispatchToProps = (dispatch) => ({
  newQuestionTime: () => dispatch(userActions.newQuestionTime()),
});

export default connect(null, mapDispatchToProps)(NextQuestionBtn);

NextQuestionBtn.propTypes = {
  sumQuestionIndex: PropTypes.func,
}.isRequired;
