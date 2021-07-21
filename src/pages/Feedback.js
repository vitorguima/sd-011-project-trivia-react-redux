import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    return (
      <section className="section">
        <Header />
        <h1 data-testid="feedback-text">Tela de Feedback</h1>
        <div>Outras Seções</div>
        <div className="buttons">
          <Link to="/ranking">
            <button
              className="btn-ranking"
              data-testid="btn-ranking"
              type="button"
            // className="settings-button"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              className="btn-play-again"
              data-testid="btn-play-again"
              type="button"
            // className="settings-button"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
// });

export default connect()(Feedback);
