import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        {
          (corrects >= (1 + 2)) // lint error: if 3 = no-magic-number
            ? <h3 data-testid="feedback-text">Mandou bem!</h3>
            : <h3 data-testid="feedback-text">Podia ser melhor...</h3>
        }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   corrects: state.questions.corrects,
// });

export default Feedback; // connect(mapStateToProps)(FeedBack);
