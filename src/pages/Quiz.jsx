import React from 'react';
import Header from '../components/quiz/Header';
import Questions from '../components/quiz/Questions';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Quiz;
