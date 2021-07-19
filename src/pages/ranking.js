import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ranking extends Component {
  constructor() {
    super();
    this.redirectHomePage = this.redirectHomePage.bind(this);
  }

  redirectHomePage() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectHomePage }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
