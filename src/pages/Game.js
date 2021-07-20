import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getToken } from '../services/API';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      value: 0,
    };

    this.setScoreValue = this.setScoreValue.bind(this);
  }

  componentDidMount() {
    getToken().then((questions) => {
      this.setState({ questions, loading: false });
    });
  }

  setScoreValue(val) {
    this.setState({ value: val });
  }

  render() {
    const { questions, loading, value } = this.state;
    return (
      <div className="game-container">
        <Header score={ value } />
        {questions.length === 0 ? loading
          : <Questions { ...questions } scoreValue={ this.setScoreValue } /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
});

export default connect(mapStateToProps, null)(Game);
