import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      messages: '',
      assertions: 0,
    };
    this.performanceAnswer = this.performanceAnswer.bind(this);
  }

  componentDidMount() {
    this.performanceAnswer();
  }

  performanceAnswer() {
    const { assertions } = this.state;
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const Assertions = getLocalStorage.player.assertions
      ? getLocalStorage.player.assertions : assertions;
    console.log(Assertions);
    const controlScore = 3;
    if (Assertions < controlScore) {
      this.setState({
        messages: 'Podia ser melhor...',
      });
    } else {
      this.setState({
        messages: 'Mandou bem!',
      });
    }
  }

  render() {
    const { messages, assertions } = this.state;
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const Assertions = getLocalStorage.player.score;

    return (
      <>
        <header>
          <Header />
          <h4 data-testid="feedback-text">{messages}</h4>
          <span>
            <h4 data-testid="feedback-total-score">
              { getLocalStorage.player.score }
            </h4>
            <h4 data-testid="feedback-total-question">
              {getLocalStorage.player.assertions ? Assertions : assertions }
            </h4>
          </span>
        </header>

        <div>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Feedback;
