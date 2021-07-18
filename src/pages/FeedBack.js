import React, { Component } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
// import { connect } from 'react-redux';

class Feedback extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">FeedBack</h1>
        <FeedbackHeader />
      </div>
    );
  }
}

export default Feedback;
