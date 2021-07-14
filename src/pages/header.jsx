import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.renderGravatarImage = this.renderGravatarImage.bind(this);
  }

  render() {
    const { email } = this.props;
    const hashMD5 = md5(email).toString();
    const { nome } = this.props;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashMD5}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          ;
          <span data-testid="header-player-name">{ nome }</span>
          <span data-testid="header-score">0</span>
        </header>
        <h1>Home Game</h1>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  nome: state.loginReducer.nome,
});

export default connect(mapStateToProps, null)(Header);
