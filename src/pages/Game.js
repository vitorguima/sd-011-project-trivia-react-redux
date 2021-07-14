import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { fetchTokenAPI } from '../actions/login';
import { gravatarImage } from '../actions/game';

class Game extends Component {
  componentDidMount() {
    const { fetchToken, userEmail, userImage } = this.props;
    fetchToken();
    const hashEmail = md5(userEmail).toString();
    userImage(`https://www.gravatar.com/avatar/${hashEmail}`);
  }

  render() {
    const { tokenData, imageURL, userName } = this.props;
    localStorage.setItem('token', tokenData);
    return (
      <div>
        <header>
          <img src={ imageURL } alt="user" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="header-score">0</p>
        </header>
        teste
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenData: state.login.token,
  userEmail: state.login.email,
  userName: state.login.user,
  imageURL: state.game.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAPI()),
  userImage: (image) => dispatch(gravatarImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  tokenData: PropTypes.string.isRequired,
  fetchToken: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};
