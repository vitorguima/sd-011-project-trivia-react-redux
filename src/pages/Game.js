import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { loading, token } = this.props;
    if (loading) {
      return (<p> Carregando...</p>);
    }
    localStorage.setItem('token', token);
    return (
      <div> Olá </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  loading: state.game.loading,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
