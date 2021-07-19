import React, { Component } from 'react';
import Layout from '../components/common/Layout';

export default class Ranking extends Component {
  render() {
    return (
      <Layout title="Ranking">
        <main>
          <p data-testid="ranking-title">Ranking</p>
        </main>
      </Layout>
    );
  }
}
