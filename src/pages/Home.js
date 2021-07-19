import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken, getHashGravatar } from '../redux/actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      name: '',
      email: '',
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleButton() {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(
      {
        [name]: value,
      },
      () => this.handleButton(),
    );
  }

  handleClick() {
    const { fetchTokenAction, setUser, urlApiQuestions } = this.props;
    const { name, email } = this.state;
    fetchTokenAction(urlApiQuestions);
    setUser(email, name);
  }

  render() {
    const { name, email, disabled } = this.state;

    return (
      <div>
        <form>
          <input
            value={ name }
            name="name"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
          />
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
          />
          <Link to="/game">
            <button
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Home.propTypes = {
  fetchTokenAction: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  urlApiQuestions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  urlApiQuestions: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenAction: (url) => dispatch(fetchToken(url)),
  setUser: (email, name) => dispatch(getHashGravatar(email, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
