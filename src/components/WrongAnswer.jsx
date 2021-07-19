import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Score from './Score';

class WrongAnswer extends React.Component {
  constructor(props) {
    super(props);
    // *Criar um estado que vai receber o valor do timer
    this.state = {
      timerReceived: 30,
      timer: 1, // //uso temporário
    };
    const { array } = this.props;
    this.correctAnswer = React.createRef();
    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`] = React.createRef();
    });

    this.changeBkgColor = this.changeBkgColor.bind(this);
    this.sentTimerValueToScoreFile = this.sentTimerValueToScoreFile.bind(this); // *bind padrãolinhar 
  }

  componentDidUpdate({ array }) {
    this.correctAnswer.current.style.border = ''; // Limpa Borda da Correta
    if (array !== null) {
      array.forEach((item, index) => { // Limpa Borda das INcorretas
        this[`incorrectAnswer${index}`].current.style.border = '';
      });
    }
  }

  changeBkgColor() { // Executado nos OnClicks das opções de respostas
    const { array } = this.props;
    this.correctAnswer.current.style.border = '3px solid rgb(6, 240, 15)'; // Cria Borda Correta nas corretas

    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`].current.style.border = '3px solid rgb(255, 0, 0)'; // Cria Borda Correta nas INcorretas
    });
  }

  // !Atualiza o valor do estado timerReceived
  sentTimerValueToScoreFile() {
    const { timer } = this.state;
    this.setState({ timerReceived: timer }, () => {
      const { timerReceived } = this.state;
      return timerReceived;
    });
  }

  // TODO: forma de mudar a pergunta quando o tempo passar - Não sei se o modelo atual funcionaria 😔😔✋
  forceAClick() {
    const btnNext = document.getElementById('btn-next');
    const { timer } = this.state;
    if (timer === 0) {
      return btnNext.click(); // *força um click
    }
  }

  render() {
    const { array, correctAnswer, difficulty } = this.props;
    const { timerReceived } = this.state;
    return (
      <div>
        { /* Mandando o estado e a props via pros para o score */ }
        <Score difficulty={ difficulty } timer={ timerReceived } />
        <button
          data-testid="correct-answer"
          type="button"
          className="correctAnswer"
          ref={ this.correctAnswer }
          onClick={ () => this.changeBkgColor() } // Cria Borda da Correta
          onMouseDown={ () => this.sentTimerValueToScoreFile() } // *Atualiza o valor do estado timerReceived
        >
          { correctAnswer }
        </button>
        {
          array && array.map((value, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              ref={ this[`incorrectAnswer${index}`] }
              onClick={ () => this.changeBkgColor() } // Cria Borda das INcorretas
              key={ index }
            >
              {value}
            </button>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.requestGameAPI.gameData,
});

export default connect(mapStateToProps, null)(WrongAnswer);

WrongAnswer.defaultProps = {
  gameData: {},
};

WrongAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  // receivedGameData: PropTypes.func,
}).isRequired;
