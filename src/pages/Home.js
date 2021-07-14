import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
          <button
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button type="button" data-testid="btn-settings">
          <Link to="/settings">
            Configurações
          </Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
