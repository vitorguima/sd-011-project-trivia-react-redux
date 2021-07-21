import React, { Component } from 'react';
import Loading from '../components/general/Loading';
import Header from '../components/ranking/Header';
import Table from '../components/ranking/TableRanking';
import Button from '../components/ranking/ButtonReturn';
import '../style/ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRankingStorage();
  }

  getRankingStorage() {
    const playersParse = localStorage.getItem('ranking');
    const playersStorage = JSON.parse(playersParse);
    this.setState({
      isLoading: false,
      ranking: playersStorage,
    });
  }

  render() {
    const { isLoading, ranking } = this.state;
    return (
      <div>
        <Header />
        { !isLoading && ranking.length > 0 ? <Table ranking={ ranking } />
          : (
            <div className="center">
              <Loading />
            </div>)}
        <Button />
      </div>
    );
  }
}

export default Ranking;
