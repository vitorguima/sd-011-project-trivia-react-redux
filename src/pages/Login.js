import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchToken, submitForm, getToken } from '../actions';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.validation = this.validation.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  validation() {
    const { name, email } = this.state;
    if (!name || !email) {
      return true;
    }
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleButton() {
    const { history, outroNome, outroNomeDnv } = this.props;
    outroNome();
    const { name, email } = this.state;
    outroNomeDnv({ name, email });
    history.push('/game');
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div className="loader" />;
    }
    return (
      <section>
        <FormLogin
          validation={ this.validation }
          name={ this.name }
          email={ this.email }
          handleButton={ this.handleButton }
          handleInput={ this.handleInput }
          handleSettings={ this.handleSettings }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(fetchToken(token)),
  outroNomeDnv: (inputs) => dispatch(submitForm(inputs)),
  outroNome: () => dispatch(getToken()),
});

Login.propTypes = {
  history: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
