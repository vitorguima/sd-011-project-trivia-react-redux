import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenAPI } from '../actions/login';

class Game extends Component {
  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  render() {
    const { tokenData } = this.props;
    localStorage.setItem('token', tokenData);
    return (
      <div>
        teste
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenData: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  tokenData: PropTypes.string.isRequired,
  fetchToken: PropTypes.func.isRequired,
};
