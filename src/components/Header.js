import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const email = md5('email@email.com').toString();

class Header extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="header">
        <div className="gravatar">
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="imagem gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="name">
          <h4 data-testid="header-player-name">{ name }</h4>
        </div>
        <div className="score">
          <h4 data-testid="header-score">{0}</h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
