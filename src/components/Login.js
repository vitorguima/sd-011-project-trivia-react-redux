import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { gameStarter, allQuestions } = this.props;
    const disabledButton = name.length === 0 || email.length === 0;
    if (allQuestions.length > 0) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configuração
          </button>
        </Link>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              id="name"
              onChange={ this.handleOnChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleOnChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabledButton }
            onClick={ () => gameStarter(name, email) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  gameStarter: (name, email) => dispatch(actions.gameStarter(name, email)),
});

const mapStateToProps = (state) => ({
  allQuestions: state.questions.allQuestions,
});

Login.propTypes = {
  gameStarter: PropTypes.func.isRequired,
  allQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
