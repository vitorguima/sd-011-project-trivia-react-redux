import React, { Component } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
import Performance from '../components/Performance';
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
        <Performance />
      </div>
    );
  }
}

export default Feedback;
