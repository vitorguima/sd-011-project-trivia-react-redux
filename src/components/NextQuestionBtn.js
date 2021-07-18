import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NextQuestionBtn extends Component {
  render() {
    const { wasAnswered } = this.props;
    // console.log(wasAnswered);
    return (
      <div>
        <button
          type="button"
          value="Próxima"
          hidden={ false }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wasAsnwered: state.question.wasAsnwered,
});

export default connect(mapStateToProps)(NextQuestionBtn);
