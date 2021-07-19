import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class CountdownTimer extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  // Problema: o timer não é renderizado novamente, portanto a função que começa o timer não é chamada quando mudamos de pergunta
  // Soluções: podemos usar o timer dentro de uma action, e chamar a action cada vez que clicar no botão "Próxima"
  // podemos renderizar o componente pai novamente pra forçar a renderização do componente

  timer() {
    const { setSecondsToFinish } = this.props;
    const interval = 1000;
    console.log('passei');
    this.myInterval = setInterval(() => {
      const { wasAnswered, secondsToFinish } = this.props;
      if (secondsToFinish > 0 || !wasAnswered) {
        setSecondsToFinish(1);
        // this.setState((secs) => ({
        //   seconds: secs.seconds - 1,
        // }));
      }
      if (secondsToFinish <= 0) {
        clearInterval(this.myInterval);
        // this.setState({
        //   disabled: false,
        // });
      }
      if (wasAnswered) {
        clearInterval(this.myInterval);
      }
    }, interval);
  }

  render() {
    const { wansAnswered } = this.props;
    const finalSeconds = 10;
    const { secondsToFinish } = this.props;
    if (secondsToFinish === 0) {
      return <h1>Tempo esgotado!</h1>;
    }
    return (
      <div>
        <h1>
          Tempo Restante: 00:
          { secondsToFinish < finalSeconds ? `0${secondsToFinish}` : secondsToFinish}
        </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSecondsToFinish: (seconds) => dispatch(userActions.setSecondsToFinish(seconds)),
  setTimeScore: (seconds) => dispatch(userActions.setTimeScore(seconds)),
});

const mapStateToProps = (state) => ({
  wasAnswered: state.questionHandlers.wasAnswered,
  secondsToFinish: state.timeHandler.secondsToFinish,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);

CountdownTimer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
