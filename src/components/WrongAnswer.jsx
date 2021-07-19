import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WrongAnswer extends React.Component {
  constructor(props) {
    super(props);

    const { array } = this.props;
    this.correctAnswer = React.createRef();
    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`] = React.createRef();
    });

    this.changeBkgColor = this.changeBkgColor.bind(this);
  }

  componentDidUpdate({ array }) {
    this.correctAnswer.current.style.border = ''; // Limpa Borda da Correta
    if (array !== null) {
      array.forEach((item, index) => { // Limpa Borda das INcorretas
        this[`incorrectAnswer${index}`].current.style.border = '';
      });
    }
  }

  changeBkgColor() { // Executado nos OnClicks das opçoes de respostas
    const { array } = this.props;
    this.correctAnswer.current.style.border = '3px solid rgb(6, 240, 15)'; // Cria Borda Correta nas corretas

    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`].current.style.border = '3px solid rgb(255, 0, 0)'; // Cria Borda Correta nas INcorretas
    });
  }

  render() {
    const { array, correctAnswer } = this.props;
    return (
      <div>
        <button
          data-testid="correct-answer"
          type="button"
          className="correctAnswer"
          ref={ this.correctAnswer }
          onClick={ () => this.changeBkgColor() } // Cria Borda da Correta
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
  // recivedGameData: PropTypes.func,
}).isRequired;
