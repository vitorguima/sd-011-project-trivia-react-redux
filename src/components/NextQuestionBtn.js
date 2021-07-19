import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as userActions from '../actions';

export class NextQuestionBtn extends Component {
  render() {
    const { toTheNextQuestion } = this.props;
    return (
      <div>
        <button
          type="button"
          value="Próxima"
          data-testid="btn-next"
          onClick={ toTheNextQuestion }
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

// const mapDispatchToProps = (dispatch) => ({
//   getNextQuestion: (value) => dispatch(userActions.getNextQuestion(value)),
// });

export default connect()(NextQuestionBtn);

NextQuestionBtn.propTypes = {
  sumQuestionIndex: PropTypes.func,
}.isRequired;
