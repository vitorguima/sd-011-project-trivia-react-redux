import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { getToken } from '../services/API';

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
      value: 0,
    };

    this.change = this.change.bind(this);
  }

  componentDidMount() {
    getToken().then((questions) => {
      this.setState({ questions, loading: false });
    });
  }

  change(val) {
    this.setState({ value: val });
  }

  render() {
    const { questions, loading, value } = this.state;
    // console.log(questions);
    return (
      <div className="game-container">
        <Header pontuacao={ value } />
        {questions.length === 0 ? loading
          : <Questions { ...questions } funcao={ this.change } /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
});

export default connect(mapStateToProps, null)(Jogo);

/* return(
  <div className="game-container">
    <Header pontuacao={ value } />
    {!loading && <Questions { ...game } funcao={ this.change } />}
  </div>
);
} */
