import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  render() {
    const { nome, score } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">TITULO RANKING</h1>
        <ul>
          <li>
            {nome}
            {score}
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  score: state.triviaReducer.score,
});

Ranking.propTypes = {
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
