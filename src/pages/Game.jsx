import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Countdown from '../components/Countdown';
import Question from '../components/Question';
import { requestApiQuestions } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { questionsToStore } = this.props;
    const token = localStorage.getItem('token');
    questionsToStore(token);
  }

  render() {
    const { userName, gravatarImage, history: { push } } = this.props;

    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt={ `Foto de ${userName}` }
          />
          <p data-testid="header-player-name">{ `Nome do usuário: ${userName}` }</p>
          <p data-testid="header-score">0</p>
        </header>
        <Countdown />
        <main>
          <Question push={ push } />
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsToStore: (token) => dispatch(requestApiQuestions(token)),
});

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  questionsToStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
