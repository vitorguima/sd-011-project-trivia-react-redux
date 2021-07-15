import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from './Questions';

class GamePage extends Component {
  render() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    return (
      <div>
        Game Page
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = ({ tokenReducer }) => ({
  token: tokenReducer.token,
});

// const mapDispatchToProps = (dispatch) => ({
// });

GamePage.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(GamePage);
