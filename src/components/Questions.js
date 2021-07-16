import React, { Component } from 'react';

class Questions extends Component {
  render() {
    const { questions } = this.props;
    return (
      <>
        <p>oi</p>
        <p>{ questions[0].question }</p>
      </>
    );
  }
}

export default Questions;
