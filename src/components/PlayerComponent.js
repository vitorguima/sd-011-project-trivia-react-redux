import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class PlayerComponent extends Component {
  render() {
    const { emailUser, nameUser } = this.props;
    const pictureHash = md5(emailUser).toString();
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    return (
      <header>
        <h1 data-testid="header-player-name">{ nameUser }</h1>
        <img
          data-testid="header-profile-picture"
          src={ linkImage }
          alt="User Gravatar"
        />
        <p data-testid="header-score">Placar: 0</p>
      </header>
    );
  }
}

PlayerComponent.propTypes = {
  emailUser: PropTypes.string,
  nameUser: PropTypes.string,
};

PlayerComponent.defaultProps = {
  emailUser: '',
  nameUser: '',
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  nameUser: state.user.user,
});

export default connect(mapStateToProps)(PlayerComponent);
