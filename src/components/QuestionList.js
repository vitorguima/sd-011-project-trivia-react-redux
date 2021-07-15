import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      savedQuestions: '',
    };
    this.saveQuestions = this.saveQuestions.bind(this);
  }

  componentDidMount() {
    this.saveQuestions();
  }

  saveQuestions() {
    const { questions } = this.props;
    this.setState({
      savedQuestions: questions,
    });
  }

  render() {
    const { savedQuestions } = this.state;
    const questArray = Object.values(savedQuestions);
    return (
      <div>
        { questArray.map((item, index) => <Question key={ index } qst={ item } />) }
        <Question />
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
