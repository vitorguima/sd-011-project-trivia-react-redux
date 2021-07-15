import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from '../components/common';
import { changeEmail, changeName } from '../redux/actions';

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

  verifyUser() {
    const { name, email } = this.state;
    if (email.length > 0 && name.length > 0) {
      return false;
    }
    return true;
  }

  setGlobalUser() {
    const { handleEmail, handleName } = this.props;
    const { name, email } = this.state;
    handleEmail(email);
    handleName(name);
  }

  render() {
    const { name, email } = this.state;
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

            <button
              data-testid="btn-play"
              type="button"
              disabled={ this.verifyUser() }
              onClick={ this.setGlobalUser }
            >
              JOGAR!
            </button>
          </form>
        </main>
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(changeEmail(payload)),
  handleName: (payload) => dispatch(changeName(payload)),
});
export default connect(null, mapDispatchToProps)(Login);
