import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, hash, score } = this.props;

    return (
      <div>
        <header>
          <div className="headerContainer">
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="foto" />
            <span>
              <div className="emailHeaderDiv">
                {email}
              </div>
              <div data-testid="header-player-name">
                {name}
              </div>
            </span>
          </div>
          <div>
            Pts:&nbsp;
            <span data-testid="header-score">
              {score}
            </span>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.homeReducer.user.email,
    name: state.homeReducer.user.name,
    hash: state.homeReducer.user.hash,
  };
}

export default connect(mapStateToProps)(Header);
