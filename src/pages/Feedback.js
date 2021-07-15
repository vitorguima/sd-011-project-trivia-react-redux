import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      assertions: 0,
    };

    this.getScoreAndAssertions = this.getScoreAndAssertions.bind(this);
  }

  componentDidMount() {
    this.getScoreAndAssertions();
  }

  getScoreAndAssertions() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
    this.setState({
      score,
      assertions,
    });
  }

  render() {
    const { score, assertions } = this.state;
    const baseNumber = 3;
    return (
      <>
        <Header />
        <section>
          <h1 data-testid="feedback-text">
            { assertions >= baseNumber ? 'Mandou bem!' : 'Podia ser melhor...' }
          </h1>
          <p>
            Você acertou
            {' '}
            { assertions }
            {' '}
            questões!
          </p>
          <p>
            Um total de
            {' '}
            {score}
            {' '}
            pontos.
          </p>
          <div>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">
                Ver Ranking
              </button>
            </Link>
            <Link to="/">
              <button type="button" data-testid="btn-play-again">
                Jogar Novamente
              </button>
            </Link>
          </div>
        </section>
      </>
    );
  }
}

export default Feedback;
