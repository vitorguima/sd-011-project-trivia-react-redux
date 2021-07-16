import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

function Header(props) {
  const { name, email, score } = props;
  const emailHash = MD5(email);

  return (
    <header className="header">
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${emailHash}` }
        alt="foto do usuario"
        className="header-picture"
      />

      <h2
        data-testid="header-player-name"
      >
        {name}
      </h2>
      <h2
        data-testid="header-score"
      >
        {score}
      </h2>

    </header>
  );
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
