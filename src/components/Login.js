import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              id="name"
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              required
            />
          </label>
          <button data-testid="btn-play" type="button">
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
