import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName } = this.props;
    const token = localStorage.getItem('token');
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${token}` }
          alt="imagem de perfil do jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.playerReducer.name,
});

export default connect(mapStateToProps)(Header);
