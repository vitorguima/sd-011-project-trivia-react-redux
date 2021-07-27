import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import triviaLogo from '../trivia.png';
import style from './Home.module.css';

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main className={ style.container }>
        <img className={ style.logo } src={ triviaLogo } alt="trivia logo" />

        <LoginForm />

        <button
          className={ style.button }
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/configuration') }
        >
          Configurações
        </button>
      </main>
    );
  }
}

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
