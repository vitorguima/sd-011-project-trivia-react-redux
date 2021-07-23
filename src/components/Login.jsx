import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogin } from '../actions';
import requisitionToken from '../helpers/RequisitionToken';
import '../style/index.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndName = this.validateEmailAndName.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmailAndName() {
    const { email, name } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const regexValidation = regex.test(email);
    if (name && regexValidation) {
      this.setState({ disabled: false });
    } else { this.setState({ disabled: true }); }
  }

  render() {
    const { name, email, disabled } = this.state;
    const { dispatchLogin, dispatchApi } = this.props;
    return (
      <div className="container-login">
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          onKeyUp={ this.validateEmailAndName }
          value={ name }
        />
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          onKeyUp={ this.validateEmailAndName }
          value={ email }
        />
        <Link to="/game">
          <button
            className="btn-play"
            type="button"
            data-testid="btn-play"
            onClick={ () => {
              dispatchLogin(this.state);
              dispatchApi();
            } }
            disabled={ disabled }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  dispatchApi: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(getLogin(state)),
  dispatchApi: () => dispatch(requisitionToken()),
});

export default connect(null, mapDispatchToProps)(Login);
