import React, { Component } from 'react';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [id]: value });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              value={ name }
              id="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              value={ email }
              id="email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !(name && email) }
            type="button"
            data-testid="btn-play"
          >
            Play
          </button>
        </form>

      </div>
    );
  }
}

export default Forms;
