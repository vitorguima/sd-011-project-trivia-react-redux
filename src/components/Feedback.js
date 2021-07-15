import React, { Component } from 'react';

import Header from './Header';

class Feedback extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //   }
  // }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Boa</p>
      </div>
    );
  }
}

export default Feedback;
