import React from 'react';
import Header from '../components/quiz/Header';
import Questions from '../components/quiz/Questions';
import '../style/quiz.css';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-quiz">
          <Questions />
        </div>
      </div>
    );
  }
}

export default Quiz;
