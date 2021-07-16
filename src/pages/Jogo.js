import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Jogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oi: 'a',
    };
  }

  componentDidMount() {
    const getToken2 = localStorage.getItem('token');
    console.log(getToken2);
    const renderQuestions = () => {
      fetchQuestions(getToken2);
    };
    console.log(renderQuestions);
  }

  /* change(val) {
    this.setState({ value: val });
  } */

  render() {
    return (
      <div className="game-container">
        <Header />
        <Questions />
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
