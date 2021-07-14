import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { nome, email } = this.state;
      if (nome.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <div className="card-login">
        <input
          type="text"
          data-testid="input-player-name"
          name="nome"
          placeholder="Nome:"
          value={ nome }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          disabled={ isDisabled }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Card;
