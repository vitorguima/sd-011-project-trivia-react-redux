import React, { Component } from 'react';

export default class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      actualIndex: 0,
    };

    this.saveNewRank = this.saveNewRank.bind(this);
    this.listItem = this.listItem.bind(this);
  }

  saveNewRank(name, score) {
    let ranking = localStorage.getItem('ranking');
    if (!ranking) {
      ranking = [{
        name,
        score,
      }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    // localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  listItem(state) {
    console.log(state);
    const { player } = state;
    console.log(player);
    const { actualIndex } = this.state;
    this.setState({ actualIndex: actualIndex + 1 });
    return (
      <div>
        <p data-testid={ `player-name-${actualIndex}` }>{ name }</p>
        <h4 data-testid={ `player-score-${actualIndex}` }>{ score }</h4>
        { this.saveNewRank(name, score) }
      </div>
    );
  }

  render() {
    const state = localStorage.getItem('state');
    return (
      <div>
        <h1>RANKING</h1>
        { this.listItem(state)}
      </div>
    );
  }
}
