import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { fetchTokenAPI, gravatarImage } from '../actions/login';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  componentDidMount() {
    const { userEmail, fetchToken, sendGravatarImage } = this.props;
    fetchToken();
    const hashEmail = md5(userEmail).toString();
    sendGravatarImage(`https://www.gravatar.com/avatar/${hashEmail}`);
  }

  render() {
    const { fetchedToken } = this.props;
    localStorage.setItem('token', fetchedToken);
    return (
      <div>
        <Header />
        { fetchedToken ? <Questions /> : <h1>Loading...</h1> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchedToken: state.login.token,
  userEmail: state.login.email,
  userName: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAPI()),
  sendGravatarImage: (image) => dispatch(gravatarImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  fetchedToken: PropTypes.string.isRequired,
  fetchToken: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  sendGravatarImage: PropTypes.func.isRequired,
};
