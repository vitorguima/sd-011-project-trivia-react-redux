import React, { Component } from 'react';

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
        <h1>deu certo</h1>
      </div>
    );
  }
}

export default Jogo;

/* return(
  <div className="game-container">
    <Header pontuacao={ value } />
    {!loading && <Questions { ...game } funcao={ this.change } />}
  </div>
);
} */
