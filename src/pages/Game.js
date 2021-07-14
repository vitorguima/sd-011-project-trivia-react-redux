import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  constructor() {
    super();

    this.setItemOnLocalStorage = this.setItemOnLocalStorage.bind(this);
  }

  setItemOnLocalStorage() {
    const { token, isLoading } = this.props;
    if (!isLoading) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  render() {
    const { isLoading } = this.props;
    this.setItemOnLocalStorage();
    return (
      <div>
        {isLoading ? 'Carregando...' : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isLoading: state.loginReducer.isLoading,
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
