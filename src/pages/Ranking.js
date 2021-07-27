import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirectToLogin: false,
    };

    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    const { redirectToLogin } = this.state;
    const { fromRanking } = this.props;
    if (redirectToLogin) return <Redirect to="/" />;

    return (
      <div className="Ranking">
        <p className="RankingTitle" data-testid="ranking-title">Ranking</p>
        <div className="Table">
          {
            fromRanking
              .sort((a, b) => b.score - a.score).map((elements, i) => (
                <section key={ i }>
                  <div>
                    <img src={ elements.picture } alt="Gravatar-email" />
                  </div>
                  <div data-testid={ `player-name-${i}` }>{elements.name}</div>
                  <div data-testid={ `player-score-${i}` }>{elements.score}</div>
                </section>
              ))
          }
        </div>
        <button
          type="submit"
          onClick={ this.toLogin }
          data-testid="btn-go-home"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fromRanking: state.rankingReducer,
});

Ranking.propTypes = {
  fromRanking: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps)(Ranking);
