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
        <p data-testid="feedback-text">FeedBack</p>
        <FeedbackHeader />
      </div>
    );
  }
}

export default Feedback;
