import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedQuestion: '',
    };
    this.saveQuestion = this.saveQuestion.bind(this);
  }

  componentDidMount() {
    this.saveQuestion();
  }

  saveQuestion() {
    const { qst } = this.props;
    this.setState({
      savedQuestion: qst,
    });
  }

  render() {
    const { savedQuestion } = this.state;
    return (
      <div>
        Pergunta
        <h2 data-testid="question-category">
          Categoria:
          { savedQuestion.category }
        </h2>
        <h3 data-testid="question-text">Pergunta: </h3>
        <p>Alternativa 1</p>
        <p>Alternativa 2</p>
        <p>Alternativa 3</p>
        <p>Alternativa 4</p>
        <button type="button" onClick={ () => console.log(savedQuestion.category) }> Log perguntas </button>
      </div>
    );
  }
}

export default connect()(Question);
