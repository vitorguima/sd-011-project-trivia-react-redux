import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';
import { changeEmail, changeName, getToken } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.verifyUser = this.verifyUser.bind(this);
    this.setGlobalUser = this.setGlobalUser.bind(this);
  }

  setGlobalUser() {
    const { handleEmail, handleName, handleToken } = this.props;
    const { name, email } = this.state;
    handleToken();
    handleEmail(email);
    handleName(name);
  }

  verifyUser() {
    const { name, email } = this.state;
    if (email.length > 0 && name.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Layout title="Login">
        <main>
          <form>
            <label htmlFor="userEmail">
              Email do Gravatar:
              <input
                data-testid="input-gravatar-email"
                type="text"
                onChange={ (e) => this.setState({ email: e.target.value }) }
              />
            </label>
            <label htmlFor="userName">
              Nome do Jogador:
              <input
                data-testid="input-player-name"
                type="text"
                onChange={ (e) => this.setState({ name: e.target.value }) }
              />
            </label>
            <Link to="/game">
              <button
                data-testid="btn-play"
                type="button"
                disabled={ this.verifyUser() }
                onClick={ this.setGlobalUser }
              >
                JOGAR!
              </button>
            </Link>
          </form>
        </main>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(changeEmail(payload)),
  handleName: (payload) => dispatch(changeName(payload)),
  handleToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
  handleName: PropTypes.func.isRequired,
  handleToken: PropTypes.func.isRequired,
};
