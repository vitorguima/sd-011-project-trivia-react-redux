import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../redux/actions';

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
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  render() {
    const { name, email, disabled } = this.state;
    const { fetchTokenAction } = this.props;
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
              onClick={ fetchTokenAction }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Home.propTypes = {
  fetchTokenAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTokenAction: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
