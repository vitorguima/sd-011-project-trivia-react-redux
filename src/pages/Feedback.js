import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    return (
      <section className="section">
        <Header />
        <h1 data-testid="feedback-text">Tela de Feedback</h1>
        <div>Outras Seções</div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
// });

export default connect()(Feedback);
