import React from 'react';

export default class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: '',
    };
    this.getStorageAssertions = this.getStorageAssertions.bind(this);
  }

  componentDidMount() {
    this.getStorageAssertions();
  }

  getStorageAssertions() {
    const storage = JSON.parse(localStorage.getItem('state'));
    this.setState({
      assertions: storage.assertions,
    });
  }

  message() {
    const { assertions } = this.state;
    const magicNumber = 3;
    if (assertions < magicNumber) return 'Podia ser melhor...';
    if (assertions >= magicNumber) return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <p data-testid="feedback-text">{this.message()}</p>
      </div>
    );
  }
}
