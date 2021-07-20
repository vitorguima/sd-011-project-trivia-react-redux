import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <p data-testid="feedback-text">Tela do feedback</p>
        <Header />

      </>
    );
  }
}

export default Feedback;
