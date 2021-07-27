import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './PlayerHeader.module.css';
import logo from '../trivia.png';

class PlayerHeader extends React.Component {
  render() {
    const { name, gravatar, score } = this.props;

    return (
      <header className={ style.header }>
        <img
          className={ style.gravatar }
          src={ gravatar }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <img className={ style.logo } src={ logo } alt="logo" />
        <section className={ style.userInfo }>
          <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
          <p data-testid="header-score">{score}</p>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (
  { playerReducer: { name, gravatar }, gameReducer: { score } },
) => ({
  name,
  gravatar,
  score,
});

export default connect(mapStateToProps)(PlayerHeader);

PlayerHeader.propTypes = {
  name: PropTypes.string,
  gravatar: PropTypes.string,
}.isRequired;
