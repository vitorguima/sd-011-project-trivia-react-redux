import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hiddenBtn } from '../actions/user';

class WrongAnswer extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   hidden: true,
    // };

    const { array } = this.props;
    this.correctAnswer = React.createRef();
    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`] = React.createRef();
    });

    this.changeBkgColor = this.changeBkgColor.bind(this);
    this.esconderBtn = this.esconderBtn.bind(this);
  }

  componentDidUpdate({ array }) {
    const { mostraBtn } = this.props;
    this.correctAnswer.current.style.border = ''; // Limpa Borda da Correta
    // if (array !== null) {
    array.forEach((item, index) => { // Limpa Borda das INcorretas
      this[`incorrectAnswer${index}`].current.style.border = '';
    });
    // }
    mostraBtn(true);
  }

  esconderBtn() {
    const { mostraBtn } = this.props;
    // this.setState({
    //   hidden: false,
    // });
    // this.changeBkgColor();
    mostraBtn(false);
  }

  changeBkgColor() { // Executado nos OnClicks das opçoes de respostas
    const { array } = this.props;
    this.correctAnswer.current.style.border = '3px solid rgb(6, 240, 15)'; // Cria Borda Correta nas corretas

    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`].current.style.border = '3px solid rgb(255, 0, 0)'; // Cria Borda Correta nas INcorretas
    });
    this.esconderBtn();
  }

  render() {
    const { array, correctAnswer } = this.props;
    // const { hidden } = this.state;
    return (
      <div>
        <button
          data-testid="correct-answer"
          type="button"
          className="correctAnswer"
          ref={ this.correctAnswer }
          onClick={ () => this.changeBkgColor() } // Cria Borda da Correta
          // onClick={ () => this.esconderBtn() }
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
              // onClick={ () => this.esconderBtn() }
              key={ index }
            >
              {value}
            </button>
          ))
        }
        {/* <button
          type="button"
          hidden={ hidden }
          // value="Próximo"
        >
          Próximo
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.requestGameAPI.gameData,
});

const mapDispatchToProps = (dispatch) => ({
  mostraBtn: (payload) => dispatch(hiddenBtn(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrongAnswer);

WrongAnswer.defaultProps = {
  gameData: {},
};

WrongAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  // recivedGameData: PropTypes.func,
}).isRequired;
