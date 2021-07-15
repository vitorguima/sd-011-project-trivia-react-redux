import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    const questArray = Object.values(questions);
    return (
      <div>
        { questArray
          .map((question, index) => <Question key={ index } question={ question } />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

QuestionList.propTypes = {
  questions: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(QuestionList);
