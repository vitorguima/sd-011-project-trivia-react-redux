import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, hash, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Imagem do seu avatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  hash: state.userReducer.hash,
  score: state.userReducer.score,
});

Header.propTypes = {
  name: PropTypes.string,
  hash: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
