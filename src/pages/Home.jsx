import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
// import { fetchToken } from '../services/api';
import { actionAvatar, actionName } from '../actions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  getToken() {
    const { setAvatar, setName } = this.props;
    const { email, name } = this.state;
    const hash = md5(email).toString();
    setAvatar(`https://www.gravatar.com/avatar/${hash}`);
    setName(name);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.getToken }
            disabled={ !email || !name }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </form>
    );
  }
}

const MapDispatchToProps = (dispatch) => ({
  setAvatar: (avatar) => dispatch(actionAvatar(avatar)),
  setName: (name) => dispatch(actionName(name)),
});

Home.propTypes = {
  setAvatar: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

export default connect(null, MapDispatchToProps)(Home);
