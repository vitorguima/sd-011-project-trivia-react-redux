import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    const { userName, gravatarImage } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt={ `Foto de ${userName}` }
          />
          <p data-testid="header-player-name">{ `Nome do usuário: ${userName}` }</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
