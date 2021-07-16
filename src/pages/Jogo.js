import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Jogo extends Component {
  /* constructor() {
    super();
    this.state = {
      game: [],
      loading: true,
      value: 0,
    };
    this.change = this.change.bind(this);
  } */

  /* componentDidMount() {
    getToken().then((game) => {
      console.log(game);
      this.setState({ game, loading: false });
    });
  } */

  /* change(val) {
    this.setState({ value: val });
  } */

  render() {
    return (
      <div className="game-container">
        <Header />
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
