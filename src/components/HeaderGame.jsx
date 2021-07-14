import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import fetchAvatar from '../service/requestAvatar';

class Header extends Component {
  constructor() {
    super();
    this.state = { };
    this.setAvatar = this.setAvatar.bind(this);
  }

  async componentDidMount() {
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    const avatarUrl = await fetchAvatar(hashEmail);
    console.log(avatarUrl);
    this.setAvatar(avatarUrl);
    console.log('3', avatarUrl);
  }

  setAvatar(url) {
    this.setState({
      url,
    });
  }

  render() {
    const { name } = this.props;
    const { url } = this.state;
    return (
      <header>
        <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
