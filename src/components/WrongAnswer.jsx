import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WrongAnswer extends React.Component {
  constructor(props) {
    super(props);

    const { array } = this.props;

    this.state = {
      counter: 30,
      isUpdated: false,
    };

    this.correctAnswer = React.createRef();
    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`] = React.createRef();
    });

    this.changeBkgColor = this.changeBkgColor.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate({ array }) {
    const { isUpdated } = this.state;

    this.correctAnswer.current.style.border = ''; // Limpa Borda da Correta
    if (isUpdated) {
      array.forEach((item, index) => { // Limpa Borda das INcorretas
        this[`incorrectAnswer${index}`].current.style.border = '';
      });
      this.setState({ isUpdated: false });
    }
  }

  handleTimer() {
    const { counter } = this.state;
    const second = 1000;
    let timer = counter;
    const interval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(interval);
      }
      this.setState({ counter: timer });
    }, second);
  }

  changeBkgColor() { // Executado nos OnClicks das opçoes de respostas
    const { array } = this.props;
    this.correctAnswer.current.style.border = '3px solid rgb(6, 240, 15)'; // Cria Borda Correta nas corretas
    this.setState({ isUpdated: true });
    array.forEach((item, index) => {
      this[`incorrectAnswer${index}`].current.style.border = '3px solid rgb(255, 0, 0)'; // Cria Borda Correta nas INcorretas
    });
  }

  render() {
    const { counter } = this.state;
    const { array, correctAnswer } = this.props;
    return (
      <div>
        <p>{ counter }</p>
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
